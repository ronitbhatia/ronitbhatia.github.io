/**
 * Site index search + unified merge with catalog entries (synonym expansion, softer intent,
 * token overlap, deduped targets).
 */

import siteSearchIndexJson from "./siteSearchIndex.json";
import {
  searchEntries,
  scoreEntry,
  type SearchEntry,
  type SearchTarget,
} from "./searchCatalog";
import {
  expandQueryVariants,
  meaningfulTokens,
  normalizeSearchInput,
  searchTargetKey,
} from "./searchQueryUtils";

export interface SiteIndexItem {
  keywords: string[];
  page: string;
  section: string | null;
  title: string;
  description: string;
}

const siteSearchIndex = siteSearchIndexJson as SiteIndexItem[];

/** Items not present in the legacy static-site export */
const EXTRA_SITE_ITEMS: SiteIndexItem[] = [
  {
    keywords: [
      "y meadows",
      "y-meadows",
      "meadows",
      "implementation engineer",
      "technical implementation",
      "customer onboarding",
      "integrations",
      "integrations engineer",
      "salesforce",
      "jira",
      "deployment",
    ],
    page: "/experience",
    section: "y-meadows",
    title: "Y Meadows — Technical Implementation Engineer Intern",
    description: "Jan 2026 – Present · Customer onboarding, integrations, deployment.",
  },
  {
    keywords: [
      "lenscraft",
      "lens craft",
      "personal finance",
      "adaptive interface",
      "finance app",
      "budget",
      "scenario",
      "vercel",
      "next.js",
      "lenscraft-fawn",
      "machine learning",
      "ml",
      "deep learning",
      "generative ai",
      "llm",
    ],
    page: "/projects",
    section: "lenscraft",
    title: "LensCraft: Adaptive Personal Finance Interface",
    description:
      "Natural-language prompts and a deterministic TypeScript finance engine; AI for layout only.",
  },
    {
      keywords: [
        "quivlo",
        "flashcard",
        "flashcards",
        "ios app",
        "swift",
        "swiftui",
        "knowledge capture",
        "app store",
        "on-device",
        "iphone",
        "learning cards",
        "machine learning",
        "ml",
        "nlp",
        "spaced repetition",
      ],
    page: "/projects",
    section: "quivlo",
    title: "Quivlo: iOS Knowledge-Capture & Flashcard Intelligence",
    description: "Native iOS app with on-device NLP/ML for flashcards; App Store release.",
  },
];

const ALL_INDEX: SiteIndexItem[] = [...siteSearchIndex, ...EXTRA_SITE_ITEMS];

function fuzzyMatch(query: string, text: string): number {
  if (!query || !text) return 0;

  const q = query.toLowerCase().trim();
  const t = text.toLowerCase();

  if (t === q) return 100;
  if (t.startsWith(q)) return 95;

  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const wordBoundaryRegex = new RegExp(`\\b${escaped}\\b`, "i");
  if (wordBoundaryRegex.test(t)) return 90;
  if (t.includes(q)) return 85;

  const similarity = calculateSimilarity(q, t);

  const queryWords = q.split(/\s+/).filter((w) => w.length > 0);
  const textWords = t.split(/\s+/).filter((w) => w.length > 0);
  let wordMatches = 0;
  let exactWordMatches = 0;

  for (const qWord of queryWords) {
    for (const tWord of textWords) {
      if (tWord === qWord) {
        exactWordMatches++;
        wordMatches += 2;
      } else if (tWord.startsWith(qWord) || qWord.startsWith(tWord)) {
        wordMatches += 1.5;
      } else if (tWord.includes(qWord) || qWord.includes(tWord)) {
        wordMatches += 1;
      } else {
        const wordSimilarity = calculateSimilarity(qWord, tWord);
        if (wordSimilarity > 0.8) wordMatches += 0.8;
        else if (wordSimilarity > 0.6) wordMatches += 0.5;
      }
    }
  }

  const wordMatchScore = (wordMatches / Math.max(queryWords.length, 1)) * 60;
  const exactMatchBonus = (exactWordMatches / Math.max(queryWords.length, 1)) * 20;

  return Math.max(similarity * 40, wordMatchScore + exactMatchBonus);
}

