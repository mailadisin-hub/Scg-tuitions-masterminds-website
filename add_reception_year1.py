#!/usr/bin/env python3
"""
Add Reception/Foundation phonics + Year 1 comprehension + Year 1 maths
to scg-masterminds.html.
"""

with open('public/scg-masterminds.html', 'r', encoding='utf-8') as f:
    html = f.read()

# ── helpers ──────────────────────────────────────────────────────────────────
def must_replace(old, new, label):
    if old not in html:
        raise ValueError(f'Anchor not found for: {label!r}\n  {old[:80]!r}')
    return html.replace(old, new, 1)

# ═══════════════════════════════════════════════════════════════════════════════
# 1. CSS — add purple/amber year-card gradients + phonics tile styles
# ═══════════════════════════════════════════════════════════════════════════════
CSS_ADDITION = """
#scgmm .yc.pu{background:linear-gradient(135deg,#5b21b6,#7c3aed);}
#scgmm .yc.or{background:linear-gradient(135deg,#b45309,#d97706);}
#scgmm .phs-tile{
  width:52px;height:52px;border-radius:10px;border:2px solid #cbd5e1;
  background:#fff;font-size:22px;font-weight:700;cursor:pointer;
  transition:transform .12s,background .12s,opacity .12s;
}
#scgmm .phs-tile:hover:not(:disabled){background:#f1f5f9;transform:scale(1.06);}
#scgmm .phs-tile:disabled{opacity:.35;cursor:default;}
#scgmm .sw-word{font-size:clamp(52px,12vw,72px);font-weight:900;letter-spacing:.02em;margin:20px 0 6px;}
#scgmm .sw-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:20px;}
#scgmm .sw-know{background:var(--sw-ac,#7c3aed);color:#fff;border:none;border-radius:12px;padding:14px 28px;font-size:16px;font-weight:700;cursor:pointer;min-width:130px;}
#scgmm .sw-skip{background:#f1f5f9;color:#334155;border:2px solid #e2e8f0;border-radius:12px;padding:14px 28px;font-size:16px;font-weight:600;cursor:pointer;min-width:130px;}
"""
html = must_replace(
    '@media(max-width:600px){',
    CSS_ADDITION + '\n@media(max-width:600px){',
    'CSS media query anchor'
)

