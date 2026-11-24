const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto((process.env.BASE||'http://127.0.0.1:8300/index.html')+'?mode=solo&name=T');await p.waitForTimeout(400);await p.keyboard.press('Enter');await p.waitForTimeout(300);
 const st=()=>p.evaluate(()=>({ph:window.Q.G().ph,sh:window.Q.G().shift,lives:window.Q.G().lives}));
 await p.evaluate(()=>{const G=window.Q.G();G.readyT=0;G.t=0.05});await p.waitForTimeout(500);console.log('1st miss:',JSON.stringify(await st()));await p.screenshot({path:'lives_retry.png'});
 await p.keyboard.press('Enter');await p.waitForTimeout(300);console.log('after Enter:',JSON.stringify(await st()));
 await p.evaluate(()=>{const G=window.Q.G();G.readyT=0;G.t=0.05});await p.waitForTimeout(500);console.log('2nd miss:',JSON.stringify(await st()));
 await p.keyboard.press('Enter');await p.waitForTimeout(300);console.log('new run:',JSON.stringify(await st()));
 console.log('ERRORS',errs);await b.close();})();
