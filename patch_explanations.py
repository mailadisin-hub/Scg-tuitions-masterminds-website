#!/usr/bin/env python3
"""
Patch scg-masterminds.html:
  1. Fix bug: Little Red Train Q8 c:2 -> c:3 (Saturday->Tuesday)
  2. Add CSS for qfb-main / qfb-explain / qfb-quote
  3. Update all three answer feedback lines to show explanation+quote
  4. Add e:"..." and quote:"..." fields to every CY2/CY3 comprehension question
  5. Add e:"..." field to every FQ_BANK question
"""

import re

SRC  = "public/scg-masterminds.html"
DEST = "public/scg-masterminds.html"

with open(SRC, encoding="utf-8") as f:
    html = f.read()

# ── 1. CSS: extend .qfb block + add new sub-element styles ──────────────────
OLD_CSS = (
    '#scgmm .qfb{\n'
    '  margin-top:16px;padding:13px 16px;border-radius:12px;font-size:14px;font-weight:600;\n'
    '  display:none;align-items:center;gap:10px;animation:scgFwd .2s ease both;\n'
    '}\n'
    '#scgmm .qfb.show{display:flex;}'
)
NEW_CSS = (
    '#scgmm .qfb{\n'
    '  margin-top:16px;padding:13px 16px;border-radius:12px;font-size:14px;\n'
    '  display:none;animation:scgFwd .2s ease both;\n'
    '}\n'
    '#scgmm .qfb.show{display:block;}\n'
    '#scgmm .qfb-main{display:flex;align-items:center;gap:10px;font-weight:600;}\n'
    '#scgmm .qfb-explain{font-size:13px;font-weight:500;margin-top:8px;line-height:1.55;}\n'
    '#scgmm .qfb-quote{font-size:13px;font-weight:400;font-style:italic;margin-top:6px;padding:7px 11px;background:rgba(0,0,0,.07);border-left:3px solid currentColor;border-radius:0 6px 6px 0;line-height:1.5;}'
)
assert OLD_CSS in html, "CSS block not found"
html = html.replace(OLD_CSS, NEW_CSS, 1)

# ── 2. Remove justify-content:center from maths qfb div ─────────────────────
OLD_MQFB = '<div class="qfb" id="qfb" style="justify-content:center;margin-bottom:10px"></div>'
NEW_MQFB = '<div class="qfb" id="qfb"></div>'
assert OLD_MQFB in html, "maths qfb div not found"
html = html.replace(OLD_MQFB, NEW_MQFB, 1)

# ── 3. Comprehension answer feedback ────────────────────────────────────────
OLD_COMP_FB = (
    "      fb.innerHTML=ok?'✅ Correct! Well done.':"
    "'❌ Not quite, the answer was <b style=\"margin-left:3px\">'+q.o[q.c]+'</b>';"
)
NEW_COMP_FB = (
    "      fb.innerHTML=ok\n"
    "        ?'<div class=\"qfb-main\">✅ Correct! Well done.</div>'\n"
    "        :'<div class=\"qfb-main\">❌ Not quite — the answer was <b>'+q.o[q.c]+'</b></div>'\n"
    "         +(q.e?'<div class=\"qfb-explain\">'+q.e+'</div>':'')\n"
    "         +(q.quote?'<div class=\"qfb-quote\">“'+q.quote+'”</div>':'');"
)
assert OLD_COMP_FB in html, "comp feedback line not found"
html = html.replace(OLD_COMP_FB, NEW_COMP_FB, 1)

# ── 4. Maths answer feedback ─────────────────────────────────────────────────
OLD_MATH_FB = (
    "      fb.innerHTML=ok?'✅ Correct!':'❌ The answer is <b style=\"margin-left:4px\">'+q.ans+'</b>';"
)
NEW_MATH_FB = (
    "      fb.innerHTML=ok\n"
    "        ?'<div class=\"qfb-main\">✅ Correct!</div>'\n"
    "        :'<div class=\"qfb-main\">❌ The answer is <b>'+q.ans+'</b></div>'\n"
    "         +'<div class=\"qfb-explain\">Work it out: '+q.txt+' = '+q.ans+'</div>';"
)
assert OLD_MATH_FB in html, "maths feedback line not found"
html = html.replace(OLD_MATH_FB, NEW_MATH_FB, 1)