# ═══════════════════════════════════════════════════════════════════════════════
# 2. CY1 data — 5 Year 1 comprehension stories
# ═══════════════════════════════════════════════════════════════════════════════
CY1_DATA = r"""var CY1=[
{id:"y1-balloon",title:"The Big Red Balloon",emoji:"🎈",time:"~3 min",
 paras:["One sunny morning, Lily got a big red balloon at the fair. She held the string very tightly. But when she stopped to look at a dog, a strong gust of wind blew the balloon right out of her hand.","Oh no! cried Lily. She watched the red balloon float up into the blue sky. It went higher and higher until it looked very small.","A girl called Rosa was sitting on a wall nearby. She had a long stick with a loop at the end. I can help! she shouted. She reached up with the stick and caught the string.","Rosa handed the balloon back to Lily. Lily smiled the biggest smile. Thank you so much! she said. Rosa had saved the day.","On the way home, Lily held the string with both hands. She did not let go, not even once."],
 qs:[{q:"What colour was Lily's balloon?",o:["Blue","Green","Red","Yellow"],c:2,e:"The colour is given in the very first sentence.",quote:"Lily got a big red balloon at the fair"},{q:"How did the balloon get away?",o:["It was too big to hold","A dog chewed the string","A strong gust of wind blew it away","Lily dropped it on purpose"],c:2,e:"What made the balloon fly off is explained in the first paragraph.",quote:"a strong gust of wind blew the balloon right out of her hand"},{q:"Who helped Lily get her balloon back?",o:["A man with a ladder","A girl called Rosa","Her mum","A shopkeeper"],c:1,e:"The helper is named in the third paragraph.",quote:"A girl called Rosa was sitting on a wall nearby"},{q:"What did Rosa use to catch the balloon?",o:["Her hands","A net","A long stick with a loop at the end","A piece of rope"],c:2,e:"Rosa's tool is described in the third paragraph.",quote:"She had a long stick with a loop at the end"},{q:"What did Lily do differently on the way home?",o:["She tied it to her wrist","She gave it to Rosa","She held the string with both hands","She let it go again"],c:2,e:"Lily's change of behaviour is in the final paragraph.",quote:"Lily held the string with both hands. She did not let go, not even once."},{q:"Where did Lily get the balloon?",o:["At school","In a shop","At a party","At the fair"],c:3,e:"Where the balloon came from is in the first sentence.",quote:"Lily got a big red balloon at the fair"}]},
{id:"y1-cat-nap",title:"The Sleepy Cat",emoji:"🐱",time:"~3 min",
 paras:["Cats love to sleep. A cat can sleep for up to sixteen hours every day! When a cat is not sleeping, it is usually eating, washing itself, or playing.","A cat washes itself by licking its fur with its rough tongue. This keeps the cat clean and also helps it to stay cool in warm weather.","Cats have soft paws with tiny sharp claws inside. They can pull their claws in so they do not scratch things by mistake. Cats use their claws to climb trees and to catch food.","A cat can see very well in the dark. Its eyes open wide to let in as much light as possible. That is why cats often like to go out at night.","When a cat is happy, it makes a low, rumbling sound called a purr. You can feel the purr if you stroke a cat gently."],
 qs:[{q:"How many hours can a cat sleep in one day?",o:["Up to eight hours","Up to twelve hours","Up to sixteen hours","Up to twenty hours"],c:2,e:"The number of sleep hours is given in the first paragraph.",quote:"A cat can sleep for up to sixteen hours every day!"},{q:"How does a cat wash itself?",o:["It has a bath in water","It uses its paws to wipe its face","It licks its fur with its rough tongue","It rolls in the grass"],c:2,e:"How cats wash is described in the second paragraph.",quote:"A cat washes itself by licking its fur with its rough tongue."},{q:"What can cats do with their claws to avoid scratching things by mistake?",o:["They wear paw covers","They pull their claws in","They keep their claws short","They walk on their heels"],c:1,e:"What cats do with their claws is in the third paragraph.",quote:"They can pull their claws in so they do not scratch things by mistake."},{q:"Why do cats often go out at night?",o:["It is quieter at night","They look for other cats","They can see very well in the dark","They are scared of sunlight"],c:2,e:"Why cats go out at night is explained in the fourth paragraph.",quote:"cats often like to go out at night"},{q:"What is the name for the sound a happy cat makes?",o:["A hiss","A miaow","A growl","A purr"],c:3,e:"The name for the happy sound is given in the final paragraph.",quote:"it makes a low, rumbling sound called a purr"},{q:"What does a cat use its claws for?",o:["Only for climbing trees","Only to catch food","To climb trees and to catch food","To dig in the garden"],c:2,e:"The uses of claws are listed in the third paragraph.",quote:"Cats use their claws to climb trees and to catch food."}]},
{id:"y1-snowman",title:"The Snowman",emoji:"⛄",time:"~3 min",
 paras:["One cold winter morning, Mia woke up and looked out of her window. Everything was white! It had snowed in the night. She called to her big brother Jack. Come on! Let us build a snowman!","They put on their coats, hats, scarves and boots and ran outside. They rolled three big balls of snow. The bottom ball was the biggest. The middle ball was smaller. The top ball was the smallest of all.","Mia found a carrot for the snowman's nose. Jack found five small stones for the eyes and mouth. Mum came outside and wrapped one of her old scarves around the snowman's neck.","The snowman looked wonderful. They all stood back and looked at him. He seems happy, said Mia. He is smiling! laughed Jack.","The next day the sun came out and it began to get warmer. Slowly, the snowman started to melt. By the afternoon, only the carrot and the stones were left in the garden."],
 qs:[{q:"What did Mia see when she looked out of the window?",o:["It was raining","There was frost on the grass","Everything was white with snow","The sun was shining brightly"],c:2,e:"What Mia saw is described in the first paragraph.",quote:"Everything was white! It had snowed in the night."},{q:"Who is Jack?",o:["Mia's friend from school","Mia's dad","Mia's big brother","Mia's neighbour"],c:2,e:"Jack is introduced in the first paragraph.",quote:"She called to her big brother Jack."},{q:"How many balls of snow did they roll?",o:["Two","Three","Four","Five"],c:1,e:"The number of snowballs is given in the second paragraph.",quote:"They rolled three big balls of snow."},{q:"What did Mia use for the snowman's nose?",o:["A stone","A stick","A button","A carrot"],c:3,e:"The nose material is mentioned in the third paragraph.",quote:"Mia found a carrot for the snowman's nose."},{q:"What did Mum put around the snowman's neck?",o:["A ribbon","One of her old scarves","A string of beads","Jack's hat"],c:1,e:"What Mum added is described in the third paragraph.",quote:"Mum came outside and wrapped one of her old scarves around the snowman's neck."},{q:"What happened to the snowman the next day?",o:["It grew bigger overnight","It blew away","It began to melt in the sun","It stayed exactly the same"],c:2,e:"What happened to the snowman is told in the final paragraph.",quote:"the sun came out and it began to get warmer. Slowly, the snowman started to melt."}]},
{id:"y1-farm-trip",title:"The Farm Trip",emoji:"🐑",time:"~4 min",
 paras:["On Monday, Class 1 went on a school trip to Greenfields Farm. Everyone was very excited. They put on their coats and climbed onto the big yellow bus.","At the farm, a kind farmer called Mr Hill showed them around. First they saw the cows in a big field. The cows were black and white, and they were eating grass.","Next, they went to see the sheep. There were lots of fluffy white lambs with the sheep. One small lamb came right up to the fence. Ella reached out and stroked it gently. It was very soft!","After that, they looked at the chickens. The children found three eggs in the henhouse. Mr Hill let them hold one each, very carefully.","On the bus home, everyone was tired but happy. I want to be a farmer when I grow up! said Ella. The teacher smiled and wrote it down."],
 qs:[{q:"What day did Class 1 go on their trip?",o:["Tuesday","Friday","Monday","Wednesday"],c:2,e:"The day of the trip is in the first paragraph.",quote:"On Monday, Class 1 went on a school trip to Greenfields Farm."},{q:"What was the farmer's name?",o:["Mr Green","Mr Farm","Mr Hill","Mr Black"],c:2,e:"The farmer's name is given in the second paragraph.",quote:"a kind farmer called Mr Hill showed them around"},{q:"What colour were the cows?",o:["All brown","Red and white","Black and white","Grey and white"],c:2,e:"The colour of the cows is described in the second paragraph.",quote:"The cows were black and white"},{q:"What did Ella do when the lamb came to the fence?",o:["She gave it some food","She picked it up","She stroked it gently","She ran away"],c:2,e:"What Ella did with the lamb is in the third paragraph.",quote:"Ella reached out and stroked it gently."},{q:"How many eggs did the children find in the henhouse?",o:["One","Two","Three","Five"],c:2,e:"The number of eggs is in the fourth paragraph.",quote:"The children found three eggs in the henhouse."},{q:"What does Ella want to be when she grows up?",o:["A teacher","A vet","A bus driver","A farmer"],c:3,e:"Ella's wish for the future is in the final paragraph.",quote:"I want to be a farmer when I grow up! said Ella."}]},
{id:"y1-garden",title:"Grandad's Garden",emoji:"🥕",time:"~4 min",
 paras:["Every Saturday, Aisha went to visit her grandad. Grandad had a big garden with a vegetable patch at the end. He grew carrots, tomatoes, peas and beans.","Today Grandad said, I need your help! We are going to pick the tomatoes. Aisha loved helping in the garden. She put on her green gloves.","Grandad showed her how to twist a tomato gently until it came off the plant. They picked a whole basket of round, red tomatoes. Some were big and some were tiny.","Then Aisha noticed some bright orange carrots poking out of the soil. Can I pull one? she asked. Of course! said Grandad. She grabbed the green top and pulled hard. Out came the biggest carrot she had ever seen!","That evening, Grandad made tomato soup and Aisha helped to chop the carrots. They ate dinner together and Aisha said it was the best soup in the whole world."],
 qs:[{q:"When did Aisha visit her grandad?",o:["Every Sunday","Every Friday","Every Saturday","Every Wednesday"],c:2,e:"The day of Aisha's visits is in the first paragraph.",quote:"Every Saturday, Aisha went to visit her grandad."},{q:"What vegetables did Grandad grow?",o:["Potatoes and onions","Carrots, tomatoes, peas and beans","Cabbages and sprouts","Corn and cucumbers"],c:1,e:"The vegetables are listed in the first paragraph.",quote:"He grew carrots, tomatoes, peas and beans."},{q:"What did Aisha put on before she started gardening?",o:["A hat","Her wellies","Her green gloves","An apron"],c:2,e:"What Aisha wore is in the second paragraph.",quote:"She put on her green gloves."},{q:"How do you pick a tomato correctly, according to Grandad?",o:["Pull it straight down","Cut it with scissors","Twist it gently until it comes off","Squeeze until it comes loose"],c:2,e:"The picking method is described in the third paragraph.",quote:"Grandad showed her how to twist a tomato gently until it came off the plant."},{q:"How did Aisha pull the carrot out of the soil?",o:["She used a spade","She used a fork","She used her gloves","She grabbed the green leafy top and pulled"],c:3,e:"How Aisha pulled the carrot is in the fourth paragraph.",quote:"She grabbed the green top and pulled hard."},{q:"What did they have for dinner?",o:["Carrot cake and tomatoes","Tomato soup with chopped carrots","Vegetable stew","Carrot and tomato salad"],c:1,e:"The dinner is described in the final paragraph.",quote:"Grandad made tomato soup and Aisha helped to chop the carrots."}]}
];
"""

