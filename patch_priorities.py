#!/usr/bin/env python3
"""All 8 priority fixes for scg-masterminds.html"""
import re, sys, subprocess

path = 'public/scg-masterminds.html'
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

def sr(old, new, label):
    global html
    if old not in html:
        raise ValueError(f'ANCHOR NOT FOUND: {label}\n  {repr(old[:120])}')
    html = html.replace(old, new, 1)
    print(f'  ✓ {label}')

def re_sr(pattern, new, label, flags=re.DOTALL):
    global html
    m = re.search(pattern, html, flags)
    if not m:
        raise ValueError(f'PATTERN NOT FOUND: {label}\n  {repr(pattern[:80])}')
    html = html[:m.start()] + new + html[m.end():]
    print(f'  ✓ {label}')

# ─────────────────────────────────────────────────────────────────────────────
# FIX 2  .phs-tile 52→68px
# ─────────────────────────────────────────────────────────────────────────────
sr(
    '  width:52px;height:52px;border-radius:10px;border:2px solid #cbd5e1;\n'
    '  background:#fff;font-size:22px;font-weight:700;cursor:pointer;\n'
    '  transition:transform .12s,background .12s,opacity .12s;\n'
    '}',
    '  width:68px;height:68px;border-radius:12px;border:2px solid #cbd5e1;\n'
    '  background:#fff;font-size:26px;font-weight:700;cursor:pointer;\n'
    '  transition:transform .12s,background .12s,opacity .12s;\n'
    '}',
    'phs-tile 52→68px'
)

# ─────────────────────────────────────────────────────────────────────────────
# FIX 1  renderMathsQ — text input → 4 tap buttons
# ─────────────────────────────────────────────────────────────────────────────
re_sr(
    r'  renderMathsQ:function\(\)\{.*?\},\n\n  /\* ── FSCE',
    '''\
  renderMathsQ:function(){
    var s=this.st,q=s.qs[s.qi],total=s.qs.length;
    this.prog(14+(s.qi/total)*60);
    function mkOpts(ans){
      var pool=[ans],d=1;
      while(pool.length<4){
        var hi=ans+d,lo=ans-d;
        if(pool.indexOf(hi)===-1&&hi>=0)pool.push(hi);
        if(pool.length<4&&pool.indexOf(lo)===-1&&lo>=0)pool.push(lo);
        d++;
      }
      return shuffle(pool);
    }
    var opts=mkOpts(q.ans);
    mbody.innerHTML=
      this.dots(total,s.qi,s.answers)+
      this.lscore(s.correct,s.qi)+
      '<div class="qprog">Question '+(s.qi+1)+' of '+total+'</div>'+
      '<div class="msum nosel">'+q.txt+(q.noEq?'':' = ?')+'</div>'+
      '<div class="qopts">'+opts.map(function(o){
        return'<button class="qo mopt" data-v="'+o+'"><span>'+o+'</span></button>';
      }).join('')+'</div>'+
      '<div class="qfb" id="qfb"></div>'+
      '<button class="qnxt" id="qnxt">'+(s.qi===total-1?'See results →':'Next →')+'</button>'+
      '<div class="clr"></div>'+
      '<p class="kbd-hint">Press <kbd>A</kbd> <kbd>B</kbd> <kbd>C</kbd> <kbd>D</kbd> to answer</p>';
    var self=this,done=false;
    function answer(ch){
      if(done)return;done=true;
      var val=parseInt(opts[ch],10),ok=(val===q.ans);
      s.answers.push({q:q.txt,chosen:String(val),correct:String(q.ans),ok:ok});
      if(ok)s.correct++;
      $$('.mopt',mbody).forEach(function(b,j){
        b.classList.add('locked');
        if(parseInt(b.dataset.v,10)===q.ans)b.classList.add('ok');
        else if(j===ch)b.classList.add('ng');
      });
      var fb=$("#qfb");fb.className='qfb show '+(ok?'ok':'ng');
      fb.innerHTML=ok
        ?'<div class="qfb-main">✅ Correct!</div>'
        :'<div class="qfb-main">❌ The answer is <b>'+q.ans+'</b></div>'
         +(q.e?'<div class="qfb-explain">'+q.e+'</div>':'');
      $("#qnxt").classList.add('show');
    }
    $$('.mopt',mbody).forEach(function(b,i){
      b.addEventListener('click',function(){answer(i);});
    });
    self._answerFn=answer;
    $("#qnxt").addEventListener('click',function(){
      s.qi++;if(s.qi<total)self.renderMathsQ();else self.renderForm();
    });
  },

  /* ── FSCE''',
    'renderMathsQ → tap buttons'
)

