#!/usr/bin/env python3
"""Add maths difficulty levels (Easy/Medium/Hard) and mixed English quiz."""

path = 'public/scg-masterminds.html'

with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

def must_replace(old, new, label):
    global html
    if old not in html:
        raise ValueError(f'ANCHOR NOT FOUND: {label}\n  repr:\n{repr(old[:200])}')
    html = html.replace(old, new, 1)
    print(f'  ✓ {label}')

# ── 1. CSS ──────────────────────────────────────────────────────────────────
must_replace(
    '#scgmm .consent-note{font-size:12px;color:#94a3b8;margin-top:12px;line-height:1.5;}\n\n@media(max-width:600px){',
    '#scgmm .consent-note{font-size:12px;color:#94a3b8;margin-top:12px;line-height:1.5;}\n\n'
    '/* ── difficulty picker ── */\n'
    '#scgmm .diff-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;width:100%;margin-top:8px;}\n'
    '#scgmm .diff-btn{background:#f8fafc;border:2px solid #e2e8f0;border-radius:14px;padding:16px 10px;cursor:pointer;'
    'display:flex;flex-direction:column;align-items:center;gap:6px;'
    'transition:border-color .15s,background .15s,transform .12s;font-family:inherit;}\n'
    '#scgmm .diff-btn:hover{border-color:#1a2870;background:#eff6ff;transform:translateY(-2px);}\n'
    '#scgmm .diff-em{font-size:30px;line-height:1;}\n'
    '#scgmm .diff-label{font-size:15px;font-weight:800;color:#111827;}\n'
    '#scgmm .diff-desc{font-size:12px;color:#6b7280;line-height:1.35;text-align:center;}\n'
    '#scgmm .diff-easy{border-color:#bbf7d0;background:#f0fdf4;}'
    '#scgmm .diff-easy:hover{border-color:#27ae60;background:#dcfce7;}\n'
    '#scgmm .diff-medium{border-color:#fed7aa;background:#fff7ed;}'
    '#scgmm .diff-medium:hover{border-color:#e8781a;background:#ffedd5;}\n'
    '#scgmm .diff-hard{border-color:#fecaca;background:#fef2f2;}'
    '#scgmm .diff-hard:hover{border-color:#b91c1c;background:#fee2e2;}\n'
    '/* ── mixed quiz ── */\n'
    '#scgmm .mix-card{background:linear-gradient(135deg,#f0fdf4 0%,#eff6ff 100%);border:2px dashed #93c5fd;}\n'
    '#scgmm .qquote{background:#f0fdf4;border-left:4px solid #27ae60;border-radius:0 8px 8px 0;'
    'padding:10px 14px;font-size:14px;font-style:italic;color:#374151;margin-bottom:14px;line-height:1.55;}\n'
    '\n@media(max-width:480px){#scgmm .diff-grid{grid-template-columns:1fr;}}\n'
    '@media(max-width:600px){',
    'CSS difficulty + mixed quiz'
)

# ── 2. Mixed English card in goActivities ───────────────────────────────────
must_replace(
    "    var comps=year===1?CY1:(year===2?CY2:CY3);\n"
    "    var grid=document.createElement('div');grid.className='act-grid';\n"
    "    comps.forEach(function(c,i){",
    "    var comps=year===1?CY1:(year===2?CY2:CY3);\n"
    "    var grid=document.createElement('div');grid.className='act-grid';\n"
    "    var _mx=document.createElement('div');_mx.className='ac mix-card';\n"
    "    _mx.style.setProperty('--ac',a);_mx.style.setProperty('--acs',as);\n"
    "    _mx.innerHTML=\n"
    "      '<div class=\"atp\"><span class=\"anum\">\U0001f3b2</span>"
    "<div class=\"atp-r\"><span class=\"atag\">All Stories</span></div></div>'+\n"
    "      '<h4>\U0001f500 Mixed Questions</h4>'+\n"
    "      '<div class=\"apreview\">Questions from all '+comps.length+' stories jumbled at random — great for revision!</div>'+\n"
    "      '<div class=\"aft\"><span>\U0001f4dd 10 questions \xb7 All stories</span>"
    "<span class=\"ago\">Start '+arr()+'</span></div>';\n"
    "    _mx.addEventListener('click',function(){Q.startMixedComp(comps,a,year);});\n"
    "    grid.appendChild(_mx);\n"
    "    comps.forEach(function(c,i){",
    'Mixed quiz card in English grid'
)

