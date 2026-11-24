// Pen test: malicious HOST messages against a client (LocalNet). A rogue page plays host id 'h' and a victim joins.
const { chromium } = require('playwright');
const base=process.env.BASE||(process.env.BASE||'http://127.0.0.1:8300/index.html');
(async()=>{
  const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist']}); const ctx=await b.newContext({viewport:{width:960,height:540}});
  const errs=[]; const victim=await ctx.newPage(); victim.on('pageerror',e=>errs.push('VICTIM pageerror: '+e.message));
  const rogue=await ctx.newPage(); await rogue.goto(base); await rogue.waitForTimeout(200);
  await victim.goto(base+'?mode=join-local&code=PEN2&name=Vic'); await victim.waitForTimeout(500);
  const vid=await victim.evaluate(()=>window.Q.me());
  const send=(msgs)=>rogue.evaluate((ms)=>{const bc=new BroadcastChannel('quota-proto-PEN2');for(const m of ms)bc.postMessage(m);bc.close();},msgs);
  const alive=async(label)=>{const n0=await victim.evaluate(()=>performance.now());await victim.waitForTimeout(600);const r=await victim.evaluate(()=>({raf:new Promise(r=>requestAnimationFrame(()=>r(1)))}).raf);console.log(label,'victim rAF alive:',r===1,'| errors so far:',errs.length);};
  const snap=(o)=>Object.assign({t:'s',from:'h',ph:'play',sh:1,lv:1,tl:50,sc:0,q:10,st:0,w:0,sk:0,mu:1,cue:-1,fb:-1,dirs:[],dr:null,pl:[[vid,100,300,-1,'Vic','#fff',0,0,-1,0]],cr:[],res:null},o||{});
  await send([{t:'welcome',from:'h',to:vid,id:vid},snap()]); await victim.waitForTimeout(400); await alive('baseline');
  const cases={
    'pl is not an array':snap({pl:'x'}),'pl rows are junk':snap({pl:[null,5,'a',[],[1]]}),'pl coords NaN/strings':snap({pl:[[vid,'a',{},0,'N','#fff',0,0,-1,0]]}),
    'cr huge array (200k rows)':snap({cr:Array.from({length:200000},(_,i)=>[i,i%900,i%3,0])}),'cr junk':snap({cr:[null,'x',[1],[1,'a','b']]}),
    'colour index out of range':snap({cr:[[1,100,99,0],[2,100,-3,0]],pl:[[vid,100,300,77,'Vic','#fff',0,1,0.5,1]]}),
    'draft with proto keys':snap({ph:'draft',dr:{o:['nope','overtime'],v:JSON.parse('{"__proto__":{"x":1},"constructor":2}'),t:5,d:null}}),
    'draft opts not array':snap({ph:'draft',dr:{o:'abc',v:5,t:'x',d:{}}}),
    'result junk':snap({ph:'result',res:{memos:'x',run:5,rm:{},shift:'a',met:1}}),'ending junk':snap({ph:'ending',res:null}),
    'dirs junk':snap({dirs:[1,{},null,'overtime']}),'huge strings':snap({pl:[[vid,100,300,-1,'A'.repeat(1e6),'#fff',0,0,-1,0]]}),
    'bad colour string':snap({pl:[[vid,100,300,-1,'Vic','url(javascript:alert(1))',0,0,-1,0]]}),
    'memo junk':{t:'memo',from:'h',to:vid,id:1,text:{a:1},lead:'x'},'memo huge text':{t:'memo',from:'h',to:vid,id:2,text:'X'.repeat(5e6),lead:8},
    'intel junk':{t:'intel',from:'h',to:vid,rows:[[9,9],'x',null,[0,1,2]]},'ev junk':{t:'ev',from:'h',k:'good',x:'a',y:{},txt:{},mu:'z',bin:99},
    'ev huge txt':{t:'ev',from:'h',k:'join',x:1,y:1,txt:'Y'.repeat(1e6)},'ev bin out of range':{t:'ev',from:'h',k:'good',x:1,y:1,txt:'+1',mu:1,streak:1,bin:7,pts:1},
    'proto msg':JSON.parse('{"t":"s","from":"h","__proto__":{"polluted":1},"pl":[],"cr":[]}')
  };
  for(const [name,msg] of Object.entries(cases)){ await send([msg]); await victim.waitForTimeout(350); const before=errs.length; await alive('case "'+name+'"'); }
  console.log('polluted Object.prototype?',await victim.evaluate(()=>({}).polluted!==undefined));
  console.log('ALL ERRORS (first 15):',errs.slice(0,15)); await b.close();
})();