# ─────────────────────────────────────────────────────────────────────────────
# FIX 5  genMaths — Easy ranges + Hard = reverse questions
# ─────────────────────────────────────────────────────────────────────────────
re_sr(
    r'  genMaths:function\(yr,k,diff\)\{.*?\},\n  renderMathsIntro',
    '''\
  genMaths:function(yr,k,diff){
    diff=diff||'medium';
    function ri(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
    var qs=[],seen={};
    while(qs.length<10){
      var a,b,ans,txt,e,noEq=false;
      if(k==='nb10'){
        if(diff==='easy'){a=ri(6,9);}else{a=ri(0,9);}
        b=10-a;ans=b;txt=a+' + __ = 10';
        e='The missing number is '+b+' because '+a+' + '+b+' = 10';noEq=true;
      }
      else if(k==='nb20'){
        if(diff==='easy'){a=ri(10,15);}else if(diff==='medium'){a=ri(0,15);}else{a=ri(0,19);}
        b=20-a;ans=b;txt=a+' + __ = 20';
        e='The missing number is '+b+' because '+a+' + '+b+' = 20';noEq=true;
      }
      else if(k==='10more'){
        if(diff==='easy'){a=ri(1,29);}else if(diff==='medium'){a=ri(1,59);}else{a=ri(1,89);}
        ans=a+10;txt='10 more than '+a;
        e='10 more than '+a+' is '+(a+10)+' because '+a+' + 10 = '+(a+10);
      }
      else if(k==='10less'){
        if(diff==='easy'){a=ri(10,39);}else if(diff==='medium'){a=ri(10,69);}else{a=ri(10,99);}
        ans=a-10;txt='10 less than '+a;
        e='10 less than '+a+' is '+(a-10)+' because '+a+' − 10 = '+(a-10);
      }
      else if(k==='add'){
        if(diff==='hard'){
          if(yr===2){b=ri(5,20);ans=ri(5,20);}else{b=ri(20,80);ans=ri(20,80);}
          txt='? + '+b+' = '+(ans+b);
          e=(ans+b)+' − '+b+' = '+ans+'. The missing number is '+ans;noEq=true;
        }else{
          if(yr===2){if(diff==='easy'){a=ri(1,10);b=ri(1,10);}else{a=ri(5,40);b=ri(2,40);}}
          else{if(diff==='easy'){a=ri(10,60);b=ri(5,40);}else{a=ri(30,200);b=ri(15,150);}}
          ans=a+b;txt=a+' + '+b;
          var te=Math.floor(a/10)*10,be=Math.floor(b/10)*10;
          e='Tens: '+te+' + '+be+' = '+(te+be)+'. Units: '+(a%10)+' + '+(b%10)+' = '+(a%10+b%10)+'. Total: '+ans;
        }
      }
      else if(k==='sub'){
        if(diff==='hard'){
          if(yr===2){ans=ri(3,15);var res=ri(3,20);}else{ans=ri(10,50);var res=ri(10,100);}
          txt=(res+ans)+' − ? = '+res;
          e=(res+ans)+' − '+ans+' = '+res+'. Think: '+res+' + '+ans+' = '+(res+ans);noEq=true;
        }else{
          if(yr===2){if(diff==='easy'){a=ri(5,15);b=ri(1,Math.min(a-1,5));}else{a=ri(10,40);b=ri(1,a-1);}}
          else{if(diff==='easy'){a=ri(20,80);b=ri(5,Math.min(a-1,40));}else{a=ri(50,300);b=ri(10,a-1);}}
          ans=a-b;txt=a+' − '+b;
          e='Count up from '+b+' to '+a+'. Answer: '+ans;
        }
      }
      else if(k==='mul'){
        if(diff==='hard'){
          if(yr===2){b=[2,5,10][ri(0,2)];ans=ri(2,10);}else{b=ri(2,10);ans=ri(2,10);}
          txt='? × '+b+' = '+(ans*b);
          e=(ans*b)+' ÷ '+b+' = '+ans+'. Which number times '+b+' makes '+(ans*b)+'?';noEq=true;
        }else{
          if(yr===2){if(diff==='easy'){a=[2,10][ri(0,1)];b=ri(1,5);}else{a=[2,5,10][ri(0,2)];b=ri(1,10);}}
          else{if(diff==='easy'){a=[2,3,4,5][ri(0,3)];b=ri(1,10);}else{a=ri(2,10);b=ri(2,10);}}
          ans=a*b;txt=a+' × '+b;
          e=a+' × '+b+' = '+ans+'. Think: '+a+' groups of '+b+'.';
        }
      }
      else{
        if(diff==='hard'){
          if(yr===2){ans=[2,5,10][ri(0,2)];var qt=ri(2,10);}else{ans=ri(2,10);var qt=ri(2,10);}
          txt=(ans*qt)+' ÷ ? = '+qt;
          e=(ans*qt)+' ÷ '+ans+' = '+qt+'. Think: '+qt+' × '+ans+' = '+(ans*qt);noEq=true;
        }else{
          if(yr===2){if(diff==='easy'){b=[2,10][ri(0,1)];ans=ri(1,5);}else{b=[2,5,10][ri(0,2)];ans=ri(1,10);}}
          else{if(diff==='easy'){b=ri(2,5);ans=ri(1,10);}else{b=ri(2,12);ans=ri(2,12);}}
          a=b*ans;txt=a+' ÷ '+b;
          e='How many '+b+'s make '+a+'? '+b+' × '+ans+' = '+a;
        }
      }
      if(seen[txt])continue;seen[txt]=1;
      var qobj={txt:txt,ans:ans};if(e)qobj.e=e;if(noEq)qobj.noEq=true;
      qs.push(qobj);
    }
    return qs;
  },
  renderMathsIntro''',
    'genMaths easy ranges + Hard reverse'
)

