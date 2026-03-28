/**
 * Shared normalization, synonym expansion, and tokenization for portfolio search
 * (site index + catalog entries).
 */

import type { SearchTarget } from "./searchCatalog";

/** Noise words removed for token overlap scoring (keep "me" — used in "about me"). */
export const SEARCH_STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "to",
  "of",
  "in",
  "on",
  "for",
  "with",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "has",
  "have",
  "had",
  "do",
  "does",
  "did",
  "but",
  "if",
  "into",
  "at",
  "from",
  "as",
  "it",
  "its",
  "this",
  "that",
  "these",
  "those",
]);

/**
 * Lowercase, strip most punctuation, collapse whitespace (Unicode-friendly).
 */
export function normalizeSearchInput(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[''`]/g, "'")
    .replace(/[^\p{L}\p{N}\s@.+#\-/]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Single-token → related phrases (for expanding query variants). */
const TOKEN_SYNONYMS: Record<string, string[]> = {
  ml: ["machine learning"],
  ai: ["artificial intelligence"],
  nlp: ["natural language processing"],
  llm: ["large language model", "language model"],
  cv: ["computer vision"],
  db: ["database"],
  aws: ["amazon web services", "amazon"],
  gcp: ["google cloud", "google cloud platform"],
  k8s: ["kubernetes"],
  tf: ["tensorflow"],
  js: ["javascript"],
  ts: ["typescript"],
  cs: ["computer science"],
  swe: ["software engineer", "software engineering"],
  mle: ["machine learning engineer"],
  pm: ["product manager", "product management"],
  ft: ["full time", "full-time"],
  intern: ["internship"],
  repo: ["repository", "github"],
  app: ["application"],
  api: ["rest api", "restful"],
  ui: ["user interface"],
  ux: ["user experience"],
  oss: ["open source"],
  nyc: ["new york"],
};

/**
 * Meaningful tokens for overlap scoring (length ≥ 2, not stopwords).
 */
export function meaningfulTokens(normalized: string): string[] {
  return normalized
    .split(/\s+/)
    .map((t) => t.replace(/^[/]+|[/]+$/g, ""))
    .filter((t) => t.length >= 2 && !SEARCH_STOPWORDS.has(t));
}

/**
 * Multiple query strings to score against (original + synonym substitutions + abbreviations).
 */
export function expandQueryVariants(normalized: string): string[] {
  const variants = new Set<string>();
  if (normalized.length) variants.add(normalized);

  // Phrase ↔ abbreviation
  if (normalized.includes("machine learning")) {
    variants.add(normalized.replace(/\bmachine learning\b/g, "ml").replace(/\s+/g, " ").trim());
  }
  if (/\bml\b/.test(normalized) && !normalized.includes("machine learning")) {
    variants.add(normalized.replace(/\bml\b/g, "machine learning").replace(/\s+/g, " ").trim());
  }
  if (normalized.includes("artificial intelligence")) {
    variants.add(normalized.replace(/\bartificial intelligence\b/g, "ai").replace(/\s+/g, " ").trim());
  }
  if (/\bai\b/.test(normalized) && !normalized.includes("artificial intelligence")) {
    variants.add(normalized.replace(/\bai\b/g, "artificial intelligence").replace(/\s+/g, " ").trim());
  }

  const tokens = normalized.split(/\s+/);
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]!;
    const expansions = TOKEN_SYNONYMS[t];
    if (!expansions) continue;
    for (const phrase of expansions) {
      const next = [...tokens.slice(0, i), ...phrase.split(/\s+/), ...tokens.slice(i + 1)]
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      if (next.length) variants.add(next);
    }
  }

  return [...variants];
}

export function searchTargetKey(target: SearchTarget): string {
  return JSON.stringify(target);
}
