import React, { useEffect, useState } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  readMore?: string[];
  stack: string[];
  github: string;
  demo?: string;
  demoLabel?: string;
  color: string;
  status: "Live" | "WIP" | "Open Source";
}

const QUIVLO_APP_STORE = "https://apps.apple.com/us/app/quivlo/id6759634487";

const projects: Project[] = [
  {
    id: 11,
    name: "Quivlo: iOS Knowledge-Capture & Flashcard Intelligence",
    description:
      "Native iOS app that transforms raw reading inputs into concise, editable learning cards using an on-device NLP/ML pipeline. Ingests pasted text, article URLs, and screenshots; applies extraction, semantic clustering, card planning, and rewrite-quality gating to generate high-signal flashcards without backend LLM dependencies. Local persistence, review workflows, and social-ready image export. Released March 2026.",
    readMore: [
      "Advanced On-Device Content Intelligence: Built a multi-stage generation stack that cleans noisy source text, performs sentence segmentation, computes semantic signals, and groups related ideas into clusters for card-worthy concept extraction. Implemented role-aware/content-type-aware planning logic to prioritize meaningful card intents (takeaway, key term, mechanism, contrast, impact) and suppress low-value filler. Added quality controls for redundancy, overlap, and weak evidence to improve precision and reduce copy-paste style outputs.",
      "Capture-to-Card Pipeline and Editing UX: Implemented end-to-end ingestion with Vision OCR for screenshots and URL-based article text extraction via native networking/parsing heuristics. Designed a reusable SwiftUI FlashCard component with inline editing, reordering, add/delete by card type, and compact action controls optimized for real use. Added explicit save-to-library flow, recent/saved set management, rename/delete actions, and deterministic navigation so users can generate, refine, and reuse card sets quickly.",
      "Production-Ready iOS Architecture and Distribution: Architected a modular SwiftUI app with service-oriented boundaries (extraction, generation, planning, rendering, persistence) and local JSON storage in Application Support using Codable models. Implemented high-resolution flashcard image rendering/export and share-sheet integration for single-card and carousel workflows. Completed App Store release hardening including dark mode fixes, keyboard/focus ergonomics, launch screen/icon pipeline, compliance metadata, and distribution readiness for public release.",
    ],
    stack: ["Swift", "SwiftUI", "iOS", "NLP", "ML", "Vision OCR", "On-Device ML"],
    github: "",
    demo: QUIVLO_APP_STORE,
    demoLabel: "App Store",
    color: "hsl(207 89% 94%)",
    status: "Live",
  },
  {
    id: 1,
    name: "LensCraft: Adaptive Personal Finance Interface",
    description:
      "LensCraft is a personal finance app where the interface adapts to how you think. Instead of a single fixed dashboard, the app infers your intent from natural-language prompts and switches between three views: Narrative (timelines, story, event chips), Constraint (runway, risk, safety), and Optimizer (scenario comparison, sensitivity). A deterministic TypeScript finance engine performs all calculations; AI is used only for layout selection and grounded explanations.",
    readMore: [
      "Adaptive Interface Architecture: Built a mental-model inference engine using 40+ weighted regex patterns and exponential smoothing to map user prompts to narrative, constraint, or optimizer lenses. The deterministic prompt parser extracts scenario overrides and comparison intents from natural language.",
      "Determinism-First Design: Implemented a pure TypeScript finance engine that computes 12-month projections, risk metrics, and scenario deltas without any LLM involvement. Integrated Google Gemini and Tambo Cloud for AI features with Zod schema validation and fallback to deterministic templates.",
      "Production-Ready Full-Stack: Next.js 14 App Router, Zustand, server-side API routes. Deployed on Vercel. Includes 6 user profiles, 12 scenario templates, and a guided 8-step demo.",
    ],
    stack: ["Next.js", "TypeScript", "React", "Generative AI", "Tailwind CSS", "LLM", "Zustand"],
    github: "https://github.com/ronitbhatia/lenscraft",
    demo: "https://lenscraft-fawn.vercel.app/",
    color: "hsl(142 72% 93%)",
    status: "Live",
  },
  {
    id: 2,
    name: "UnclogAI: AI-Driven Workflow Intelligence",
    description:
      "Enterprise workflow intelligence platform that leverages graph-based process analytics and agentic AI to surface hidden dependencies, detect operational bottlenecks, and provide actionable insights. Transforms raw task data into structured workflows and uses open-source LLMs to generate strategic recommendations.",
    readMore: [
      "Advanced Workflow Intelligence: Data ingestion normalizes multi-format task exports (CSV, JSON, free-form text). Graph construction with NetworkX for task dependencies, resource allocation, and critical path analysis. Identifies bottlenecks through network centrality metrics.",
      "AI-Powered Operational Analytics: Integrated TinyLlama-1.1B-Chat via Hugging Face for local LLM inference. Intelligent recommendation engines for task reallocation, workload balancing, and escalation pathways. Executive-ready Markdown reports with predictive risk forecasting.",
      "Enterprise-Ready Architecture: LangGraph for agentic orchestration, SQLite, Gradio. Real-time workflow analysis and interactive visualization dashboards. Designed for SaaS integration with Jira, Asana, Slack.",
    ],
    stack: ["AI/ML", "LangGraph", "LLM", "Workflow Automation", "NLP", "Data Visualization"],
    github: "https://github.com/ronitbhatia/unclogAI",
    color: "hsl(207 89% 94%)",
    status: "Open Source",
  },
  {
    id: 3,
    name: "VoyageLog: Interactive Travel Journal & Map",
    description:
      "Travel-journal web app that lets users record trips, upload memories, and see everything on an interactive map without any manual coordinate entry.",
    readMore: [
      "Built with Flask and SQLite; back-end auto-geocodes any place name via OpenStreetMap Nominatim, drops the pin on a Leaflet map, and stores photos in a local uploads folder. Dark, glass-morphism UI.",
      "The codebase was iteratively created with Kimi K2 (Moonshot AI's open-source LLM). High-level prompts for Flask travel journal with interactive map, photo uploads, auto-geocoding; refined and debugged to reach a functional prototype.",
      "Ideal for hackathons, portfolio demos, or privacy-first journaling. End-to-end web development: RESTful routing, ORM mapping, file handling, geospatial visualization, responsive design in under 400 lines of code.",
    ],
    stack: ["Python", "Flask", "RESTful API", "SQLAlchemy", "Docker", "CI/CD"],
    github: "https://github.com/ronitbhatia/voyagelog",
    color: "hsl(195 80% 93%)",
    status: "Open Source",
  },
  {
    id: 4,
    name: "Startup Planner Agent",
    description:
      "Locally hosted AI application that uses open-source language models to generate structured startup strategies. Users input a product idea and receive a complete business plan including parsed objectives, market analysis, SWOT insights, and MVP development plans. No API key or cloud access required.",
    readMore: [
      "Multi-agent architecture: idea parser extracts key business dimensions, research agent returns competitor and trend data, SWOT agent formulates strategic assessments, MVP agent proposes tech stacks and timelines. Each step powered by LLaMA 3 through Ollama.",
      "Built entirely with Streamlit: interactive frontend, user input, expandable result views, export in JSON and TXT. Complete offline usability for demos, hackathons, or privacy-sensitive environments. Strong integration of local LLMs, agentic design, and UI/UX for AI tooling.",
    ],
    stack: ["LLM", "Streamlit", "Ollama", "Startup Planning"],
    github: "https://github.com/ronitbhatia/startup-planner-agent",
    color: "hsl(40 95% 94%)",
    status: "Open Source",
  },
  {
    id: 5,
    name: "ExcellenSight: ChatGPT Feedback Analyzer",
    description:
      "End-to-end NLP system to extract actionable insights from user feedback on ChatGPT. Custom neural network from scratch with a shared encoder and two task-specific heads: trend classification (five categories) and sentence-level summarization.",
    readMore: [
      "Pipeline ingests thousands of raw comments, applies preprocessing, trains the neural model while monitoring classification accuracy and summarization quality. Automatically compiles reports with text summaries and visualizations (training loss, frequency charts) in Markdown and HTML.",
      "Streamlit application for real-time interaction: upload datasets, inspect categorized reviews, explore insights. Highly scalable for tens of thousands of reviews. Transforms raw feedback into data-driven insights for UX, marketing, and product improvements.",
    ],
    stack: ["Neural Networks", "NLP", "Streamlit", "Python"],
    github: "https://github.com/ronitbhatia/ExcellenSight",
    color: "hsl(280 60% 94%)",
    status: "Open Source",
  },
  {
    id: 6,
    name: "Capstone: Link Analysis & Fraud Detection",
    description:
      "Fortune 500 insurance capstone: whether to build in-house link analysis for fraud detection or partner with a third-party solution. Explored how fraud rings form, how analytics reveal hidden connections, and what strategy drives the most long-term value.",
    readMore: [
      "Led competitive analysis: evaluation of external vendors and internal development options, SWOT, vendor ranking framework, engagement with solution providers. Established KPIs and break-even analysis comparing in-house vs. third-party adoption.",
      "Findings informed final recommendations; insights highlighted where external vendors offered advantages and where internal solutions provided flexibility. Executive-level pitch deck with clear, actionable roadmap for senior leaders.",
    ],
    stack: ["Data Analysis", "Financial Modeling", "Risk Management", "Competitive Analysis"],
    github: "",
    color: "hsl(0 70% 95%)",
    status: "Open Source",
  },
  {
    id: 7,
    name: "Taskify: AI Task-to-Team Member Matching",
    description:
      "AI-driven recommendation engine that automates assignment of tasks to the most suitable team members. Custom Transformer-based neural network with hybrid attention for task descriptions and team profiles; outputs compatibility scores.",
    readMore: [
      "Training dataset of 40,000+ synthetic task-member pairs from different departments, roles, and expertise levels. Binary classifier with cross-attention layers for relational nuances between task requirements and qualifications.",
      "Full evaluation suite: accuracy, precision, recall, F1, confusion matrices. Streamlit interface for real-time task input and top recommended team members with fit scores. Directly actionable in project management settings.",
    ],
    stack: ["Transformers", "ML", "Recommendation Systems", "Streamlit"],
    github: "https://github.com/ronitbhatia/Taskify",
    color: "hsl(142 72% 93%)",
    status: "Open Source",
  },
  {
    id: 8,
    name: "GDELT Monitoring: LLM-Powered Macro Investment",
    description:
      "Simulates a portfolio manager workflow at a Global Macro Hedge Fund. Uses a fully local LLM to generate investment strategies from real-time global news. GDELT database, vector store, prompt-engineered LLM for country-level long/short recommendations.",
    readMore: [
      "Python modules for scraping GDELT, transforming for NLP, embedding into Chroma vector DB. Exploratory analysis and vector visualizations with PCA and t-SNE.",
      "Investment engine uses locally hosted LLaMA 3.2B via Ollama for privacy-preserving inference. Prompt engineering and text embeddings summarize geopolitical trends and recommend trade actions. End-to-end local execution, modular and scalable.",
    ],
    stack: ["LLMs", "Financial Analysis", "Vector DB", "NLP"],
    github: "https://github.com/ronitbhatia/GDELT-Monitoring-system",
    color: "hsl(207 89% 94%)",
    status: "Open Source",
  },
  {
    id: 9,
    name: "Rock-Paper-Scissors on ESP32S3",
    description:
      "Proof-of-concept vision-based rock-paper-scissors on ESP32S3 Sense. CNN-based hand gesture classifier from camera feed using only onboard hardware and Python/MicroPython. Focus on gesture recognition only.",
    readMore: [
      "ESP32S3 for image acquisition and inference. Training data from onboard camera, cleaned and augmented; compact CNN tuned for resource-constrained environments. 96x96 resolution resampled to 32x32 to reduce memory.",
      "Several hundred clean images per class from ESP camera via custom socket server/client. Augmentation and training on laptop; model achieved 56% classification accuracy when deployed back onto ESP with MicroPython. Key takeaways: embedded deployment constraints, creative image processing, validation of affordable microcontrollers for vision tasks.",
    ],
    stack: ["Computer Vision", "CNN", "ESP32", "MicroPython"],
    github: "",
    color: "hsl(25 95% 94%)",
    status: "WIP",
  },
  {
    id: 10,
    name: "L-Store: Lineage-Based Database Storage Engine",
    description:
      "Relational database storage engine based on L-Store: columnar storage, base/tail pages, bufferpool, LRU, secondary indexing, ACID transactions, 2PL concurrency. Project lead; full implementation in Python.",
    readMore: [
      "Milestone 1: Single-threaded in-memory DB with columnar storage, base and tail page architecture; no in-place updates, query performance via indirection.",
      "Milestone 2: Bufferpool with LRU, disk persistence, background merge with TPS for lineage. Secondary indexing (hash, B-tree). Milestone 3: ACID with 2PL, no-wait deadlock prevention, record-level locking, rollback. Columnar 4KB pages, page directory, background merge without blocking foreground. High performance for analytical queries with transactional consistency.",
    ],
    stack: ["Database Systems", "Python", "Storage Engine", "ACID"],
    github: "",
    color: "hsl(280 60% 94%)",
    status: "Open Source",
  },
];

