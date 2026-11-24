const S=process.env.OUT||'.';
const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']}); const errs=[];
  const ctx=await b.newContext({viewport:{width:1280,height:720}});
  await ctx.addInitScript(()=>{ window.__pad={connected:true,axes:[0,0],buttons:Array.from({length:16},()=>({pressed:false}))}; navigator.getGamepads=()=>[window.__pad]; });
  const p=await ctx.newPage(); p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await p.goto((process.env.BASE||'http://127.0.0.1:8300/index.html')); await p.waitForTimeout(500);
  await p.keyboard.press('h'); await p.waitForTimeout(200); await p.screenshot({path:S+'/e_how.png'}); await p.keyboard.press('Escape');
  await p.fill('#name','Hana'); await p.click('#bSolo'); await p.waitForTimeout(600);
  await p.keyboard.press('Enter'); await p.waitForTimeout(600); await p.screenshot({path:S+'/e_splash.png'});
  // pause toggle
  await p.keyboard.press('p'); await p.waitForTimeout(200); const t1=await p.evaluate(()=>window.Q.G().t); await p.waitForTimeout(600); const t2=await p.evaluate(()=>window.Q.G().t); console.log('paused clock frozen:',t1===t2); await p.keyboard.press('p');
  await p.keyboard.press('r'); await p.keyboard.press('r');
  // gamepad: hold stick right, then press A near belt
  await p.evaluate(()=>{window.__pad.axes=[1,0]}); await p.waitForTimeout(500); const x1=await p.evaluate(()=>window.Q.G().players.h.x); await p.evaluate(()=>{window.__pad.axes=[0,0]});
  console.log('gamepad moves player:',x1>250);
  // force promotion flow
  await p.evaluate(()=>{const G=window.Q.G();G.shift=10;G.score=G.quota;G.readyT=0;G.t=0.05}); await p.waitForTimeout(600);
  console.log('result.end:',await p.evaluate(()=>window.Q.G().result.end),'phase',await p.evaluate(()=>window.Q.G().ph)); await p.screenshot({path:S+'/e_result10.png'});
  await p.keyboard.press('Enter'); await p.waitForTimeout(3800); await p.screenshot({path:S+'/e_ending.png'});
  console.log('phase after Enter:',await p.evaluate(()=>window.Q.G().ph));
  await p.keyboard.press('Enter'); await p.waitForTimeout(500); console.log('then:',await p.evaluate(()=>window.Q.G().ph));
  await p.keyboard.press('1'); await p.waitForTimeout(3200); console.log('shift now:',await p.evaluate(()=>window.Q.G().shift),'dirs',await p.evaluate(()=>window.Q.G().dirs)); await p.waitForTimeout(3000); await p.screenshot({path:S+'/e_s11.png'});
  console.log('records:',await p.evaluate(()=>localStorage.getItem('quota-rec')));
  console.log('ERRORS',errs.filter(e=>!/GL Driver/.test(e))); await b.close();
})();