# ── 5. FSCE answer feedback ──────────────────────────────────────────────────
OLD_FSCE_FB = (
    "      fb.innerHTML=ok?'✅ Correct!':'❌ The answer was <b style=\"margin-left:3px\">'+q.o[q.c]+'</b>';"
)
NEW_FSCE_FB = (
    "      fb.innerHTML=ok\n"
    "        ?'<div class=\"qfb-main\">✅ Correct!</div>'\n"
    "        :'<div class=\"qfb-main\">❌ The answer was <b>'+q.o[q.c]+'</b></div>'\n"
    "         +(q.e?'<div class=\"qfb-explain\">'+q.e+'</div>':'');"
)
assert OLD_FSCE_FB in html, "FSCE feedback line not found"
html = html.replace(OLD_FSCE_FB, NEW_FSCE_FB, 1)

# ─────────────────────────────────────────────────────────────────────────────
# Helper: add e (and optional quote) to a question object already in the html.
# We find the question by its unique q:"..." text, then append ,e:"...",quote:"..."
# before the closing }.
# ─────────────────────────────────────────────────────────────────────────────

def add_fields(html, q_text, e_text, quote_text=None):
    # Normalise curly quotes/apostrophes to ASCII for searching.
    # The Write tool converts straight apostrophes to curly ones; the HTML file uses ASCII.
    q_search = (q_text
        .replace(chr(0x2019), chr(0x27))  # right single quote -> apostrophe
        .replace(chr(0x2018), chr(0x27))  # left single quote -> apostrophe
        .replace(chr(0x2026), "...")      # ellipsis -> three dots
        .replace(chr(0x201C), '"')        # left double quote -> ASCII double quote
        .replace(chr(0x201D), '"'))       # right double quote -> ASCII double quote
    idx = html.find(q_search)
    if idx == -1:
        raise ValueError(f"Question not found: {q_search[:60]!r}")

    # Find the closing c:N} for this question (search forward from idx)
    search_from = idx + len(q_search)  # use q_search length, not q_text
    # Find next occurrence of ,c:
    c_idx = html.index(',c:', search_from)
    # Find the } after c:N
    brace_idx = html.index('}', c_idx)

    # Build replacement
    original_end = html[c_idx:brace_idx+1]  # e.g. ,c:1}
    if quote_text:
        replacement = (original_end[:-1]
                       + f',e:"{e_text}",quote:"{quote_text}"'
                       + '}')
    else:
        replacement = (original_end[:-1]
                       + f',e:"{e_text}"'
                       + '}')

    html = html[:c_idx] + replacement + html[brace_idx+1:]
    return html


# ── 6. Fix bug: Little Red Train Q8 c:2 -> c:3 ──────────────────────────────
# The question "On what day did this story take place?" has options:
# ["A cold Sunday","A cold Friday","A cold Saturday","A cold Tuesday"] c:2
# But the text says "One Tuesday morning" -> correct is index 3 (D)
OLD_BUG = '"On what day did this story take place?",o:["A cold Sunday","A cold Friday","A cold Saturday","A cold Tuesday"],c:2}'
NEW_BUG = '"On what day did this story take place?",o:["A cold Sunday","A cold Friday","A cold Saturday","A cold Tuesday"],c:3}'
assert OLD_BUG in html, "Little Red Train Q8 not found"
html = html.replace(OLD_BUG, NEW_BUG, 1)


# ── 7. Add e+quote to CY2 questions ──────────────────────────────────────────

# Magic Garden
html = add_fields(html, 'q:"What did Lily find at the bottom of her garden?"',
    "The opening sentence tells you exactly what Lily discovered.",
    "a little girl called Lily found a small wooden gate at the bottom of her garden")

html = add_fields(html, 'q:"What was covering the gate?"',
    "Look at the description of the gate in the first paragraph.",
    "The gate was covered in green ivy and tiny purple flowers.")

html = add_fields(html, 'q:"What was the rabbit holding when Lily first saw it?"',
    "The rabbit is introduced in the third paragraph.",
    "In the middle of the garden sat a small rabbit with a bright orange carrot.")

html = add_fields(html, 'q:"What did Lily decide to plant in the magic garden?"',
    "Lily explains her decision in the fourth paragraph.",
    "She decided she would plant kindness seeds, so that everyone who visited the garden would feel happy and welcome.")

html = add_fields(html, 'q:"What happened to people who smelled the rainbow flowers?"',
    "The effect of the rainbow flowers is explained in the final paragraph.",
    "every person who smelled them smiled all day long")

html = add_fields(html, 'q:"What sound did the blue stream in the garden make?"',
    "The sound is described in the second paragraph.",
    "A blue stream trickled past, making a soft splashing sound.")

html = add_fields(html, 'q:"What expression did the rabbit use to greet Lily?"',
    "The rabbit’s exact greeting is given in the third paragraph.",
    "The rabbit looked up at Lily with big brown eyes and said, Welcome!")

