/**
 * Shared search index for the desktop assistant (formerly Spotlight).
 * Timeline targets deep-link into Experience / Education / Initiative windows.
 */

import {
  expandQueryVariants,
  meaningfulTokens,
  normalizeSearchInput,
} from "./searchQueryUtils";

export type TimelineWindowId = "experience" | "education" | "initiative-impact";

export type SearchTarget =
  | { type: "window"; id: string }
  | { type: "external"; url: string }
  | { type: "action"; action: "downloadResume" | "copyEmail" }
  | { type: "timeline"; windowId: TimelineWindowId; entryId: string }
  | { type: "project"; projectId: number }
  | { type: "skills-section"; sectionId: string };

export interface SearchEntry {
  id: string;
  keywords: string[];
  title: string;
  description: string;
  target: SearchTarget;
  group:
    | "About"
    | "Projects"
    | "Experience"
    | "Education"
    | "Skills"
    | "Initiative & Impact"
    | "Contact"
    | "Links"
    | "Other";
}

const EMAIL = "roncy.bhatia@gmail.com";

export const searchEntries: SearchEntry[] = [
  {
    id: "home",
    keywords: ["home", "about", "me", "who am i", "bio", "summary"],
    title: "Home",
    description: "Overview of Ronit Amar Bhatia, software engineer & ML enthusiast.",
    target: { type: "window", id: "home" },
    group: "About",
  },
  {
    id: "projects",
    keywords: ["project", "projects", "portfolio", "work", "unclogai", "voyagelog", "lenscraft", "startup planner", "taskify", "gdelt"],
    title: "Projects",
    description: "All featured projects, from LensCraft to UnclogAI.",
    target: { type: "window", id: "projects" },
    group: "Projects",
  },
  {
    id: "experience",
    keywords: ["experience", "work", "job", "internship", "career"],
    title: "Experience",
    description: "All professional experience and internships.",
    target: { type: "window", id: "experience" },
    group: "Experience",
  },
  {
    id: "education",
    keywords: ["education", "school", "university", "degree", "coursework"],
    title: "Education",
    description: "Cornell MEng and UC Davis CS background.",
    target: { type: "window", id: "education" },
    group: "Education",
  },
  {
    id: "initiative-impact",
    keywords: ["initiative", "impact", "leadership", "hackathon", "community"],
    title: "Initiative & Impact",
    description: "Leadership, hackathons, and community impact.",
    target: { type: "window", id: "initiative-impact" },
    group: "Initiative & Impact",
  },
  {
    id: "skills",
    keywords: ["skills", "skill", "python", "go", "sql", "javascript", "aws", "gcp", "llm", "ml", "ai", "tools"],
    title: "Skills",
    description: "Technical skills, languages, ML & tools.",
    target: { type: "window", id: "skills" },
    group: "Skills",
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach out", "get in touch"],
    title: "Contact",
    description: "Contact window and message form.",
    target: { type: "window", id: "contact" },
    group: "Contact",
  },
  {
    id: "resume-window",
    keywords: ["resume", "cv", "download resume", "open resume", "pdf"],
    title: "Open Resume Window",
    description: "Open in-app Resume window with embedded PDF & download.",
    target: { type: "window", id: "resume" },
    group: "Other",
  },
  {
    id: "resume-download",
    keywords: ["resume", "cv", "download", "resume pdf"],
    title: "Download Resume",
    description: "Download the latest Resume file.",
    target: { type: "action", action: "downloadResume" },
    group: "Other",
  },
  {
    id: "github",
    keywords: ["github", "code", "repos", "source"],
    title: "GitHub",
    description: "Open ronitbhatia on GitHub.",
    target: { type: "external", url: "https://github.com/ronitbhatia" },
    group: "Links",
  },
  {
    id: "linkedin",
    keywords: ["linkedin", "network", "profile"],
    title: "LinkedIn",
    description: "Open LinkedIn profile.",
    target: { type: "external", url: "https://www.linkedin.com/in/ronit-bhatia/" },
    group: "Links",
  },
  {
    id: "quivlo",
    keywords: ["quivlo", "ios", "flashcard", "app", "app store", "iphone", "knowledge", "learning"],
    title: "Quivlo on App Store",
    description: "Download Quivlo: iOS knowledge-capture and flashcard app.",
    target: { type: "external", url: "https://apps.apple.com/us/app/quivlo/id6759634487" },
    group: "Links",
  },
  {
    id: "email-copy",
    keywords: ["email", "gmail", "copy email"],
    title: "Copy Email",
    description: `Copy ${EMAIL} to clipboard.`,
    target: { type: "action", action: "copyEmail" },
    group: "Contact",
  },

  /* Experience — timeline entries */
  {
    id: "exp-y-meadows",
    keywords: ["y meadows", "meadows", "implementation", "onboarding", "integrations", "salesforce", "jira", "customer"],
    title: "Y Meadows — Technical Implementation Engineer Intern",
    description: "Jan 2026 – Present · Customer onboarding, integrations, deployment.",
    target: { type: "timeline", windowId: "experience", entryId: "y-meadows" },
    group: "Experience",
  },
  {
    id: "exp-qalienai",
    keywords: ["qalienai", "q alien", "ml engineer", "compliance", "ftc", "fda", "bedrock", "pgvector"],
    title: "QAlienAI — ML Engineer Intern",
    description: "Oct 2025 – Feb 2026 · LLMs, multimodal AI, compliance.",
    target: { type: "timeline", windowId: "experience", entryId: "qalienai" },
    group: "Experience",
  },
  {
    id: "exp-gallox",
    keywords: ["gallox", "semiconductor", "testing", "automation", "python"],
    title: "Gallox Semiconductors — Software Engineer Intern",
    description: "Nov 2024 – Jan 2025 · Test automation for power devices.",
    target: { type: "timeline", windowId: "experience", entryId: "gallox" },
    group: "Experience",
  },
  {
    id: "exp-cornell-cals",
    keywords: ["cornell cals", "cals", "research assistant", "ghg", "geopandas", "climate", "agriculture"],
    title: "Cornell CALS — Research Assistant",
    description: "Aug 2024 – Dec 2024 · ML for agricultural emissions.",
    target: { type: "timeline", windowId: "experience", entryId: "cornell-cals" },
    group: "Experience",
  },
  {
    id: "exp-colentai",
    keywords: ["colentai", "colent", "nlp", "bert", "fine-tuning", "taxonomy"],
    title: "ColentAI — Software Developer Intern",
    description: "Jan 2024 – Mar 2024 · NLP, LLM fine-tuning.",
    target: { type: "timeline", windowId: "experience", entryId: "colentai" },
    group: "Experience",
  },
  {
    id: "exp-cardinality",
    keywords: ["cardinality", "data analyst", "sql", "matlab", "first internship"],
    title: "Cardinality-AI — Data Analyst Intern",
    description: "June 2021 – Sept 2021 · Data pipelines, SQL.",
    target: { type: "timeline", windowId: "experience", entryId: "cardinality-ai" },
    group: "Experience",
  },

  /* Education */
  {
    id: "edu-cornell",
    keywords: ["cornell", "meng", "engineering management", "ivy", "ithaca"],
    title: "Cornell University — MEng Engineering Management",
    description: "Aug 2024 – May 2025 · Graduate degree.",
    target: { type: "timeline", windowId: "education", entryId: "cornell" },
    group: "Education",
  },
  {
    id: "edu-uc-davis",
    keywords: ["uc davis", "davis", "bachelor", "bs", "computer science", "undergrad"],
    title: "UC Davis — BS Computer Science",
    description: "Sept 2020 – June 2024 · Undergraduate.",
    target: { type: "timeline", windowId: "education", entryId: "uc-davis" },
    group: "Education",
  },

  /* Initiative & Impact */
  {
    id: "init-ai-hackathon",
    keywords: ["conference buddy", "ai hackathon", "healthcare sales", "hackathon finalist"],
    title: "AI Hackathon — Conference Buddy",
    description: "Aug 2025 · Healthcare sales + AI prototype.",
    target: { type: "timeline", windowId: "initiative-impact", entryId: "ai-hackathon" },
    group: "Initiative & Impact",
  },
  {
    id: "init-ambassador",
    keywords: ["ambassador", "unibuddy", "prospective students", "cornell meng"],
    title: "Cornell Student Ambassador",
    description: "Feb 2025 – Present · Prospective student outreach.",
    target: { type: "timeline", windowId: "initiative-impact", entryId: "ambassador" },
    group: "Initiative & Impact",
  },
  {
    id: "init-pm-club",
    keywords: ["pm club", "product management club", "outreach leader", "cornell graduate"],
    title: "Cornell Graduate PM Club — Outreach Leader",
    description: "Dec 2024 – May 2025 · Launched the club.",
    target: { type: "timeline", windowId: "initiative-impact", entryId: "pm-club" },
    group: "Initiative & Impact",
  },
  {
    id: "init-consulting",
    keywords: ["consulting club", "merqube", "fintech", "cornell consulting"],
    title: "Cornell Consulting — MerQube project",
    description: "Nov 2024 – May 2025 · Market & value chain analysis.",
    target: { type: "timeline", windowId: "initiative-impact", entryId: "consulting" },
    group: "Initiative & Impact",
  },
  {
    id: "init-talent-hackathon",
    keywords: ["talent 2.0", "johnson and johnson", "j&j", "vr onboarding", "hackathon finalist"],
    title: "Talent 2.0 Hackathon Finalist",
    description: "Nov 2024 · VR onboarding with J&J.",
    target: { type: "timeline", windowId: "initiative-impact", entryId: "talent-hackathon" },
    group: "Initiative & Impact",
  },
];

