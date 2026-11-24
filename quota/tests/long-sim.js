const { chromium } = require('playwright');
(async()=>{
  const b=await chromium.launch(); const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto((process.env.BASE||'http://127.0.0.1:8300/index.html'));
  const r=await p.evaluate(()=>{const out={};for(const players of [2,3,4,6]){const runs=[];for(let i=0;i<8;i++)runs.push(window.Q.simulate({players,shifts:12,autoShout:2}));
    const reach=runs.map(r=>r.filter(x=>x.met).length);out['players='+players]={clearedPerRun:reach,kinds:[...new Set(runs.flat().flatMap(x=>x.memos.map(m=>m.kind)))],maxDirs:Math.max(...runs.flat().map(x=>x.dirs.length)),quotas:runs[0].map(x=>x.quota),ends:runs.flat().filter(x=>x.end).length};}return out;});
  console.log(JSON.stringify(r));console.log('ERRORS',errs);await b.close();})();
