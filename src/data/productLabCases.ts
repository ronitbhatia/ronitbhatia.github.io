/**
 * Product Lab case studies: product thinking archive.
 * Images live in /public/product-lab/<id>/ as optimized WebP (cover.webp + gallery).
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
  validation: string;
  verdict: string;
  tags: string[];
  color: string;
  cover: ProductLabImage;
  gallery: ProductLabImage[];
}

// Independent product assessments. Proposals and validation plans are not research results.
export const productLabCases: ProductLabCase[] = [
  {
    "id": "blackberry-keyline",
    "title": "Keyline",
    "type": "redesign",
    "subject": "Should BlackBerry return with a keyboard-first phone?",
    "oneLiner": "Keyline evaluates a focused communication device for professionals who prefer physical typing and selective interruptions. My recommendation is to test demand through a hardware partner before funding a full platform.",
    "period": "2026",
    "problem": "The target customer needs to respond to important people without giving every app the same access to their attention. A keyboard and priority light could serve that job, but a smaller screen and a second device create switching costs. Nostalgia is a recruitment signal, not proof of sustained demand.",
    "insight": "The strategic fit is the communication experience, not ownership of another app ecosystem. Compare a partner-built phone with a keyboard accessory and a priority-inbox app. Hardware earns investment only if the combined experience delivers enough value that software alone cannot.",
    "principles": [
      "Preserve essential app compatibility",
      "Prioritise typing and selective reachability",
      "Make hardware states explicit",
      "Fund support before expanding scope"
    ],
    "concept": "The MVP would pair physical QWERTY keys, configurable shortcuts, a contact-priority LED, and supported Android apps. Start the Hub with email and SMS where access is available. Defer AI replies, iPhone companion mode, and the proposed QNX isolation layer. Sensor isolation and radio-off controls need distinct, understandable states: radios off means no incoming messages.",
    "tradeoffs": "Keyboard space reduces browsing and media utility. Platform compatibility, manufacturing yield, returns, and years of security updates determine unit economics. A hardware switch does not establish whole-device security. The wider architecture shown in the renders would need feasibility work and independent review.",
    "tags": [
      "Redesign",
      "BlackBerry",
      "Hardware",
      "Privacy",
      "Productivity",
      "Mobile"
    ],
    "color": "hsl(215 15% 25%)",
    "cover": {
      "src": "/product-lab/blackberry-keyline/cover.webp",
      "caption": "Concept illustration: keyline: a matte black keyboard phone on dark slate, with a single red priority light. Be reachable. On your terms."
    },
    "gallery": [
      {
        "src": "/product-lab/blackberry-keyline/01.webp",
        "caption": "Concept illustration: physical QWERTY: sculpted keys, proposed touch-sensitive scrolling, and hold-to-launch shortcuts."
      },
      {
        "src": "/product-lab/blackberry-keyline/02.webp",
        "caption": "Concept illustration: visible controls: a contact-priority LED and proposed hardware power isolation. Radios off means unreachable."
      },
      {
        "src": "/product-lab/blackberry-keyline/03.webp",
        "caption": "Concept illustration: the Hub: a proposed priority inbox across supported services, with local sorting and reply drafts."
      },
      {
        "src": "/product-lab/blackberry-keyline/04.webp",
        "caption": "Concept illustration: individual-first setup: Work Mode and Life Mode, with optional workplace enrolment and a proposed isolated work environment."
      }
    ],
    "validation": "Recruit keyboard-preferring professionals for a multi-week comparison with their current phone. Track continued daily use, essential-app failures, typing comfort, and missed priority messages. Test willingness to pay against a partner quote that includes warranty and software support before setting a launch gate.",
    "verdict": "Pilot through a partner; do not launch the full concept yet. I favour the keyboard and attention controls, but would remove the unproven security architecture from the initial promise. I would stop if users enjoy the demo but return to their primary phone, or if support costs make the niche uneconomic."
  },
  {
    "id": "ipod-transport",
    "title": "iPod Transport",
    "type": "speculative",
    "subject": "Should Apple bring back iPod as a dedicated streaming player?",
    "oneLiner": "Transport tests whether focused listening justifies another device. I would validate the behaviour first, rather than commit to a new hardware line on the strength of iPod familiarity.",
    "period": "2026",
    "problem": "The primary segment is listeners who reach for music and get pulled into other phone activity. Parents choosing a first device are a separate segment with different setup and control needs. Both can use existing devices, so the problem is not access to music; it is avoiding unwanted attention shifts.",
    "insight": "The product must outperform a phone in Focus mode or an existing wearable on deliberate listening, not simply look distinctive. Apple could connect hardware and music services, but the commercial case depends on incremental demand after accounting for overlap with its other devices.",
    "principles": [
      "Prove a benefit over existing devices",
      "Keep playback and offline access central",
      "Separate adult and parent needs",
      "Treat finish as supporting design"
    ],
    "concept": "Test a player with a tactile edge dial, downloaded music, basic playback, and familiar streaming libraries where integrations permit. Defer the parent-focused offer until account setup and parental controls have been tested separately. Burgundy is a design option, not a reason to buy.",
    "tradeoffs": "Users take on another purchase, charging habit, and object to carry. Service licensing, offline entitlements, battery life, and support costs constrain the offer. A premium finish may conflict with an affordable first-device position. A touch-sensitive ring also needs usability testing rather than assumed eyes-free operation.",
    "tags": [
      "New product assessment",
      "Apple",
      "iPod",
      "Audio",
      "Hardware",
      "Digital Wellbeing"
    ],
    "color": "hsl(345 42% 26%)",
    "cover": {
      "src": "/product-lab/ipod-transport/cover.webp",
      "caption": "Concept illustration: transport in satin Burgundy: full-bleed album art against a near-black wine-red backdrop."
    },
    "gallery": [
      {
        "src": "/product-lab/ipod-transport/01.webp",
        "caption": "Concept illustration: home: five listening-focused destinations, warm off-white text, and a subtle Burgundy selection highlight."
      },
      {
        "src": "/product-lab/ipod-transport/02.webp",
        "caption": "Concept illustration: edge dial: a satin Burgundy touch-sensitive ring with a recessed groove to locate by feel."
      },
      {
        "src": "/product-lab/ipod-transport/03.webp",
        "caption": "Concept illustration: offline Library: downloaded listening in the same dark, quiet interface."
      },
      {
        "src": "/product-lab/ipod-transport/04.webp",
        "caption": "Concept illustration: idle state: album art and a clock, with a restrained bezel glow at a track change."
      }
    ],
    "validation": "Compare a limited prototype with phone-only listening over several weeks. Measure listening sessions completed without returning to the phone, repeat use after novelty fades, and willingness to pay. Check whether demand is incremental or mainly replaces purchases of existing devices.",
    "verdict": "Do not fund a standalone launch yet. I prefer a focused listening test over a nostalgia-led hardware release. I would reconsider if users consistently choose the separate device and that preference survives a realistic price and charging routine."
  },
  {
    "id": "iphone-air-monocoque",
    "title": "Monocoque",
    "type": "redesign",
    "subject": "Should Apple use a structural battery to redesign iPhone Air?",
    "oneLiner": "Monocoque explores moving iPhone Air battery storage into the frame to free interior space for optics and cooling. I would keep this as an R&D study, not recommend it as the next shipping design.",
    "period": "2026",
    "problem": "This case assumes a thin-phone customer wants more usable battery life and sustained performance without a larger body. The design problem is competing demands on internal volume. The first question is which compromise customers would actually pay to remove, rather than whether the internal layout can look more elegant.",
    "insight": "A structural battery could change the space allocation, but it also joins two failure domains: enclosure damage and energy storage. Compare it with a slightly thicker body, a different component layout, and narrower feature scope. A simpler design may deliver more customer value with less lifecycle risk.",
    "principles": [
      "Rank customer outcomes before components",
      "Compare simpler alternatives",
      "Treat repair as a design requirement",
      "Separate feasibility from launch readiness"
    ],
    "concept": "Commission a feasibility prototype of the proposed perimeter cell before pursuing the illustrated periscope, vapor chamber, or MagSafe arrangement. Define capacity, drop resistance, thermal behaviour, repair procedure, and manufacturing yield requirements together. The renders describe a direction, not an engineered system.",
    "tradeoffs": "Capacity and cooling improvements are unproven. Damage to the frame could complicate battery safety and repair. Replacement cost, certification, yield, and service training may outweigh any gain in thinness. The product decision must include total ownership cost, not just internal space.",
    "tags": [
      "Redesign",
      "Apple",
      "iPhone Air",
      "Hardware",
      "Battery",
      "Thermal"
    ],
    "color": "hsl(207 89% 42%)",
    "cover": {
      "src": "/product-lab/iphone-air-monocoque/cover.webp",
      "caption": "Concept illustration: monocoque hero: the frame is the battery, so the center finally has room."
    },
    "gallery": [
      {
        "src": "/product-lab/iphone-air-monocoque/01.webp",
        "caption": "Concept illustration: cutaway: laminated structural cell inside the titanium perimeter band."
      },
      {
        "src": "/product-lab/iphone-air-monocoque/02.webp",
        "caption": "Concept illustration: freed center: side-laid periscope under one flush camera window."
      },
      {
        "src": "/product-lab/iphone-air-monocoque/03.webp",
        "caption": "Concept illustration: full-panel vapor chamber and MagSafe coils against the ring battery."
      },
      {
        "src": "/product-lab/iphone-air-monocoque/04.webp",
        "caption": "Concept illustration: exterior: cherry-red Air body with dual-camera plateau and ultra-thin profile."
      }
    ],
    "validation": "Benchmark prototypes against a conventional battery design under matched workloads. Review usable capacity, heat, durability, repair time, cost, and production yield. Separately test customer preference for thinness versus a modest increase in thickness and battery life.",
    "verdict": "Do not ship this architecture on the evidence available. I prefer a conventional battery and a more balanced thickness target for a near-term product. I would revisit structural storage only after safety, capacity, repairability, and yield are proven together."
  },
  {
    "id": "casio-dist-finder",
    "title": "Dist Finder",
    "type": "speculative",
    "subject": "Should Casio make a tracker with a display?",
    "oneLiner": "Dist Finder tests a practical extension of Casio-style glanceable hardware. I favour a narrow proximity tool, provided its readout communicates uncertainty instead of promising precise distance.",
    "period": "2026",
    "problem": "The target user wants to check whether a bag or paired phone is nearby with minimal interaction. A display on the tracker helps only when the tracker itself is visible. It does not solve finding an unseen object, so this cannot be positioned as a complete lost-item service.",
    "insight": "The potential fit is a durable, understandable tool with serviceable power. Compete on the nearby check, not a global finding network. Compare a display with a simple audible alert and proximity lights before accepting the extra cost and power use.",
    "principles": [
      "Define a nearby task precisely",
      "Show uncertainty honestly",
      "Keep pairing and power simple",
      "Price from a viable cost model"
    ],
    "concept": "Start with a replaceable battery, clear near/far states, an audible finding action, and simple pairing. The illustrated numeric display is a design exploration; the MVP should avoid metre-level claims unless measured performance supports them. Defer remote-location promises and complex accessories.",
    "tradeoffs": "Bluetooth signal strength varies with walls, bodies, and orientation. A precise-looking number can create more distrust than a coarse but honest signal. Pairing support, battery life, and retailer margin must fit the intended accessible price; a target price is not a validated cost model.",
    "tags": [
      "New product assessment",
      "Casio",
      "Hardware",
      "Bluetooth",
      "Tracker",
      "Consumer Electronics"
    ],
    "color": "hsl(32 95% 44%)",
    "cover": {
      "src": "/product-lab/casio-dist-finder/cover.webp",
      "caption": "Concept illustration: dist Finder hero: a Casio-style tracker with distance on the object itself."
    },
    "gallery": [
      {
        "src": "/product-lab/casio-dist-finder/01.webp",
        "caption": "Concept illustration: coin-cell door: fingernail and coin-slot battery swap ritual."
      },
      {
        "src": "/product-lab/casio-dist-finder/02.webp",
        "caption": "Concept illustration: lCD modes: meters, proximity chevrons, and plain clock."
      },
      {
        "src": "/product-lab/casio-dist-finder/03.webp",
        "caption": "Concept illustration: blister-card pegboard packing with keyring hole and optional clip."
      }
    ],
    "validation": "Test real rooms, bags, and crowded environments. Compare time to resolve a nearby check, false reassurance, pairing failures, and battery consumption across display and no-display prototypes. Use supplier costs and retailer feedback to assess margin before choosing the form factor.",
    "verdict": "Proceed to a small prototype pilot. I choose a proximity display over a distance meter and a narrow utility promise over global tracking. I would drop the screen if it does not improve task completion enough to justify its cost."
  },
  {
    "id": "hermes-ecoute",
    "title": "Écoute",
    "type": "speculative",
    "subject": "Should Hermès enter audio with a serviceable headset?",
    "oneLiner": "Écoute evaluates a luxury audio product built around wearability, material quality, and long ownership. I favour a tightly scoped collaboration with an audio specialist, not an in-house electronics programme.",
    "period": "2026",
    "problem": "The target customer already pays for objects that fit their wardrobe and can be maintained. The unmet need is a headset they want to wear and keep, but comfort, calls, and sound remain basic requirements. Attractive materials cannot compensate for poor everyday audio.",
    "insight": "The proposed advantage is design and service, while an established audio partner supplies engineering and certification. Compare a full headset with accessories for existing headphones. The full product is justified only if the integrated design creates value that a cover or strap cannot.",
    "principles": [
      "Meet core audio expectations",
      "Prioritise comfort over decoration",
      "Make the service offer specific",
      "Use a partner for unfamiliar capabilities"
    ],
    "concept": "Test one partner-built headset with replaceable cushions, repairable wear points, comfortable adjustment, and a clear service offer. The illustrated leather, clasp, and travel packaging express that proposition. Defer seasonal variants until fit and service demand are understood.",
    "tradeoffs": "Materials add weight and maintenance needs. Electronics and batteries age differently from leather. Partner dependence, repair logistics, warranty cost, and minimum production volumes could erode margin or brand trust. A high price does not remove the need for competitive sound and calls.",
    "tags": [
      "New product assessment",
      "Hermès",
      "Hardware",
      "Fashion",
      "Audio",
      "Craft"
    ],
    "color": "hsl(32 95% 44%)",
    "cover": {
      "src": "/product-lab/hermes-ecoute/cover.webp",
      "caption": "Concept illustration: écoute hero: a headset designed as a worn object, not a plastic accessory."
    },
    "gallery": [
      {
        "src": "/product-lab/hermes-ecoute/01.webp",
        "caption": "Concept illustration: folded travel state: cups rotate flat like a bag handle going down."
      },
      {
        "src": "/product-lab/hermes-ecoute/02.webp",
        "caption": "Concept illustration: turn-lock size clasp and interchangeable leather cushions."
      },
      {
        "src": "/product-lab/hermes-ecoute/03.webp",
        "caption": "Concept illustration: orange-box packing with dust bag, travel pouch, and reconditioning card."
      }
    ],
    "validation": "Run extended wear and travel trials with the intended segment. Compare comfort, call quality, sound satisfaction, purchase intent at a real price, and demand for repair. Validate partner economics and parts availability before approving a limited release.",
    "verdict": "Choose a limited partner-led pilot. I prefer a credible audio platform with distinctive materials and service over a bespoke electronics stack. I would not proceed if design compromises comfort or if the repair promise cannot be funded."
  },
  {
    "id": "charge-for-life",
    "title": "A Charge for Life",
    "type": "speculative",
    "subject": "Should Rolex make a serviceable luxury power bank?",
    "oneLiner": "A Charge for Life explores a durable charging object with replaceable cells. My recommendation is not to launch it under Rolex: the serviceability idea is stronger than the proposed brand extension.",
    "period": "2026",
    "problem": "The target traveller wants a well-made charging accessory that can be repaired instead of discarded. Yet dependable power, weight, and ease of travel are the core job. It is an assumption that this customer also wants watch-like materials or would pay a watch-brand premium for charging.",
    "insight": "Serviceable power is a plausible proposition, but resemblance to a watch case is weak evidence of strategic fit. Compare a specialist charging brand, a licensed collaboration, and no entry. The opportunity cost includes management attention and brand risk as well as product development.",
    "principles": [
      "Validate the job before the brand extension",
      "Put power safety and portability first",
      "Cost the replacement service",
      "Compare entry with doing nothing"
    ],
    "concept": "The design explores a steel case, an analog charge indicator, cable storage, and replaceable cell modules. A useful MVP would first test a safe, portable charger with an affordable replacement service. The material and packaging premium should follow demonstrated demand, not define the first release.",
    "tradeoffs": "Steel adds weight; decorative mechanisms add failure points. Battery safety, thermal design, changing charging standards, and replacement logistics create a different operating model from watch servicing. An expensive case does not guarantee a long-lived product or viable service margin.",
    "tags": [
      "New product assessment",
      "Rolex",
      "Hardware",
      "Luxury",
      "Power",
      "Serviceability"
    ],
    "color": "hsl(32 95% 44%)",
    "cover": {
      "src": "/product-lab/charge-for-life/cover.webp",
      "caption": "Concept illustration: a Charge for Life hero: a steel power bank lit like a Datejust."
    },
    "gallery": [
      {
        "src": "/product-lab/charge-for-life/01.webp",
        "caption": "Concept illustration: fluted bezel opens to a coiled steel-mesh cable bay."
      },
      {
        "src": "/product-lab/charge-for-life/02.webp",
        "caption": "Concept illustration: analog charge gauge under sapphire, read like a power reserve."
      },
      {
        "src": "/product-lab/charge-for-life/03.webp",
        "caption": "Concept illustration: walnut travel case, chamois, and service booklet for cell replacement."
      }
    ],
    "validation": "Interview premium-accessory buyers about recent purchases and replacement behaviour, then compare priced prototypes with conventional chargers. Measure weight acceptance, charging reliability, and willingness to pay for cell replacement. Include service labour and parts inventory in the economics.",
    "verdict": "Do not launch as Rolex hardware. I favour testing the repairable charger through a specialist brand. I would reconsider a collaboration only if demand depends meaningfully on Rolex participation and the support burden does not weaken its core proposition."
  },
  {
    "id": "rhode-frame",
    "title": "Rhode Frame",
    "type": "speculative",
    "subject": "Should Rhode launch a camera for its visual aesthetic?",
    "oneLiner": "Rhode Frame examines whether a beauty brand should turn its visual identity into dedicated camera hardware. I would test a software-led collaboration first and defer a standalone camera.",
    "period": "2026",
    "problem": "The target creator wants consistent skin tones and soft light without a complicated editing workflow. The key assumption is that their current phone and presets leave a meaningful gap. Desire for a branded object and dissatisfaction with photographic results are different reasons to buy.",
    "insight": "Rhode could contribute creative direction and audience access; that does not establish expertise in sensors or colour engineering. Compare calibrated presets, a phone workflow, and a camera partnership. Start with the option that tests the desired outcome at the lowest commitment.",
    "principles": [
      "Validate the result, not just the aesthetic",
      "Test across skin tones",
      "Minimise capture-to-share friction",
      "Earn the move from software to hardware"
    ],
    "concept": "Pilot a small set of looks and a simple capture-to-share flow with an imaging partner. Test across skin tones and lighting before adding hardware. The compact camera, single dial, and minimal transfer app in the renders represent a possible later product, not necessary MVP scope.",
    "tradeoffs": "Biased rendering can damage trust. Hardware brings certification, returns, inventory, and support obligations beyond a preset release. A fashionable camera may sell once without establishing durable use, while a software approach is cheaper to test but easier to copy.",
    "tags": [
      "New product assessment",
      "Rhode",
      "Hardware",
      "Beauty",
      "Photography",
      "Consumer Electronics"
    ],
    "color": "hsl(32 95% 44%)",
    "cover": {
      "src": "/product-lab/rhode-digicam/cover.webp",
      "caption": "Concept illustration: rhode Frame hero: a digital camera calibrated for skin tone and soft light."
    },
    "gallery": [
      {
        "src": "/product-lab/rhode-digicam/01.webp",
        "caption": "Concept illustration: color pipeline built around skin tone accuracy under mixed lighting."
      },
      {
        "src": "/product-lab/rhode-digicam/02.webp",
        "caption": "Concept illustration: single-dial interface with three calibrated looks in place of filters."
      },
      {
        "src": "/product-lab/rhode-digicam/03.webp",
        "caption": "Concept illustration: companion app scoped to transfer and light cropping only."
      }
    ],
    "validation": "Use blind comparisons across diverse skin tones and lighting conditions. Track preference, unwanted skin changes, editing time, repeat use, and paid conversion. Test whether a physical camera improves the result enough to justify its price and transfer friction.",
    "verdict": "Choose software and partnership first. I would not approve standalone hardware until users prefer its output over their existing workflow and keep using it after the novelty passes. Accurate, inclusive rendering matters more than matching campaign imagery."
  },
  {
    "id": "fitbit-focus-monitor",
    "title": "Fitbit Focus Monitor",
    "type": "speculative",
    "subject": "Should Fitbit build a monitor for healthier desk habits?",
    "oneLiner": "Fitbit Focus Monitor explores bringing wellbeing support into desk work. I would test an optional software and accessory experience before entering the monitor market.",
    "period": "2026",
    "problem": "The initial segment is desk workers who want better break and screen habits without constant reminders. The proposed problem is a gap between wearable reports and action during work. Posture, fatigue, stress, and sleep are distinct needs; combining them does not establish a single valuable product.",
    "insight": "Fitbit-related context could support timely prompts, but owning the display may not be necessary. Compare a desktop companion, a monitor partnership, and a new monitor. Start with a specific behaviour users want to change rather than a broad sensing platform.",
    "principles": [
      "Choose one behaviour to support",
      "Keep sensing optional",
      "Give the worker control",
      "Do not turn correlation into a health claim"
    ],
    "concept": "Test opt-in break scheduling, user-controlled display adjustments, and a private history of desk habits. Keep employer access out of scope. The illustrated gaze, posture, heart-rate, and ambient sensors are longer-term hypotheses, not validated measures of stress or concentration.",
    "tradeoffs": "Workplace sensing can feel like surveillance even when optional. False prompts disrupt focus; adjustments may affect colour-sensitive work. New hardware adds manufacturing and support costs. Observed associations with sleep would not establish causation or justify medical claims.",
    "tags": [
      "New product assessment",
      "Fitbit",
      "Hardware",
      "Health",
      "Workplace",
      "Sensors"
    ],
    "color": "hsl(32 95% 44%)",
    "cover": {
      "src": "/product-lab/fitbit-focus-monitor/cover.webp",
      "caption": "Concept illustration: fitbit Focus Monitor hero: a desk display that looks after the person behind it."
    },
    "gallery": [
      {
        "src": "/product-lab/fitbit-focus-monitor/01.webp",
        "caption": "Concept illustration: sensor stack: posture, eye strain, base heart rate, and ambient conditions."
      },
      {
        "src": "/product-lab/fitbit-focus-monitor/02.webp",
        "caption": "Concept illustration: focus Mode: notifications fade while deep work continues."
      },
      {
        "src": "/product-lab/fitbit-focus-monitor/03.webp",
        "caption": "Concept illustration: screen habits alongside sleep data; no causal relationship established."
      }
    ],
    "validation": "Compare the pilot with ordinary reminders over several working weeks. Measure continued opt-in use, useful versus dismissed prompts, interruption burden, and self-reported usefulness. Treat health effects as unproven and assess whether additional sensing changes outcomes enough to justify its privacy cost.",
    "verdict": "Do not build a Fitbit monitor yet. I choose a small, private companion experience with manual control and optional hardware partners. I would add sensors only when they demonstrably improve a user-chosen behaviour without increasing perceived surveillance."
  },
  {
    "id": "trend-mill",
    "title": "Trend Mill",
    "type": "speculative",
    "subject": "Should Google build a treadmill around search and Maps?",
    "oneLiner": "Trend Mill evaluates curiosity-led exercise content using maps, search themes, and short voice interactions. I favour a software pilot on existing equipment rather than Google-owned treadmill hardware.",
    "period": "2026",
    "problem": "The target user finds repetitive indoor walking dull but does not want instructor-led classes. The customer job is to make movement easier to return to. Interest in a route or a voice demo is not evidence that the product improves exercise retention.",
    "insight": "Google-related services suggest a content advantage, not a manufacturing advantage. Compare a phone or tablet experience, integrations with equipment makers, and a full treadmill. A software route tests the distinctive idea while avoiding installation, repairs, and equipment inventory.",
    "principles": [
      "Measure return use, not demo appeal",
      "Keep interaction secondary to movement",
      "Minimise personal-data dependencies",
      "Partner before owning equipment"
    ],
    "concept": "Pilot a few curated virtual routes and short, optional voice responses on existing walking equipment. Let users choose session length manually. Defer health-data personalisation, calendar access, social ghosts, and subscriptions until the basic experience earns repeat use. The hardware renders illustrate the broader vision.",
    "tradeoffs": "Extra interaction can distract from safe exercise. Data combinations may feel invasive, route imagery may not match movement, and generated responses can be unreliable. Equipment makers need stable support commitments; a subscription needs value beyond content users can already access elsewhere.",
    "tags": [
      "New product assessment",
      "Google",
      "Fitness",
      "Trends",
      "Maps",
      "AI",
      "Hardware"
    ],
    "color": "hsl(32 95% 44%)",
    "cover": {
      "src": "/product-lab/trend-mill/cover.webp",
      "caption": "Concept illustration: trend Mill hero: a treadmill driven by rising search interest."
    },
    "gallery": [
      {
        "src": "/product-lab/trend-mill/01.webp",
        "caption": "Concept illustration: trends Routes: daily runs sourced from rising search themes."
      },
      {
        "src": "/product-lab/trend-mill/02.webp",
        "caption": "Concept illustration: ghost Run with Kinetic Search: anonymous runners plus mid-run Gemini."
      },
      {
        "src": "/product-lab/trend-mill/03.webp",
        "caption": "Concept illustration: google One Fit: ad-free Trends, longer Kinetic Search, no sponsor bumpers."
      }
    ],
    "validation": "Compare route-guided walks with users’ normal audio or video routine. Track repeat sessions, completion, perceived distraction, and willingness to pay. Use a partner pilot to assess integration cost and support demand before considering a larger commercial model.",
    "verdict": "Pursue the software experience, not the treadmill. I would partner with equipment makers only after repeat use is established. I would stop if curiosity improves trial but not retention, or if interaction makes the workout less safe or comfortable."
  },
  {
    "id": "glyph-home",
    "title": "Glyph Home",
    "type": "speculative",
    "subject": "Should Nothing launch a voice assistant with visible privacy controls?",
    "oneLiner": "Glyph Home evaluates whether clear device states and physical controls can make a home assistant worth choosing. I support a narrow utility pilot, with trust demonstrated through behaviour rather than transparent styling.",
    "period": "2026",
    "problem": "The target household wants simple voice actions but dislikes uncertainty about listening and processing. The hypothesis is that understandable states reduce that concern. Some users may prefer a phone or no microphone at all, so visible controls alone do not establish demand.",
    "insight": "Nothing’s visual language offers a way to communicate state, but lighting is only useful if people interpret it correctly. Compare a dedicated device with phone-based controls and existing assistants. The product needs a frequent job that justifies another object in the home.",
    "principles": [
      "Make state understandable across abilities",
      "Verify controls beyond appearance",
      "Start with repeatable daily tasks",
      "Expose cloud dependencies clearly"
    ],
    "concept": "Start with a few dependable actions such as timers and supported playback controls, a microphone power switch, and distinguishable listening and processing states. Explain local and cloud behaviour at setup and during use. Defer an open-ended assistant until the basic utility is reliable.",
    "tradeoffs": "A transparent shell is not evidence of privacy. Voice interfaces can fail in noise and lack visual context for complex answers. Cloud services introduce ongoing costs and dependencies. Light-only status is insufficient for users who cannot see or distinguish the signals.",
    "tags": [
      "New product assessment",
      "Nothing",
      "AI",
      "Hardware",
      "Glyph",
      "Voice"
    ],
    "color": "hsl(32 95% 44%)",
    "cover": {
      "src": "/product-lab/glyph-home/cover.webp",
      "caption": "Concept illustration: glyph Home hero: voice-first assistant with dot-matrix feedback."
    },
    "gallery": [
      {
        "src": "/product-lab/glyph-home/01.webp",
        "caption": "Concept illustration: exploded view of shell, mic ring, PCB, and base components."
      },
      {
        "src": "/product-lab/glyph-home/02.webp",
        "caption": "Concept illustration: state system: idle, listening, thinking, and complete."
      },
      {
        "src": "/product-lab/glyph-home/03.webp",
        "caption": "Concept illustration: unboxing and phone pairing flow in Nothing design language."
      }
    ],
    "validation": "Test whether participants can correctly explain listening, mute, and cloud states without coaching. Measure action completion, correction effort, repeat use, and comprehension across accessibility needs. Compare with their current assistant before treating design preference as switching intent.",
    "verdict": "Run a focused utility pilot. I prefer reliable daily actions and verifiable controls over a broad AI promise. I would not launch if users like the object but cannot explain its privacy states or find a reason to use it regularly."
  },
  {
    "id": "commons-map",
    "title": "Commons Map",
    "type": "speculative",
    "subject": "Should Wikimedia support a community-maintained map layer?",
    "oneLiner": "Commons Map examines an ad-free, sourced layer of local information. I favour a limited community pilot alongside existing maps, rather than a new global navigation service.",
    "period": "2026",
    "problem": "The initial user needs current information about access, facilities, or closures in a specific area. The unmet need is reliable detail with visible provenance. A missing or stale fact can matter more than the presence of advertising, so the case should start with information quality rather than a blanket criticism of commercial maps.",
    "insight": "A community editing model could make changes inspectable, but local information expires quickly and needs accountable maintenance. Compare adding a sourced layer to existing open mapping with building routing, traffic, and discovery from scratch. Partnership preserves focus on the information gap.",
    "principles": [
      "Show sources and freshness",
      "Start with a maintainable geography",
      "Make uncertainty visible",
      "Secure operating support before expansion"
    ],
    "concept": "Pilot one area and one bounded use case, such as venue accessibility details. Include source dates, edit history, dispute handling, correction reporting, and clear unknown states. Defer safety scoring, global coverage, and traffic-aware routing. The broader maps in the renders show a possible direction.",
    "tradeoffs": "Volunteer coverage can be uneven. Moderation and stale data create ongoing operating costs, and incorrect access information can cause harm. Grants or institutional support must fund maintenance without giving sponsors control over ranking. Downloaded data needs visible freshness limits.",
    "tags": [
      "New product assessment",
      "Wikipedia",
      "Maps",
      "Commons",
      "Trust"
    ],
    "color": "hsl(32 95% 44%)",
    "cover": {
      "src": "/product-lab/commons-map/cover.webp",
      "caption": "Concept illustration: commons Map hero: navigation without paid placement."
    },
    "gallery": [
      {
        "src": "/product-lab/commons-map/01.webp",
        "caption": "Concept illustration: current model: paid placement can dominate local discovery."
      },
      {
        "src": "/product-lab/commons-map/02.webp",
        "caption": "Concept illustration: place page with citations, discussion, and revision controls."
      },
      {
        "src": "/product-lab/commons-map/03.webp",
        "caption": "Concept illustration: safety, restroom, and accessibility layers enabled together."
      }
    ],
    "validation": "Work with local contributors and users to check coverage, accuracy, correction time, and repeat usefulness against existing sources. Track contributor retention and moderation cost. Expand only after a local organisation accepts maintenance responsibility and funding is credible.",
    "verdict": "Pilot a sourced layer with a local partner. I choose a narrow, maintained service over an ambitious global replacement. I would not expand into safety-sensitive claims or new regions until correction workflows and local ownership are dependable."
  },
  {
    "id": "still-waiting",
    "title": "Still Waiting",
    "type": "redesign",
    "subject": "Should clinics redesign waiting around live status updates?",
    "oneLiner": "Still Waiting evaluates a service redesign that gives patients clearer progress and realistic wait ranges. I recommend a limited clinic pilot with workflow reliability ahead of extra patient-facing features.",
    "period": "2026",
    "problem": "Patients and accompanying family members need to plan around an uncertain wait. Staff also spend time answering status questions. This case assumes that clearer information can reduce uncertainty; it does not assume that a new interface creates clinical capacity or fixes the delay itself.",
    "insight": "The opportunity is a shared operational view that staff can keep current and patients can understand. Compare better signage and verbal updates with a digital status card. The digital option earns investment only when its accuracy and staff burden improve on simpler communication.",
    "principles": [
      "Communicate uncertainty honestly",
      "Assign ownership for updates",
      "Support people without smartphones",
      "Improve information without promising capacity"
    ],
    "concept": "Start with a private status card, broad stages, realistic time ranges, and staff-owned delay updates in one clinic workflow. Offer a kiosk or verbal alternative. Defer family sharing and leave-and-return notifications until consent, identity, connectivity, and operational rules are dependable.",
    "tradeoffs": "Stale estimates can damage trust more than no estimate. Triage changes mean order may shift; staff should not promise a fixed queue position. Sharing raises privacy concerns, and notification failures can cause missed appointments. Integration and staff training belong in the cost of delivery.",
    "tags": [
      "Redesign",
      "Healthcare",
      "Operations",
      "Service Design"
    ],
    "color": "hsl(207 89% 42%)",
    "cover": {
      "src": "/product-lab/still-waiting/cover.webp",
      "caption": "Concept illustration: still Waiting hero: uncertainty as the primary patient pain point."
    },
    "gallery": [
      {
        "src": "/product-lab/still-waiting/01.webp",
        "caption": "Concept illustration: current state: static room with limited status visibility."
      },
      {
        "src": "/product-lab/still-waiting/02.webp",
        "caption": "Concept illustration: care Queue card with stage, range, and family share option."
      },
      {
        "src": "/product-lab/still-waiting/03.webp",
        "caption": "Concept illustration: walk radius flow with return notification before appointment slot."
      }
    ],
    "validation": "Pilot with clinic staff and patients, comparing status enquiries, update workload, missed calls, and reported uncertainty against the existing process. Check estimate accuracy and performance for people without smartphones. Expand only if staff can maintain the service during busy periods.",
    "verdict": "Proceed with a small operational pilot. I prefer honest ranges and reliable updates over precise-looking countdowns or a large feature set. I would pause rollout if maintaining the system adds burden or if information becomes less reliable at peak demand."
  },
  {
    "id": "the-last-phone",
    "title": "The Last Phone",
    "type": "speculative",
    "subject": "Should Patagonia enter smartphones with a repair-first product?",
    "oneLiner": "The Last Phone examines whether repair-led values justify entering consumer electronics. I support a partnership that extends device life, but not a Patagonia-owned smartphone platform.",
    "period": "2026",
    "problem": "The target customer wants to keep a dependable phone longer without losing security support or facing impractical repairs. The job is continued utility, not modularity for its own sake. Existing repair services and repairable devices are alternatives the concept must improve on.",
    "insight": "Patagonia could contribute a repair-minded proposition and customer relationships, but electronics supply chains and software support require different capabilities. Compare a repair partnership, a co-designed device, and a new platform. The lowest-risk option should prove longer ownership before expanding scope.",
    "principles": [
      "Extend useful life, not just repair access",
      "Fund a defined support period",
      "Price ownership transparently",
      "Measure environmental claims"
    ],
    "concept": "Test a partner offer with replaceable high-wear parts, transparent repair pricing, spare-part access, and a funded software-support period. Treat the illustrated modular phone as a possible partner design. Avoid a lifetime promise until costs, obligations, and supplier commitments can support it.",
    "tradeoffs": "Modularity can affect size, durability, and assembly cost. Longer ownership reduces replacement sales while extending service obligations. Software dependencies and spare-parts inventory can undermine a repair promise. Environmental benefit depends on actual use and avoided replacements, not the story alone.",
    "tags": [
      "New product assessment",
      "Patagonia",
      "Hardware",
      "Repair",
      "Sustainability"
    ],
    "color": "hsl(32 95% 44%)",
    "cover": {
      "src": "/product-lab/the-last-phone/cover.webp",
      "caption": "Concept illustration: worn In hero: a phone designed to stay in use for years."
    },
    "gallery": [
      {
        "src": "/product-lab/the-last-phone/01.webp",
        "caption": "Concept illustration: tool-less battery and modular component access."
      },
      {
        "src": "/product-lab/the-last-phone/02.webp",
        "caption": "Concept illustration: repair desk as core service touchpoint."
      },
      {
        "src": "/product-lab/the-last-phone/03.webp",
        "caption": "Concept illustration: stable OS update policy focused on security and performance."
      }
    ],
    "validation": "Assess repair completion, turnaround, parts cost, customer satisfaction, and device retention with a qualified partner. Model the cost of support across the promised life. Compare total ownership cost and seek a lifecycle assessment before making environmental claims.",
    "verdict": "Choose a repair and longevity partnership; do not build a new phone platform. I favour measurable extensions of useful life over a branded sustainability object. I would reconsider hardware only if the partner model cannot deliver the needed improvements."
  },
  {
    "id": "select-all-buses",
    "title": "Select All Buses",
    "type": "redesign",
    "subject": "Should verification providers replace default puzzles with risk-based checks?",
    "oneLiner": "Select All Buses evaluates a verification flow that reserves challenges for sessions that need more evidence. I recommend a staged redesign, with abuse prevention and accessibility measured together.",
    "period": "2026",
    "problem": "Legitimate users need to complete login, recovery, or checkout without avoidable barriers. Site operators need to control automated abuse. The problem is not every challenge; it is using the same friction regardless of risk and offering poor recovery when a legitimate user fails.",
    "insight": "Compare existing challenges with layered checks using session history, rate limits, and authentication signals where appropriate. A passkey can support authentication but does not prove a human is acting. The objective is lower unnecessary friction at an acceptable abuse level, not simply fewer puzzles.",
    "principles": [
      "Optimise completion and abuse together",
      "Do not confuse authentication with humanity",
      "Provide accessible recovery",
      "Keep rollout measurable and reversible"
    ],
    "concept": "Pilot one flow with risk-based escalation, accessible alternatives, clear retry guidance, and a support path. Use passkeys as one signal where the flow supports them, not a universal requirement. Keep fallback options for shared devices, older hardware, and users who minimise device tracking.",
    "tradeoffs": "Attackers adapt, and a smoother flow can increase abuse if signals are weak. Device signals may create privacy and exclusion costs. Human review adds operational expense. Neither visible puzzles nor silent checks should be assumed stronger without measuring the attacks relevant to the service.",
    "tags": [
      "Redesign",
      "Trust",
      "Accessibility",
      "Auth",
      "Web"
    ],
    "color": "hsl(207 89% 42%)",
    "cover": {
      "src": "/product-lab/select-all-buses/cover.webp",
      "caption": "Concept illustration: select All Buses hero: reframing web verification as a trust product."
    },
    "gallery": [
      {
        "src": "/product-lab/select-all-buses/01.webp",
        "caption": "Concept illustration: current flow: high-friction visual challenge at entry points."
      },
      {
        "src": "/product-lab/select-all-buses/02.webp",
        "caption": "Concept illustration: trusted path with passkey and no puzzle step."
      },
      {
        "src": "/product-lab/select-all-buses/03.webp",
        "caption": "Concept illustration: accessible fallback designed for screen reader completion."
      }
    ],
    "validation": "Roll out gradually with a comparison group and a rollback path. Track legitimate completion, false rejection, confirmed abuse, recovery success, and support volume. Review results across browsers, devices, and assistive technologies; agree acceptable security limits before the experiment.",
    "verdict": "Proceed with a staged, reversible redesign. I choose fewer unnecessary challenges, not the removal of verification. Expand only when legitimate completion improves without an unacceptable increase in abuse or exclusion. Keep the fallback until that evidence is strong."
  }
];

export function getProductLabCase(id: string): ProductLabCase | undefined {
  return productLabCases.find((c) => c.id === id);
}