# ── 3. startMixedComp + renderMixedIntro + renderMixedQ ─────────────────────
must_replace(
    "  /* ── MATHS ── */\n"
    "  startMaths:function(year,op,ac){",
    "  /* ── MIXED ENGLISH ── */\n"
    "  startMixedComp:function(comps,ac,year){\n"
    "    var pool=[];\n"
    "    comps.forEach(function(c){\n"
    "      c.qs.forEach(function(q){pool.push(Object.assign({},q,{_story:c.title}));});\n"
    "    });\n"
    "    var qs=shuffle(pool).slice(0,10);\n"
    "    this.st={type:'mixed',ac:ac,year:year,comps:comps,\n"
    "      section:'English (Year '+year+')',quizTitle:'Mixed English Quiz, Year '+year,\n"
    "      qs:qs,qi:0,answers:[],correct:0};\n"
    "    this.open(ac,'\U0001f500','Mixed Questions','Year '+year+' \xb7 All stories');\n"
    "    this.renderMixedIntro();\n"
    "  },\n"
    "  renderMixedIntro:function(){\n"
    "    var s=this.st;this.prog(5);\n"
    "    mbody.innerHTML=\n"
    "      '<div class=\"ph-intro\">'+\n"
    "        '<span class=\"ph-em\">\U0001f500</span>'+\n"
    "        '<h2>Mixed English Quiz</h2>'+\n"
    "        '<p class=\"il\">Ten questions drawn from all Year '+s.year+' stories in random order. "
    "A clue from the story is shown with each question.</p>'+\n"
    "        '<div class=\"ph-steps\">'+\n"
    "          '<div class=\"ph-step\"><span class=\"sn\">1</span>Read the clue</div>'+\n"
    "          '<div class=\"ph-step\"><span class=\"sn\">2</span>Answer 10 questions</div>'+\n"
    "          '<div class=\"ph-step\"><span class=\"sn\">3</span>Save your score</div>'+\n"
    "        '</div>'+\n"
    "        '<button class=\"rc play\" id=\"m-mxgo\">Start →</button>'+\n"
    "      '</div>';\n"
    "    var self=this;\n"
    "    $(\"#m-mxgo\").addEventListener('click',function(){self.renderMixedQ();});\n"
    "  },\n"
    "  renderMixedQ:function(){\n"
    "    var s=this.st,q=s.qs[s.qi],total=s.qs.length;\n"
    "    this.prog(14+(s.qi/total)*60);\n"
    "    var excerpt=q.quote?'<div class=\"qquote\">\U0001f4d6 <em>'+q.quote+'</em></div>':'';\n"
    "    mbody.innerHTML=\n"
    "      this.dots(total,s.qi,s.answers)+\n"
    "      this.lscore(s.correct,s.qi)+\n"
    "      '<div class=\"qprog\">Question '+(s.qi+1)+' of '+total+' \xb7 '+q._story+'</div>'+\n"
    "      excerpt+\n"
    "      '<div class=\"qtext\">'+q.q+'</div>'+\n"
    "      '<div class=\"qopts\">'+q.o.map(function(opt,i){\n"
    "        return'<button class=\"qo\" data-i=\"'+i+'\"><span class=\"qk\">'+"
    "String.fromCharCode(65+i)+'</span><span>'+opt+'</span></button>';\n"
    "      }).join('')+'</div>'+\n"
    "      '<div class=\"qfb\" id=\"qfb\"></div>'+\n"
    "      '<button class=\"qnxt\" id=\"qnxt\">'+(s.qi===total-1?'See results →':'Next question →')+'</button>'+\n"
    "      '<div class=\"clr\"></div>'+\n"
    "      '<p class=\"kbd-hint\">Press <kbd>A</kbd> <kbd>B</kbd> <kbd>C</kbd> <kbd>D</kbd> to answer</p>';\n"
    "    var self=this,done=false;\n"
    "    function answer(ch){\n"
    "      if(done)return;done=true;\n"
    "      var ok=(ch===q.c);\n"
    "      s.answers.push({q:'['+q._story+'] '+q.q,chosen:q.o[ch],correct:q.o[q.c],ok:ok});\n"
    "      if(ok)s.correct++;\n"
    "      $$('.qo',mbody).forEach(function(x){"
    "x.classList.add('locked');var xi=+x.dataset.i;"
    "if(xi===q.c)x.classList.add('ok');else if(xi===ch)x.classList.add('ng');});\n"
    "      var fb=$(\"#qfb\");fb.className='qfb show '+(ok?'ok':'ng');\n"
    "      fb.innerHTML=ok\n"
    "        ?'<div class=\"qfb-main\">✅ Correct! Well done.</div>'\n"
    "        :'<div class=\"qfb-main\">❌ Not quite — the answer was <b>'+q.o[q.c]+'</b></div>'\n"
    "         +(q.e?'<div class=\"qfb-explain\">'+q.e+'</div>':'')\n"
    "         +(q.quote?'<div class=\"qfb-quote\">“'+q.quote+'”</div>':'');\n"
    "      $(\"#qnxt\").classList.add('show');\n"
    "    }\n"
    "    $$('.qo',mbody).forEach(function(b){"
    "b.addEventListener('click',function(){answer(+b.dataset.i);});});\n"
    "    self._answerFn=answer;\n"
    "    $(\"#qnxt\").addEventListener('click',function(){\n"
    "      if(!done)return;s.qi++;\n"
    "      if(s.qi<total)self.renderMixedQ();else self.renderForm();\n"
    "    });\n"
    "  },\n\n"
    "  /* ── MATHS ── */\n"
    "  startMaths:function(year,op,ac){",
    'startMixedComp + renderMixedQ'
)

