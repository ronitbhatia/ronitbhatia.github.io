/**
 * Product Lab case studies: product thinking archive.
 * Images live in /public/product-lab/<id>/ (cover.png + 01-03.png).
 */

export type ProductLabType = "redesign" | "speculative";

export interface ProductLabImage {
  src: string;
  caption: string;
}

export interface ProductLabCase {
  id: string;
  title: string;
  type: ProductLabType;
  subject: string;
  oneLiner: string;
  period: string;
  problem: string;
  insight: string;
  principles: string[];
  concept: string;
  tradeoffs: string;
  tags: string[];
  color: string;
  cover: ProductLabImage;
  gallery: ProductLabImage[];
}

const base = (id: string, file: string) => `/product-lab/${id}/${file}`;

export const productLabCases: ProductLabCase[] = [
  {
    id: "select-all-buses",
    title: "Select All Buses",
    type: "redesign",
    subject: "CAPTCHA and bot-proofing on the web",
    oneLiner: "Stop making humans do machine work to prove they are not machines.",
    period: "2026",
    problem:
      "CAPTCHA is the web's citizenship test, and it is designed for bots. Users click nine blurry tiles of traffic lights while a company decides if they deserve to log in. Accessibility is an afterthought. Time is stolen from the person who already paid with their attention.",
    insight:
      "We inverted the burden of proof. The site does not know if you are human, so you do unpaid visual labor until a model is satisfied. Trust should be a handshake, not a puzzle. CAPTCHA should be the last resort, not the front door.",
    principles: [
      "Assume the user is human until the system has a reason not to",
      "Passkeys and device trust beat picture grids for almost everyone",
      "If a challenge is required, it must be completable with a screen reader in under 10 seconds",
      "Never train your model on unpaid user labor without saying so",
      "Failure should explain the next step, not reload nine new tiles",
    ],
    concept:
      "Human Handshake. Returning devices pass silently with passkey plus device attestation. First-time or risky sessions get one accessible question (a short spoken phrase or a single obvious photo) with an immediate audio and text alternative. Puzzle grids exist only as a third fallback, with a visible reason and a human review path.",
    tradeoffs:
      "Silent trust is weaker against sophisticated bot farms than endless puzzles. Device attestation can exclude shared computers, older phones, and privacy-first browsers. Accessibility-first challenges are easier to farm than 4x4 object grids. Some security teams will not accept a product that makes friction optional.",
    tags: ["Redesign", "Trust", "Accessibility", "Auth", "Web"],
    color: "hsl(207 89% 42%)",
    cover: {
      src: base("select-all-buses", "cover.png"),
      caption: "Hero: Select All Buses, the web's worst job interview.",
    },
    gallery: [
      {
        src: base("select-all-buses", "01.png"),
        caption: "Today: unpaid visual labor to enter a site you already use.",
      },
      {
        src: base("select-all-buses", "02.png"),
        caption: "Handshake: passkey, then you are in. No grid.",
      },
      {
        src: base("select-all-buses", "03.png"),
        caption: "Fallback that a screen reader can finish in seconds.",
      },
    ],
  },
  {
    id: "the-last-phone",
    title: "The Last Phone",
    type: "speculative",
    subject: "What if Patagonia made a smartphone?",
    oneLiner: "A phone designed to be kept, repaired, and worn in, not replaced.",
    period: "2026",
    problem:
      "Phones are sold as identity and discarded as trash. Eighteen-month upgrade cycles, sealed batteries, software that slows on purpose. The object in your pocket is optimized for the next purchase, not the next decade.",
    insight:
      "Patagonia's product philosophy is anti-consumption: repair, reuse, refuse the upgrade. Applied to a phone, that would invert the entire category. The status object would not be the newest model. It would be the one that still works, still gets parts, and still looks better after five years of scuffs.",
    principles: [
      "Ten-year hardware support is a feature, not a press release",
      "Every high-failure part (battery, screen, camera) is user-replaceable with one tool",
      "Software should get quieter over time, not louder with ads and AI nags",
      "Worn materials beat glossy glass: leather, recycled aluminum, visible stitching",
      "The upgrade path is a module, not a new identity",
    ],
    concept:
      "Worn In. A thick, repairable phone with a stitched sleeve, a pop-out battery, and a camera module you can swap. OS updates are security and battery, not a new home screen. A lifetime repair desk, not a trade-in funnel. You buy it once. You keep it because it is yours, not because it is current.",
    tradeoffs:
      "A 10-year phone destroys the upgrade revenue most manufacturers depend on. Repairability adds bulk, which fashion buyers may reject. Camera modules will lag flagship sensors. Carriers and app stores fight long OS support. Patagonia's outdoor brand may not transfer to consumer electronics without looking like a costume.",
    tags: ["Speculative", "Patagonia", "Hardware", "Repair", "Sustainability"],
    color: "hsl(32 95% 44%)",
    cover: {
      src: base("the-last-phone", "cover.png"),
      caption: "Worn In: a Patagonia phone that looks better after five years.",
    },
    gallery: [
      {
        src: base("the-last-phone", "01.png"),
        caption: "One tool, pop-out battery, no glue.",
      },
      {
        src: base("the-last-phone", "02.png"),
        caption: "Repair desk as the hero, not a trade-in kiosk.",
      },
      {
        src: base("the-last-phone", "03.png"),
        caption: "Quiet OS: security updates, no carnival of badges.",
      },
    ],
  },
  {
    id: "still-waiting",
    title: "Still Waiting",
    type: "redesign",
    subject: "The clinic waiting room",
    oneLiner: "The pain is not the wait. The pain is not knowing.",
    period: "2026",
    problem:
      "The most common healthcare interface is a silent room, a clipboard, and a 40-minute unknown. You cannot leave. You cannot plan. A name is barked once. Families sit in a second city with no signal. Anxiety fills the gap that information should have occupied.",
    insight:
      "Clinics treat waiting as leftover time, not a designed product. Patients will tolerate delay if they can see the shape of it. Uncertainty, not duration, is what makes people furious and late for the rest of their day.",
    principles: [
      "Name the stage: checked in, with nurse, with doctor, imaging, checkout",
      "Give an honest range, not a fake 5-minute promise",
      "Let one family member follow along from outside the building",
      "Tell people what they can do now (bathroom, form, walk) without losing their place",
      "Never bury bad news in a polite delay. If the doctor is running 50 minutes, say 50 minutes",
    ],
    concept:
      "Care Queue. A single live card (text or kiosk) that shows your place, the current stage, and a range. Share-link for a family member. Optional walk radius: leave for coffee and get a ping when you should return. No gamified 'you saved 2 minutes' copy. Just the truth of the queue.",
    tradeoffs:
      "Honest ETAs can make a packed clinic look worse on Google reviews. Share-links create privacy risk if a phone is borrowed. Walk-radius pings fail in dead zones and for patients without phones. Staff may game the board to keep ranges pretty. Some clinicians will resist a product that makes their delay visible.",
    tags: ["Redesign", "Healthcare", "Operations", "Anxiety", "Service Design"],
    color: "hsl(207 89% 42%)",
    cover: {
      src: base("still-waiting", "cover.png"),
      caption: "Hero: Still Waiting. The pain is not knowing.",
    },
    gallery: [
      {
        src: base("still-waiting", "01.png"),
        caption: "Today: a silent room and a number that never moves.",
      },
      {
        src: base("still-waiting", "02.png"),
        caption: "Care Queue: stage, range, share with family.",
      },
      {
        src: base("still-waiting", "03.png"),
        caption: "Walk radius: leave, get pinged, keep your place.",
      },
    ],
  },
  {
    id: "commons-map",
    title: "Commons Map",
    type: "speculative",
    subject: "What if Wikipedia made Google Maps?",
    oneLiner: "Navigation as a commons: local knowledge, no sponsored pins.",
    period: "2026",
    problem:
      "Maps are optimized for advertisers. The pin that rises is the one that paid. Gas, food, and 'places of interest' are a marketplace wearing a compass. Travelers looking for a quiet restroom, a safe night walk, or the actual trailhead get a mall instead.",
    insight:
      "Wikipedia proved a commons can beat a corporation when trust is the product. Maps still run on the opposite model: attention sold to the highest bidder. The missing product is not better routing. It is a layer of knowledge nobody can buy to the top.",
    principles: [
      "No sponsored pins. Ever. Placement is earned by citations and local edits",
      "Every place has a talk page: what is true, what changed, who disagrees",
      "Offline-first for trails, transit strikes, and neighborhoods with bad signal",
      "Contributors are named, not ghosted into an algorithm",
      "Safety and access (lighting, steps, restrooms) are first-class layers, not buried reviews",
    ],
    concept:
      "Commons Map. Open routing on public data, with a Wikipedia-style layer for places: sourced, disputable, revertible. A restroom layer, a night-safety layer, a 'this closed last Tuesday' layer. No ads. Editors in the city own the page the way they own an article. You navigate with a commons, not a storefront.",
    tradeoffs:
      "No ad revenue means grants, cities, or donations, all fragile. Vandalism on a live map is more dangerous than on an encyclopedia (a fake road, a fake clinic). Local editors can encode bias. Coverage will be rich in Berlin and thin in rural counties. Google-quality traffic data is expensive to replace. 'No ads' is a product promise that is hard to keep at global scale.",
    tags: ["Speculative", "Wikipedia", "Maps", "Commons", "Trust"],
    color: "hsl(32 95% 44%)",
    cover: {
      src: base("commons-map", "cover.png"),
      caption: "A map with no pins to sell.",
    },
    gallery: [
      {
        src: base("commons-map", "01.png"),
        caption: "Today: the highest pin paid for the ranking.",
      },
      {
        src: base("commons-map", "02.png"),
        caption: "Talk page on a place: cited, disputed, revertible.",
      },
      {
        src: base("commons-map", "03.png"),
        caption: "Safety and restrooms as first-class layers.",
      },
    ],
  },
  {
    id: "glyph-home",
    title: "Glyph Home",
    type: "speculative",
    subject: "What if Nothing built an AI assistant device?",
    oneLiner: "A voice-first helper with a face made of dots, not a screen full of ads.",
    period: "2026",
    problem:
      "Smart speakers are black cylinders that listen all day and show nothing except a ring of light. They feel like surveillance furniture. The assistant inside is helpful sometimes, but the object on your shelf has no personality, no transparency, and no trust.",
    insight:
      "Nothing already solved expressive hardware with Glyph: emotion without a display, honesty through visible internals. An AI assistant does not need another glass rectangle. It needs a face you can read, a body you can see through, and a brand promise that the device is not pretending to be invisible.",
    principles: [
      "Voice first. The primary UI is sound and a dot-matrix face, not a feed",
      "Show the guts: PCB, mic array, and heat sink are part of the design, not hidden",
      "One red record dot. When it listens, you know. No ambient always-on ambiguity",
      "Playful by default: idle animations, not upsell cards",
      "Local tasks stay local. Cloud is for what you ask, not for background profiling",
    ],
    concept:
      "Glyph Home. A small transparent puck for the desk or kitchen shelf. Ask it anything; it answers with voice and a Glyph expression (listening, thinking, joking, done). No screen. No camera by default. A physical mute switch and a visible red LED when the mic is hot. Nothing OS pairs it to your phone for setup; after that it is an object with character, not a portal to a store.",
    tradeoffs:
      "Without a screen, rich answers (maps, lists, photos) still need your phone. Glyph expressions can feel limited compared to ChatGPT apps. Transparent plastic yellows over years. Nothing would compete with Apple HomePod, Amazon Echo, and every phone assistant already in pocket. A playful device may read as toy in enterprise or elder-care contexts where trust matters most.",
    tags: ["Speculative", "Nothing", "AI", "Hardware", "Glyph", "Voice"],
    color: "hsl(32 95% 44%)",
    cover: {
      src: base("glyph-home", "cover.png"),
      caption: "Glyph Home: an AI assistant with a dot-matrix soul.",
    },
    gallery: [
      {
        src: base("glyph-home", "01.png"),
        caption: "Exploded view: shell, mic ring, PCB, and base — nothing hidden.",
      },
      {
        src: base("glyph-home", "02.png"),
        caption: "Glyph expressions: idle, listening, thinking, done.",
      },
      {
        src: base("glyph-home", "03.png"),
        caption: "Nothing-style packaging and phone pairing setup.",
      },
    ],
  },
];

export function getProductLabCase(id: string): ProductLabCase | undefined {
  return productLabCases.find((c) => c.id === id);
}