function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (!longer.length) return 1;
  if (!shorter.length) return 0;

  const distance = levenshteinDistance(longer, shorter);
  const maxLength = Math.max(longer.length, shorter.length);
  return (maxLength - distance) / maxLength;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0]![j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i]![j] = matrix[i - 1]![j - 1]!;
      } else {
        matrix[i]![j] = Math.min(
          matrix[i - 1]![j - 1]! + 1,
          matrix[i]![j - 1]! + 1,
          matrix[i - 1]![j]! + 1
        );
      }
    }
  }

  return matrix[str2.length]![str1.length]!;
}

function detectSearchIntent(query: string): { category: string | null; confidence: number } {
  const queryLower = normalizeSearchInput(query);
  const queryWords = queryLower.split(/\s+/);

  const categoryKeywords: Record<string, string[]> = {
    projects: ["projects", "project", "portfolio", "work", "build", "built", "developed", "development", "app", "apps", "code", "coding", "github", "demo"],
    skills: ["skills", "skill", "technologies", "technology", "tech", "tools", "framework", "language", "languages", "stack"],
    experience: ["experience", "work", "job", "intern", "internship", "employment", "career", "position", "role", "company", "companies"],
    education: ["education", "university", "college", "degree", "school", "academic", "coursework", "courses", "study", "studies", "graduate", "undergrad"],
    about: ["about", "who", "introduction", "background", "bio", "biography", "summary", "overview"],
    resume: ["resume", "cv", "curriculum vitae", "pdf", "download"],
    contact: ["contact", "email", "reach", "message", "hire"],
    initiative: ["initiative", "impact", "leadership", "volunteer", "community", "hackathon"],
  };

  const intent = { category: null as string | null, confidence: 0 };

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (queryWords.includes(keyword)) {
        intent.category = category;
        intent.confidence = 1;
        break;
      }
      // Avoid substring traps (e.g. "me" matching inside "machine", "in" inside "learning")
      if (keyword.length <= 3) continue;
      if (queryLower.includes(keyword)) {
        intent.category = category;
        intent.confidence = 1;
        break;
      }
    }
    if (intent.category) break;
  }

  return intent;
}

type Scored = SiteIndexItem & {
  score: number;
  matchedKeywords: string[];
  exactMatches: number;
  relevance: number;
};

const INTENT_PAGE_MAP: Record<string, string> = {
  projects: "/projects",
  skills: "/skills",
  experience: "/experience",
  education: "/education",
  about: "/",
  resume: "/",
  contact: "/",
  initiative: "/initiative-impact",
};

