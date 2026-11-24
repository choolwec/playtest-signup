const { chromium } = require('playwright');
const D=process.env.DIST||('file://'+process.cwd().replace(/\/tests$/,'')+'/dist/');
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});const p=await b.newPage({viewport:{width:960,height:540}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 for(const m of ['__proto__','constructor','foo','']){await p.goto(D+'quota-test.html?mode='+m);await p.waitForTimeout(300);await p.click('#bSolo');await p.waitForTimeout(900);
   const s=await p.evaluate(()=>({S:!!window.Q.S(),ph:window.Q.S()&&window.Q.S().ph,fps:Math.round(fpsS)}));console.log('mode',JSON.stringify(m),'-> after Solo click',JSON.stringify(s));}
 await p.screenshot({path:(process.env.OUT||'.')+'/badmode.png'});console.log('errors',errs);await b.close();})();