# ── 4. startMaths → difficulty picker (use exact bytes from file) ─────────
# The exact text from grep -P is:
#   startMaths:function(year,op,ac){
#     this.st={type:'maths',ac:ac,year:year,op:op,
#       section:'Maths (Year '+year+')',quizTitle:op.n+', Year '+year,
#       qs:this.genMaths(year,op.k),qi:0,answers:[],correct:0};
#     this.open(ac,op.s,op.n+' · Year '+year,'10 quick-fire questions');
#     this.renderMathsIntro();
#   },
# Note: · = U+00B7

STARTMATHS_OLD = (
    "  startMaths:function(year,op,ac){\n"
    "    this.st={type:'maths',ac:ac,year:year,op:op,\n"
    "      section:'Maths (Year '+year+')',quizTitle:op.n+', Year '+year + ",
)
# That last ' + ' is: the Python string ends with `year` then the next part starts
# Actually let me just build it from a raw repr:
# Raw content = "  startMaths..." ending at "},"

import re
m = re.search(
    r"  startMaths:function\(year,op,ac\)\{.*?  \},",
    html,
    re.DOTALL
)
if not m:
    raise ValueError('Cannot find startMaths function in html')

old_startmaths = m.group(0)
print(f'  Found startMaths: {len(old_startmaths)} chars')
print(f'  Preview: {repr(old_startmaths[:80])}')

new_startmaths = (
    "  startMaths:function(year,op,ac){\n"
    "    this.st={type:'maths',ac:ac,year:year,op:op,\n"
    "      section:'Maths (Year '+year+')',quizTitle:op.n+', Year '+year+",
    # we need to stop here - but the issue is the object has more props
    # Let me just do a direct replace
)

# Better: replace the entire function using the match
new_startmaths_text = (
    "  startMaths:function(year,op,ac){\n"
    "    this.st={type:'maths',ac:ac,year:year,op:op,\n"
    "      section:'Maths (Year '+year+')',quizTitle:op.n+', Year '+year+',\n"
    "      qs:[],qi:0,answers:[],correct:0};\n"
    "    this.open(ac,op.s,op.n+' · Year '+year,'Choose difficulty');\n"
    "    this.renderDifficultyPick();\n"
    "  },\n"
    "  renderDifficultyPick:function(){\n"
    "    var s=this.st,self=this,yr=s.year;\n"
    "    this.prog(3);\n"
    "    var diffs=[\n"
    "      {k:'easy',cls:'diff-easy',em:'\U0001f7e2',label:'Easy',\n"
    "       desc:yr===1?'Smaller numbers — great warm-up':"
    "(yr===2?'Numbers within 20, simple facts':'2-digit sums, basic tables')},\n"
    "      {k:'medium',cls:'diff-medium',em:'\U0001f7e1',label:'Medium',\n"
    "       desc:yr===1?'Standard level — number bonds & more':"
    "(yr===2?'Up to 50, 2× 5× 10× tables':'Up to 300, all times tables')},\n"
    "      {k:'hard',cls:'diff-hard',em:'\U0001f534',label:'Hard',\n"
    "       desc:yr===1?'Challenge mode — push yourself!':"
    "(yr===2?'Up to 100, 3× and 4× tables':'Big numbers, 2-digit × 1-digit')}\n"
    "    ];\n"
    "    mbody.innerHTML=\n"
    "      '<div class=\"ph-intro\">'+\n"
    "        '<span class=\"ph-em\">'+s.op.s+'</span>'+\n"
    "        '<h2>'+s.op.n+'</h2>'+\n"
    "        '<p class=\"il\" style=\"margin-bottom:16px\">How challenging do you want it?</p>'+\n"
    "        '<div class=\"diff-grid\">'+\n"
    "        diffs.map(function(d){\n"
    "          return'<button class=\"diff-btn '+d.cls+'\" data-k=\"'+d.k+'\">'+\n"
    "            '<span class=\"diff-em\">'+d.em+'</span>'+\n"
    "            '<span class=\"diff-label\">'+d.label+'</span>'+\n"
    "            '<span class=\"diff-desc\">'+d.desc+'</span>'+\n"
    "          '</button>';\n"
    "        }).join('')+\n"
    "        '</div>'+\n"
    "      '</div>';\n"
    "    $$('.diff-btn',mbody).forEach(function(btn){\n"
    "      btn.addEventListener('click',function(){\n"
    "        var diff=btn.dataset.k;\n"
    "        s.diff=diff;\n"
    "        s.qs=self.genMaths(yr,s.op.k,diff);\n"
    "        s.quizTitle=s.op.n+' ('+diff.charAt(0).toUpperCase()+diff.slice(1)+'), Year '+yr;\n"
    "        self.renderMathsIntro();\n"
    "      });\n"
    "    });\n"
    "  },"
)