html = add_fields(html, 'q:"How many kindness seeds did Lily plant?"',
    "The number of seeds is stated clearly in the fourth paragraph.",
    "She bent down and pushed three tiny seeds into the soft, warm earth.")

# Little Red Train
html = add_fields(html, 'q:"Where did Thomas the train live?"',
    "Thomas’s home station is given in the very first sentence.",
    "Thomas the little red train lived at Greenfield Station.")

html = add_fields(html, 'q:"What was on the track that made Thomas stop?"',
    "The obstacle on the track is described in the second paragraph.",
    "A large brown cow had wandered onto the railway line and was eating the long grass beside it.")

html = add_fields(html, 'q:"How many children was Thomas carrying to school?"',
    "The number of children is stated at the start of the second paragraph.",
    "Thomas was carrying six children to school.")

html = add_fields(html, 'q:"Who helped move the cow off the track?"',
    "The person who helped is described in the fourth paragraph.",
    "A kind farmer heard the whistle and came running. He gently led the cow back to the field.")

html = add_fields(html, 'q:"How late did the children arrive at school?"',
    "How late the children arrived is told in the final paragraph.",
    "The children arrived at school only five minutes late.")

html = add_fields(html, 'q:"What was Thomas\'s job?"',
    "Thomas’s job is explained in the first paragraph.",
    "His job was to carry passengers from one village to another.")

html = add_fields(html, 'q:"How did Thomas try to warn the cow?"',
    "Thomas’s warning action is described at the start of the third paragraph.",
    "Thomas blew his whistle loudly. Whoo! Whoo!")

html = add_fields(html, 'q:"On what day did this story take place?"',
    "The day of the week is mentioned at the start of the second paragraph.",
    "One Tuesday morning, Thomas was carrying six children to school.")

# Bees and Flowers
html = add_fields(html, "q:\"What are the colours of a bee’s stripes?\"",
    "The colours of bee stripes are described in the first paragraph.",
    "they have yellow and black stripes on their bodies")

html = add_fields(html, 'q:"What is the sweet liquid that bees drink from flowers called?"',
    "The name of the liquid is given in the second paragraph.",
    "They drink a sweet liquid from the flowers called nectar.")

html = add_fields(html, 'q:"What do bees carry on their fuzzy legs?"',
    "What bees carry on their legs is stated in the second paragraph.",
    "They also collect tiny grains called pollen on their fuzzy legs.")

html = add_fields(html, 'q:"What do bees make from nectar?"',
    "What bees produce from nectar is explained in the third paragraph.",
    "Back at the hive, bees turn nectar into honey.")

html = add_fields(html, 'q:"Which of these foods needs bees to pollinate it?"',
    "The foods that depend on bees are listed in the fourth paragraph.",
    "Apples, strawberries, and sunflowers all need bees to pollinate them.")

html = add_fields(html, 'q:"How do bees dry out nectar to turn it into honey?"',
    "The process of making honey is described in the third paragraph.",
    "They flap their wings very fast to dry the nectar out, and it slowly becomes thick and golden.")

html = add_fields(html, 'q:"What is the name for the group that most bees live in?"',
    "The name for a group of bees is given in the first paragraph.",
    "Most bees live together in a big group called a colony inside a beehive.")

html = add_fields(html, 'q:"What is pollination?"',
    "Pollination is defined in the second paragraph.",
    "When a bee moves from flower to flower, it carries pollen with it. This helps the flowers to make seeds and grow into new plants.")

# Lost Puppy
html = add_fields(html, 'q:"Where did Sam find the puppy?"',
    "Where Sam found the puppy is described in the opening sentence.",
    "he heard a soft whimpering sound coming from under a park bench")

html = add_fields(html, "q:\"What was the puppy’s name?\"",
    "The puppy’s name is on its tag, described in the third paragraph.",
    "The tag read: My name is Biscuit.")

html = add_fields(html, "q:\"What was on the puppy’s collar?\"",
    "What was on the collar is described in the second paragraph.",
    "He noticed a collar around its neck with a silver tag on it.")

html = add_fields(html, "q:\"What colour was Emma’s house?\"",
    "The colour of the house is mentioned in the final paragraph.",
    "Sam knocked on the door of a yellow house on Oak Street.")

html = add_fields(html, 'q:"What was the weather like when Sam found the puppy?"',
    "The weather is described in the opening sentence.",
    "On a cold and rainy Saturday, Sam was walking home from the shops")

html = add_fields(html, 'q:"What did Sam do to keep the puppy warm?"',
    "Sam’s action to warm the puppy is described in the second paragraph.",
    "He gently picked up the puppy and tucked it inside his coat to keep it warm.")

html = add_fields(html, 'q:"How did Sam find the phone number to call?"',
    "How Sam found the number is explained in the second and third paragraphs.",
    "The tag read: My name is Biscuit. If found, please call for help.")

