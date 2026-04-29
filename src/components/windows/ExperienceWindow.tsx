import React, { useEffect, useRef, useState } from "react";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  readMore: string[];
  tech: string[];
  icon: string;
  color: string;
}

const experiences: Experience[] = [
  {
    id: "y-meadows",
    company: "Y Meadows",
    role: "Forward Deplpyed Engineer",
    period: "Jan 2026 – Present",
    location: "Remote",
    type: "Internship",
    description:
      "Working across onboarding, integrations, and deployment readiness to help customers move from kickoff to production smoothly. Partnering closely with product and engineering to turn requirements into stable, repeatable implementations.",
    readMore: [
      "Owned configuration and validation of end-to-end customer onboarding workflows across internal systems and third-party integrations. Verified data mappings, permissions, and environment setup, and ran system and integration checks to ensure customers entered UAT fully prepared and deployments were reliable.",
      "Collaborated with product managers and engineers to break down customer requirements into clear technical tasks. Tracked dependencies in JIRA and aligned implementation work with customer context in Salesforce, identifying risks early and helping reduce time-to-go-live by roughly 20 percent.",
      "Maintained onboarding documentation, configuration checklists, and internal runbooks to keep implementations consistent and easy to hand off. Improved configuration tooling and templates to reduce manual errors, streamline deployments, and make ongoing support easier for downstream teams.",
    ],
    tech: ["Customer Onboarding", "Integrations", "JIRA", "Salesforce"],
    icon: "Y",
    color: "hsl(207 89% 45%)",
  },
  {
    id: "qalienai",
    company: "QAlienAI",
    role: "Machine Learning Engineer Intern",
    period: "Oct 2025 – Feb 2026",
    location: "Remote",
    type: "Internship",
    description:
      "Led development of AI systems that evaluate marketing content for FTC and FDA compliance using LLMs, semantic similarity, and rule-based checks. Built multimodal classifiers and unified OCR/ASR pipelines to support platform-wide content intelligence.",
    readMore: [
      "Led development of AI systems that evaluate marketing content for FTC and FDA compliance using LLMs, semantic similarity, and rule-based checks. Worked with Claude 3.5 Sonnet and Gemini 2.5 Pro to deliver accurate, interpretable assessments. Built multimodal classifiers that distinguish user-generated from professional content.",
      "Developed multimodal content analysis capabilities using image, video, and audio processing through AWS Bedrock and Gemini Vision. Built a unified OCR and ASR pipeline with Gemini Vision and AssemblyAI for reliable text extraction across images, audio, and video. Implemented confidence scoring, fallback logic, and error handling for robust performance.",
      "Implemented semantic search with pgvector to retrieve regulatory guidance, generating embeddings, and tuning similarity search. Created a brand compliance analyzer powered by multiple LLM providers that produces structured evaluations of tone, vocabulary, layout, and visual identity with confidence scoring.",
      "Engineered end-to-end AI pipelines using Supabase Edge Functions, TypeScript, and Deno. Managed async workflows, job queues, and result aggregation for a scalable multi-tenant SaaS platform.",
    ],
    tech: ["LLMs", "AWS Bedrock", "Multimodal AI", "pgvector", "TypeScript"],
    icon: "Q",
    color: "hsl(267 83% 55%)",
  },
  {
    id: "gallox",
    company: "Gallox Semiconductors",
    role: "Software Engineer Intern",
    period: "Nov 2024 – Jan 2025",
    location: "Remote",
    type: "Internship",
    description:
      "Built smart automation tools to test semiconductor power devices, helping engineers save time and get more accurate results. My work made it easier to spot issues early and sped up the overall testing process in the lab.",
    readMore: [
      "Architected comprehensive automation frameworks for semiconductor power device testing, streamlining characterization workflow for high-voltage MOSFETs and IGBTs. Built sophisticated real-time data visualization dashboard with multi-threaded data acquisition and automated anomaly detection, reducing manual debugging time by 40%.",
      "Developed robust testing protocols and quality assurance systems that improved device characterization accuracy and significantly reduced testing cycle times. Implemented advanced data processing algorithms to handle large-scale semiconductor datasets efficiently.",
    ],
    tech: ["Python", "Test Automation", "Hardware", "Data Visualization"],
    icon: "G",
    color: "hsl(40 95% 45%)",
  },
  {
    id: "cornell-cals",
    company: "Cornell CALS",
    role: "Student Research Assistant",
    period: "Aug 2024 – Dec 2024",
    location: "Ithaca, NY",
    type: "Research",
    description:
      "Explored how machine learning can help tackle climate change by analyzing greenhouse gas emissions from different crops. Built efficient tools to clean and process large amounts of geospatial data for sustainable agriculture strategies.",
    readMore: [
      "Engineered sophisticated ML pipelines to analyze large-scale agricultural GHG emission datasets, implementing advanced k-means clustering algorithms with custom distance metrics. Developed comprehensive Python-based ETL workflows using Pandas, NumPy, and GeoPandas to process and standardize geospatial crop emissions data from multiple sources.",
      "Conducted extensive data analysis to identify patterns in agricultural emissions and developed predictive models for sustainable farming practices. Collaborated with research teams to validate findings and contribute to climate change mitigation strategies through data-driven insights.",
    ],
    tech: ["Machine Learning", "GeoPandas", "Climate Tech", "Python"],
    icon: "C",
    color: "hsl(142 72% 39%)",
  },
  {
    id: "colentai",
    company: "ColentAI",
    role: "Software Developer Intern",
    period: "Jan 2024 – Mar 2024",
    location: "Remote",
    type: "Internship",
    description:
      "Worked on making generative AI models smarter and faster by fine-tuning how they learn. Built reliable pipelines to pull in diverse data from APIs which helped improve the quality of training datasets.",
    readMore: [
      "Optimized large language model performance through systematic hyperparameter tuning and advanced fine-tuning techniques. Conducted extensive API research and integration work, developing robust data acquisition pipelines.",
      "Built sophisticated automated skill taxonomy generator leveraging advanced NLP techniques including TF-IDF vectorization, NER, and BERT embeddings for semantic similarity analysis, achieving 92% classification accuracy.",
    ],
    tech: ["NLP", "BERT", "Fine-tuning", "LLMs"],
    icon: "C",
    color: "hsl(280 60% 55%)",
  },
  {
    id: "cardinality-ai",
    company: "Cardinality-AI",
    role: "Data Analyst Intern",
    period: "June 2021 – Sept 2021",
    location: "Remote",
    type: "Internship",
    description:
      "Worked on designing and building smart data pipelines to prepare large, structured datasets for machine learning. Used SQL to clean and organize the data efficiently and engineered new features to help models make better predictions.",
    readMore: [
      "Architected and implemented robust data ingestion and transformation pipelines using advanced SQL techniques including window functions, CTEs, and stored procedures to efficiently process large-scale structured datasets.",
      "Leveraged MATLAB's advanced analytics capabilities to conduct sophisticated pattern recognition analysis using signal processing techniques, Fourier transforms, and spectral analysis for data-driven policy recommendations.",
    ],
    tech: ["SQL", "MATLAB", "Data Pipelines"],
    icon: "C",
    color: "hsl(25 95% 50%)",
  },
];