html = must_replace(
    '\nvar CY2=[',
    '\n' + CY1_DATA + '\nvar CY2=[',
    'CY1 insertion before CY2'
)

# ═══════════════════════════════════════════════════════════════════════════════
# 3. PHONICS data + Y1MOPS — insert after CY3 closing ];
# ═══════════════════════════════════════════════════════════════════════════════
PHONICS_AND_MOPS = r"""
/* ═══ DATA: phonics phases ══════════════════════════════════════════════ */
var PHONICS=[
  {id:1,name:"Phase 1",emoji:"👂",desc:"Listening, rhythm and rhyme",
   words:["cat","dog","hat","pig","sun","bus","cup","red","leg","big","hop","mud","pet","bat","man","tap","tip","top","log","bag"],
   sw:[]},
  {id:2,name:"Phase 2",emoji:"🔤",desc:"First sounds: s a t p i n m d g o c k e u r h b f l",
   words:["sat","pat","tap","pin","tin","man","den","got","cat","kit","pet","cup","run","hot","bed","fan","lip","sit","mat","dig"],
   sw:["I","the","to","no","go","into"]},
  {id:3,name:"Phase 3",emoji:"🔊",desc:"ch, sh, th, ng and vowel digraphs",
   words:["chip","shop","that","ring","rain","feet","night","boat","look","farm","fork","burn","cow","coin","ear","hair","wish","sing","zoo","week"],
   sw:["he","she","we","me","be","was","my","you","they","her","all","are"]},
  {id:4,name:"Phase 4",emoji:"🔗",desc:"Blending consonants — CCVC and CVCC words",
   words:["frog","flag","clap","drip","step","swim","stamp","bump","belt","milk","next","wind","lump","best","help","dust","film","hand","pond","tent"],
   sw:["said","so","have","like","some","come","were","there","little","one","do","when","out","what"]},
  {id:5,name:"Phase 5",emoji:"🎯",desc:"New spellings for sounds you already know",
   words:["play","cloud","pie","bead","boy","bird","blue","saw","when","phone","new","toe","caught","point","found","trail","these","night","thaw","grew"],
   sw:["oh","their","people","looked","called","asked","could"]}
];

/* ═══ DATA: Year 1 maths ops ════════════════════════════════════════════ */
var Y1MOPS=[
  {k:"nb10",n:"Number Bonds to 10",s:"= 10",d:"Find the missing number that makes 10"},
  {k:"nb20",n:"Number Bonds to 20",s:"= 20",d:"Find the missing number that makes 20"},
  {k:"10more",n:"10 More",s:"+10",d:"Add 10 to numbers up to 90"},
  {k:"10less",n:"10 Less",s:"−10",d:"Take away 10 from numbers up to 100"}
];
"""

html = must_replace(
    '\n/* ═══ DATA: FSCE',
    PHONICS_AND_MOPS + '\n/* ═══ DATA: FSCE',
    'PHONICS+Y1MOPS before FSCE'
)