html = add_fields(html, "q:\"What was the girl’s name who owned the puppy?\"",
    "The owner’s name is given in the final paragraph.",
    "a girl called Emma threw her arms around Biscuit")

# Four Seasons
html = add_fields(html, 'q:"Which flowers are mentioned as blooming in spring?"',
    "The spring flowers are named in the second paragraph.",
    "Colourful flowers like daffodils and tulips push up through the soil.")

html = add_fields(html, 'q:"In which season do farmers harvest strawberries?"',
    "The summer harvest is described in the third paragraph.",
    "Farmers harvest fruits like strawberries and cherries.")

html = add_fields(html, 'q:"What do squirrels do in autumn?"',
    "Squirrel behaviour in autumn is described in the fourth paragraph.",
    "Squirrels collect nuts and store them away for winter.")

html = add_fields(html, 'q:"What is the name for the deep sleep hedgehogs have in winter?"',
    "The word for this winter sleep is defined in the final paragraph.",
    "Animals like hedgehogs sleep through the winter in a deep sleep called hibernation.")

html = add_fields(html, 'q:"What happens to the days in autumn?"',
    "The change in days during autumn is stated in the fourth paragraph.",
    "In autumn, the days become shorter and cooler.")

html = add_fields(html, 'q:"Which animals are often seen in fields during spring?"',
    "The animals mentioned in connection with spring fields are in the second paragraph.",
    "Baby lambs can often be seen in fields.")

html = add_fields(html, 'q:"What do trees look like in winter?"',
    "The appearance of trees in winter is described in the final paragraph.",
    "Some trees have no leaves at all and look bare.")

html = add_fields(html, 'q:"What happens to leaves in autumn?"',
    "What happens to leaves in autumn is described in the fourth paragraph.",
    "Leaves on the trees change colour to shades of red, orange and gold, before falling to the ground.")

# ── 8. Add e+quote to CY3 questions ──────────────────────────────────────────

# Ancient Egypt
html = add_fields(html, 'q:"How long did the Ancient Egyptian civilisation last?"',
    "The length of the civilisation is given in the first paragraph.",
    "It existed along the banks of the River Nile in north Africa for over 3,000 years")

html = add_fields(html, 'q:"Why was the annual flooding of the River Nile important?"',
    "The importance of the Nile floods is explained in the second paragraph.",
    "the river flooded its banks, leaving behind a thick layer of rich, dark mud. This mud was perfect for growing crops")

html = add_fields(html, 'q:"For whom was the Great Pyramid of Giza built?"',
    "The pharaoh for whom the Great Pyramid was built is named in the third paragraph.",
    "The Great Pyramid of Giza was built for Pharaoh Khufu around 2560 BC.")

html = add_fields(html, 'q:"What was the Egyptian writing system called?"',
    "The name of the writing system is given in the fourth paragraph.",
    "the Egyptians also developed one of the world’s earliest writing systems, called hieroglyphics")

html = add_fields(html, 'q:"Which Egyptian god was depicted with the head of a jackal?"',
    "The god with a jackal’s head is named in the final paragraph.",
    "Anubis was often depicted as a man with the head of a jackal")

html = add_fields(html, 'q:"In which continent was Ancient Egypt located?"',
    "The location of Ancient Egypt is stated in the first paragraph.",
    "It existed along the banks of the River Nile in north Africa")

html = add_fields(html, 'q:"What crops did Ancient Egyptians grow with the help of the Nile floods?"',
    "The crops are named in the second paragraph.",
    "growing crops such as wheat and barley")

html = add_fields(html, 'q:"Who was the Egyptian god Ra?"',
    "Ra’s role is described in the final paragraph.",
    "Ra was the sun god")

# Journey Through the Jungle
html = add_fields(html, "q:\"Why was Maya travelling to Brazil?\"",
    "The reason for Maya’s trip is explained in the first paragraph.",
    "her father, a wildlife photographer, invited her to join his expedition to Brazil")

html = add_fields(html, 'q:"What did Maya see draped across a branch on the second day?"',
    "The discovery on the second day is described in the third paragraph.",
    "Draped across it, almost invisible against the bark, was a green tree boa.")

html = add_fields(html, "q:\"How were the snake’s scales described?\"",
    "The appearance of the snake’s scales is described in the third paragraph.",
    "Its scales shimmered like polished emeralds")

html = add_fields(html, 'q:"How far away can the call of a howler monkey be heard?"',
    "The distance of the howler monkey’s call is given in the fifth paragraph.",
    "Their call can be heard up to five kilometres away.")

