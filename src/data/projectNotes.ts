// Engineering decisions grounded in projects.ts; no unverified outcome claims.
export const projectNotes: Record<number, string> = {
  12: "I constrained the model’s output before connecting it to speech: structured decisions, confidence gates, and duplicate suppression. Multi-second latency and untested user behaviour remain the barriers between a working demo and a dependable assistive system.",
  11: "I split capture, extraction, card planning, and persistence into separate services. Quality gates reject weak content before rendering, while editable cards give users a recovery path when generation misses the mark.",
  1: "I kept financial calculations outside the model boundary. AI selects the presentation; a deterministic TypeScript engine, schema validation, and template fallbacks preserve predictable behaviour when the AI layer fails.",
  2: "I grounded recommendations in a dependency graph built from normalised task data. Explicit critical paths and resource relationships make bottleneck analysis inspectable before an LLM turns it into advice.",
  3: "I kept the prototype small with Flask, SQLite, and automatic geocoding. That stack covers capture, storage, and mapping without adding infrastructure beyond what the core journaling flow needs.",
  4: "I separated idea parsing, SWOT, and MVP planning into focused stages running locally. The result is an inspectable planning workflow, with generated market assumptions still requiring external validation.",
  5: "I used a shared encoder with separate classification and summarisation heads. Monitoring both outputs matters: identifying a trend correctly does not guarantee that its summary preserves the evidence.",
  6: "I evaluated build versus buy through cost, vendor capability, and long-term flexibility. KPIs and break-even analysis turn an architecture preference into a decision leadership can assess against business constraints.",
  7: "I used cross-attention to model the relationship between requirements and qualifications. Synthetic training data supported development, but real-team evaluation is the necessary next step before operational use.",
  8: "I separated news ingestion, embeddings, retrieval, and local inference into modules. This makes the research pipeline easier to inspect; the quality of generated investment ideas remains a separate evaluation problem.",
  9: "I reduced inputs from 96 × 96 to 32 × 32 to fit the device’s memory budget. The 56% deployed accuracy showed why validation on target hardware must determine readiness.",
  10: "I kept updates in tail pages and merged them into base storage in the background. Record-level locking and rollback handle transactional correctness alongside the columnar layout’s analytical access pattern.",
};