# ═══════════════════════════════════════════════════════════════════════════════
# 4. Year cards — add Reception + Year 1, add label/action fields
# ═══════════════════════════════════════════════════════════════════════════════
OLD_YEARS = """  var years=[
    {num:2,cls:'nv',ages:'Ages 6–7',tags:['📖 English','🔢 Maths'],disabled:false},
    {num:3,cls:'gn',ages:'Ages 7–8',tags:['📖 English','🔢 Maths','🎓 11+ FSCE'],disabled:false},
    {num:6,cls:'di',ages:'Ages 10–11',tags:['🎓 11+ SATs Prep','📖 Reading'],disabled:true}
  ];"""

NEW_YEARS = """  var years=[
    {num:'R',label:'Reception',cls:'pu',ages:'Ages 4–5',tags:['🔤 Phonics','👂 Listening & rhyme'],disabled:false,action:goPhonicsPhases},
    {num:1,label:'Year 1',cls:'or',ages:'Ages 5–6',tags:['📜 English','🔢 Maths'],disabled:false,action:function(){goSubjects(1);}},
    {num:2,label:'Year 2',cls:'nv',ages:'Ages 6–7',tags:['📜 English','🔢 Maths'],disabled:false,action:function(){goSubjects(2);}},
    {num:3,label:'Year 3',cls:'gn',ages:'Ages 7–8',tags:['📜 English','🔢 Maths','🎓 11+ FSCE'],disabled:false,action:function(){goSubjects(3);}},
    {num:6,label:'Year 6',cls:'di',ages:'Ages 10–11',tags:['🎓 11+ SATs Prep','📜 Reading'],disabled:true}
  ];"""

html = must_replace(OLD_YEARS, NEW_YEARS, 'years array')

# Update year card rendering to use label + action
OLD_CARD_RENDER = """    card.innerHTML=
      '<div class="decnum">'+y.num+'</div>'+
      (y.disabled?'<span class="soon-pill">Coming soon</span>':'')+
      '<div class="ylbl">Year group</div>'+
      '<h2>Year '+y.num+'</h2>'+
      '<div class="yages">'+y.ages+'</div>'+
      '<div class="ytags">'+y.tags.map(function(t){return'<span class="ytag">'+t+'</span>';}).join('')+'</div>'+
      '<div class="ycta"><span>'+(y.disabled?'Coming soon':'Choose Year '+y.num)+'</span>'+
        (y.disabled?'':'<span class="arr">'+arr()+'</span>')+
      '</div>';
    if(!y.disabled){
      card.addEventListener('click',function(){
        navStack.push(goHome);
        goSubjects(y.num);
      });
    }"""

NEW_CARD_RENDER = """    card.innerHTML=
      '<div class="decnum">'+y.num+'</div>'+
      (y.disabled?'<span class="soon-pill">Coming soon</span>':'')+
      '<div class="ylbl">Year group</div>'+
      '<h2>'+y.label+'</h2>'+
      '<div class="yages">'+y.ages+'</div>'+
      '<div class="ytags">'+y.tags.map(function(t){return'<span class="ytag">'+t+'</span>';}).join('')+'</div>'+
      '<div class="ycta"><span>'+(y.disabled?'Coming soon':'Choose '+y.label)+'</span>'+
        (y.disabled?'':'<span class="arr">'+arr()+'</span>')+
      '</div>';
    if(!y.disabled){
      (function(action){
        card.addEventListener('click',function(){
          navStack.push(goHome);
          action();
        });
      })(y.action);
    }"""

html = must_replace(OLD_CARD_RENDER, NEW_CARD_RENDER, 'year card render')

# ═══════════════════════════════════════════════════════════════════════════════
# 5. goSubjects — handle Year 1 colour + descriptions
# ═══════════════════════════════════════════════════════════════════════════════
OLD_SUBJ_OPEN = "  var a=year===2?'#1a2870':'#27ae60', as=year===2?'#eef2ff':'#edfaf4';"
NEW_SUBJ_OPEN = "  var a=year===1?'#d97706':(year===2?'#1a2870':'#27ae60'), as=year===1?'#fff7ed':(year===2?'#eef2ff':'#edfaf4');"
html = must_replace(OLD_SUBJ_OPEN, NEW_SUBJ_OPEN, 'goSubjects colour')

OLD_SUBJ_TITLE = "  t.innerHTML='<div class=\"ey\">Step 2: Choose a subject</div><h2>Year '+year+' <span style=\"font-weight:500;font-size:20px;color:var(--mid)\">· '+(year===2?'Ages 6–7':'Ages 7–8')+'</span></h2><p>'+(year===2?'Short stories and number skills pitched perfectly for Year 2.':'Longer passages, richer vocabulary, and more complex maths for Year 3.')+'</p>';"
NEW_SUBJ_TITLE = (
    "  var _ages=year===1?'Ages 5–6':(year===2?'Ages 6–7':'Ages 7–8');\n"
    "  var _desc=year===1?'Simple stories and number skills pitched perfectly for Year 1.':(year===2?'Short stories and number skills pitched perfectly for Year 2.':'Longer passages, richer vocabulary, and more complex maths for Year 3.');\n"
    "  t.innerHTML='<div class=\"ey\">Step 2: Choose a subject</div><h2>Year '+year+' <span style=\"font-weight:500;font-size:20px;color:var(--mid)\">· '+_ages+'</span></h2><p>'+_desc+'</p>';"
)
html = must_replace(OLD_SUBJ_TITLE, NEW_SUBJ_TITLE, 'goSubjects title')

OLD_SUBJECTS_ARR = """  var subjects=[
    {ico:'📖',bg:as,name:'English',desc:'Read-aloud comprehension stories. The device reads to your child sentence by sentence, then 5 questions follow.',cnt:'5 stories',action:function(){goActivities(year,'english');}},
    {ico:'🔢',bg:as,name:'Maths',desc:'Quick-fire number skills: addition, subtraction, multiplication and division. 10 questions each.',cnt:'4 skills',action:function(){goActivities(year,'maths');}}
  ];"""