html = add_fields(html, 'q:"What did Maya do as the sun began to set?"',
    "What Maya did at sunset is described in the final paragraph.",
    "As the sun sank behind the canopy, Maya sat quietly and wrote in her journal.")

html = add_fields(html, "q:\"What was Maya’s father’s job?\"",
    "Maya’s father’s job is mentioned in the first paragraph.",
    "her father, a wildlife photographer, invited her to join his expedition")

html = add_fields(html, 'q:"What large colourful butterflies did Maya see in the rainforest?"',
    "The butterflies are described in the second paragraph.",
    "Enormous blue morpho butterflies drifted past like scraps of sky.")

html = add_fields(html, "q:\"What did Maya’s father whisper about the snake?\"",
    "Maya’s father’s words about the snake are in the fourth paragraph.",
    "She won’t hurt us. She’s more scared of us than we are of her.")

# Rainforests of the World
html = add_fields(html, 'q:"Where are tropical rainforests found?"',
    "The location of tropical rainforests is given in the opening sentence.",
    "Tropical rainforests are found near the equator, where it is hot and wet throughout the year.")

html = add_fields(html, 'q:"Which layer of the rainforest receives almost no direct sunlight?"',
    "The layer with least sunlight is named at the end of the second paragraph.",
    "The forest floor receives almost no direct light at all.")

html = add_fields(html, "q:\"What percentage of Earth’s surface do tropical rainforests cover?\"",
    "The percentage is given in the third paragraph.",
    "they cover only about six percent of the Earth’s surface")

html = add_fields(html, 'q:"What is the name for clearing rainforest for farming and logging?"',
    "The term is defined in the fourth paragraph.",
    "Every year, huge areas are cleared for farming, logging, and building. This is called deforestation.")

html = add_fields(html, 'q:"What important role do rainforests play in the planet\'s climate?"',
    "The climate role of rainforests is described in the fourth paragraph.",
    "Rainforests also play a vital role in regulating the planet’s climate, absorbing carbon dioxide and producing oxygen.")

html = add_fields(html, 'q:"In which continent is the Amazon rainforest mainly found?"',
    "The continent where the Amazon is located is stated in the first paragraph.",
    "The largest rainforest on Earth is the Amazon, which spreads across Brazil and eight other countries in South America.")

html = add_fields(html, "q:\"How much of the world’s plant and animal species do rainforests contain?\"",
    "The proportion of species is given in the third paragraph.",
    "they contain over half of the world’s plant and animal species")

html = add_fields(html, 'q:"What does the canopy layer of a rainforest do?"',
    "The function of the canopy is described in the second paragraph.",
    "the canopy, a thick, continuous cover of leaves that blocks out much of the light")

# The Dragon's Secret
html = add_fields(html, 'q:"When would the distant roar echo through the mountains?"',
    "When the roar occurred is stated in the first paragraph.",
    "Every full moon, a distant roar would echo through the mountains")

html = add_fields(html, "q:\"What had Freya noticed that made her think the dragon was not dangerous?\"",
    "Freya’s observations about the dragon are described in the second paragraph.",
    "the dragon never came down to the town, never stole livestock, and never did anything threatening at all")

html = add_fields(html, 'q:"What did Freya pack in her satchel?"',
    "What Freya packed is listed in the third paragraph.",
    "she packed a flask of warm soup and a wedge of cheese into her satchel")

html = add_fields(html, 'q:"What colour was the dragon?"',
    "The dragon’s colour is described in the fourth paragraph.",
    "an enormous copper-coloured dragon")

html = add_fields(html, 'q:"What was wrong with the dragon?"',
    "The dragon’s injury is described in the fourth paragraph.",
    "One of its wings was badly damaged, bent at an unnatural angle.")

html = add_fields(html, 'q:"How long had Freya been observing the mountain?"',
    "How long Freya had been watching is stated in the second paragraph.",
    "She had spent months observing the mountain from a safe distance")

html = add_fields(html, "q:\"What time of year was it when Freya climbed the mountain?\"",
    "The season and weather are described at the start of the third paragraph.",
    "One crisp autumn morning, she packed a flask of warm soup")

html = add_fields(html, "q:\"What expression did Freya see in the dragon’s amber eyes?\"",
    "The expression in the dragon’s eyes is described in the final paragraph.",
    "Its amber eyes fixed on her with an expression of surprise and, unmistakably, hope.")

# Life in the Ocean
html = add_fields(html, "q:\"How much of the Earth’s surface does the ocean cover?\"",
    "The percentage is given in the opening sentence.",
    "The ocean covers more than seventy percent of the Earth’s surface")

html = add_fields(html, 'q:"How deep does the sunlit zone reach?"',
    "The depth of the sunlit zone is stated in the second paragraph.",
    "The sunlit zone reaches down to about 200 metres.")

