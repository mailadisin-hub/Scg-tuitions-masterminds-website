export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

export interface Comprehension {
  id: string;
  title: string;
  year: 2 | 3;
  subject: string;
  difficulty: string;
  text: string;
  questions: Question[];
}

export const year2Comprehensions: Comprehension[] = [
  {
    id: "y2-magic-garden",
    title: "The Magic Garden",
    year: 2,
    subject: "English",
    difficulty: "Year 2",
    text: `Once upon a time, a little girl called Lily found a small wooden gate at the bottom of her garden. She had never noticed it before. The gate was covered in green ivy and tiny purple flowers.

Lily pushed the gate open and stepped through. She gasped with surprise! On the other side was the most beautiful garden she had ever seen. Enormous red roses grew beside the path. Golden sunflowers turned their bright faces towards the sun. A blue stream trickled past, making a soft splashing sound.

In the middle of the garden sat a small rabbit with a bright orange carrot. The rabbit looked up at Lily with big brown eyes and said, "Welcome! This garden grows whatever you dream about. What would you like to plant today?"

Lily thought carefully. She decided she would plant kindness seeds, so that everyone who visited the garden would feel happy and welcome. She bent down and pushed three tiny seeds into the soft, warm earth.

The next morning, when Lily came back, three beautiful rainbow flowers had grown where she had planted her seeds. And every person who smelled them smiled all day long.`,
    questions: [
      {
        id: 1,
        question: "What did Lily find at the bottom of her garden?",
        options: ["A big red door", "A small wooden gate", "A tall iron fence", "A stone archway"],
        correct: 1,
      },
      {
        id: 2,
        question: "What was covering the gate?",
        options: ["Red roses and daisies", "Moss and mud", "Green ivy and tiny purple flowers", "Yellow leaves"],
        correct: 2,
      },
      {
        id: 3,
        question: "What was the rabbit holding when Lily first saw it?",
        options: ["A bright orange carrot", "A bunch of flowers", "A golden key", "A small blue book"],
        correct: 0,
      },
      {
        id: 4,
        question: "What did Lily decide to plant in the magic garden?",
        options: ["Sunflower seeds", "Tomato seeds", "Kindness seeds", "Apple seeds"],
        correct: 2,
      },
      {
        id: 5,
        question: "What happened to people who smelled the rainbow flowers?",
        options: ["They fell asleep", "They smiled all day long", "They started to sing", "They grew taller"],
        correct: 1,
      },
    ],
  },
  {
    id: "y2-little-train",
    title: "The Little Red Train",
    year: 2,
    subject: "English",
    difficulty: "Year 2",
    text: `Thomas the little red train lived at Greenfield Station. Every morning he would wake up, fill his tank with water, and set off along the shiny silver tracks. His job was to carry passengers from one village to another.

One Tuesday morning, Thomas was carrying six children to school. The children were singing songs and laughing loudly. Suddenly, Thomas saw something on the track ahead. A large brown cow had wandered onto the railway line and was eating the long grass beside it.

Thomas blew his whistle loudly. Whoo! Whoo! But the cow did not move. Thomas slowed down carefully and came to a stop just in front of the cow.

"Oh dear," said Thomas. "We will be late for school!"

A kind farmer heard the whistle and came running. He gently led the cow back to the field and closed the gate firmly. Thomas let out a happy puff of steam and set off again.

The children arrived at school only five minutes late. Their teacher, Miss Green, had heard about the cow. She smiled and said, "That sounds like a very exciting journey!"`,
    questions: [
      {
        id: 1,
        question: "Where did Thomas the train live?",
        options: ["Redfield Station", "Greenfield Station", "Bluefield Station", "Sunfield Station"],
        correct: 1,
      },
      {
        id: 2,
        question: "What was on the track that made Thomas stop?",
        options: ["A fallen tree", "A large brown cow", "A broken fence", "A flock of sheep"],
        correct: 1,
      },
      {
        id: 3,
        question: "How many children was Thomas carrying to school?",
        options: ["Four", "Five", "Six", "Seven"],
        correct: 2,
      },
      {
        id: 4,
        question: "Who helped move the cow off the track?",
        options: ["A police officer", "Miss Green", "A kind farmer", "One of the children"],
        correct: 2,
      },
      {
        id: 5,
        question: "How late did the children arrive at school?",
        options: ["Two minutes late", "Ten minutes late", "Five minutes late", "One hour late"],
        correct: 2,
      },
    ],
  },
  {
    id: "y2-hungry-caterpillar-day",
    title: "Bees and Flowers",
    year: 2,
    subject: "English",
    difficulty: "Year 2",
    text: `Bees are some of the most important insects in the world. They are small and furry, and they have yellow and black stripes on their bodies. Most bees live together in a big group called a colony inside a beehive.

Every day, worker bees fly out to find flowers. They drink a sweet liquid from the flowers called nectar. They also collect tiny grains called pollen on their fuzzy legs. When a bee moves from flower to flower, it carries pollen with it. This helps the flowers to make seeds and grow into new plants. This is called pollination.

Back at the hive, bees turn nectar into honey. They flap their wings very fast to dry the nectar out, and it slowly becomes thick and golden. Honey is used to feed the young bees inside the hive.

Without bees, many of our favourite foods would not exist. Apples, strawberries, and sunflowers all need bees to pollinate them. That is why it is so important to protect bees and plant flowers in our gardens for them to visit.

Next time you see a bee buzzing around a flower, remember the amazing job it is doing for all of us!`,
    questions: [
      {
        id: 1,
        question: "What are the colours of a bee's stripes?",
        options: ["Red and black", "Yellow and black", "Orange and white", "Green and yellow"],
        correct: 1,
      },
      {
        id: 2,
        question: "What is the sweet liquid that bees drink from flowers called?",
        options: ["Honey", "Pollen", "Nectar", "Syrup"],
        correct: 2,
      },
      {
        id: 3,
        question: "What do bees carry on their fuzzy legs?",
        options: ["Nectar", "Seeds", "Honey", "Pollen"],
        correct: 3,
      },
      {
        id: 4,
        question: "What do bees make from nectar?",
        options: ["Wax", "Honey", "Pollen", "Milk"],
        correct: 1,
      },
      {
        id: 5,
        question: "Which of these foods needs bees to pollinate it?",
        options: ["Potatoes", "Rice", "Strawberries", "Bread"],
        correct: 2,
      },
    ],
  },
  {
    id: "y2-lost-puppy",
    title: "The Lost Puppy",
    year: 2,
    subject: "English",
    difficulty: "Year 2",
    text: `On a cold and rainy Saturday, Sam was walking home from the shops when he heard a soft whimpering sound coming from under a park bench. He crouched down and looked underneath. A small, golden puppy was curled up there, shivering and wet.

"Oh, you poor thing!" said Sam. He gently picked up the puppy and tucked it inside his coat to keep it warm.

Sam looked around for someone who might own the puppy. He noticed a collar around its neck with a silver tag on it. The tag said: "My name is Biscuit. If lost, call 07700 900123."

Sam found a telephone box nearby and called the number. A little girl answered the phone. She sounded very worried.

"Biscuit ran away this morning during the storm," she said. "I've been looking everywhere!"

"I've found him!" said Sam. "He's safe and warm now. Where do you live?"

Twenty minutes later, Sam knocked on the door of a yellow house on Oak Street. The door flew open and a girl called Emma threw her arms around Biscuit. She looked up at Sam with grateful eyes.

"Thank you so much," she said. "You are a real hero!"

Sam smiled. "I'm just glad Biscuit is safe," he said.`,
    questions: [
      {
        id: 1,
        question: "Where did Sam find the puppy?",
        options: ["Behind a bush", "Under a park bench", "Inside a telephone box", "Near the shops"],
        correct: 1,
      },
      {
        id: 2,
        question: "What was the puppy's name?",
        options: ["Spot", "Biscuit", "Cookie", "Fluffy"],
        correct: 1,
      },
      {
        id: 3,
        question: "What was on the puppy's collar?",
        options: ["A golden bell", "A red ribbon", "A silver tag with a phone number", "A blue flower"],
        correct: 2,
      },
      {
        id: 4,
        question: "What colour was Emma's house?",
        options: ["Blue", "Green", "Red", "Yellow"],
        correct: 3,
      },
      {
        id: 5,
        question: "What was the weather like when Sam found the puppy?",
        options: ["Hot and sunny", "Windy and snowy", "Cold and rainy", "Warm and cloudy"],
        correct: 2,
      },
    ],
  },
  {
    id: "y2-seasons",
    title: "The Four Seasons",
    year: 2,
    subject: "English",
    difficulty: "Year 2",
    text: `Each year has four seasons: spring, summer, autumn and winter. Each season brings different weather and changes to the natural world.

In spring, the days slowly get longer. Trees begin to grow new green leaves. Colourful flowers like daffodils and tulips push up through the soil. Many animals have their young in spring because there is plenty of food about. Baby lambs can often be seen in fields.

Summer is the warmest season. The sun shines for a long time each day. Children can play outside until late in the evening. Trees are full of thick, green leaves that give cool shade. Farmers harvest fruits like strawberries and cherries.

In autumn, the days become shorter and cooler. Leaves on the trees change colour to shades of red, orange and gold, before falling to the ground. Squirrels collect nuts and store them away for winter. Conkers fall from horse chestnut trees.

Winter is the coldest season. Some trees have no leaves at all and look bare. Animals like hedgehogs sleep through the winter in a deep sleep called hibernation. Sometimes snow falls, covering the ground in a white blanket. Days are short and nights are long.

Each season is special in its own way, and together they make up the beautiful cycle of a whole year.`,
    questions: [
      {
        id: 1,
        question: "Which flowers are mentioned as blooming in spring?",
        options: ["Roses and sunflowers", "Daffodils and tulips", "Poppies and daisies", "Bluebells and lilies"],
        correct: 1,
      },
      {
        id: 2,
        question: "In which season do farmers harvest strawberries?",
        options: ["Spring", "Autumn", "Winter", "Summer"],
        correct: 3,
      },
      {
        id: 3,
        question: "What do squirrels do in autumn?",
        options: ["Build nests", "Collect and store nuts", "Grow new fur", "Migrate south"],
        correct: 1,
      },
      {
        id: 4,
        question: "What is the name for the deep sleep hedgehogs have in winter?",
        options: ["Dormancy", "Rest", "Hibernation", "Slumber"],
        correct: 2,
      },
      {
        id: 5,
        question: "What happens to the days in autumn?",
        options: ["They stay the same", "They become shorter and cooler", "They become longer and warmer", "They become longer and cooler"],
        correct: 1,
      },
    ],
  },
];