NEW_SUBJECTS_ARR = """  var subjects=[
    {ico:'📜',bg:as,name:'English',
     desc:year===1?'Simple read-aloud stories for Year 1. Listen to the story then answer questions.':'Read-aloud comprehension stories. The device reads to your child sentence by sentence, then questions follow.',
     cnt:'5 stories',action:function(){goActivities(year,'english');}},
    {ico:'🔢',bg:as,name:'Maths',
     desc:year===1?'Number bonds to 10 and 20, plus 10 more and 10 less. 10 questions each.':'Quick-fire number skills: addition, subtraction, multiplication and division. 10 questions each.',
     cnt:'4 skills',action:function(){goActivities(year,'maths');}}
  ];"""
html = must_replace(OLD_SUBJECTS_ARR, NEW_SUBJECTS_ARR, 'subjects array in goSubjects')

# ═══════════════════════════════════════════════════════════════════════════════
# 6. goActivities — use CY1 for year 1 English; use Y1MOPS for year 1 Maths
# ═══════════════════════════════════════════════════════════════════════════════
OLD_COMPS_LINE = "    var comps=year===2?CY2:CY3;"
NEW_COMPS_LINE = "    var comps=year===1?CY1:(year===2?CY2:CY3);"
html = must_replace(OLD_COMPS_LINE, NEW_COMPS_LINE, 'comps year select')

OLD_MOPS_USE = "    MOPS.forEach(function(op,i){"
NEW_MOPS_USE = "    var ops=year===1?Y1MOPS:MOPS;\n    ops.forEach(function(op,i){"
html = must_replace(OLD_MOPS_USE, NEW_MOPS_USE, 'ops/MOPS switch')

# Also fix the startMaths call so Year 1 bestScore key works
OLD_BESTS_MOPS = "      var b=bests[op.n+', Year '+year];"
NEW_BESTS_MOPS = "      var b=bests[op.n+', Year '+year];"  # same — no change needed
# (already fine)

# ═══════════════════════════════════════════════════════════════════════════════
# 7. genMaths — add Year 1 number bond / 10more / 10less cases
# ═══════════════════════════════════════════════════════════════════════════════
OLD_GENMATHS = "      if(k==='add'){"
NEW_GENMATHS = (
    "      var e;\n"
    "      if(k==='nb10'){a=ri(0,9);b=10-a;ans=b;txt=a+' + __ = 10';e='The missing number is '+b+' because '+a+' + '+b+' = 10';}\n"
    "      else if(k==='nb20'){a=ri(10,19);b=20-a;ans=b;txt=a+' + __ = 20';e='The missing number is '+b+' because '+a+' + '+b+' = 20';}\n"
    "      else if(k==='10more'){a=ri(1,89);ans=a+10;txt='10 more than '+a;e='10 more than '+a+' is '+(a+10)+' because '+a+' + 10 = '+(a+10);}\n"
    "      else if(k==='10less'){a=ri(10,99);ans=a-10;txt='10 less than '+a;e='10 less than '+a+' is '+(a-10)+' because '+a+' − 10 = '+(a-10);}\n"
    "      else if(k==='add'){"
)
html = must_replace(OLD_GENMATHS, NEW_GENMATHS, 'genMaths Y1 cases')

OLD_GENMATHS_PUSH = "      if(seen[txt])continue;seen[txt]=1;qs.push({txt:txt,ans:ans});"
NEW_GENMATHS_PUSH = "      if(seen[txt])continue;seen[txt]=1;var qobj={txt:txt,ans:ans};if(e)qobj.e=e;if(k==='nb10'||k==='nb20')qobj.noEq=true;qs.push(qobj);"
html = must_replace(OLD_GENMATHS_PUSH, NEW_GENMATHS_PUSH, 'genMaths push with e/noEq')

# ═══════════════════════════════════════════════════════════════════════════════
# 8. renderMathsQ — honour noEq flag so "3 + __ = 10" doesn't get "= ?" appended
# ═══════════════════════════════════════════════════════════════════════════════
OLD_MSUM = "      '<div class=\"msum\">'+q.txt+' = ?</div>'+"
NEW_MSUM = "      '<div class=\"msum\">'+q.txt+(q.noEq?'':' = ?')+'</div>'+"
html = must_replace(OLD_MSUM, NEW_MSUM, 'msum noEq')

# ═══════════════════════════════════════════════════════════════════════════════
# 9. Maths feedback — use q.e when present
# ═══════════════════════════════════════════════════════════════════════════════
OLD_MFEEDBACK = (
    "      fb.innerHTML=ok\n"
    "        ?'<div class=\"qfb-main\">✅ Correct!</div>'\n"
    "        :'<div class=\"qfb-main\">❌ The answer is <b>'+q.ans+'</b></div>'\n"
    "         +'<div class=\"qfb-explain\">Work it out: '+q.txt+' = '+q.ans+'</div>';"
)
NEW_MFEEDBACK = (
    "      fb.innerHTML=ok\n"
    "        ?'<div class=\"qfb-main\">✅ Correct!</div>'\n"
    "        :'<div class=\"qfb-main\">❌ The answer is <b>'+q.ans+'</b></div>'\n"
    "         +(q.e?'<div class=\"qfb-explain\">'+q.e+'</div>':'<div class=\"qfb-explain\">Work it out: '+q.txt+' = '+q.ans+'</div>');"
)
html = must_replace(OLD_MFEEDBACK, NEW_MFEEDBACK, 'maths feedback use q.e')