interface ExperienceWindowProps {
  focusEntryId?: string | null;
  focusToken?: number;
}

const ExperienceWindow: React.FC<ExperienceWindowProps> = ({
  focusEntryId,
  focusToken,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!focusEntryId) return;
    const entry = experiences.find((exp) => exp.id === focusEntryId);
    if (!entry) return;

    setExpandedId(entry.id);
    setHighlightedId(entry.id);

    const raf = requestAnimationFrame(() => {
      itemRefs.current[entry.id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });

    const timeout = window.setTimeout(() => {
      setHighlightedId((current) => (current === entry.id ? null : current));
    }, 1700);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [focusEntryId, focusToken]);

  return (
    <div className="flex flex-col h-full experience-window">
      {/* Document toolbar – liquid glass with logo */}
      <div className="liquid-glass-toolbar flex items-center gap-3 px-4 py-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 liquid-glass-icon"
          aria-hidden
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </div>
        <span
          className="text-sm font-semibold"
          style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
        >
          Experience
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto mac-scroll p-6 mac-stripe-bg">
        {/* Experience entries */}
        <div>
          <h2
            className="window-section-label text-xs font-bold uppercase tracking-widest mb-5"
            style={{ fontFamily: "var(--font-mono)", opacity: 1 }}
          >
            Work Experience
          </h2>

          <div className="relative pl-5">
            <div
              className="absolute left-2 top-0 bottom-0 w-px"
              style={{ background: "hsl(var(--mac-border))" }}
            />

            <div className="flex flex-col gap-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative">
                  <div
                    className="absolute -left-3 top-1.5 w-3 h-3 rounded-full border-2"
                    style={{
                      background: exp.color,
                      borderColor: "hsl(var(--window-card-bg))",
                      boxShadow: `0 0 0 2px ${exp.color}40`,
                    }}
                  />

                  <div
                    ref={(node) => {
                      itemRefs.current[exp.id] = node;
                    }}
                    className="rounded-lg border p-5 window-card-bg"
                    style={{
                      borderColor:
                        highlightedId === exp.id
                          ? "hsl(var(--mac-blue))"
                          : "hsl(var(--mac-border))",
                      boxShadow:
                        highlightedId === exp.id
                          ? "0 0 0 2px hsl(var(--mac-blue) / 0.35), 0 8px 24px rgba(0,0,0,0.12)"
                          : undefined,
                      transition: "box-shadow 180ms ease, border-color 180ms ease",
                    }}
                  >
                    <div className="flex items-start justify-between mb-2 gap-2 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="font-bold text-sm"
                            style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                          >
                            {exp.company}
                          </span>
                          <span
                            className="text-xs px-1.5 py-0.5 rounded border"
                            style={{
                              background: "hsl(var(--window-input-bg-alt))",
                              borderColor: "hsl(var(--mac-border))",
                              fontFamily: "var(--font-mono)",
                              color: "hsl(var(--muted-foreground))",
                            }}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <div
                          className="text-xs font-medium mt-0.5"
                          style={{
                            color: "hsl(var(--mac-blue))",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {exp.role}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className="text-xs font-semibold"
                          style={{
                            fontFamily: "var(--font-mono)",
                            color: "hsl(var(--mac-dark))",
                          }}
                        >
                          {exp.period}
                        </div>
                        <div
                          className="text-xs window-section-label"
                          style={{ fontFamily: "var(--font-body)", opacity: 0.8 }}
                        >
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p
                      className="text-xs leading-relaxed mb-2"
                      style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                    >
                      {exp.description}
                    </p>
                    {expandedId === exp.id && exp.readMore.length > 0 && (
                      <div className="mb-2 space-y-2">
                        {exp.readMore.map((para, j) => (
                          <p
                            key={j}
                            className="text-xs leading-relaxed"
                            style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))", opacity: 0.92 }}
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    )}
                    {exp.readMore.length > 0 && (
                      <button
                        type="button"
                        className="text-xs px-2 py-1 rounded border font-medium mb-2"
                        style={{
                          borderColor: "hsl(var(--mac-border))",
                          fontFamily: "var(--font-body)",
                          color: "hsl(var(--mac-dark))",
                          background: "hsl(var(--window-input-bg-alt))",
                        }}
                        onClick={() =>
                          setExpandedId(expandedId === exp.id ? null : exp.id)
                        }
                      >
                        {expandedId === exp.id ? "Read Less" : "Read More"}
                      </button>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <span key={t} className="mac-tag" style={{ fontSize: "10px" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceWindow;
