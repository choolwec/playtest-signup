const S=process.env.OUT||'.';
const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']}); const ctx=await b.newContext({viewport:{width:1280,height:720}}); const errs=[];
  const mk=async(q)=>{const p=await ctx.newPage(); p.on('pageerror',e=>errs.push(q+' '+e.message)); await p.goto((process.env.BASE||'http://127.0.0.1:8300/index.html')+q); return p;};
  const host=await mk('?mode=host-local&code=LVLS&name=Hana'); const cli=await mk('?mode=join-local&code=LVLS&name=Cleo');
  await host.bringToFront(); await host.waitForTimeout(1500); await host.keyboard.press('Enter'); await host.waitForTimeout(800);
  const passShift=async()=>{ await host.evaluate(()=>{const G=window.Q.G();G.score=G.quota;G.readyT=0;G.t=0.05}); await host.waitForTimeout(700);
    console.log('  phase after forced pass:',await host.evaluate(()=>window.Q.G().ph)); };
  await passShift(); await host.screenshot({path:S+'/l_result.png'});
  await host.keyboard.press('Enter'); await host.waitForTimeout(600);
  console.log('draft options:',await host.evaluate(()=>window.Q.G().draft.opts));
  await host.screenshot({path:S+'/l_draft0.png'});
  await cli.bringToFront(); await cli.keyboard.press('1'); await cli.waitForTimeout(300); await host.bringToFront(); await host.keyboard.press('2'); await host.waitForTimeout(500); await host.screenshot({path:S+'/l_draft1.png'});
  await host.waitForTimeout(3200);
  const st=await host.evaluate(()=>({sh:window.Q.G().shift,lv:window.Q.G().lv,ph:window.Q.G().ph,dirs:window.Q.G().dirs,rules:window.Q.G().rules0,reg:window.Q.G().reg}));
  console.log('shift 2 state:',JSON.stringify(st));
  const hi=await host.evaluate(()=>window.Q.intel()), ci=await cli.evaluate(()=>window.Q.intel());
  console.log('host intel',JSON.stringify(hi),'client intel',JSON.stringify(ci));
  const cols=[...hi.map(r=>r[0]),...ci.map(r=>r[0])].sort(); const ok=JSON.stringify(cols)==='[0,1,2]'&&[...hi,...ci].every(r=>r[1]===st.rules[r[0]]);
  console.log('every colour known by exactly one player and matches the true mapping:',ok);
  console.log('rules leaked in snapshot:',await cli.evaluate(()=>/rules|reg/.test(JSON.stringify(window.Q.S()))));
  await host.waitForTimeout(3500); await host.screenshot({path:S+'/l_lv2.png'});
  await cli.bringToFront(); await cli.waitForTimeout(300); await cli.screenshot({path:S+'/l_lv2_client.png'});
  await host.bringToFront(); await passShift(); await host.keyboard.press('Enter'); await host.waitForTimeout(400); await host.keyboard.press('3'); await cli.bringToFront(); await cli.keyboard.press('3'); await cli.waitForTimeout(3600);
  console.log('shift 3 state:',await host.evaluate(()=>({sh:window.Q.G().shift,lv:window.Q.G().lv,ph:window.Q.G().ph,dirs:window.Q.G().dirs})));
  await host.evaluate(()=>{window.Q.G().readyT=0}); // stamp test on host: carry a file to the desk
  await host.bringToFront(); await host.evaluate(()=>{const p=window.Q.G().players.h;p.x=480;p.y=330;p.carry=0;p.stamped=false;p.dx=0;p.dy=0});
  await host.keyboard.press('e'); await host.waitForTimeout(250);
  const mid=await host.evaluate(()=>window.Q.G().players.h.stampT); console.log('DBG',JSON.stringify(await host.evaluate(()=>{const G=window.Q.G();const h=G.players.h;return{lv:G.lv,ph:G.ph,rd:G.readyT,paused:G.paused,h:{x:h.x,y:h.y,carry:h.carry,stamped:h.stamped,stampT:h.stampT,act:h.act},others:Object.values(G.players).filter(p=>p.id!=='h').map(p=>p.stampT)}}))); await host.waitForTimeout(1500);
  console.log('stamp progress mid-stamp:',mid>=0,'| stamped after wait:',await host.evaluate(()=>window.Q.G().players.h.stamped));
  await host.evaluate(()=>{const c=Object.keys(window.Q.G().players).find(k=>k!=='h');const p=window.Q.G().players[c];p.x=480;p.y=330;p.carry=1;p.stamped=false;});
  await host.evaluate(()=>{const G=window.Q.G();G.players.h.carry=2;G.players.h.stamped=false;G.players.h.stampT=0;}); // host occupies desk
  await host.evaluate(()=>{const G=window.Q.G();const c=Object.keys(G.players).find(k=>k!=='h');G.players[c].act=true;}); await host.waitForTimeout(150);
  console.log('second player refused while desk busy:',await host.evaluate(()=>{const G=window.Q.G();const c=Object.keys(G.players).find(k=>k!=='h');return G.players[c].stampT<0}));
  await host.waitForTimeout(1500); await host.screenshot({path:S+'/l_lv3.png'});
  console.log('ERRORS',errs.filter(e=>!/GL Driver/.test(e))); await b.close();
})();