function scoreItemForVariant(
  item: SiteIndexItem,
  queryLower: string,
  queryWords: string[],
  searchIntent: { category: string | null; confidence: number }
): { score: number; matchedKeywords: string[]; exactMatches: number; titleMatches: number; descMatches: number } {
  let score = 0;
  const matchedKeywords: string[] = [];
  let exactMatches = 0;
  let titleMatches = 0;
  let descMatches = 0;

  if (searchIntent.category && searchIntent.confidence > 0.5) {
    const expectedPage = INTENT_PAGE_MAP[searchIntent.category];
    if (expectedPage && item.page !== expectedPage) {
      score -= 65;
    } else if (expectedPage && item.page === expectedPage) {
      score += 175;
    }
  }

  for (const keyword of item.keywords) {
    const keywordLower = keyword.toLowerCase();

    if (keywordLower === queryLower) {
      score += 200;
      exactMatches++;
      matchedKeywords.push(keyword);
    } else if (keywordLower.startsWith(queryLower)) {
      score += 150;
      matchedKeywords.push(keyword);
    } else if (queryLower.startsWith(keywordLower)) {
      score += 140;
      matchedKeywords.push(keyword);
    } else {
      const matchScore = fuzzyMatch(queryLower, keywordLower);
      if (matchScore > 42) {
        score += matchScore;
        if (matchScore > 75) {
          matchedKeywords.push(keyword);
        }
      }
    }
  }

  const titleLower = item.title.toLowerCase();
  for (const qWord of queryWords) {
    if (qWord.length < 2) continue;
    if (titleLower.includes(qWord)) {
      titleMatches++;
      score += 95;
    }
  }
  if (titleLower.includes(queryLower)) {
    score += 150;
  }

  const descLower = item.description.toLowerCase();
  for (const qWord of queryWords) {
    if (qWord.length < 2) continue;
    if (descLower.includes(qWord)) {
      descMatches++;
      score += 28;
    }
  }

  if (queryWords.length > 1) {
    const matchedWordCount = titleMatches + descMatches;
    if (matchedWordCount === queryWords.length) {
      score += 50;
    }
  }

  const pageType = item.page === "/" ? "about" : item.page.replace(".html", "").replace("index", "about");
  if (queryWords.some((word) => pageType.includes(word) || word.includes(pageType))) {
    score += 95;
  }

  const hay = `${item.keywords.join(" ")} ${item.title} ${item.description}`.toLowerCase();
  for (const t of meaningfulTokens(queryLower)) {
    if (t.length < 3) continue;
    if (hay.includes(t)) score += 8;
  }

  return { score, matchedKeywords, exactMatches, titleMatches, descMatches };
}

function performSearchRaw(query: string): Scored[] {
  if (!query || query.trim().length === 0) return [];

  const normalized = normalizeSearchInput(query);
  if (!normalized.length) return [];

  const variants = expandQueryVariants(normalized);
  const searchIntent = detectSearchIntent(query);

  const candidates: Scored[] = [];

  for (const item of ALL_INDEX) {
    let best: Scored | null = null;
    for (const variant of variants) {
      const qWords = variant.split(/\s+/).filter((w) => w.length > 0);
      const { score, matchedKeywords, exactMatches } = scoreItemForVariant(item, variant, qWords, searchIntent);
      const row: Scored = {
        ...item,
        score,
        matchedKeywords: matchedKeywords.slice(0, 8),
        exactMatches,
        relevance: score,
      };
      if (!best || row.score > best.score) best = row;
    }
    if (best) candidates.push(best);
  }

  const thresholdStrong = searchIntent.category ? 72 : 36;
  const thresholdWeak = searchIntent.category ? 48 : 22;

  let results = candidates.filter((c) => c.score > thresholdStrong);

  if (results.length < 6) {
    const extra = candidates.filter((c) => c.score > thresholdWeak && c.score <= thresholdStrong);
    extra.sort((a, b) => b.score - a.score);
    results = [...results, ...extra.slice(0, 14 - results.length)];
  }

  results.sort((a, b) => {
    if (b.exactMatches !== a.exactMatches) return b.exactMatches - a.exactMatches;
    return b.score - a.score;
  });

  const maxResults = searchIntent.category ? 14 : 20;
  return results.slice(0, maxResults);
}

function groupForPage(page: string): SearchEntry["group"] {
  switch (page) {
    case "/":
      return "About";
    case "/projects":
      return "Projects";
    case "/experience":
      return "Experience";
    case "/education":
      return "Education";
    case "/skills":
      return "Skills";
    case "/initiative-impact":
      return "Initiative & Impact";
    default:
      return "Other";
  }
}

const PROJECT_SECTION_TO_ID: Record<string, number> = {
  unclogai: 2,
  voyagelog: 3,
  startupplanner: 4,
  excellensight: 5,
  "link-analysis": 6,
  taskify: 7,
  gdelt: 8,
  rps: 9,
  lstore: 10,
  lenscraft: 1,
  quivlo: 11,
};

const EXPERIENCE_SECTION_TO_ENTRY: Record<string, string> = {
  qalienai: "qalienai",
  gallox: "gallox",
  cornell: "cornell-cals",
  colentai: "colentai",
  cardinality: "cardinality-ai",
  "y-meadows": "y-meadows",
};

