import React from "react";

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  bullets: string[];
  tech: string[];
  icon: string;
  color: string;
}

const experiences: Experience[] = [
  {
    company: "Vercel",
    role: "Senior Software Engineer",
    period: "Jan 2023 – Present",
    location: "Remote",
    type: "Full-time",
    bullets: [
      "Led redesign of Edge Functions runtime, reducing cold start latency by 62%.",
      "Architected multi-region caching layer serving 2B+ requests/month.",
      "Mentored 4 junior engineers; established team code review standards.",
      "Contributed 18 OSS features to Next.js and edge runtime packages.",
    ],
    tech: ["TypeScript", "Rust", "Next.js", "Redis", "Kubernetes"],
    icon: "▲",
    color: "hsl(0 0% 10%)",
  },
  {
    company: "Stripe",
    role: "Software Engineer II",
    period: "Jun 2021 – Dec 2022",
    location: "San Francisco, CA",
    type: "Full-time",
    bullets: [
      "Built Radar fraud ML pipeline processing 15M transactions daily.",
      "Implemented real-time payment status webhooks used by 50k merchants.",
      "Reduced API response P99 from 320ms to 45ms via query optimization.",
      "Led Ruby → Go migration for internal billing microservice.",
    ],
    tech: ["Ruby", "Go", "PostgreSQL", "gRPC", "Kafka"],
    icon: "💳",
    color: "hsl(249 90% 54%)",
  },
  {
    company: "Figma",
    role: "Frontend Engineer",
    period: "Aug 2019 – May 2021",
    location: "San Francisco, CA",
    type: "Full-time",
    bullets: [
      "Shipped auto-layout feature shipped to 3M+ active design teams.",
      "Built collaborative cursor presence system using operational transforms.",
      "Improved canvas render performance by 40% via WebGL optimization.",
    ],
    tech: ["TypeScript", "React", "WebGL", "Canvas API", "WASM"],
    icon: "🖊️",
    color: "hsl(267 83% 60%)",
  },
  {
    company: "HubSpot",
    role: "Software Engineering Intern",
    period: "May 2018 – Aug 2018",
    location: "Cambridge, MA",
    type: "Internship",
    bullets: [
      "Built reusable CRM contact enrichment components used across 3 product teams.",
      "Wrote integration tests reducing CI regression rate by 28%.",
    ],
    tech: ["Java", "React", "MySQL"],
    icon: "🧡",
    color: "hsl(25 95% 50%)",
  },
];

const ExperienceWindow: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Document toolbar */}
      <div
        className="flex items-center gap-3 px-4 py-2 border-b"
        style={{
          background: "hsl(var(--mac-window-chrome))",
          borderColor: "hsl(var(--mac-border))",
        }}
      >
        <span className="text-sm">📄</span>
        <span
          className="text-xs font-medium"
          style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
        >
          resume_alex_chen.pdf
        </span>
        <div className="ml-auto">
          <a
            href="#"
            className="text-xs px-3 py-1 rounded font-medium flex items-center gap-1"
            style={{
              background: "hsl(var(--mac-blue))",
              color: "white",
              fontFamily: "var(--font-body)",
            }}
          >
            ⬇ Download PDF
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto mac-scroll p-5 mac-stripe-bg">
        {/* Header */}
        <div className="text-center mb-6 pb-5 border-b" style={{ borderColor: "hsl(var(--mac-border))" }}>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
          >
            Alex Chen
          </h1>
          <p
            className="text-sm mt-1"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--mac-blue))" }}
          >
            Full-Stack Software Engineer
          </p>
          <div className="flex justify-center gap-4 mt-2 text-xs opacity-60" style={{ fontFamily: "var(--font-body)" }}>
            <span>alex@example.com</span>
            <span>•</span>
            <span>github.com/alexchen</span>
            <span>•</span>
            <span>San Francisco, CA</span>
          </div>
        </div>

        {/* Experience entries */}
        <div>
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-4 opacity-50"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Work Experience
          </h2>

          <div className="relative pl-5">
            {/* Timeline line */}
            <div
              className="absolute left-2 top-0 bottom-0 w-px"
              style={{ background: "hsl(var(--mac-border))" }}
            />

            <div className="flex flex-col gap-6">
              {experiences.map((exp, i) => (
                <div key={i} className="relative">
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-3 top-1.5 w-3 h-3 rounded-full border-2"
                    style={{
                      background: exp.color,
                      borderColor: "hsl(0 0% 92%)",
                      boxShadow: `0 0 0 2px ${exp.color}40`,
                    }}
                  />

                  <div
                    className="rounded-lg border p-4"
                    style={{
                      background: "hsl(0 0% 98%)",
                      borderColor: "hsl(var(--mac-border))",
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-6 h-6 rounded text-sm flex items-center justify-center"
                            style={{
                              background: `${exp.color}18`,
                              border: `1px solid ${exp.color}30`,
                            }}
                          >
                            {exp.icon}
                          </span>
                          <span
                            className="font-bold text-sm"
                            style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                          >
                            {exp.company}
                          </span>
                          <span
                            className="text-xs px-1.5 py-0.5 rounded border"
                            style={{
                              background: "hsl(0 0% 95%)",
                              borderColor: "hsl(var(--mac-border))",
                              fontFamily: "var(--font-mono)",
                              color: "hsl(var(--muted-foreground))",
                            }}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <div
                          className="text-xs font-medium mt-0.5 ml-8"
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
                          className="text-xs opacity-50"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul className="mb-3 space-y-1">
                      {exp.bullets.map((b, j) => (
                        <li
                          key={j}
                          className="text-xs leading-relaxed flex gap-2"
                          style={{
                            fontFamily: "var(--font-body)",
                            color: "hsl(var(--mac-dark))",
                          }}
                        >
                          <span className="opacity-40 flex-shrink-0 mt-0.5">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech */}
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

        {/* Education */}
        <div className="mt-6 pt-5 border-t" style={{ borderColor: "hsl(var(--mac-border))" }}>
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-3 opacity-50"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Education
          </h2>
          <div
            className="rounded-lg border p-4"
            style={{ background: "hsl(0 0% 98%)", borderColor: "hsl(var(--mac-border))" }}
          >
            <div className="flex justify-between">
              <div>
                <div
                  className="font-bold text-sm"
                  style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                >
                  UC Berkeley
                </div>
                <div
                  className="text-xs"
                  style={{ color: "hsl(var(--mac-blue))", fontFamily: "var(--font-body)" }}
                >
                  B.S. Computer Science, GPA 3.8
                </div>
              </div>
              <div
                className="text-xs font-semibold"
                style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--mac-dark))" }}
              >
                2015 – 2019
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceWindow;