interface ProjectsWindowProps {
  focusProjectId?: number | null;
  focusToken?: number;
}

const ProjectsWindow: React.FC<ProjectsWindowProps> = ({
  focusProjectId = null,
  focusToken,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (focusProjectId == null || focusToken == null) return;
    const el = document.getElementById(`project-card-${focusProjectId}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    setSelected(focusProjectId);
  }, [focusProjectId, focusToken]);

  return (
    <div className="flex flex-col h-full projects-window">
      {/* Finder toolbar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b window-chrome-bar" style={{ borderColor: "hsl(var(--mac-border))" }}>
        <div className="flex gap-1">
          {["◀", "▶"].map((a) => (
            <button
              key={a}
              className="w-6 h-6 rounded text-xs flex items-center justify-center border pixel-border opacity-50 cursor-not-allowed window-input-bg-alt"
              style={{
                borderColor: "hsl(var(--mac-border))",
                fontFamily: "var(--font-body)",
              }}
            >
              {a}
            </button>
          ))}
        </div>

        <div
          className="flex items-center gap-1 px-3 py-1 rounded border text-xs flex-1 window-input-bg"
          style={{
            borderColor: "hsl(var(--mac-border))",
            fontFamily: "var(--font-mono)",
            color: "hsl(var(--mac-blue))",
          }}
        >
          <span className="opacity-60" style={{ color: "hsl(var(--mac-dark))" }}>finder://</span>
          <span style={{ color: "hsl(var(--mac-dark))" }}>Projects ({projects.length} items)</span>
        </div>

        <div className="mac-segmented-control" role="group" aria-label="View mode">
          <button
            type="button"
            className={`mac-segmented-control-item ${view === "grid" ? "mac-segmented-control-item-active" : ""}`}
            onClick={() => setView("grid")}
            aria-pressed={view === "grid"}
          >
            ⊞ Grid
          </button>
          <button
            type="button"
            className={`mac-segmented-control-item ${view === "list" ? "mac-segmented-control-item-active" : ""}`}
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
          >
            ≡ List
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto mac-scroll p-6">
        {view === "grid" ? (
          <div className="grid grid-cols-2 gap-4">
            {projects.map((p) => {
              const isFeatured = p.id === 11;
              return (
              <div
                key={p.id}
                id={`project-card-${p.id}`}
                className={`project-card-hover rounded-lg border cursor-pointer overflow-hidden window-card-bg ${
                  selected === p.id ? "ring-2" : ""
                } ${isFeatured ? "project-card-featured" : ""}`}
                style={{
                  borderColor: selected === p.id ? "hsl(var(--mac-blue))" : "hsl(var(--mac-border))",
                  boxShadow: selected === p.id ? "0 2px 12px rgba(59,130,246,0.15)" : "0 1px 4px rgba(0,0,0,0.08)",
                }}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
              >
                <div
                  className="project-card-header h-14 flex items-center px-4 gap-3 relative"
                  style={{ background: p.color }}
                >
                  {isFeatured && (
                    <span className="project-card-new-badge">New</span>
                  )}
                  <div>
                    <div
                      className="project-card-name font-semibold text-sm"
                      style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                    >
                      {p.name}
                    </div>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded font-medium status-badge status-${p.status.toLowerCase().replace(/\s/g, "-")}`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p
                    className="text-xs leading-relaxed mb-3 opacity-70"
                    style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                  >
                    {p.description}
                  </p>
                  {expandedId === p.id && p.readMore && (
                    <div className="mb-2 space-y-2">
                      {p.readMore.map((para, i) => (
                        <p
                          key={i}
                          className="text-xs leading-relaxed opacity-80"
                          style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                  {p.readMore && (
                    <button
                      type="button"
                      className="text-xs px-2 py-1 rounded border font-medium mb-2"
                      style={{
                        borderColor: "hsl(var(--mac-border))",
                        fontFamily: "var(--font-body)",
                        color: "hsl(var(--mac-dark))",
                        background: "hsl(var(--window-input-bg-alt))",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedId(expandedId === p.id ? null : p.id);
                      }}
                    >
                      {expandedId === p.id ? "Read Less" : "Read More"}
                    </button>
                  )}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {p.stack.map((s) => (
                      <span key={s} className="mac-tag" style={{ fontSize: "10px" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2 py-1 rounded border font-medium transition-colors hover:opacity-80"
                        style={{
                          borderColor: "hsl(var(--mac-border))",
                          fontFamily: "var(--font-body)",
                          color: "hsl(var(--mac-dark))",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2 py-1 rounded font-medium transition-colors"
                        style={{
                          background: "hsl(var(--mac-blue))",
                          color: "white",
                          fontFamily: "var(--font-body)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {p.demoLabel ?? "Live Demo"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {/* List header */}
            <div
              className="grid grid-cols-12 gap-2 px-3 py-1.5 rounded text-xs font-semibold window-section-label border-b"
              style={{
                fontFamily: "var(--font-mono)",
                borderColor: "hsl(var(--mac-border))",
                color: "hsl(var(--about-section-label))",
                opacity: 1,
              }}
            >
              <span className="col-span-4">Name</span>
              <span className="col-span-4">Description</span>
              <span className="col-span-2">Stack</span>
              <span className="col-span-2">Status</span>
            </div>
            {projects.map((p) => (
              <div
                key={p.id}
                id={`project-card-${p.id}`}
                className={`grid grid-cols-12 gap-2 px-3 py-2 rounded cursor-pointer transition-colors project-list-row ${
                  selected === p.id ? "project-list-row-selected" : ""
                }`}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
              >
                <div className="col-span-4 flex items-center gap-2">
                  <span
                    className="text-xs font-medium"
                    style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                  >
                    {p.name}
                  </span>
                </div>
                <div
                  className="col-span-4 text-xs truncate project-list-desc"
                  style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))", opacity: 0.8 }}
                >
                  {p.description}
                </div>
                <div className="col-span-2 flex flex-wrap gap-0.5">
                  {p.stack.slice(0, 2).map((s) => (
                    <span key={s} className="mac-tag" style={{ fontSize: "9px" }}>
                      {s}
                    </span>
                  ))}
                </div>
                <div className="col-span-2">
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded font-medium status-badge status-${p.status.toLowerCase().replace(/\s/g, "-")}`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div
        className="flex items-center px-4 py-1 border-t text-xs gap-4 window-chrome-bar projects-status-bar"
        style={{
          borderColor: "hsl(var(--mac-border))",
          fontFamily: "var(--font-mono)",
          opacity: 0.9,
        }}
      >
        <span>{projects.length} items</span>
        {selected !== null && (
          <>
            <span>•</span>
            <span>{projects.find((p) => p.id === selected)?.name} selected</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsWindow;