# ═══════════════════════════════════════════════════════════════════════════════
# 10. goPhonicsPhases + goPhonicsGames — insert before goSubjects
# ═══════════════════════════════════════════════════════════════════════════════
PHONICS_NAV = r"""
/* ── Reception phonics navigation ── */
function goPhonicsPhases(){
  var bc=$("#bc-sub",root);bc.innerHTML='';
  bc.appendChild(bcBtn('Masterminds',goHome));bc.appendChild(sep());bc.appendChild(bcSpan('Reception · Phonics'));
  var t=$("#sub-title",root);
  t.innerHTML='<div class="ey">Reception · Phonics</div><h2>Choose a Phase</h2><p>Each phase builds on the last. Start with Phase 1 and work through. Every phase has 3 games to practise.</p>';
  var sg=$("#sub-grid",root);sg.innerHTML='';
  var pcols=['#7c3aed','#2563eb','#059669','#d97706','#dc2626'];
  PHONICS.forEach(function(ph,i){
    var col=pcols[i];
    var c=document.createElement('div');c.className='subc';c.style.setProperty('--ac',col);
    c.innerHTML=
      '<div class="sico" style="background:#f5f3ff">'+ph.emoji+'</div>'+
      '<h3>'+ph.name+'</h3><p>'+ph.desc+'</p>'+
      '<div class="sft">'+
        '<span class="scnt">'+(ph.sw.length?ph.sw.length+' sight words':'Listening focus')+'</span>'+
        '<span class="sgo">Choose '+arr()+'</span>'+
      '</div>';
    (function(phase,c2){
      c.addEventListener('click',function(){
        navStack.push(goPhonicsPhases);
        goPhonicsGames(phase,c2);
      });
    })(ph,col);
    sg.appendChild(c);
  });
  showScr('s-sub','fwd');
}

function goPhonicsGames(phase,col){
  var bc=$("#bc-act",root);bc.innerHTML='';
  bc.appendChild(bcBtn('Masterminds',goHome));bc.appendChild(sep());
  bc.appendChild(bcBtn('Phonics',function(){navStack.push(goPhonicsPhases);goPhonicsPhases();}));
  bc.appendChild(sep());bc.appendChild(bcSpan(phase.name));
  var body=$("#act-body",root),title=$("#act-title",root);
  body.innerHTML='';
  title.innerHTML=
    '<div class="ey">Reception · '+phase.name+'</div>'+
    '<h2>'+phase.name+' · '+phase.desc+'</h2>'+
    '<p>Three games to practise your phonics. Play them in order — sight words first, then listening games.</p>';
  var games=[
    {n:'Game 1 · Sight Words',ico:'👁️',
     desc:phase.sw.length?'Learn the '+phase.sw.length+' key sight words for '+phase.name+'. Each word is read aloud for you.':'Phase 1 focuses on listening — no formal sight words yet. Jump to Game 2!',
     action:function(){phase.sw.length?Q.startSightWords(phase,col):Q.startPhonicsChoose(phase,col);}},
    {n:'Game 2 · Hear & Choose',ico:'👂',
     desc:'Listen to the word and tap the correct spelling. Practise recognising '+phase.name+' words by ear.',
     action:function(){Q.startPhonicsChoose(phase,col);}},
    {n:'Game 3 · Hear & Spell',ico:'✏️',
     desc:'Listen to the word, then tap the letters in order to spell it.',
     action:function(){Q.startPhonicsSpell(phase,col);}}
  ];
  var gcols=[col,'#2563eb','#059669'];
  var mgrid=document.createElement('div');mgrid.className='mop-grid';
  games.forEach(function(g,i){
    var mc=gcols[i];
    var card=document.createElement('div');card.className='mop';card.style.setProperty('--mc',mc);
    card.innerHTML=
      '<div class="msym" style="color:'+mc+'">'+g.ico+'</div>'+
      '<h4>'+g.n+'</h4><p>'+g.desc+'</p>'+
      '<button class="mst" style="background:'+mc+'">Play →</button>';
    (function(action){
      card.addEventListener('click',function(){action();});
    })(g.action);
    mgrid.appendChild(card);
  });
  body.appendChild(mgrid);
  showScr('s-act','fwd');
}

"""

html = must_replace(
    '\nfunction goSubjects(year){',
    PHONICS_NAV + '\nfunction goSubjects(year){',
    'phonics nav insertion'
)