# ─────────────────────────────────────────────────────────────────────────────
# FIX 3  Phase unlock localStorage key + Unlocks object
# ─────────────────────────────────────────────────────────────────────────────
sr(
    "var SK='scgMM2_results', PK='scgMM2_parent', BK='scgMM2_bests', CK='scgMM2_consent';",
    "var SK='scgMM2_results', PK='scgMM2_parent', BK='scgMM2_bests', CK='scgMM2_consent', UK='scgMM2_phonics_unlocks';",
    'add UK key'
)

# Insert Unlocks object just before function toCSV
sr(
    '  clear:function(){try{localStorage.removeItem(SK);}catch(e){} Admin.refresh();}\n};\nfunction toCSV(rows){',
    '  clear:function(){try{localStorage.removeItem(SK);}catch(e){} Admin.refresh();}\n};\n\n'
    '/* ═══ PHONICS UNLOCK STATE ══════════════════════════════════════════════ */\n'
    'var Unlocks={\n'
    '  get:function(){try{return JSON.parse(localStorage.getItem(UK)||\'[1]\');}catch(e){return[1];}},\n'
    '  isUnlocked:function(id){return this.get().indexOf(id)!==-1;},\n'
    '  unlock:function(id){var u=this.get();if(u.indexOf(id)===-1){u.push(id);localStorage.setItem(UK,JSON.stringify(u));}},\n'
    '  checkAndUnlock:function(s){\n'
    '    if(!s.phase)return null;\n'
    '    var ph=s.phase,nextId=ph.id+1;\n'
    '    if(nextId>PHONICS.length||this.isUnlocked(nextId))return null;\n'
    '    var bests=Store.bests(),keys=[];\n'
    '    if(ph.sw&&ph.sw.length>0)keys.push(ph.name+\' Sight Words\');\n'
    '    keys.push(ph.name+\' \xb7 Hear & Choose\');\n'
    '    keys.push(ph.name+\' \xb7 Hear & Spell\');\n'
    '    var avg=keys.reduce(function(acc,k){return acc+(bests[k]||0);},0)/keys.length;\n'
    '    if(avg>=70){this.unlock(nextId);return PHONICS[nextId-1];}\n'
    '    return null;\n'
    '  }\n'
    '};\n\n'
    'function toCSV(rows){',
    'add Unlocks object'
)