html = add_fields(html, 'q:"What is bioluminescence?"',
    "Bioluminescence is defined in the third paragraph.",
    "Many animals here produce their own light through a process called bioluminescence")

html = add_fields(html, 'q:"What does the anglerfish use to attract prey in the midnight zone?"',
    "The anglerfish’s method is described in the fourth paragraph.",
    "the anglerfish uses a glowing lure attached to its head to attract prey in the blackness")

html = add_fields(html, 'q:"What percentage of all marine species do coral reefs support?"',
    "The percentage is given in the final paragraph.",
    "coral reefs support around twenty-five percent of all marine species")

html = add_fields(html, 'q:"Which animals live in the sunlit zone?"',
    "The animals of the sunlit zone are listed in the second paragraph.",
    "fish, sea turtles, dolphins, and sharks all live here")

html = add_fields(html, 'q:"What makes the midnight zone different from other ocean zones?"',
    "The conditions in the midnight zone are described in the fourth paragraph.",
    "the midnight zone, plunged in total darkness and under immense pressure")

html = add_fields(html, 'q:"What is the largest animal ever to have lived on Earth?"',
    "The largest animal is mentioned in the first paragraph.",
    "the enormous blue whale, the largest animal that has ever lived on Earth")

# ── 9. Add e to FQ_BANK Maths Reasoning questions ────────────────────────────

FQ_MATHS = [
    ('q:"A book costs £4.50. How much do 3 books cost?"',
     "Multiply: 3 × £4.50 = £13.50. Work out 3 × £4 = £12 then add 3 × 50p = £1.50."),
    ('q:"There are 24 pupils in a class. One third walk to school. How many walk?"',
     "To find one third, divide by 3: 24 ÷ 3 = 8."),
    ('q:"A train leaves at 14:20 and arrives at 15:05. How long is the journey?"',
     "Count from 14:20 to 15:00 = 40 minutes, then add 5 more minutes to reach 15:05 = 45 minutes total."),
    ('q:"What is half of 86?"',
     "Halving means dividing by 2: 86 ÷ 2 = 43. Half of 80 is 40, half of 6 is 3, giving 43."),
    ('q:"A rectangle is 8 cm long and 5 cm wide. What is its perimeter?"',
     "Perimeter = 2 × (length + width) = 2 × (8 + 5) = 2 × 13 = 26 cm."),
    ('q:"A shop has 120 apples and sells 47. How many are left?"',
     "Subtract: 120 − 47 = 73. Try 120 − 50 = 70 then add 3 back."),
    ('q:"What is 15% of 200?"',
     "10% of 200 = 20 and 5% of 200 = 10. Add them: 20 + 10 = 30."),
    ('q:"A bag of 32 sweets: you eat a quarter. How many are left?"',
     "A quarter of 32 = 32 ÷ 4 = 8 eaten. 32 − 8 = 24 left."),
    ('q:"What is the next prime number after 11?"',
     "12 is divisible by 2, 3 and 4 so it is not prime. 13 can only be divided by 1 and 13, so 13 is the next prime."),
    ('q:"A pizza is cut into 8 slices. Emma eats 3. What fraction is left?"',
     "8 − 3 = 5 slices remaining. As a fraction of 8 that is 5/8."),
    ('q:"What is 37 + 48?"',
     "Add tens: 30 + 40 = 70. Add units: 7 + 8 = 15. Total: 70 + 15 = 85."),
    ('q:"What is 144 ÷ 12?"',
     "Think of the 12 times table: 12 × 12 = 144. So 144 ÷ 12 = 12."),
    ('q:"A class of 30 has 18 girls. What fraction are boys?"',
     "Boys = 30 − 18 = 12. Fraction = 12/30. Simplify by dividing both by 6: 2/5."),
    ('q:"What is 7 × 8?"',
     "7 × 8 = 56. A useful tip: 5, 6, 7, 8 gives 56 = 7 × 8."),
    ('q:"Sam has £20. He spends £7.85. How much is left?"',
     "£20.00 − £7.85 = £12.15. Subtract pence: 100p − 85p = 15p. Subtract pounds: 19 − 7 = 12. Answer: £12.15."),
    ('q:"What is 25% of 80?"',
     "25% = one quarter. 80 ÷ 4 = 20."),
    ('q:"A school trip costs £15 per pupil. 24 pupils go. What is the total cost?"',
     "£15 × 20 = £300 and £15 × 4 = £60. Total: £300 + £60 = £360."),
    ('q:"Eggs come in boxes of 6. How many boxes hold exactly 42 eggs?"',
     "42 ÷ 6 = 7. Check: 6 × 7 = 42."),
    ('q:"3 pencils cost 90p. How much does 1 pencil cost?"',
     "Divide: 90p ÷ 3 = 30p per pencil."),
    ('q:"A triangle has angles of 60° and 75°. What is the third angle?"',
     "Angles in a triangle always add up to 180°: 180 − 60 − 75 = 45°."),
    ('q:"A number multiplied by 6 equals 72. What is the number?"',
     "Reverse the multiplication: 72 ÷ 6 = 12. Check: 12 × 6 = 72."),
    ('q:"What is 400 − 197?"',
     "Try 400 − 200 = 200 then add back 3 (because you subtracted 3 too many): 200 + 3 = 203."),
    ('q:"A rectangle has area 48 cm² and length 8 cm. What is its width?"',
     "Width = Area ÷ Length = 48 ÷ 8 = 6 cm."),
    ('q:"What is 1000 ÷ 8?"',
     "Halve three times: 1000 ÷ 2 = 500, ÷ 2 = 250, ÷ 2 = 125."),
    ('q:"Peter has 3 times as many stickers as Amy. Amy has 15. How many does Peter have?"',
     "Multiply: 3 × 15 = 45."),
    ('q:"What is 3/4 as a decimal?"',
     "3/4 means 3 ÷ 4 = 0.75. Three-quarters equals 75 hundredths."),
    ('q:"The temperature is −3°C. It rises by 8°C. What is the new temperature?"',
     "Count up 8 from −3 on a number line: −3 + 8 = 5°C."),
    ("q:\"A rectangle's perimeter is 30 cm and its length is 10 cm. What is its width?\"",
     "Perimeter = 2 × (l + w). So 30 = 2 × (10 + w), giving 15 = 10 + w, so width = 5 cm."),
    ('q:"What is 6 squared?"',
     "6 squared means 6 × 6 = 36."),
    ('q:"A car travels at 60 mph. How far does it travel in 90 minutes?"',
     "90 minutes = 1.5 hours. Distance = speed × time = 60 × 1.5 = 90 miles."),
    ('q:"5 identical items cost £3.50 in total. How much does 1 cost?"',
     "£3.50 ÷ 5 = 70p. Or: 350p ÷ 5 = 70p."),
    ('q:"A bus runs every 20 minutes, starting at 9:00. What is the first departure after 9:40?"',
     "Buses run at 9:00, 9:20, 9:40 and 10:00. The 9:40 bus has just left, so the next one is 10:00."),
    ('q:"How many days are in 5 weeks?"',
     "5 × 7 = 35. There are 7 days in one week."),
]