export function normalize(str: string) {
  return str.toLowerCase();
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function similarity(a: string, b: string): number {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  if (!longer.length) return 1;
  const dist = levenshtein(longer, shorter);
  return (longer.length - dist) / longer.length;
}

function scoreEntryOneVariant(q: string, entry: SearchEntry): number {
  let score = 0;
  const keywordText = entry.keywords.join(" ");
  const title = normalize(entry.title);
  const desc = normalize(entry.description);

  if (keywordText.includes(q)) score += 50;
  if (title.includes(q)) score += 80;
  if (desc.includes(q)) score += 30;

  for (const kw of entry.keywords) {
    const s = similarity(q, normalize(kw));
    if (s > 0.8) score += 40 * s;
    else if (s > 0.6) score += 20 * s;
  }

  return score;
}

export function scoreEntry(query: string, entry: SearchEntry): number {
  const q = normalizeSearchInput(query);
  if (!q) return 0;

  let best = 0;
  for (const variant of expandQueryVariants(q)) {
    best = Math.max(best, scoreEntryOneVariant(variant, entry));
  }

  const tokens = meaningfulTokens(q);
  const hay = `${entry.keywords.join(" ")} ${entry.title} ${entry.description}`.toLowerCase();
  for (const t of tokens) {
    if (t.length < 3) continue;
    if (hay.includes(t)) best += 6;
  }

  return best;
}

export function filterSearchEntries(query: string): SearchEntry[] {
  if (!query.trim()) return searchEntries;
  const scored = searchEntries
    .map((e) => ({ entry: e, score: scoreEntry(query, e) }))
    .filter((s) => s.score > 8)
    .sort((a, b) => b.score - a.score);
  return scored.map((s) => s.entry);
}

/** Quick-pick chips: label + optional preset query (empty = use label as query). */
export const suggestedSearches: { label: string; query?: string }[] = [
  { label: "Y Meadows role", query: "y meadows" },
  { label: "QAlienAI / ML", query: "qalienai" },
  { label: "Projects", query: "projects" },
  { label: "Cornell degree", query: "cornell" },
  { label: "Skills & tools", query: "skills" },
  { label: "Contact", query: "contact" },
];