# ─────────────────────────────────────────────────────────────────────────────
# FIX 3  goPhonicsPhases — show lock icons, prevent navigation
# ─────────────────────────────────────────────────────────────────────────────
re_sr(
    r'function goPhonicsPhases\(\)\{.*?showScr\(\'s-sub\',\'fwd\'\);\n\}',
    '''\
function goPhonicsPhases(){
  var bc=$("#bc-sub",root);bc.innerHTML='';
  bc.appendChild(bcBtn('Masterminds',goHome));bc.appendChild(sep());bc.appendChild(bcSpan('Reception \xb7 Phonics'));
  var t=$("#sub-title",root);
  t.innerHTML='<div class="ey">Reception \xb7 Phonics</div><h2>Choose a Phase</h2>'
    +'<p>Each phase builds on the last. Finish all 3 games with 70%+ to unlock the next phase.</p>';
  var sg=$("#sub-grid",root);sg.innerHTML='';
  var pcols=['#7c3aed','#2563eb','#059669','#d97706','#dc2626'];
  PHONICS.forEach(function(ph,i){
    var col=pcols[i];
    var locked=!Unlocks.isUnlocked(ph.id);
    var c=document.createElement('div');
    c.className='subc'+(locked?' ph-locked':'');
    c.style.setProperty('--ac',locked?'#94a3b8':col);
    if(locked){
      c.innerHTML=
        '<div class="sico" style="background:#f1f5f9">\U0001f512</div>'+
        '<h3 style="color:#94a3b8">'+ph.name+'</h3>'+
        '<p style="color:#cbd5e1;font-size:13px">Complete '+PHONICS[i-1].name+' with 70%+ to unlock.</p>'+
        '<div class="sft"><span class="scnt" style="opacity:.4">\U0001f512 Locked</span></div>';
    }else{
      c.innerHTML=
        '<div class="sico" style="background:#f5f3ff">'+ph.emoji+'</div>'+
        '<h3>'+ph.name+'</h3><p>'+ph.desc+'</p>'+
        '<div class="sft">'+
          '<span class="scnt">'+(ph.sw.length?ph.sw.length+' sight words':'Listening focus')+'</span>'+
          '<span class="sgo">Choose →</span>'+
        '</div>';
      (function(phase,c2){
        c.addEventListener('click',function(){
          navStack.push(goPhonicsPhases);
          goPhonicsGames(phase,c2);
        });
      })(ph,col);
    }
    sg.appendChild(c);
  });
  showScr('s-sub','fwd');
}''',
    'goPhonicsPhases with lock gates'
)

# ─────────────────────────────────────────────────────────────────────────────
# FIX 4  renderDone — add stars + unlock banner (CSS first, then JS)
# ─────────────────────────────────────────────────────────────────────────────
sr(
    '#scgmm .mix-card{background:linear-gradient(135deg,#f0fdf4 0%,#eff6ff 100%);border:2px dashed #93c5fd;}',
    '#scgmm .mix-card{background:linear-gradient(135deg,#f0fdf4 0%,#eff6ff 100%);border:2px dashed #93c5fd;}\n'
    '#scgmm .star-row{font-size:30px;letter-spacing:4px;margin:10px 0 4px;text-align:center;}\n'
    '#scgmm .unlock-banner{background:#fef9c3;border:2px solid #fde047;border-radius:12px;'
    'padding:10px 18px;font-size:15px;font-weight:700;color:#854d0e;margin:12px 0;text-align:center;'
    'animation:unlockPop .45s cubic-bezier(.17,.67,.41,1.4);}\n'
    '@keyframes unlockPop{0%{transform:scale(.6);opacity:0}100%{transform:scale(1);opacity:1}}\n'
    '#scgmm .ph-locked{opacity:.7;cursor:default;}\n'
    '#scgmm .ph-say-btn{display:block;margin:12px auto 0;background:transparent;'
    'border:2px solid #e2e8f0;border-radius:999px;padding:8px 18px;'
    'font-size:13px;color:#64748b;cursor:pointer;font-family:inherit;}\n',
    'stars + unlock-banner + ph-locked CSS'
)

