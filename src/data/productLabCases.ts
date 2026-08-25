/**
 * Product Lab case studies: product thinking archive.
 * Images live in /public/product-lab/<id>/ (cover.png + 01-03.png).
 * Order: most recent work first.
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
    id: "trend-mill",
    title: "Trend Mill",
    type: "speculative",
    subject: "What if Google made treadmills?",
    oneLiner:
      "Home cardio usually means live instructor classes or lonely simulated worlds, while people already use search and voice while walking to think. Trend Mill turns rising search interest into daily runnable routes and shapes Gemini answers for elevated heart rate, so Google's index becomes the workout surface.",
    period: "2026",
    problem:
      "Existing fitness platforms compete on celebrity coaches or game worlds. Google does not own either advantage. Meanwhile, search curiosity, calendar context, and map knowledge stay disconnected from movement. The treadmill remains a dumb belt, and useful thinking happens only when users stop moving.",
    insight:
      "Google's edge is not Street View alone. It is Trends, Maps, Calendar, and Gemini used together. A treadmill can treat collective search interest as content, answer questions at a pace the body can handle, and provide social presence through aggregated behavior rather than live performers.",
    principles: [
      "Routes follow curiosity and rising search interest, not celebrity playlists",
      "Answer length shortens as heart rate rises",
      "Async social proof through anonymous runners, not live instructor performance",
      "Calendar context shapes session length before meetings",
      "Privacy controls are hardware-visible: mute, no camera by default, clear opt-outs",
    ],
    concept:
      "Trend Mill is a minimal home treadmill with a curved display and a hardware privacy switch. Trends Routes publish daily runs tied to rising search themes, rendered with Maps and Street View where terrain allows. Kinetic Search lets users ask Gemini mid-run with breath-length answers that shorten under high effort. Ghost Run shows anonymous pace markers from people who completed the same Trends Route in the last day. Fitbit and Calendar sync set session length around real schedules.",
    tradeoffs:
      "Combining Trends, health, and Calendar data can feel invasive without hard boundaries and obvious opt-outs. Google product lifespan risk conflicts with treadmill buyers who expect multi-year appliances. Street View immersion breaks when incline cannot match real terrain. Ghost Run may feel cold compared with instructor communities. Sponsored Trends Routes would destroy trust. Health and legal queries mid-workout need stricter guardrails than desktop Search.",
    tags: ["Speculative", "Google", "Fitness", "Trends", "Maps", "AI", "Hardware"],
    color: "hsl(32 95% 44%)",
    cover: {
      src: base("trend-mill", "cover.png"),
      caption: "Trend Mill hero: a treadmill driven by rising search interest.",
    },
    gallery: [
      {
        src: base("trend-mill", "01.png"),
        caption: "Trends Routes: daily runs sourced from rising search themes.",
      },
      {
        src: base("trend-mill", "02.png"),
        caption: "Ghost Run with Kinetic Search: anonymous runners plus mid-run Gemini.",
      },
      {
        src: base("trend-mill", "03.png"),
        caption: "Google One Fit: ad-free Trends, longer Kinetic Search, no sponsor bumpers.",
      },
    ],
  },
  {
    id: "glyph-home",
    title: "Glyph Home",
    type: "speculative",
    subject: "What if Nothing built an AI assistant device?",
    oneLiner:
      "Smart speakers are common in homes, but trust remains low because users cannot easily see when the device is listening or how their data is used. Glyph Home proposes a voice-first assistant that uses Glyph state feedback and transparent hardware to make behavior visible without relying on a screen.",
    period: "2026",
    problem:
      "The trust gap shows up in daily behavior: users mute speakers, limit what they ask, or unplug devices entirely. Without clear listening indicators and understandable data boundaries, even useful assistants feel like opaque boxes rather than household tools.",
    insight:
      "Nothing already uses Glyph to show device state without a full display. The same pattern applies to AI assistants: voice for responses, dot matrix for status. Visible hardware design can reinforce clearer privacy behavior, especially when paired with explicit listening indicators.",
    principles: [
      "Voice is the primary interface; visual feedback supports state, not content feeds",
      "Internal components are visible by design to signal transparency",
      "Listening state must be obvious through a dedicated indicator and physical mute",
      "Idle behavior should feel useful and human, not promotional",
      "Local actions run on device; cloud is used only for requested tasks",
    ],
    concept:
      "Glyph Home is a compact transparent puck for desk or shelf use. Users ask questions by voice and receive spoken answers plus Glyph states such as listening, thinking, and complete. The product ships without a screen or camera by default. Setup happens through Nothing OS on phone, with a hardware mute switch and visible red indicator when the microphone is active.",
    tradeoffs:
      "Complex answers that need maps, lists, or images still depend on phone screens. Expression-only feedback may feel limited compared with chat apps. Transparent materials can age visually over time. The category is crowded with Apple, Amazon, and phone-native assistants. A playful form factor may reduce credibility in enterprise or care settings where trust is critical.",
    tags: ["Speculative", "Nothing", "AI", "Hardware", "Glyph", "Voice"],
    color: "hsl(32 95% 44%)",
    cover: {
      src: base("glyph-home", "cover.png"),
      caption: "Glyph Home hero: voice-first assistant with dot-matrix feedback.",
    },
    gallery: [
      {
        src: base("glyph-home", "01.png"),
        caption: "Exploded view of shell, mic ring, PCB, and base components.",
      },
      {
        src: base("glyph-home", "02.png"),
        caption: "State system: idle, listening, thinking, and complete.",
      },
      {
        src: base("glyph-home", "03.png"),
        caption: "Unboxing and phone pairing flow in Nothing design language.",
      },
    ],
  },
  {
    id: "commons-map",
    title: "Commons Map",
    type: "speculative",
    subject: "What if Wikipedia made maps?",
    oneLiner:
      "Consumer maps often prioritize paid placement over useful local information, which weakens user trust at the moment of navigation. Commons Map applies Wikipedia's editorial model to places, so ranking is driven by citations and community maintenance rather than sponsorship.",
    period: "2026",
    problem:
      "The impact is practical, not abstract. Travelers miss reliable restroom and safety information, hikers get outdated trail access, and local businesses with better service can lose visibility to paid listings. When ranking follows revenue, users stop trusting the map for decisions that matter.",
    insight:
      "Wikipedia shows that community-maintained knowledge can scale with high trust when governance is clear. Mapping still relies heavily on ad-driven ranking. The opportunity is not only better routing, but a map layer where placement is earned through citations and editorial process rather than payment.",
    principles: [
      "No sponsored pins in discovery or ranking",
      "Every place supports discussion, citations, and revision history",
      "Offline access is required for low-connectivity and outdoor use cases",
      "Contributors are attributed with transparent edit history",
      "Safety and accessibility data are first-class map layers",
    ],
    concept:
      "Commons Map combines open routing data with a Wikipedia-style place layer. Each location includes sourced details, edit history, and dispute workflows. Dedicated layers cover restrooms, night safety, closures, and accessibility constraints. City editors maintain local accuracy using the same revert-and-discuss model used on Wikipedia.",
    tradeoffs:
      "Removing ads requires sustainable funding through grants, institutions, or donations. Map vandalism can create immediate safety risk compared with encyclopedia edits. Local editor bias can affect coverage quality. Data depth will vary by region, and replacing commercial traffic intelligence is costly. A strict no-ads promise is difficult to maintain at global scale.",
    tags: ["Speculative", "Wikipedia", "Maps", "Commons", "Trust"],
    color: "hsl(32 95% 44%)",
    cover: {
      src: base("commons-map", "cover.png"),
      caption: "Commons Map hero: navigation without paid placement.",
    },
    gallery: [
      {
        src: base("commons-map", "01.png"),
        caption: "Current model: paid placement can dominate local discovery.",
      },
      {
        src: base("commons-map", "02.png"),
        caption: "Place page with citations, discussion, and revision controls.",
      },
      {
        src: base("commons-map", "03.png"),
        caption: "Safety, restroom, and accessibility layers enabled together.",
      },
    ],
  },
  {
    id: "still-waiting",
    title: "Still Waiting",
    type: "redesign",
    subject: "Redesign: the clinic waiting room",
    oneLiner:
      "Patients experience the most friction in waiting rooms when queue status is unclear and they cannot plan around delay. Care Queue treats waiting as a service surface with live stage updates, realistic time ranges, and optional status sharing for family members.",
    period: "2026",
    problem:
      "That uncertainty creates operational drag. Front desks field repeated status questions, patients miss names when called once, and families wait without updates. The result is lower satisfaction scores, avoidable no-shows, and cascading lateness across the rest of a patient's day.",
    insight:
      "Patients tolerate wait time better when progress is visible. The core pain is uncertainty, not duration alone. Treating waiting as an operational product surface, not dead time, can improve satisfaction without changing clinical capacity on day one.",
    principles: [
      "Show current stage: checked in, with nurse, with doctor, imaging, checkout",
      "Provide realistic time ranges instead of optimistic fixed estimates",
      "Allow one trusted contact to follow queue status remotely",
      "Support brief away time without losing queue position",
      "Communicate delays early with specific updated ranges",
    ],
    concept:
      "Care Queue gives each patient a live status card on phone or kiosk with stage, position, and expected range. A share link lets a family member monitor progress outside the clinic. Optional walk radius sends a return notification when the patient should come back. Messaging stays factual and avoids gamified delay language.",
    tradeoffs:
      "Transparent delay data can affect public reviews during peak load. Shared links introduce privacy risk on shared devices. Walk notifications fail without reliable mobile connectivity. Staff may adjust ranges to manage perception. Some clinicians may resist making delay visible to patients.",
    tags: ["Redesign", "Healthcare", "Operations", "Service Design"],
    color: "hsl(207 89% 42%)",
    cover: {
      src: base("still-waiting", "cover.png"),
      caption: "Still Waiting hero: uncertainty as the primary patient pain point.",
    },
    gallery: [
      {
        src: base("still-waiting", "01.png"),
        caption: "Current state: static room with limited status visibility.",
      },
      {
        src: base("still-waiting", "02.png"),
        caption: "Care Queue card with stage, range, and family share option.",
      },
      {
        src: base("still-waiting", "03.png"),
        caption: "Walk radius flow with return notification before appointment slot.",
      },
    ],
  },
  {
    id: "the-last-phone",
    title: "The Last Phone",
    type: "speculative",
    subject: "What if Patagonia made a smartphone?",
    oneLiner:
      "Smartphones are designed around short upgrade cycles, which increases e-waste and makes long-term ownership difficult. Worn In applies Patagonia's repair-first philosophy to a modular phone built for years of use, with replaceable parts and stable long-term software support.",
    period: "2026",
    problem:
      "Failure points are predictable: battery degradation, cracked screens, and camera issues often trigger full replacement because repair paths are limited. Software support windows shorten effective device life, and trade-in programs reinforce upgrade behavior instead of retention.",
    insight:
      "Patagonia's core product philosophy favors durability, repair, and reduced unnecessary consumption. Applied to phones, the value proposition shifts from newest model status to reliable long-term utility. That creates a differentiated position in a category optimized for annual upgrades.",
    principles: [
      "Commit to long hardware support as a product requirement, not marketing language",
      "Make high-failure parts user-replaceable with standard tools",
      "Prioritize stability updates over feature churn in mature devices",
      "Use durable materials that age well with normal use",
      "Offer modular upgrades instead of full device replacement",
    ],
    concept:
      "Worn In is a repair-first phone with replaceable battery, screen, and camera module. Software updates focus on security, performance, and battery health. A lifetime repair program replaces trade-in incentives. The product is positioned as a long-term tool that improves in reliability over time rather than forcing yearly replacement.",
    tradeoffs:
      "Long lifecycle design conflicts with hardware upgrade revenue models. Repairability adds size and assembly complexity. Modular camera performance may trail flagship integrated systems. Carrier and platform partners may resist extended OS commitments. Brand transfer from apparel to consumer electronics requires careful positioning.",
    tags: ["Speculative", "Patagonia", "Hardware", "Repair", "Sustainability"],
    color: "hsl(32 95% 44%)",
    cover: {
      src: base("the-last-phone", "cover.png"),
      caption: "Worn In hero: a phone designed to stay in use for years.",
    },
    gallery: [
      {
        src: base("the-last-phone", "01.png"),
        caption: "Tool-less battery and modular component access.",
      },
      {
        src: base("the-last-phone", "02.png"),
        caption: "Repair desk as core service touchpoint.",
      },
      {
        src: base("the-last-phone", "03.png"),
        caption: "Stable OS update policy focused on security and performance.",
      },
    ],
  },
  {
    id: "select-all-buses",
    title: "Select All Buses",
    type: "redesign",
    subject: "Redesign: web bot verification (CAPTCHA)",
    oneLiner:
      "CAPTCHA creates avoidable friction at login and checkout, especially for users on assistive technology, while still failing against advanced bots. Human Handshake shifts verification to passkey trust by default and uses accessible challenges only when session risk requires escalation.",
    period: "2026",
    problem:
      "The cost lands on product and support teams. Conversion drops at account recovery, accessibility complaints increase, and security teams compensate by adding more puzzles. Over time, the default gate punishes real users more than it stops sophisticated automation.",
    insight:
      "Most sessions can be trusted using device signals and modern authentication before showing a challenge. CAPTCHA should be a last-resort control, not the default gate. Shifting verification effort from users to the platform improves both security posture and completion rate when designed with clear fallback logic.",
    principles: [
      "Default to trusted session flow for known devices and passkey users",
      "Use risk-based escalation instead of universal puzzle challenges",
      "Ensure any required challenge is accessible within 10 seconds",
      "Disclose when user input contributes to model training",
      "Provide actionable recovery when verification fails",
    ],
    concept:
      "Human Handshake uses passkeys and device attestation for routine access. High-risk sessions receive one accessible verification step with audio and text alternatives. Image-grid CAPTCHA appears only as a final fallback, with explicit reason codes and a human review path for repeated failure.",
    tradeoffs:
      "Silent trust is weaker against coordinated bot farms than constant puzzles. Device attestation can exclude shared devices, older hardware, and privacy-focused browsers. Accessible challenges may be easier to automate than complex image tasks. Security stakeholders may resist reducing visible friction.",
    tags: ["Redesign", "Trust", "Accessibility", "Auth", "Web"],
    color: "hsl(207 89% 42%)",
    cover: {
      src: base("select-all-buses", "cover.png"),
      caption: "Select All Buses hero: reframing web verification as a trust product.",
    },
    gallery: [
      {
        src: base("select-all-buses", "01.png"),
        caption: "Current flow: high-friction visual challenge at entry points.",
      },
      {
        src: base("select-all-buses", "02.png"),
        caption: "Trusted path with passkey and no puzzle step.",
      },
      {
        src: base("select-all-buses", "03.png"),
        caption: "Accessible fallback designed for screen reader completion.",
      },
    ],
  },
];

export function getProductLabCase(id: string): ProductLabCase | undefined {
  return productLabCases.find((c) => c.id === id);
}
