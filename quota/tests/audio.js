const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch(); const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto((process.env.BASE||'http://127.0.0.1:8300/index.html'));
  for(const [sec,level,sfx] of [[24,0,false],[24,1,false],[24,2,false],[16,3,false],[14,1,true]]){
    const r=await p.evaluate(([s,l,f])=>window.Q.audioStats(s,l,f),[sec,level,sfx]);
    const rms=r.perSecondRms; const avg=(rms.reduce((a,x)=>a+x,0)/rms.length).toFixed(1);
    console.log(`level ${level}${sfx?'+sfx':''}: peak ${r.peak} nan ${r.nan} | avg RMS ${avg} dBFS (min ${Math.min(...rms)}, max ${Math.max(...rms)}) | per-second: ${rms.join(' ')}`);
  }
  console.log('ERRORS',errs); await b.close();
})();