# ═══════════════════════════════════════════════════════════════════════════════
# 11. Q object — add phonics game methods before the closing }; of Q
#     Anchor: the last thing in Q before its closing
# ═══════════════════════════════════════════════════════════════════════════════
PHONICS_GAMES = r"""
  /* ── SIGHT WORDS ── */
  startSightWords:function(phase,col){
    var queue=phase.sw.slice();
    this.st={type:'sight',ac:col,phase:phase,queue:queue,orig:queue.length,known:0,
      section:'Phonics '+phase.name,quizTitle:phase.name+' Sight Words'};
    this.open(col,'👁️',phase.name+' · Sight Words','Flashcard practice');
    this.renderSightCard();
  },
  renderSightCard:function(){
    var s=this.st,w=s.queue[0];
    this.prog(10+((s.orig-s.queue.length)/s.orig)*80);
    mbody.innerHTML=
      '<div style="text-align:center;padding:8px 0">'+
      '<div style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#94a3b8;margin-bottom:4px">'+
        'Word '+(s.orig-s.queue.length+1)+' of '+s.orig+'</div>'+
      '<div class="sw-word" style="color:'+s.ac+'">'+w+'</div>'+
      '<button id="sw-hear" style="background:transparent;border:2px solid '+s.ac+';color:'+s.ac+';border-radius:999px;padding:7px 20px;font-size:13px;font-weight:600;cursor:pointer;margin-bottom:22px">🔊 Hear it again</button>'+
      '<div class="sw-btns">'+
        '<button class="sw-know" style="--sw-ac:'+s.ac+'">&#x2713; I know it!</button>'+
        '<button class="sw-skip">🔁 Show again</button>'+
      '</div></div>';
    var self=this;
    Sp.speak([w],null,null);
    document.getElementById('sw-hear').addEventListener('click',function(){Sp.speak([w],null,null);});
    document.querySelector('#scgmm-modal .sw-know').addEventListener('click',function(){
      s.known++;s.queue.shift();
      if(s.queue.length)self.renderSightCard();else self.renderSightResult();
    });
    document.querySelector('#scgmm-modal .sw-skip').addEventListener('click',function(){
      s.queue.push(s.queue.shift());
      self.renderSightCard();
    });
  },
  renderSightResult:function(){
    var s=this.st;this.prog(100);
    var pct=Math.round(s.known/s.orig*100);
    mbody.innerHTML=
      '<div style="text-align:center;padding:20px 0">'+
      '<div style="font-size:52px;margin-bottom:8px">'+(pct>=80?'🌟':'⭐')+'</div>'+
      '<h2 style="margin-bottom:6px">'+pct+'% known!</h2>'+
      '<p style="color:#64748b;margin-bottom:24px">You knew '+s.known+' out of '+s.orig+' '+s.phase.name+' sight words.</p>'+
      (pct<100?'<p style="font-size:14px;color:#94a3b8;margin-bottom:20px">Practise the tricky ones and try again!</p>':'')+
      '<button id="sw-replay" style="background:'+s.ac+';color:#fff;border:none;border-radius:12px;padding:13px 30px;font-size:15px;font-weight:700;cursor:pointer">Play again</button>'+
      '</div>';
    var self=this;
    document.getElementById('sw-replay').addEventListener('click',function(){self.startSightWords(s.phase,s.ac);});
  },

  /* ── HEAR & CHOOSE ── */
  startPhonicsChoose:function(phase,col){
    var pool=phase.words.slice();
    var picked=shuffle(pool).slice(0,Math.min(10,pool.length));
    var qs=picked.map(function(w){
      var opts=[w];
      while(opts.length<4){var r=pool[Math.floor(Math.random()*pool.length)];if(opts.indexOf(r)===-1)opts.push(r);}
      opts=shuffle(opts);
      return{word:w,opts:opts,c:opts.indexOf(w)};
    });
    this.st={type:'phchoose',ac:col,phase:phase,qs:qs,qi:0,correct:0,answers:[],
      section:'Phonics '+phase.name,quizTitle:phase.name+' · Hear & Choose'};
    this.open(col,'👂',phase.name+' · Hear & Choose','Listen and choose');
    this.renderPhChooseIntro();
  },
  renderPhChooseIntro:function(){
    var s=this.st;this.prog(5);
    mbody.innerHTML=
      '<div class="ph-intro">'+
      '<span class="ph-em">👂</span>'+
      '<h2>Hear & Choose</h2>'+
      '<p class="il">Listen to the word, then tap the right spelling. '+s.qs.length+' questions.</p>'+
      '<button class="rc play" id="phc-go">Start →</button>'+
      '</div>';
    var self=this;
    document.getElementById('phc-go').addEventListener('click',function(){self.renderPhChooseQ();});
  },
  renderPhChooseQ:function(){
    var s=this.st,q=s.qs[s.qi],total=s.qs.length;
    this.prog(14+(s.qi/total)*60);
    mbody.innerHTML=
      this.dots(total,s.qi,s.answers)+
      this.lscore(s.correct,s.qi)+
      '<div class="qprog">Question '+(s.qi+1)+' of '+total+'</div>'+
      '<div style="text-align:center;margin:16px 0">'+
        '<button id="ph-hear" style="background:'+s.ac+';color:#fff;border:none;border-radius:999px;padding:11px 30px;font-size:16px;font-weight:700;cursor:pointer">🔊 Hear the word</button>'+
      '</div>'+
      '<div class="qopts" id="qopts">'+
        q.opts.map(function(o,i){return'<button class="qopt" data-i="'+i+'">'+o+'</button>';}).join('')+
      '</div>'+
      '<div class="qfb" id="qfb"></div>';
    var self=this,done=false;
    Sp.speak([q.word],null,null);
    document.getElementById('ph-hear').addEventListener('click',function(){Sp.speak([q.word],null,null);});
    $$('.qopt',mbody).forEach(function(btn){
      btn.addEventListener('click',function(){
        if(done)return;done=true;
        var chosen=parseInt(btn.getAttribute('data-i')),ok=(chosen===q.c);
        if(ok)s.correct++;
        s.answers.push({q:q.word,chosen:q.opts[chosen],correct:q.opts[q.c],ok:ok});
        $$('.qopt',mbody).forEach(function(b){
          var bi=parseInt(b.getAttribute('data-i'));b.disabled=true;
          if(bi===q.c)b.classList.add('ok');else if(bi===chosen&&!ok)b.classList.add('ng');
        });
        var fb=document.getElementById('qfb');fb.className='qfb show '+(ok?'ok':'ng');
        fb.innerHTML=ok
          ?'<div class="qfb-main">✅ Correct! The word is <b>'+q.word+'</b></div>'
          :'<div class="qfb-main">❌ The word was <b>'+q.word+'</b></div>';
        setTimeout(function(){s.qi++;if(s.qi<total)self.renderPhChooseQ();else self.renderForm();},1300);
      });
    });
  },

  /* ── HEAR & SPELL ── */
  startPhonicsSpell:function(phase,col){
    var qs=shuffle(phase.words.slice()).slice(0,8);
    this.st={type:'phspell',ac:col,phase:phase,qs:qs,qi:0,correct:0,answers:[],built:[],
      section:'Phonics '+phase.name,quizTitle:phase.name+' · Hear & Spell'};
    this.open(col,'✏️',phase.name+' · Hear & Spell','Spell with letter tiles');
    this.renderPhSpellIntro();
  },
  renderPhSpellIntro:function(){
    var s=this.st;this.prog(5);
    mbody.innerHTML=
      '<div class="ph-intro">'+
      '<span class="ph-em">✏️</span>'+
      '<h2>Hear & Spell</h2>'+
      '<p class="il">Listen to the word, then tap the letters in order to spell it. 8 words.</p>'+
      '<button class="rc play" id="phs-go">Start →</button>'+
      '</div>';
    var self=this;
    document.getElementById('phs-go').addEventListener('click',function(){self.renderPhSpellQ();});
  },
  renderPhSpellQ:function(){
    var s=this.st,word=s.qs[s.qi],total=s.qs.length;
    s.built=[];
    this.prog(14+(s.qi/total)*60);
    // Build tiles: correct letters + up to 3 distractors not already in word
    var letters=word.split('');
    var extras=[];
    'abcdefghijklmnoprstuw'.split('').forEach(function(c){if(letters.indexOf(c)===-1&&extras.length<3)extras.push(c);});
    var tiles=shuffle(letters.concat(extras));
    var self=this;
    function renderTiles(){
      mbody.innerHTML=
        self.dots(total,s.qi,s.answers)+
        self.lscore(s.correct,s.qi)+
        '<div class="qprog">Word '+(s.qi+1)+' of '+total+'</div>'+
        '<div style="text-align:center;margin:10px 0 6px">'+
          '<button id="phs-hear" style="background:'+s.ac+';color:#fff;border:none;border-radius:999px;padding:9px 24px;font-size:15px;font-weight:700;cursor:pointer">🔊 Hear the word</button>'+
        '</div>'+
        '<div id="phs-built" style="font-size:clamp(32px,9vw,48px);font-weight:900;letter-spacing:.08em;text-align:center;min-height:56px;margin:8px 0;color:'+s.ac+'">'+
          (s.built.length?s.built.join(''):'&#x2014;'.repeat(word.length))+'</div>'+
        '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:10px 0" id="phs-tiles">'+
          tiles.map(function(l,i){
            var used=s.built.filter(function(x){return x===l;}).length;
            var total_avail=letters.filter(function(x){return x===l;}).length+extras.filter(function(x){return x===l;}).length;
            var dis=used>=(total_avail)?'disabled style="opacity:.35"':'';
            return'<button class="phs-tile" data-i="'+i+'" data-l="'+l+'" '+dis+'>'+l+'</button>';
          }).join('')+
        '</div>'+
        '<div style="display:flex;gap:10px;justify-content:center;margin-top:8px">'+
          '<button id="phs-clear" style="background:#f1f5f9;border:2px solid #cbd5e1;border-radius:10px;padding:9px 20px;font-size:14px;font-weight:600;cursor:pointer">Clear ×</button>'+
        '</div>'+
        '<div class="qfb" id="qfb"></div>';

      Sp.speak([word],null,null);
      document.getElementById('phs-hear').addEventListener('click',function(){Sp.speak([word],null,null);});
      document.getElementById('phs-clear').addEventListener('click',function(){s.built=[];renderTiles();});

      var done=false;
      function checkSpell(){
        if(done)return;done=true;
        var attempt=s.built.join(''),ok=(attempt===word);
        if(ok)s.correct++;
        s.answers.push({q:word,chosen:attempt,correct:word,ok:ok});
        var fb=document.getElementById('qfb');fb.className='qfb show '+(ok?'ok':'ng');
        fb.innerHTML=ok
          ?'<div class="qfb-main">✅ <b>'+word+'</b> — well spelled!</div>'
          :'<div class="qfb-main">❌ It's <b>'+word+'</b> — you wrote '+attempt+'</div>';
        $$('.phs-tile',mbody).forEach(function(b){b.disabled=true;});
        document.getElementById('phs-clear').disabled=true;
        setTimeout(function(){s.qi++;if(s.qi<total)self.renderPhSpellQ();else self.renderForm();},1500);
      }

      $$('.phs-tile',mbody).forEach(function(btn){
        btn.addEventListener('click',function(){
          if(btn.disabled)return;
          s.built.push(btn.getAttribute('data-l'));
          var builtEl=document.getElementById('phs-built');
          builtEl.textContent=s.built.join('');
          // Disable this tile instance
          var used=s.built.filter(function(x){return x===btn.getAttribute('data-l');}).length;
          var tot=tiles.filter(function(x){return x===btn.getAttribute('data-l');}).length;
          if(used>=tot){
            $$('.phs-tile[data-l="'+btn.getAttribute('data-l')+'"]',mbody).forEach(function(b){b.disabled=true;b.style.opacity='.35';});
          }
          if(s.built.length===word.length)setTimeout(checkSpell,200);
        });
      });
    }
    renderTiles();
  },
"""

# Insert before the closing of Q object — anchor is just before renderForm
OLD_FORM_ANCHOR = "\n  /* ── PARENT FORM ── */"
NEW_FORM_ANCHOR = PHONICS_GAMES + "\n  /* ── PARENT FORM ── */"
html = must_replace(OLD_FORM_ANCHOR, NEW_FORM_ANCHOR, 'phonics Q methods')

# ═══════════════════════════════════════════════════════════════════════════════
# Write output
# ═══════════════════════════════════════════════════════════════════════════════
with open('public/scg-masterminds.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Done.")