re_sr(
    r'  renderDone:function\(par\)\{.*?\},\n  confetti',
    '''\
  renderDone:function(par){
    var s=this.st,tot=this.total(),pct=Math.round((s.correct/tot)*100);
    this.prog(100);
    var col=this.scoreColor(pct);
    var C=2*Math.PI*46;
    var offset=C*(1-pct/100);
    var stars=pct>=80?'⭐⭐⭐':pct>=60?'⭐⭐':'⭐';
    var msg=pct>=80?'Brilliant work, '+par.childName+'! Shining star ⭐':
            pct>=60?'Great effort, '+par.childName+'! A little more practice and you\'ll ace it \U0001f4aa':
            'Good try, '+par.childName+'! Every attempt helps you improve \U0001f4da';
    var newPhase=Unlocks.checkAndUnlock(s);
    var unlockBanner=newPhase
      ?'<div class="unlock-banner">\U0001f513 '+newPhase.name+' unlocked! \U0001f389</div>':'';
    var rev=s.answers.map(function(a,i){
      return'<div class="ri">'+
        '<span class="ric '+(a.ok?'ok':'ng')+'">'+(a.ok?'✓':'✗')+'</span>'+
        '<div><div class="riq">'+(i+1)+'. '+a.q+'</div>'+
        '<div class="ria">Answered: '+a.chosen+(a.ok?'':' \xb7 Correct: <b>'+a.correct+'</b>')+'</div></div>'+
      '</div>';
    }).join('');
    mbody.innerHTML=
      '<div class="ph-done">'+
        (pct>=80?'<div class="cconf" id="cconf"></div>':'')+
        '<div class="ring-wrap">'+
          '<svg width="130" height="130" viewBox="0 0 104 104">'+
            '<circle cx="52" cy="52" r="46" fill="none" stroke="#e4e8f5" stroke-width="7"/>'+
            '<circle id="ring-arc" cx="52" cy="52" r="46" fill="none" stroke="'+col+'" stroke-width="7"'+
              ' stroke-linecap="round" stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+C.toFixed(1)+'"'+
              ' transform="rotate(-90 52 52)" style="transition:stroke-dashoffset 1s cubic-bezier(.25,.8,.3,1)"/>'+
          '</svg>'+
          '<div class="ring-inner"><span class="ring-pct" style="color:'+col+'">'+pct+'%</span>'+
            '<span class="ring-sub">'+s.correct+' / '+tot+'</span></div>'+
        '</div>'+
        '<div class="star-row">'+stars+'</div>'+
        unlockBanner+
        '<h2>Results saved!</h2>'+
        '<p class="dmsg">'+msg+'</p>'+
        '<p style="font-size:13px;color:var(--muted);margin-bottom:4px">\U0001f4e9 Recorded for <b>'+par.parentEmail+'</b></p>'+
        '<div class="review">'+rev+'</div>'+
        '<div class="dacts">'+
          '<button class="d-again" id="d-again">Try again</button>'+
          '<button class="d-menu" id="d-menu">Back to menu</button>'+
        '</div>'+
      '</div>';
    setTimeout(function(){
      var arc=$("#ring-arc");if(arc)arc.style.strokeDashoffset=offset.toFixed(1);
    },120);
    var self=this;
    $("#d-again").addEventListener('click',function(){
      if(s.type==='comp')self.startComp(s.data,s.ac,s.year);
      else if(s.type==='maths')self.startMaths(s.year,s.op,s.ac);
      else if(s.type==='mixed')self.startMixedComp(s.comps,s.ac,s.year);
      else self.startFsce();
    });
    $("#d-menu").addEventListener('click',function(){self.close();});
    if(pct>=80)this.confetti();
    if(newPhase)setTimeout(function(){if(!modal.classList.contains('on'))goPhonicsPhases();},200);
  },
  confetti''',
    'renderDone with stars + unlock banner'
)