export const year3Comprehensions: Comprehension[] = [
  {
    id: "y3-ancient-egypt",
    title: "Ancient Egypt",
    year: 3,
    subject: "English",
    difficulty: "Year 3",
    text: `Ancient Egypt was one of the greatest civilisations in history. It existed along the banks of the River Nile in north Africa for over 3,000 years, from around 3100 BC to 30 BC.

The River Nile was essential to life in Ancient Egypt. Every year, the river flooded its banks, leaving behind a thick layer of rich, dark mud. This mud was perfect for growing crops such as wheat and barley. Without the Nile, the land would have been nothing but dry, empty desert.

The Ancient Egyptians built enormous structures called pyramids as tombs for their rulers, known as pharaohs. The most famous pyramids are found at Giza, near the modern city of Cairo. The Great Pyramid of Giza was built for Pharaoh Khufu around 2560 BC. It is made from over two million large stone blocks and is so precisely constructed that we still do not fully understand how it was built without modern machinery.

The Egyptians also developed one of the world's earliest writing systems, called hieroglyphics. Instead of letters, hieroglyphics used pictures and symbols to represent words and sounds. These symbols were carved into the walls of temples and painted inside tombs.

Ancient Egyptians believed in many gods and goddesses. Ra was the sun god, Osiris was the god of the afterlife, and Anubis was often depicted as a man with the head of a jackal.

Much of what we know about Ancient Egypt comes from studying mummies, paintings, and artefacts discovered by archaeologists over hundreds of years.`,
    questions: [
      {
        id: 1,
        question: "How long did the Ancient Egyptian civilisation last?",
        options: ["About 1,000 years", "About 3,000 years", "About 500 years", "About 5,000 years"],
        correct: 1,
      },
      {
        id: 2,
        question: "Why was the annual flooding of the River Nile important to Egyptians?",
        options: [
          "It brought fresh fish for eating",
          "It cooled the land in summer",
          "It left behind rich mud perfect for growing crops",
          "It washed away desert sand",
        ],
        correct: 2,
      },
      {
        id: 3,
        question: "For whom was the Great Pyramid of Giza built?",
        options: ["Pharaoh Ramesses", "Pharaoh Tutankhamun", "Pharaoh Nefertiti", "Pharaoh Khufu"],
        correct: 3,
      },
      {
        id: 4,
        question: "What was the Egyptian writing system called?",
        options: ["Cuneiform", "Sanskrit", "Hieroglyphics", "Latin"],
        correct: 2,
      },
      {
        id: 5,
        question: "Which Egyptian god was depicted with the head of a jackal?",
        options: ["Ra", "Osiris", "Anubis", "Horus"],
        correct: 2,
      },
    ],
  },
  {
    id: "y3-jungle-adventure",
    title: "Journey Through the Jungle",
    year: 3,
    subject: "English",
    difficulty: "Year 3",
    text: `Maya had always dreamed of exploring the Amazon rainforest. So when her father, a wildlife photographer, invited her to join his expedition to Brazil, she packed her bag immediately.

The rainforest was overwhelming in every way. The air was thick with heat and humidity, and every surface seemed to pulse with life. Brightly coloured parrots screeched overhead, their feathers flashing like jewels. Enormous blue morpho butterflies drifted past like scraps of sky.

On their second day, Maya's father stopped suddenly and held up his hand for silence. He pointed carefully to a branch just above the path. Draped across it, almost invisible against the bark, was a green tree boa. Its scales shimmered like polished emeralds as it lifted its head to watch them with calm, unblinking eyes.

"She won't hurt us," Maya's father whispered. "She's more scared of us than we are of her."

Later that afternoon, they heard a deep, rumbling sound rolling through the trees. Maya thought it was thunder, but her father smiled.

"Howler monkeys," he said. "Their call can be heard up to five kilometres away. They're the loudest land animals on Earth."

As the sun began to sink behind the canopy, painting the sky in shades of amber and rose, Maya sat quietly in a clearing and wrote in her journal. She understood now why her father loved this place so deeply. The rainforest was not just a place — it was a living, breathing, roaring world all of its own.`,
    questions: [
      {
        id: 1,
        question: "Why was Maya travelling to Brazil?",
        options: [
          "To take part in a school trip",
          "To join her father's wildlife photography expedition",
          "To visit her grandparents",
          "To compete in a jungle race",
        ],
        correct: 1,
      },
      {
        id: 2,
        question: "What did Maya see draped across a branch on the second day?",
        options: ["A giant spider", "A sleeping jaguar", "A green tree boa", "A howler monkey"],
        correct: 2,
      },
      {
        id: 3,
        question: "How were the snake's scales described?",
        options: [
          "Dull and rough like stone",
          "Shimmering like polished emeralds",
          "Patterned like autumn leaves",
          "Bright orange and red",
        ],
        correct: 1,
      },
      {
        id: 4,
        question: "How far away can the call of a howler monkey be heard?",
        options: ["Up to one kilometre", "Up to three kilometres", "Up to five kilometres", "Up to ten kilometres"],
        correct: 2,
      },
      {
        id: 5,
        question: "What did Maya do as the sun began to set?",
        options: [
          "She climbed a tall tree",
          "She took photographs",
          "She wrote in her journal",
          "She listened to the monkeys",
        ],
        correct: 2,
      },
    ],
  },
  {
    id: "y3-rainforest",
    title: "Rainforests of the World",
    year: 3,
    subject: "English",
    difficulty: "Year 3",
    text: `Tropical rainforests are found near the equator, in regions of the world where it is hot and wet throughout the year. The largest rainforest on Earth is the Amazon, which spreads across parts of Brazil and eight other countries in South America. Other major rainforests are found in Central Africa and Southeast Asia.

A rainforest is made up of several distinct layers. The tallest trees form the emergent layer, poking above all others and bathed in sunlight. Below this is the canopy, a thick, continuous cover of leaves and branches that blocks out much of the light. The understorey is a darker, shadier zone where plants have adapted to grow with very little sunlight. The forest floor, the lowest layer, receives almost no direct light at all.

Rainforests are home to an extraordinary variety of life. Although tropical rainforests cover only about six percent of the Earth's surface, they are thought to contain over half of the world's plant and animal species. This includes countless insects, birds, reptiles, mammals, and plants — many of which have not yet been discovered or named by scientists.

Unfortunately, rainforests are under serious threat. Every year, huge areas are cleared for farming, logging, and building. This is called deforestation. When trees are cut down, the animals that depend on them lose their homes. Rainforests also play a vital role in regulating the planet's climate, absorbing carbon dioxide and producing oxygen.

Scientists, governments, and local communities around the world are working to protect these precious ecosystems before it is too late.`,
    questions: [
      {
        id: 1,
        question: "Where are tropical rainforests found?",
        options: ["Near the North Pole", "Near the equator", "In cold mountain regions", "Along coastlines only"],
        correct: 1,
      },
      {
        id: 2,
        question: "Which layer of the rainforest receives almost no direct sunlight?",
        options: ["The emergent layer", "The canopy", "The understorey", "The forest floor"],
        correct: 3,
      },
      {
        id: 3,
        question: "What percentage of Earth's surface do tropical rainforests cover?",
        options: ["About two percent", "About six percent", "About twenty percent", "About fifty percent"],
        correct: 1,
      },
      {
        id: 4,
        question: "What is the name for the clearing of rainforest for farming and logging?",
        options: ["Pollution", "Erosion", "Deforestation", "Migration"],
        correct: 2,
      },
      {
        id: 5,
        question: "What important role do rainforests play in the planet's climate?",
        options: [
          "They create rainfall around the world",
          "They absorb carbon dioxide and produce oxygen",
          "They cool the oceans",
          "They prevent earthquakes",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "y3-dragon-cave",
    title: "The Dragon's Secret",
    year: 3,
    subject: "English",
    difficulty: "Year 3",
    text: `In the kingdom of Embervale, everyone feared the dragon that lived in the caves above the city. Every full moon, a distant roar would echo through the mountains, and the townsfolk would bolt their shutters and whisper fearfully to one another.

Everyone feared the dragon — except for a young girl named Freya.

Freya was twelve years old and intensely curious. She had spent months observing the mountain from a safe distance, noting that the dragon never came down to the town, never stole livestock, and never did anything threatening at all. She began to wonder whether the fear was truly deserved.

One crisp autumn morning, she packed a flask of warm soup and a wedge of cheese into her satchel and climbed the mountain path alone. As she neared the cave entrance, she heard not a terrifying roar, but a low, mournful sound — like someone crying.

Freya stepped inside. Curled in the furthest corner of the cave was an enormous copper-coloured dragon, its great head resting on its front claws. One of its wings was badly damaged, bent at an unnatural angle.

"You're hurt," said Freya softly.

The dragon raised its enormous head slowly. Its amber eyes, each as large as a dinner plate, fixed on her with an expression of surprise and — unmistakably — hope.

"I won't hurt you," said Freya. "I want to help."

And so began an unlikely friendship that would change both of their lives, and the fearful stories of Embervale, forever.`,
    questions: [
      {
        id: 1,
        question: "When would the distant roar echo through the mountains?",
        options: ["Every night at midnight", "Every full moon", "Every morning at dawn", "Every winter storm"],
        correct: 1,
      },
      {
        id: 2,
        question: "What had Freya noticed that made her think the dragon was not dangerous?",
        options: [
          "The dragon had made friends with the farmers",
          "The dragon never came down, stole livestock, or threatened anyone",
          "The dragon was too small to cause harm",
          "The villagers had told her it was friendly",
        ],
        correct: 1,
      },
      {
        id: 3,
        question: "What did Freya pack in her satchel?",
        options: [
          "A sword and a shield",
          "A map and a compass",
          "A flask of warm soup and a wedge of cheese",
          "Bandages and medicine",
        ],
        correct: 2,
      },
      {
        id: 4,
        question: "What colour was the dragon?",
        options: ["Emerald green", "Midnight blue", "Copper-coloured", "Silvery white"],
        correct: 2,
      },
      {
        id: 5,
        question: "What was wrong with the dragon?",
        options: [
          "It had a broken claw",
          "One of its wings was badly damaged",
          "It had lost one of its teeth",
          "It was very old and weak",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: "y3-ocean-life",
    title: "Life in the Ocean",
    year: 3,
    subject: "English",
    difficulty: "Year 3",
    text: `The ocean covers more than seventy percent of the Earth's surface, yet much of it remains unexplored. It is the world's largest habitat, home to an astonishing diversity of life — from the tiniest microscopic plankton to the enormous blue whale, the largest animal that has ever lived on Earth.

The ocean is divided into different zones based on depth. The sunlit zone is the uppermost layer, reaching down to about 200 metres. Here, sunlight penetrates the water, allowing plants and algae to photosynthesise. This zone teems with life: fish, sea turtles, dolphins, and sharks all live here.

Below the sunlit zone lies the twilight zone, where only a little light filters through. Animals here have developed remarkable adaptations. Many produce their own light through a process called bioluminescence, which they use to attract prey or communicate with others of their kind.

Deeper still is the midnight zone, plunged in total darkness and under immense pressure. Despite these extreme conditions, life still exists here. The anglerfish, for example, uses a glowing lure attached to its head to attract prey in the blackness.

Coral reefs, found in the warm, shallow waters of the sunlit zone, are among the most biodiverse ecosystems on Earth. Though they cover less than one percent of the ocean floor, coral reefs support around twenty-five percent of all marine species.

Sadly, the oceans are facing serious threats from pollution, overfishing, and climate change. Protecting our oceans is one of the most urgent challenges of our time.`,
    questions: [
      {
        id: 1,
        question: "How much of the Earth's surface does the ocean cover?",
        options: ["About fifty percent", "About sixty percent", "About seventy percent", "About eighty percent"],
        correct: 2,
      },
      {
        id: 2,
        question: "How deep does the sunlit zone reach?",
        options: ["About 100 metres", "About 200 metres", "About 500 metres", "About 1,000 metres"],
        correct: 1,
      },
      {
        id: 3,
        question: "What is bioluminescence?",
        options: [
          "A type of camouflage used by sea creatures",
          "The ability to produce one's own light",
          "A method of communication using sound",
          "A way of breathing without gills",
        ],
        correct: 1,
      },
      {
        id: 4,
        question: "What does the anglerfish use to attract prey in the midnight zone?",
        options: [
          "A bright pattern on its scales",
          "A loud clicking sound",
          "A glowing lure attached to its head",
          "A powerful electric shock",
        ],
        correct: 2,
      },
      {
        id: 5,
        question: "What percentage of all marine species do coral reefs support?",
        options: ["About five percent", "About ten percent", "About twenty-five percent", "About fifty percent"],
        correct: 2,
      },
    ],
  },
];

export function getComprehensionById(id: string): Comprehension | undefined {
  return [...year2Comprehensions, ...year3Comprehensions].find((c) => c.id === id);
}
