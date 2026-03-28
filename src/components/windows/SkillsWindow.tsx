import React, { useEffect } from "react";

interface SkillCategory {
  id: string;
  name: string;
  shortLabel: string;
  icon: React.ReactNode;
  color: string;  // accent for title and icon
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming",
    shortLabel: "PROGRAMMING",
    icon: (
      <span className="text-base font-mono font-bold" style={{ opacity: 0.95 }}>&lt;/&gt;</span>
    ),
    color: "hsl(247 58% 55%)",
    skills: [
      "Python",
      "C/C++",
      "SQL",
      "Go",
      "JavaScript",
      "HTML",
      "CSS",
      "MicroPython",
      "Lisp",
      "Prolog",
    ],
  },
  {
    id: "ml",
    name: "ML & AI",
    shortLabel: "ML & AI",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        <path d="M12 6a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6z" opacity="0.6" />
      </svg>
    ),
    color: "hsl(142 60% 42%)",
    skills: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "LangChain",
      "Ollama",
      "LangFuse",
      "LangGraph",
      "PydanticAI",
      "Unsloth",
      "Windsurf",
      "Cursor",
      "Kimi AI",
      "Kiro",
    ],
  },
  {
    id: "tools",
    name: "Tools & DevOps",
    shortLabel: "TOOLS & DEVOPS",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
    color: "hsl(267 55% 55%)",
    skills: ["Git", "GitHub", "Docker", "VS Code", "MATLAB", "JIRA", "PowerBI"],
  },
  {
    id: "cloud",
    name: "Cloud",
    shortLabel: "CLOUD",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    color: "hsl(25 95% 52%)",
    skills: [
      "AWS (S3, EC2, Lambda, SageMaker, RDS, DynamoDB)",
      "GCP (BigQuery, Vertex AI, Cloud Run)",
    ],
  },
];

const LEARNING_PHILOSOPHY =
  "Build what matters, not just what is interesting. Good engineering starts with understanding the user, the constraint, and the outcome we are trying to change. Impact over elegance.";

interface SkillsWindowProps {
  focusCategoryId?: string | null;
  focusToken?: number;
}

const SkillsWindow: React.FC<SkillsWindowProps> = ({
  focusCategoryId = null,
  focusToken,
}) => {
  useEffect(() => {
    if (!focusCategoryId || focusToken == null) return;
    document.getElementById(`skills-cat-${focusCategoryId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusCategoryId, focusToken]);

  return (
    <div className="flex flex-col h-full skills-window">
      <div
        className="flex items-center gap-2 px-4 py-2 border-b text-xs window-chrome-bar"
        style={{ borderColor: "hsl(var(--mac-border))", fontFamily: "var(--font-body)" }}
      >
        <span className="font-semibold">Skills</span>
      </div>

      <div className="flex-1 overflow-y-auto mac-scroll p-6 mac-stripe-bg flex flex-col min-h-0">
        {/* 2x2 grid of category cards */}
        <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {categories.map((cat, index) => (
            <div
              key={cat.id}
              id={`skills-cat-${cat.id}`}
              className="skill-category-card rounded-xl border overflow-hidden relative"
              style={{
                borderColor: "hsl(var(--mac-border))",
                background: "hsl(var(--window-card-bg))",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              }}
            >
              {/* Decorative background number */}
              <span
                className="skill-card-number absolute right-3 top-2 font-bold select-none pointer-events-none"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="p-4 relative">
                {/* Icon + labels */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`skill-card-icon skill-card-icon--${cat.id} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}
                    style={{ color: cat.color }}
                  >
                    {cat.icon}
                  </div>
                  <div className="min-w-0">
                    <div
                      className="skill-card-category-label text-xs uppercase tracking-widest font-semibold mb-0.5"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {cat.shortLabel}
                    </div>
                    <div
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: cat.color,
                      }}
                    >
                      {cat.name}
                    </div>
                  </div>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag px-2.5 py-1 rounded-md text-xs font-medium"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Philosophy */}
        <div
          className="mt-auto pt-6 pb-2 border-t flex flex-col items-center justify-end"
          style={{ borderColor: "hsl(var(--mac-border))" }}
        >
          <div
            className="window-section-label text-xs font-bold uppercase tracking-widest mb-2"
            style={{ fontFamily: "var(--font-mono)", opacity: 0.9 }}
          >
            Learning Philosophy
          </div>
          <p
            className="text-sm font-bold text-center leading-relaxed max-w-xl skills-philosophy-text"
            style={{ fontFamily: "var(--font-body)" }}
          >
            "{LEARNING_PHILOSOPHY}"
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillsWindow;