export function resolveSiteIndexToTarget(item: SiteIndexItem): SearchTarget {
  const { page, section } = item;

  if (page === "/") {
    if (!section || section === "about") return { type: "window", id: "home" };
    if (section === "resume") return { type: "window", id: "resume" };
    if (section === "contact") return { type: "window", id: "contact" };
    if (section === "github") return { type: "external", url: "https://github.com/ronitbhatia" };
    if (section === "linkedin") return { type: "external", url: "https://www.linkedin.com/in/ronit-bhatia/" };
    return { type: "window", id: "home" };
  }

  if (page === "/projects") {
    if (section && PROJECT_SECTION_TO_ID[section] !== undefined) {
      return { type: "project", projectId: PROJECT_SECTION_TO_ID[section]! };
    }
    return { type: "window", id: "projects" };
  }

  if (page === "/experience") {
    if (section && EXPERIENCE_SECTION_TO_ENTRY[section]) {
      return {
        type: "timeline",
        windowId: "experience",
        entryId: EXPERIENCE_SECTION_TO_ENTRY[section]!,
      };
    }
    return { type: "window", id: "experience" };
  }

  if (page === "/education") {
    if (section === "cornell") {
      return { type: "timeline", windowId: "education", entryId: "cornell" };
    }
    if (section === "coursework") {
      return { type: "window", id: "education" };
    }
    return { type: "window", id: "education" };
  }

  if (page === "/skills") {
    const skillSections = ["programming", "ml", "tools", "cloud"];
    if (section && skillSections.includes(section)) {
      return { type: "skills-section", sectionId: section };
    }
    return { type: "window", id: "skills" };
  }

  if (page === "/initiative-impact") {
    return { type: "window", id: "initiative-impact" };
  }

  return { type: "window", id: "home" };
}

function stableEntryId(item: SiteIndexItem): string {
  const key = `${item.page}|${item.section ?? ""}|${item.title}`;
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = (Math.imul(31, h) + key.charCodeAt(i)) | 0;
  }
  return `site-${(h >>> 0).toString(36)}`;
}

/**
 * Google-like fuzzy search from the legacy site index; returns assistant `SearchEntry` rows.
 */
export function performSiteSearch(query: string): SearchEntry[] {
  const raw = performSearchRaw(query);
  return raw.map((item) => ({
    id: stableEntryId(item),
    keywords: item.keywords,
    title: item.title,
    description: item.description,
    target: resolveSiteIndexToTarget(item),
    group: groupForPage(item.page),
  }));
}

/**
 * Site index + catalog entries, deduped by navigation target, sorted by best score.
 * Prefer this for the assistant so timeline-only rows (e.g. Y Meadows) still appear with full index coverage.
 */
export function performUnifiedSearch(query: string): SearchEntry[] {
  const q = query.trim();
  if (!q) return [];

  const raw = performSearchRaw(q);
  const siteEntries = raw.map((item) => ({
    entry: {
      id: stableEntryId(item),
      keywords: item.keywords,
      title: item.title,
      description: item.description,
      target: resolveSiteIndexToTarget(item),
      group: groupForPage(item.page),
    } satisfies SearchEntry,
    score: item.score,
  }));

  const catalogScored = searchEntries.map((e) => ({
    entry: e,
    score: scoreEntry(q, e),
  }));

  const merged = new Map<string, { entry: SearchEntry; score: number }>();

  for (const s of siteEntries) {
    const k = searchTargetKey(s.entry.target);
    const prev = merged.get(k);
    if (!prev || s.score > prev.score) merged.set(k, s);
  }

  for (const s of catalogScored) {
    if (s.score < 6) continue;
    const k = searchTargetKey(s.entry.target);
    const prev = merged.get(k);
    if (!prev || s.score > prev.score) merged.set(k, s);
  }

  return [...merged.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, 30)
    .map((x) => x.entry);
}