for q_text, e_text in FQ_MATHS:
    html = add_fields(html, q_text, e_text)

# ── 10. Add e to FQ_BANK Comprehension questions ─────────────────────────────

# These questions use curly-quote Unicode chars already in the file.
# We search for the q:"..." values directly.

FQ_COMP = [
    ('“The frost lay thick on the ground and her breath hung in the air.” What season is it most likely?',
     "Frost on the ground and visible breath in the air are clear signs of cold weather, which points to winter."),
    ('“He was reluctant to leave.” The word ‘reluctant’ most nearly means:',
     "‘Reluctant’ means unwilling or hesitant. A reluctant person does not want to do something."),
    ('“She was elated when she heard the news.” ‘Elated’ most nearly means:',
     "‘Elated’ means extremely happy or joyful, a stronger word than simply ‘happy’."),
    ('“The ancient castle loomed over the village.” ‘Loomed’ most nearly means:',
     "‘Loomed’ means to appear in a large, impressive or threatening way, often rising up over something."),
    ('“His heart sank when he opened the letter.” This expression suggests he felt:',
     "‘His heart sank’ is an idiom meaning he felt disappointed or disheartened by what he read."),
    ('“The dog was ravenous after its long walk.” ‘Ravenous’ most nearly means:',
     "‘Ravenous’ means extremely hungry, describing a very intense and urgent desire for food."),
    ('“She spoke in a hushed tone.” ‘Hushed’ means:',
     "‘Hushed’ means very quiet or soft. A hushed voice is one that is deliberately lowered."),
    ('“With a sense of trepidation, he opened the door.” ‘Trepidation’ most nearly means:',
     "‘Trepidation’ means a feeling of fear or nervous anxiety about what might happen."),
    ('“She was on cloud nine.” This expression means:',
     "‘On cloud nine’ is an idiom meaning extremely happy, describing a feeling of great joy."),
    ('“The waves crashed thunderously against the rocks.” This suggests the sea was:',
     "The word ‘thunderously’ tells us the waves made an enormous sound, suggesting the sea was rough and powerful."),
    ('“The scientist peered through the microscope with intense concentration.” Why was she concentrating?',
     "A microscope is used to look at very tiny objects. Intense concentration is needed to study very small details."),
    ('“It was a treacherous path through the mountains.” ‘Treacherous’ most nearly means:',
     "‘Treacherous’ means dangerous, especially where something is unpredictable and could cause serious harm."),
    ('“He was an enigma to everyone who met him.” ‘Enigma’ most nearly means:',
     "An ‘enigma’ is a person or thing that is puzzling or difficult to understand, a mystery."),
    ('“She was amiable and easy to talk to.” ‘Amiable’ most nearly means:',
     "‘Amiable’ means friendly and pleasant to be around. An amiable person is easy to get along with."),
    ('“He lingered at the doorway before saying goodbye.” ‘Lingered’ most nearly means:',
     "‘Lingered’ means to stay in a place longer than necessary, often because you do not want to leave."),
    ('“Despite the rain, she smiled.” What does this sentence tell you?',
     "‘Despite’ means ‘even though’. The sentence tells us the rain did not stop her from smiling."),
    ('“The child’s laughter was infectious.” ‘Infectious’ here means:',
     "When laughter is ‘infectious’ it means it spreads easily to other people, making them laugh too."),
    ('“He was methodical in his approach.” ‘Methodical’ means:',
     "‘Methodical’ means doing things in a careful, organised, step-by-step way."),
    ('“She had a mountain of homework.” This is an example of:',
     "This is a metaphor because it calls the homework a mountain without using ‘like’ or ‘as’. The homework is not literally a mountain."),
    ('“The wind howled through the trees.” Giving the wind a human quality is called:',
     "Giving a non-human thing (the wind) a human or animal quality (howling) is called personification."),
    ("“Her smile was as bright as the sun.” This comparison using 'as ... as' is called:",
     "A simile compares two things using ‘like’ or ‘as’. ‘As bright as the sun’ is a simile."),
    ("Which word from this sentence is a VERB? 'The excited children ran quickly into the garden.'",
     "‘Ran’ is the verb (the action word). ‘Excited’ is an adjective, ‘children’ is a noun and ‘quickly’ is an adverb."),
    ('“He gulped down his breakfast.” ‘Gulped’ suggests he ate:',
     "‘Gulped’ means to eat or drink quickly and greedily, often in a hurry."),
    ('“Although nervous, she stepped forward.” What does ‘although’ tell you?',
     "‘Although’ introduces a contrast: despite being nervous, she still acted bravely."),
    ("A story ends: 'And from that day on, nothing was ever quite the same.' This suggests:",
     "This phrase tells us that an important event caused a permanent change and things will never go back to how they were."),
    ('“The audience was captivated by the performance.” ‘Captivated’ means:',
     "‘Captivated’ means completely gripped or absorbed by something, unable to look away."),
    ('“She peered cautiously round the corner.” ‘Peered’ most nearly means:',
     "‘Peered’ means to look carefully or with difficulty, often slowly and tentatively."),
    ("A text about bats says: 'Over 1,000 species of bat exist worldwide.' This text is most likely:",
     "Factual statements with precise statistics like ‘1,000 species’ are typical features of non-fiction information texts."),
    ('“The old house stood silent and foreboding at the end of the lane.” ‘Foreboding’ most nearly means:',
     "‘Foreboding’ describes something that gives a sense that something bad is about to happen, threatening or ominous."),
    ("Which of these is a SYNONYM for the word 'swift'?",
     "A synonym is a word with a similar meaning. ‘Swift’ means fast, so ‘quick’ is its synonym."),
    ("A character is described as 'tenacious'. This means they are:",
     "‘Tenacious’ means holding on firmly and not giving up easily, determined and persistent."),
    ('“The small, shivering child stood at the door.” Which word is an ADJECTIVE?',
     "‘Shivering’ is an adjective describing the child. ‘Stood’ is a verb while ‘child’ and ‘door’ are nouns."),
    ('“He was incandescent with rage.” ‘Incandescent’ here suggests he was:',
     "‘Incandescent’ literally means glowing with intense heat. Used about emotions it means furiously and intensely angry."),
]

for q_text, e_text in FQ_COMP:
    full_q = f'q:"{q_text}"'
    html = add_fields(html, full_q, e_text)

# ── Sanity check ─────────────────────────────────────────────────────────────
e_count = html.count(',e:"')
print(f"Added {e_count} e:\"...\" fields")
quote_count = html.count(',quote:"')
print(f"Added {quote_count} quote:\"...\" fields")

with open(DEST, "w", encoding="utf-8") as f:
    f.write(html)
print("Done. Written to", DEST)