# ─────────────────────────────────────────────────────────────────────────────
# FIX 6  Audio instructions — renderPhChooseIntro + renderPhSpellIntro
# ─────────────────────────────────────────────────────────────────────────────
re_sr(
    r'  renderPhChooseIntro:function\(\)\{.*?\},\n  renderPhChooseQ',
    '''\
  renderPhChooseIntro:function(){
    var s=this.st;this.prog(5);
    var inst='Listen carefully! You will hear a word. Tap the correct spelling.';
    mbody.innerHTML=
      '<div class="ph-intro">'+
      '<span class="ph-em">\U0001f442</span>'+
      '<h2>Hear &amp; Choose</h2>'+
      '<p class="il">Listen to each word, then tap the right spelling. '+s.qs.length+' questions.</p>'+
      '<button class="rc play" id="phc-go">Start →</button>'+
      '<button class="ph-say-btn" id="phc-ri">\U0001f50a Hear instructions again</button>'+
      '</div>';
    var self=this;
    document.getElementById('phc-go').addEventListener('click',function(){self.renderPhChooseQ();});
    document.getElementById('phc-ri').addEventListener('click',function(){Sp.speak([inst],null,null);});
    setTimeout(function(){Sp.speak([inst],null,null);},400);
  },
  renderPhChooseQ''',
    'renderPhChooseIntro audio'
)

re_sr(
    r'  renderPhSpellIntro:function\(\)\{.*?\},\n  renderPhSpellQ',
    '''\
  renderPhSpellIntro:function(){
    var s=this.st;this.prog(5);
    var inst='Listen to each word, then tap the letters in the right order to spell it.';
    mbody.innerHTML=
      '<div class="ph-intro">'+
      '<span class="ph-em">✏️</span>'+
      '<h2>Hear &amp; Spell</h2>'+
      '<p class="il">Listen to the word, then tap the letters in order to spell it. 8 words.</p>'+
      '<button class="rc play" id="phs-go">Start →</button>'+
      '<button class="ph-say-btn" id="phs-ri">\U0001f50a Hear instructions again</button>'+
      '</div>';
    var self=this;
    document.getElementById('phs-go').addEventListener('click',function(){self.renderPhSpellQ();});
    document.getElementById('phs-ri').addEventListener('click',function(){Sp.speak([inst],null,null);});
    setTimeout(function(){Sp.speak([inst],null,null);},400);
  },
  renderPhSpellQ''',
    'renderPhSpellIntro audio'
)

# ─────────────────────────────────────────────────────────────────────────────
# FIX 7  Hero stats
# ─────────────────────────────────────────────────────────────────────────────
sr(
    '      <div class="h-stat"><b>10</b><span>Comprehensions</span></div>\n'
    '      <div class="h-stat"><b>8</b><span>Maths rounds</span></div>\n'
    '      <div class="h-stat"><b>11+</b><span>FSCE style</span></div>\n'
    '      <div class="h-stat"><b>Free</b><span>Always</span></div>',
    '      <div class="h-stat"><b>15</b><span>Comprehensions</span></div>\n'
    '      <div class="h-stat"><b>Phonics</b><span>Phases 1–5</span></div>\n'
    '      <div class="h-stat"><b>12</b><span>Maths topics</span></div>\n'
    '      <div class="h-stat"><b>Free</b><span>Always</span></div>',
    'hero stats'
)

# ─────────────────────────────────────────────────────────────────────────────
# FIX 8  FAQ year groups
# ─────────────────────────────────────────────────────────────────────────────
sr(
    '"Right now there are 5 comprehensions and 4 maths skills for Year 2, and the same for Year 3. A Year 6 SATs section and full 11+ FSCE programme are coming soon."',
    '"Reception (Phonics Phases 1–5 with 3 games each), Year 1 (5 comprehensions + 4 maths topics), Year 2 (5 comprehensions + 4 maths topics) and Year 3 (5 comprehensions + 4 maths topics). A Year 6 SATs section and full 11+ FSCE programme are coming soon."',
    'FAQ year groups'
)

# ─────────────────────────────────────────────────────────────────────────────
# Write + syntax check
# ─────────────────────────────────────────────────────────────────────────────
with open(path, 'w', encoding='utf-8') as f:
    f.write(html)
print('\nFile written. Checking JS syntax...')

m = re.search(r'<script>(.*?)</script>', html, re.DOTALL)
with open('/tmp/test_scg.js', 'w', encoding='utf-8') as f:
    f.write('(function(){\n' + m.group(1) + '\n})();')
r = subprocess.run(['node', '--check', '/tmp/test_scg.js'], capture_output=True, text=True)
if r.returncode == 0:
    print('  ✅ JS syntax OK')
else:
    print('  ❌ JS ERROR:', r.stderr[:600])
    sys.exit(1)