html = html.replace(old_startmaths, new_startmaths_text, 1)
print(f'  ✓ startMaths + renderDifficultyPick')

# ── 5. genMaths: add diff parameter ─────────────────────────────────────────
m2 = re.search(
    r"  genMaths:function\(yr,k\)\{.*?  \},",
    html,
    re.DOTALL
)
if not m2:
    raise ValueError('Cannot find genMaths function')

old_genmaths = m2.group(0)
print(f'  Found genMaths: {len(old_genmaths)} chars')

new_genmaths = (
    "  genMaths:function(yr,k,diff){\n"
    "    diff=diff||'medium';\n"
    "    function ri(a,b){return Math.floor(Math.random()*(b-a+1))+a;}\n"
    "    var qs=[],seen={};\n"
    "    while(qs.length<10){\n"
    "      var a,b,ans,txt,e;\n"
    "      if(k==='nb10'){\n"
    "        a=ri(0,9);b=10-a;ans=b;txt=a+' + __ = 10';\n"
    "        e='The missing number is '+b+' because '+a+' + '+b+' = 10';\n"
    "      }\n"
    "      else if(k==='nb20'){\n"
    "        if(diff==='easy'){a=ri(0,10);}else if(diff==='medium'){a=ri(0,15);}else{a=ri(0,19);}\n"
    "        b=20-a;ans=b;txt=a+' + __ = 20';\n"
    "        e='The missing number is '+b+' because '+a+' + '+b+' = 20';\n"
    "      }\n"
    "      else if(k==='10more'){\n"
    "        if(diff==='easy'){a=ri(1,29);}else if(diff==='medium'){a=ri(1,59);}else{a=ri(1,89);}\n"
    "        ans=a+10;txt='10 more than '+a;\n"
    "        e='10 more than '+a+' is '+(a+10)+' because '+a+' + 10 = '+(a+10);\n"
    "      }\n"
    "      else if(k==='10less'){\n"
    "        if(diff==='easy'){a=ri(10,39);}else if(diff==='medium'){a=ri(10,69);}else{a=ri(10,99);}\n"
    "        ans=a-10;txt='10 less than '+a;\n"
    "        e='10 less than '+a+' is '+(a-10)+' because '+a+' − 10 = '+(a-10);\n"
    "      }\n"
    "      else if(k==='add'){\n"
    "        if(yr===2){\n"
    "          if(diff==='easy'){a=ri(1,10);b=ri(1,10);}\n"
    "          else if(diff==='medium'){a=ri(5,40);b=ri(2,40);}\n"
    "          else{a=ri(20,80);b=ri(10,100-a);}\n"
    "        }else{\n"
    "          if(diff==='easy'){a=ri(10,60);b=ri(5,40);}\n"
    "          else if(diff==='medium'){a=ri(30,200);b=ri(15,150);}\n"
    "          else{a=ri(100,500);b=ri(50,300);}\n"
    "        }\n"
    "        ans=a+b;txt=a+' + '+b;\n"
    "        e='Add tens: '+(Math.floor(a/10)*10)+' + '+(Math.floor(b/10)*10)+' = '"
    "+(Math.floor(a/10)*10+Math.floor(b/10)*10)+'. Units: '+(a%10)+' + '+(b%10)+' = '"
    "+(a%10+b%10)+'. Total: '+ans;\n"
    "      }\n"
    "      else if(k==='sub'){\n"
    "        if(yr===2){\n"
    "          if(diff==='easy'){a=ri(5,15);b=ri(1,Math.min(a-1,5));}\n"
    "          else if(diff==='medium'){a=ri(10,40);b=ri(1,a-1);}\n"
    "          else{a=ri(20,99);b=ri(5,a-1);}\n"
    "        }else{\n"
    "          if(diff==='easy'){a=ri(20,80);b=ri(5,Math.min(a-1,40));}\n"
    "          else if(diff==='medium'){a=ri(50,300);b=ri(10,a-1);}\n"
    "          else{a=ri(200,700);b=ri(50,a-1);}\n"
    "        }\n"
    "        ans=a-b;txt=a+' − '+b;\n"
    "        e='Count up from '+b+' to '+a+', or: '+a+' − '+b+' = '+ans;\n"
    "      }\n"
    "      else if(k==='mul'){\n"
    "        if(yr===2){\n"
    "          if(diff==='easy'){a=[2,10][ri(0,1)];b=ri(1,5);}\n"
    "          else if(diff==='medium'){a=[2,5,10][ri(0,2)];b=ri(1,10);}\n"
    "          else{a=[3,4,2,5][ri(0,3)];b=ri(1,10);}\n"
    "        }else{\n"
    "          if(diff==='easy'){a=[2,3,4,5][ri(0,3)];b=ri(1,10);}\n"
    "          else if(diff==='medium'){a=ri(2,10);b=ri(2,10);}\n"
    "          else{a=ri(11,19);b=ri(2,9);}\n"
    "        }\n"
    "        ans=a*b;txt=a+' × '+b;\n"
    "        e=a+' × '+b+' = '+ans+'. Think: '+a+' groups of '+b+'.';\n"
    "      }\n"
    "      else{\n"
    "        if(yr===2){\n"
    "          if(diff==='easy'){b=[2,10][ri(0,1)];ans=ri(1,5);}\n"
    "          else if(diff==='medium'){b=[2,5,10][ri(0,2)];ans=ri(1,10);}\n"
    "          else{b=[3,4][ri(0,1)];ans=ri(1,10);}\n"
    "        }else{\n"
    "          if(diff==='easy'){b=ri(2,5);ans=ri(1,10);}\n"
    "          else if(diff==='medium'){b=ri(2,12);ans=ri(2,12);}\n"
    "          else{b=ri(6,12);ans=ri(5,12);}\n"
    "        }\n"
    "        a=b*ans;txt=a+' ÷ '+b;\n"
    "        e='How many '+b+'s make '+a+'? '+b+' × '+ans+' = '+a+', so '+a+' ÷ '+b+' = '+ans;\n"
    "      }\n"
    "      if(seen[txt])continue;seen[txt]=1;\n"
    "      var qobj={txt:txt,ans:ans};\n"
    "      if(e)qobj.e=e;\n"
    "      if(k==='nb10'||k==='nb20')qobj.noEq=true;\n"
    "      qs.push(qobj);\n"
    "    }\n"
    "    return qs;\n"
    "  },"
)

html = html.replace(old_genmaths, new_genmaths, 1)
print(f'  ✓ genMaths with difficulty levels')

# ── 6. Replay: handle mixed type ─────────────────────────────────────────────
must_replace(
    "      if(s.type==='comp')self.startComp(s.data,s.ac,s.year);\n"
    "      else if(s.type==='maths')self.startMaths(s.year,s.op,s.ac);\n"
    "      else self.startFsce();",
    "      if(s.type==='comp')self.startComp(s.data,s.ac,s.year);\n"
    "      else if(s.type==='maths')self.startMaths(s.year,s.op,s.ac);\n"
    "      else if(s.type==='mixed')self.startMixedComp(s.comps,s.ac,s.year);\n"
    "      else self.startFsce();",
    'mixed replay in results'
)

# ── Write out ─────────────────────────────────────────────────────────────────
with open(path, 'w', encoding='utf-8') as f:
    f.write(html)

print('\nAll patches applied. Checking JS syntax...')
import subprocess
r = subprocess.run(['node', '--check', path], capture_output=True, text=True)
if r.returncode == 0:
    print('  JS syntax OK')
else:
    print('  JS ERROR:', r.stderr[:300])
