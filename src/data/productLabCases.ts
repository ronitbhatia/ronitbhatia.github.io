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
    id: "casio-dist-finder",
    title: "Dist Finder",
    type: "speculative",
    subject: "What if Casio made a Bluetooth item tracker?",
    oneLiner:
      "AirTag-class finders put all intelligence behind a locked phone screen, while Casio's audience wants a glanceable number and a battery they can swap themselves. Dist Finder is a Bluetooth item tracker shaped like a shrunken F-91W face, with an always-on LCD that shows distance in meters without opening an app.",
    period: "2026",
    problem:
      "Existing Bluetooth trackers treat the physical object as dumb hardware and place every useful answer inside an OS-locked app. Battery doors need special tools, sealed units get discarded, and checking whether a bag is nearby still means unlocking a phone. For the person who already wears a ten-dollar Casio calculator watch, that workflow fights the instinct they already trust: look at a screen, read a number, move on.",
    insight:
      "Casio's product language is glanceable digital readouts, user-serviceable batteries, and radical price-to-durability. The category problem is not whether Bluetooth can find keys. It is that no major tracker puts the answer on the object itself. Building the readout into the tracker reframes the product as a stopwatch for distance rather than a silent disc waiting for a phone.",
    principles: [
      "Information belongs on the object, not locked behind an app for the basic case",
      "User-replaceable power over sealed disposability",
      "Radical price-to-durability ratio, drugstore rather than boutique",
      "Toughness as the default specification, not a premium tier",
      "One core unit with accessories that adapt attachment, like Casio strap ecosystems",
    ],
    concept:
      "Dist Finder is a coin-sized Bluetooth tracker that looks like a shrunken F-91W watch face with the strap lugs removed: segmented LCD, silver bezel, two flat side buttons, visible screw heads, and a molded battery door. The always-on display shows live distance to the paired phone in meters. Side buttons cycle distance, proximity chevrons, and a plain clock mode. The coin cell pops open with a fingernail and coin-slot groove for DIY replacement. It ships blister-carded for pegboard retail around fifteen dollars, with a molded keyring hole and an optional carabiner accessory.",
    tradeoffs:
      "An always-on LCD and distance calculation use more power than a silent AirTag-class chip, so battery life is measured in months rather than years. BLE RSSI-to-distance is approximate, so the meter readout will sometimes be wrong, which is an awkward fit for a brand built on exact digital numbers. Without deep Find My or Google network integration, Dist Finder cannot crowd-source location outside Bluetooth range. It is an honest tool for is-it-in-this-room, not a competitor for where-in-the-world.",
    tags: ["Speculative", "Casio", "Hardware", "Bluetooth", "Tracker", "Consumer Electronics"],
    color: "hsl(32 95% 44%)",
    cover: {
      src: base("casio-dist-finder", "cover.png"),
      caption: "Dist Finder hero: a Casio-style tracker with distance on the object itself.",
    },
    gallery: [
      {
        src: base("casio-dist-finder", "01.png"),
        caption: "Coin-cell door: fingernail and coin-slot battery swap ritual.",
      },
      {
        src: base("casio-dist-finder", "02.png"),
        caption: "LCD modes: meters, proximity chevrons, and plain clock.",
      },
      {
        src: base("casio-dist-finder", "03.png"),
        caption: "Blister-card pegboard packing with keyring hole and optional clip.",
      },
    ],
  },
  {
    id: "hermes-ecoute",
    title: "Écoute",
    type: "speculative",
    subject: "What if Hermès made a headset?",
    oneLiner:
      "Someone whose bag, shoes, belt, and scarf are chosen with care still ends the day in headphones designed around spec sheets rather than worn objects. Écoute treats a headset the way Hermès treats a bag strap: saddle-stitched leather, hardware that ages, and reconditioning instead of annual plastic upgrades.",
    period: "2026",
    problem:
      "Premium audio brands optimize for driver graphs and noise-cancellation chips, then wrap the result in injection-molded plastic that yellows within a few years. Fashion houses already know how to make objects people wear daily and keep for decades, but almost none of that craft has been applied to headphones. The result is a wardrobe mismatch: everything else is chosen as a worn object, while the headset remains an engineering accessory that never quite belongs.",
    insight:
      "Hermès's advantage is not audio silicon. It is material, handwork, and a service culture built around reconditioning rather than replacement. A headset designed from that starting point reframes seasonal refresh as color and cushion swaps, and longevity as authorized repair, instead of a new chipset every year.",
    principles: [
      "Craft materials and visible handwork over injection-molded uniformity",
      "Design the object to be reconditioned, not upgraded every season",
      "Use color and material as the seasonal refresh instead of new chipsets",
      "Hardware details should feel continuous with bags and straps, not plastic ratchets",
      "Fold and travel like a bag handle, so the headset lives inside the rest of the wardrobe",
    ],
    concept:
      "Écoute is an over-ear headset with a saddle-stitched leather headband in natural barénia-adjacent leather and brushed steel yokes. Size adjustment uses a miniature turn-lock clasp rather than a plastic ratchet. Ear cups rotate and fold flat for travel. Cushions are interchangeable by color and material, like bag straps. Packaging follows the house language: orange box, felt dust bag, canvas travel pouch with leather trim, and a reconditioning card inviting the owner to bring it back for service rather than discard it.",
    tradeoffs:
      "Noise cancellation and driver performance will likely lag Sony or Bose, because R&D spend goes into tanning and stitching rather than silicon. This is a fashion object with audio inside it, not an audio product with fashion applied. Leather needs conditioning and will show wear patterns a plastic headband never will, which is either the point or a dealbreaker. Price will be justified largely by material and brand, which is an honest trade for the right customer and a poor one for anyone shopping on watts per dollar.",
    tags: ["Speculative", "Hermès", "Hardware", "Fashion", "Audio", "Craft"],
    color: "hsl(32 95% 44%)",
    cover: {
      src: base("hermes-ecoute", "cover.png"),
      caption: "Écoute hero: a headset designed as a worn object, not a plastic accessory.",
    },
    gallery: [
      {
        src: base("hermes-ecoute", "01.png"),
        caption: "Folded travel state: cups rotate flat like a bag handle going down.",
      },
      {
        src: base("hermes-ecoute", "02.png"),
        caption: "Turn-lock size clasp and interchangeable leather cushions.",
      },
      {
        src: base("hermes-ecoute", "03.png"),
        caption: "Orange-box packing with dust bag, travel pouch, and reconditioning card.",
      },
    ],
  },
  {
    id: "charge-for-life",
    title: "A Charge for Life",
    type: "speculative",
    subject: "What if Rolex made a power bank?",
    oneLiner:
      "People who buy mechanical watches because the object will outlive them still place scuffed plastic power bricks beside them on hotel nightstands. A Charge for Life is a steel power bank designed to be kept and serviced, so the charging accessory no longer apologizes for sitting next to everything else they own.",
    period: "2026",
    problem:
      "Most charging accessories are designed to be replaced within two years. Capacity and wattage keep climbing, but the objects themselves stay disposable: plastic shells, sealed cells, no service path. For someone whose watch, pen, and luggage are chosen for permanence, that mismatch is the real friction. They do not need more milliamps. They need a charging object that belongs with the rest of their things.",
    insight:
      "Rolex's brand promise is not novelty. It is permanence, mechanical legibility, and authorized service over decades. Applied to a power bank, the luxury is not peak wattage. It is a case designed to be opened, a cell module designed to be replaced, and a readout that reads like a power-reserve hand rather than a disposable LED strip.",
    principles: [
      "Permanence over disposability",
      "Mechanical legibility over digital percentage readouts",
      "Serviceability as the real luxury, not the finish alone",
      "The object should feel like something you charge a phone from, not something a phone outlives",
      "Design packaging and materials for a ten-year service relationship, not a two-year replace cycle",
    ],
    concept:
      "A Charge for Life is a squat cylinder in brushed 904L steel with a fluted bezel, visually close to a watch case until the recessed USB-C ports on the caseback appear. Unscrewing the bezel reveals a coiled braided steel-mesh cable stored under tension. Charge remaining is shown on a small analog gauge under sapphire crystal, with a sweeping hand calibrated like a power-reserve indicator. Cells are modular and meant to be swapped at an authorized service center. It ships in a fitted walnut travel case with a chamois cloth and a service booklet.",
    tradeoffs:
      "Steel is heavy, and airport security will notice. Charging is slower than a cheap anonymous brick because the internals prioritize thermal calm and cell longevity over peak wattage. Batteries degrade regardless of the case, so heirloom is aspirational rather than literal. The honest promise is that failing parts get replaced, not that the object never ages. Positioning risk remains if buyers expect immortal capacity rather than a serviceable shell.",
    tags: ["Speculative", "Rolex", "Hardware", "Luxury", "Power", "Serviceability"],
    color: "hsl(32 95% 44%)",
    cover: {
      src: base("charge-for-life", "cover.png"),
      caption: "A Charge for Life hero: a steel power bank lit like a Datejust.",
    },
    gallery: [
      {
        src: base("charge-for-life", "01.png"),
        caption: "Fluted bezel opens to a coiled steel-mesh cable bay.",
      },
      {
        src: base("charge-for-life", "02.png"),
        caption: "Analog charge gauge under sapphire, read like a power reserve.",
      },
      {
        src: base("charge-for-life", "03.png"),
        caption: "Walnut travel case, chamois, and service booklet for cell replacement.",
      },
    ],
  },
  {
    id: "rhode-frame",
    title: "Rhode Frame",
    type: "speculative",
    subject: "What if Rhode made a digital camera?",
    oneLiner:
      "Rhode built its identity on a specific aesthetic of skin, light, and minimal color, but that aesthetic still depends entirely on phone cameras and third-party editing to come through in photos. Rhode Frame is a compact digital camera tuned to render skin tone and soft light the way Rhode's own products are designed to look, turning the brand's visual language into hardware.",
    period: "2026",
    problem:
      "Rhode has built a loyal audience around a consistent visual identity across packaging, campaign imagery, and social content, yet that identity breaks down the moment a customer tries to recreate it. Phone cameras apply their own color science and skin smoothing, which fights against the exact softness and warmth Rhode's own photography relies on. Customers compensate with presets and filters that approximate the look but never quite match it, and the gap between brand imagery and everyday photos remains a constant source of friction for a community that treats aesthetic accuracy as a core part of the product experience.",
    insight:
      "Rhode's actual expertise is not photography, it is color and light as applied to skin, which is precisely the hardest problem in consumer camera tuning. A camera built by a beauty brand can start from skin tone rendering as the primary design constraint rather than a secondary correction applied after the fact. That reframes the product from a general-purpose camera with beauty filters bolted on to a camera whose entire color pipeline is built around one specific, well-understood use case.",
    principles: [
      "Tune color science around skin tone accuracy first, general scene rendering second",
      "Keep the interface to one dial and one shutter so the camera stays approachable",
      "Ship presets as calibrated looks, not filters layered on top of raw output",
      "Design hardware that photographs well itself, since the object will appear in its own content",
      "Treat the companion app as a light editing space, not a second camera app",
    ],
    concept:
      "Rhode Frame is a pocket-sized digital camera with a fixed lens and a single control dial for exposure. Its sensor and color profile are calibrated specifically for a range of skin tones under soft, mixed lighting, the exact conditions Rhode's own campaigns are shot in. Three built-in looks, developed with Rhode's creative team, replace a filter library with calibrated presets that adjust warmth and contrast without altering skin texture. The companion app handles transfer and light cropping, and deliberately stops short of duplicating a full editing suite.",
    tradeoffs:
      "Optimizing color science for skin tone under soft light means the camera will underperform in landscapes, low light, and high-contrast scenes, which limits its use to a narrow category of photography. A single-dial interface trades flexibility for approachability, and more advanced users will likely find it restrictive. Manufacturing a dedicated camera is a significant departure from Rhode's existing supply chain and retail model, and hardware margins differ substantially from skincare margins. The product also depends on a moment in culture where physical cameras remain desirable alongside phones, which is not guaranteed to hold.",
    tags: ["Speculative", "Rhode", "Hardware", "Beauty", "Photography", "Consumer Electronics"],
    color: "hsl(32 95% 44%)",
    cover: {
      src: base("rhode-digicam", "cover.png"),
      caption: "Rhode Frame hero: a digital camera calibrated for skin tone and soft light.",
    },
    gallery: [
      {
        src: base("rhode-digicam", "01.png"),
        caption: "Color pipeline built around skin tone accuracy under mixed lighting.",
      },
      {
        src: base("rhode-digicam", "02.png"),
        caption: "Single-dial interface with three calibrated looks in place of filters.",
      },
      {
        src: base("rhode-digicam", "03.png"),
        caption: "Companion app scoped to transfer and light cropping only.",
      },
    ],
  },
  {
    id: "fitbit-focus-monitor",
    title: "Fitbit Focus Monitor",
    type: "speculative",
    subject: "What if Fitbit made a computer monitor?",
    oneLiner:
      "Desk work shapes sleep, stress, and activity, yet fitness trackers only see the wrist while monitors only render pixels. Fitbit Focus Monitor treats the display as a health surface that senses posture, strain, and focus, then adjusts the setup and feeds those signals into the existing Fitbit dashboard.",
    period: "2026",
    problem:
      "Knowledge workers spend the majority of their day at a screen that does nothing to support their physical wellbeing. Wearables report heart rate and sleep only after the damage has already occurred. Blue light filters and posture reminders exist as disconnected point solutions that most users eventually stop using. No product currently owns the full loop from desk environment to health outcome while the work is actually happening.",
    insight:
      "Fitbit already holds longitudinal health context across sleep, stress, activity, and recovery. What is missing is visibility into the environment where desk-related strain actually originates. A monitor is positioned to sense the workspace continuously and respond to it in real time, then explain sleep and stress patterns using screen exposure and sitting behavior instead of generic wellness tips.",
    principles: [
      "Act during the workday itself, not only in retrospective reports",
      "Adjust the setup automatically before resorting to another notification",
      "Connect screen habits to sleep, stress, and activity in a single dashboard",
      "Protect deep focus by muting interruptions when concentration signals are strong",
      "Make sensing optional and visible through hardware-level privacy controls",
    ],
    concept:
      "Fitbit Focus Monitor is a desk display equipped with sensors for posture and viewing distance, blink and gaze tracking for eye strain, heart rate and stress detection through a base sensor, and ambient monitoring for light, noise, and air quality. It warms color temperature in the evening, prompts short movement breaks, offers guided breathing during stress spikes, and dims notifications during deep focus. The companion Fitbit app shows how late screen exposure and extended desk sessions relate to sleep quality and stress levels, going beyond a simple report that the previous night was poor.",
    tradeoffs:
      "Always-on workplace sensing raises legitimate privacy and employer-surveillance concerns that would need to be addressed directly. Camera or infrared posture tracking can feel invasive even with a hardware shutter in place. Heart-rate sensing from a monitor base is likely to be less accurate than a wrist-worn device. Automatic adjustments risk interrupting flow state if the timing is off. Competing against Dell, Apple, and a growing field of wellness startups in the monitor category requires significant investment. Medical claims must be carefully bounded so the product stays positioned as wellness support rather than diagnostic hardware.",
    tags: ["Speculative", "Fitbit", "Hardware", "Health", "Workplace", "Sensors"],
    color: "hsl(32 95% 44%)",
    cover: {
      src: base("fitbit-focus-monitor", "cover.png"),
      caption: "Fitbit Focus Monitor hero: a desk display that looks after the person behind it.",
    },
    gallery: [
      {
        src: base("fitbit-focus-monitor", "01.png"),
        caption: "Sensor stack: posture, eye strain, base heart rate, and ambient conditions.",
      },
      {
        src: base("fitbit-focus-monitor", "02.png"),
        caption: "Focus Mode: notifications fade while deep work continues.",
      },
      {
        src: base("fitbit-focus-monitor", "03.png"),
        caption: "Cause chain: late screen and long sitting linked to lighter sleep.",
      },
    ],
  },
  {
    id: "trend-mill",
    title: "Trend Mill",
    type: "speculative",
    subject: "What if Google made treadmills?",
    oneLiner:
      "Home cardio today means either live instructor classes or isolated simulated worlds, while people already use search and voice while walking to think. Trend Mill turns rising search interest into daily runnable routes and adapts Gemini answers to elevated heart rate, making Google's index the workout surface itself.",
    period: "2026",
    problem:
      "Existing fitness platforms compete on celebrity coaches or immersive game worlds, and Google does not hold either advantage today. Meanwhile, search curiosity, calendar context, and map knowledge remain disconnected from movement. The treadmill stays a dumb belt, and the moments when users are most curious to learn something new happen only after they have stopped moving.",
    insight:
      "Google's real advantage is not Street View in isolation. It is Trends, Maps, Calendar, and Gemini working together as a single system. Applied to a treadmill, that system can treat collective search interest as content, answer questions at a pace the body can actually process, and create social presence through aggregated behavior rather than live performers.",
    principles: [
      "Routes follow curiosity and rising search interest, not celebrity playlists",
      "Answer length shortens automatically as heart rate rises",
      "Social proof is asynchronous and anonymous, not built around live instructors",
      "Calendar context shapes session length ahead of real meetings",
      "Privacy controls are hardware-visible: a physical mute, no camera by default, and clear opt-outs",
    ],
    concept:
      "Trend Mill is a minimal home treadmill with a curved display and a hardware privacy switch. Trends Routes publish daily runs tied to rising search themes, rendered through Maps and Street View where terrain allows. Kinetic Search lets users query Gemini mid-run and receive breath-length answers that shorten under higher effort. Ghost Run overlays anonymous pace markers from other people who completed the same Trends Route in the previous day. Fitbit and Calendar integration set session length around the user's actual schedule.",
    tradeoffs:
      "Combining Trends, health, and Calendar data can feel invasive without firm boundaries and clearly visible opt-outs. Google's track record on product longevity conflicts with the multi-year expectations treadmill buyers typically hold. Street View immersion breaks down whenever incline cannot match real terrain. Ghost Run may read as cold compared to instructor-led communities. Sponsored Trends Routes would undermine trust quickly. Health and legal queries during a workout require stricter guardrails than a standard desktop search.",
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
      "Smart speakers are already common in homes, but trust remains low because users cannot easily tell when a device is listening or how their data is being used. Glyph Home proposes a voice-first assistant that uses Glyph state feedback and transparent hardware to make its behavior legible without relying on a screen.",
    period: "2026",
    problem:
      "This trust gap shows up in everyday behavior. Users mute their speakers, limit what they ask, or unplug the device outright. Without a clear listening indicator and an understandable boundary around data use, even a genuinely useful assistant ends up feeling like an opaque box sitting in the home.",
    insight:
      "Nothing already uses Glyph lighting to communicate device state without a full display. The same pattern extends naturally to AI assistants: voice carries the response, and a dot-matrix pattern communicates status. Visible hardware design can reinforce more transparent privacy behavior, particularly when paired with an explicit, physical listening indicator.",
    principles: [
      "Voice is the primary interface; visual feedback supports state, not content feeds",
      "Internal components remain visible by design to signal transparency",
      "Listening state is always obvious through a dedicated indicator and a physical mute",
      "Idle behavior should feel useful and human rather than promotional",
      "Local actions run on-device; cloud processing is used only for requests that need it",
    ],
    concept:
      "Glyph Home is a compact, transparent puck built for a desk or shelf. Users ask questions by voice and receive spoken answers alongside Glyph states such as listening, thinking, and complete. The product ships without a screen or camera by default. Setup happens through Nothing OS on the phone, and a hardware mute switch pairs with a visible red indicator whenever the microphone is active.",
    tradeoffs:
      "Complex answers that require maps, lists, or images still depend on a phone screen. Expression-only feedback may feel limited relative to chat-based interfaces. Transparent materials can age visually with regular use. The category is already crowded with Apple, Amazon, and phone-native assistants. A playful form factor may also undercut credibility in enterprise or care settings where trust matters most.",
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
      "Consumer maps often prioritize paid placement over genuinely useful local information, which quietly erodes trust at the exact moment a user is navigating. Commons Map applies Wikipedia's editorial model to places, so ranking is driven by citations and community maintenance rather than sponsorship.",
    period: "2026",
    problem:
      "The impact is practical rather than abstract. Travelers miss reliable restroom and safety information, hikers rely on outdated trail access data, and local businesses that offer better service lose visibility to paid listings. When ranking follows revenue rather than relevance, users stop trusting the map for decisions that actually matter.",
    insight:
      "Wikipedia demonstrates that community-maintained knowledge can scale with high trust when governance is clear. Mapping, by contrast, still relies heavily on ad-driven ranking. The opportunity is not simply better routing, but a map layer where placement is earned through citations and editorial process instead of payment.",
    principles: [
      "No sponsored pins in discovery or ranking",
      "Every place supports discussion, citations, and revision history",
      "Offline access is required to support low-connectivity and outdoor use cases",
      "Contributors are attributed with a transparent edit history",
      "Safety and accessibility data are treated as first-class map layers",
    ],
    concept:
      "Commons Map combines open routing data with a Wikipedia-style place layer. Each location includes sourced details, edit history, and dispute workflows. Dedicated layers cover restrooms, night safety, closures, and accessibility constraints. City editors maintain local accuracy using the same revert-and-discuss model already proven on Wikipedia.",
    tradeoffs:
      "Removing ads requires a sustainable funding model built on grants, institutions, or donations. Map vandalism creates more immediate safety risk than an encyclopedia edit ever would. Local editor bias can affect coverage quality over time. Data depth will vary significantly by region, and replacing commercial-grade traffic intelligence is expensive. A strict no-ads promise is difficult to sustain at global scale.",
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
      "Patients experience the most friction in waiting rooms when queue status is unclear and they have no way to plan around the delay. Care Queue treats waiting as a service surface, providing live stage updates, realistic time ranges, and optional status sharing for family members.",
    period: "2026",
    problem:
      "That uncertainty creates real operational drag. Front desks field repeated status questions, patients miss their name when it is called only once, and families wait without any update at all. The cumulative result is lower satisfaction scores, avoidable no-shows, and delays that cascade through the rest of a patient's day.",
    insight:
      "Patients tolerate wait time considerably better when they can see progress being made. The core source of frustration is uncertainty, not duration by itself. Treating waiting as an operational product surface, rather than dead time to be endured, can improve satisfaction without requiring any change to clinical capacity on day one.",
    principles: [
      "Show the current stage: checked in, with nurse, with doctor, imaging, checkout",
      "Provide realistic time ranges instead of optimistic fixed estimates",
      "Allow one trusted contact to follow queue status remotely",
      "Support brief time away from the waiting room without losing queue position",
      "Communicate delays early, with specific and updated time ranges",
    ],
    concept:
      "Care Queue gives each patient a live status card on phone or kiosk showing stage, position, and expected time range. A share link lets a family member follow progress from outside the clinic. An optional walk radius sends a return notification when the patient should head back. Messaging stays factual throughout and avoids gamified delay language.",
    tradeoffs:
      "Transparent delay data can affect public reviews during periods of peak load. Shared links introduce a privacy risk on shared devices. Walk notifications fail without reliable mobile connectivity. Staff may be tempted to adjust ranges to manage perception rather than reflect reality. Some clinicians may resist making delay visible to patients in the first place.",
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
      "Smartphones are designed around short upgrade cycles, which drives unnecessary e-waste and makes long-term ownership genuinely difficult. Worn In applies Patagonia's repair-first philosophy to a modular phone built for years of use, with replaceable parts and stable long-term software support.",
    period: "2026",
    problem:
      "Failure points are predictable: battery degradation, cracked screens, and camera issues often trigger a full replacement simply because repair paths are limited. Shortened software support windows compress the effective life of a device, and trade-in programs actively reinforce upgrade behavior rather than encouraging retention.",
    insight:
      "Patagonia's core product philosophy prioritizes durability, repair, and reduced unnecessary consumption. Applied to phones, the value proposition shifts away from newest-model status and toward reliable long-term utility. That shift creates a genuinely differentiated position within a category currently optimized for annual upgrades.",
    principles: [
      "Commit to long hardware support as a product requirement, not a marketing claim",
      "Make high-failure parts user-replaceable with standard tools",
      "Prioritize stability updates over feature churn in mature devices",
      "Use durable materials that age well under normal use",
      "Offer modular upgrades in place of full device replacement",
    ],
    concept:
      "Worn In is a repair-first phone with a replaceable battery, screen, and camera module. Software updates focus on security, performance, and battery health rather than new features. A lifetime repair program replaces the usual trade-in incentive. The product is positioned as a long-term tool that becomes more reliable over time, rather than one designed to be replaced every year.",
    tradeoffs:
      "A long product lifecycle directly conflicts with revenue models built around hardware upgrades. Repairability adds size and assembly complexity to the device. Modular camera performance is likely to trail fully integrated flagship systems. Carrier and platform partners may resist committing to extended OS support. Transferring brand trust from apparel to consumer electronics requires careful, deliberate positioning.",
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
      "CAPTCHA introduces avoidable friction at login and checkout, particularly for users on assistive technology, while still failing to stop advanced bots. Human Handshake shifts verification to passkey trust by default and reserves accessible challenges for sessions where risk actually warrants escalation.",
    period: "2026",
    problem:
      "The cost of this approach falls on product and support teams. Conversion drops during account recovery, accessibility complaints increase, and security teams respond by adding still more puzzles. Over time, the default gate ends up punishing real users more than it stops sophisticated automation.",
    insight:
      "Most sessions can already be trusted using device signals and modern authentication before any challenge is ever shown. CAPTCHA should function as a last-resort control rather than the default gate. Shifting verification effort from the user to the platform improves both security posture and completion rate, provided the fallback logic is designed clearly.",
    principles: [
      "Default to a trusted session flow for known devices and passkey users",
      "Use risk-based escalation instead of a universal puzzle challenge",
      "Ensure any required challenge is accessible and completable within ten seconds",
      "Disclose clearly when user input contributes to model training",
      "Provide an actionable recovery path when verification fails",
    ],
    concept:
      "Human Handshake uses passkeys and device attestation to handle routine access. High-risk sessions receive a single accessible verification step, offered in both audio and text form. Image-grid CAPTCHA appears only as a final fallback, with explicit reason codes and a human review path available after repeated failure.",
    tradeoffs:
      "Silent trust is inherently weaker against coordinated bot farms than constant puzzle challenges. Device attestation can exclude shared devices, older hardware, and privacy-focused browsers. Accessible challenges may also prove easier to automate than complex image tasks. Security stakeholders may resist reducing visible friction even when the data supports it.",
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
