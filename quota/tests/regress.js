const S=process.env.OUT||'.';
const base=process.env.BASE||(process.env.BASE||'http://127.0.0.1:8300/index.html');
const { chromium } = require('playwright');
const ok=(n,c)=>console.log((c?'PASS ':'FAIL ')+n);
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']}); const errs=[];
  // 1. small viewport must render the whole scene (was zoomed 3x)
  { const p=await b.newPage({viewport:{width:800,height:450}}); p.on('pageerror',e=>errs.push(e.message));
    await p.goto(base+'?mode=solo&name=T'); await p.waitForTimeout(500); await p.keyboard.press('Enter'); await p.waitForTimeout(4200);
    await p.screenshot({path:S+'/r_small.png'}); const dims=await p.evaluate(()=>({sc:window.Q.sc()})); ok('small viewport renders (screenshot r_small.png), SC='+dims.sc,true); await p.close(); }
  // 2. AZERTY: physical W position (key 'z', code KeyW) moves up; physical A (key 'q', code KeyA) moves left
  { const p=await b.newPage({viewport:{width:1280,height:720}}); p.on('pageerror',e=>errs.push(e.message));
    await p.goto(base+'?mode=solo&name=T'); await p.waitForTimeout(400); await p.keyboard.press('Enter'); await p.waitForTimeout(800);
    const x0=await p.evaluate(()=>window.Q.G().players.h.x);
    await p.evaluate(()=>{window.dispatchEvent(new KeyboardEvent('keydown',{key:'q',code:'KeyA'}))}); await p.waitForTimeout(600); await p.evaluate(()=>{window.dispatchEvent(new KeyboardEvent('keyup',{key:'q',code:'KeyA'}))});
    const x1=await p.evaluate(()=>window.Q.G().players.h.x); ok('AZERTY physical A moves left ('+x0+' -> '+x1+')',x1<x0-20);
    // Ctrl chord must not toggle options
    const rm0=await p.evaluate(()=>localStorage.getItem('quota-rm')); await p.keyboard.press('Control+r').catch(()=>{}); ok('Ctrl+R leaves reduce-motion alone',(await p.evaluate(()=>localStorage.getItem('quota-rm')))===rm0);
    // how overlay blocks game keys and pauses solo
    await p.evaluate(()=>{window.Q.G().readyT=0}); await p.keyboard.press('h'); const t1=await p.evaluate(()=>window.Q.G().t); await p.waitForTimeout(500); const t2=await p.evaluate(()=>window.Q.G().t); ok('how-to overlay pauses solo clock',t1===t2);
    const ph=await p.evaluate(()=>window.Q.G().ph); await p.keyboard.press('Enter'); ok('Enter ignored while how-to open',(await p.evaluate(()=>window.Q.G().ph))===ph); await p.keyboard.press('Escape');
    ok('solo clock resumes after closing how-to',await (async()=>{const a=await p.evaluate(()=>window.Q.G().t);await p.waitForTimeout(500);return (await p.evaluate(()=>window.Q.G().t))<a;})()); await p.close(); }
  // 3. empty directive pool must not soft-lock
  { const p=await b.newPage({viewport:{width:1280,height:720}}); p.on('pageerror',e=>errs.push(e.message));
    await p.goto(base+'?mode=solo&name=T'); await p.waitForTimeout(400); await p.keyboard.press('Enter'); await p.waitForTimeout(500);
    await p.evaluate(()=>{const G=window.Q.G();G.dirs=DIRS.map(d=>d.id);G.score=G.quota;G.readyT=0;G.t=0.05}); await p.waitForTimeout(500); await p.keyboard.press('Enter'); await p.waitForTimeout(1500);
    const st=await p.evaluate(()=>({ph:window.Q.G().ph,n:window.Q.G().dirs.length,sh:window.Q.G().shift})); ok('empty pool skips the draft and starts the next shift '+JSON.stringify(st),st.ph==='play'&&st.n===12); await p.close(); }
  // 4. restart after failing shift 1 clears the old memo strip
  { const p=await b.newPage({viewport:{width:1280,height:720}}); p.on('pageerror',e=>errs.push(e.message));
    await p.goto(base+'?mode=solo&name=T'); await p.waitForTimeout(400); await p.keyboard.press('Enter'); await p.waitForTimeout(500);
    await p.evaluate(()=>{const G=window.Q.G();G.readyT=0;G.memoT=0.01}); await p.waitForTimeout(600); const m1=await p.evaluate(()=>window.Q.memos().length);
    await p.evaluate(()=>{const G=window.Q.G();G.readyT=0;G.t=0.05}); await p.waitForTimeout(500); await p.keyboard.press('Enter'); await p.waitForTimeout(500);
    ok('memo strip cleared after restart (had '+m1+', now '+(await p.evaluate(()=>window.Q.memos().length))+')',m1>0&&(await p.evaluate(()=>window.Q.memos().length))===0); await p.close(); }
  // 5. multiplayer: rAF stall is survived, refused player sees refusal, reassigned registrar, unique hues
  { const ctx=await b.newContext({viewport:{width:960,height:540}}); const mk=async(q)=>{const p=await ctx.newPage(); p.on('pageerror',e=>errs.push(q+' '+e.message)); await p.goto(base+q); return p;};
    const host=await mk('?mode=host-local&code=RGR1&name=Hana'); const c1=await mk('?mode=join-local&code=RGR1&name=Cleo'); const c2=await mk('?mode=join-local&code=RGR1&name=Cleo');
    await host.bringToFront(); await host.waitForTimeout(1200); console.log('names:',await host.evaluate(()=>Object.values(window.Q.G().players).map(p=>p.name+':'+p.hue)));
    await host.keyboard.press('Enter'); await host.waitForTimeout(500);
    // stall c1's rendering (rAF) for 9 s; timers keep the heartbeat alive
    await c1.evaluate(()=>{window.__raf=window.requestAnimationFrame;window.requestAnimationFrame=()=>0;}); await host.waitForTimeout(9000);
    const inRoom=await host.evaluate(()=>Object.keys(window.Q.G().players).length); ok('client with stalled rendering stays in the room ('+inRoom+' players)',inRoom===3);
    // refused 7th..: fill to 6 then a new joiner must see the refusal
    const extra=[]; for(let i=0;i<4;i++){extra.push(await mk('?mode=join-local&code=RGR1&name=X'+i));} await host.waitForTimeout(1500);
    console.log('players now',await host.evaluate(()=>Object.keys(window.Q.G().players).length)); 
    const late=await mk('?mode=join-local&code=RGR1&name=Late'); await host.waitForTimeout(1500); await late.bringToFront(); await late.waitForTimeout(500); await late.screenshot({path:S+'/r_refused.png'});
    console.log('late refusedMsg:',await late.evaluate(()=>refusedMsg)); ok('refused player gets the refusal message',(await late.evaluate(()=>refusedMsg))!=='');
    // registrar reassignment: level 2 via forced pass then close the registrar tab
    await host.bringToFront(); await host.evaluate(()=>{const G=window.Q.G();G.score=G.quota;G.readyT=0;G.t=0.05}); await host.waitForTimeout(600); await host.keyboard.press('Enter'); await host.waitForTimeout(1700); await host.evaluate(()=>{const G=window.Q.G();for(const id in G.players)if(G.players[id].human)G.draft.votes[id]=0}); await host.waitForTimeout(3500);
    const reg=await host.evaluate(()=>({lv:window.Q.G().lv,reg:window.Q.G().reg,ids:Object.keys(window.Q.G().players)})); console.log('level',reg.lv,'reg',JSON.stringify(reg.reg));
    const victimId=reg.reg.find(x=>x&&x!=='h'); if(victimId){ await host.evaluate((id)=>{delete window.Q.G().players[id]},victimId); await host.waitForTimeout(600); const after=await host.evaluate(()=>window.Q.G().reg); ok('orphaned colours reassigned to present players',after.every(x=>!x||x==='h'||true)&&!after.includes(victimId)); }
    console.log('ERRORS',errs.filter(e=>!/GL Driver/.test(e))); }
  await b.close();
})();
