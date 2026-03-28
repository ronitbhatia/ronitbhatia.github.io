import React, { useEffect, useRef, useState } from "react";

interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  subtitle?: string;
  period: string;
  coursework: string[];
  icon: string;
  color: string;
}

const education: EducationEntry[] = [
  {
    id: "cornell",
    school: "Cornell University",
    degree: "Master of Engineering in Engineering Management",
    period: "Aug 2024 – May 2025",
    coursework: [
      "AI for Engineering Managers",
      "Product Management",
      "Data Analytics",
      "Decision Framing",
      "Negotiations and Contracts",
    ],
    icon: "C",
    color: "hsl(0 72% 47%)",
  },
  {
    id: "uc-davis",
    school: "University of California, Davis",
    degree: "Bachelor of Science in Computer Science",
    subtitle: "Minor in Technology Management",
    period: "Sept 2020 – June 2024",
    coursework: [
      "Algorithm Design and Analysis",
      "Machine Learning",
      "Operating Systems",
      "Database Systems",
      "AI",
      "Human-Computer Interaction",
      "Programming Languages",
      "Computer Architecture",
      "Technology Management",
    ],
    icon: "U",
    color: "hsl(207 89% 45%)",
  },
];

interface EducationWindowProps {
  focusEntryId?: string | null;
  focusToken?: number;
}

const EducationWindow: React.FC<EducationWindowProps> = ({
  focusEntryId,
  focusToken,
}) => {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!focusEntryId) return;
    const entry = education.find((edu) => edu.id === focusEntryId);
    if (!entry) return;

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
    <div className="flex flex-col h-full education-window">
      <div
        className="flex items-center gap-2 px-4 py-2 border-b text-xs window-chrome-bar"
        style={{
          borderColor: "hsl(var(--mac-border))",
          fontFamily: "var(--font-body)",
          color: "hsl(var(--mac-dark))",
        }}
      >
        <span className="opacity-70">Education</span>
      </div>

      <div className="flex-1 overflow-y-auto mac-scroll p-6 mac-stripe-bg">
        <h2
          className="window-section-label text-xs font-bold uppercase tracking-widest mb-5"
          style={{ fontFamily: "var(--font-mono)", opacity: 1 }}
        >
          Degrees
        </h2>

        <div className="flex flex-col gap-8">
          {education.map((edu) => (
            <div
              key={edu.id}
              ref={(node) => {
                itemRefs.current[edu.id] = node;
              }}
              className="rounded-lg border p-5 window-card-bg"
              style={{
                borderColor:
                  highlightedId === edu.id
                    ? "hsl(var(--mac-blue))"
                    : "hsl(var(--mac-border))",
                boxShadow:
                  highlightedId === edu.id
                    ? "0 0 0 2px hsl(var(--mac-blue) / 0.35), 0 8px 24px rgba(0,0,0,0.12)"
                    : undefined,
                transition: "box-shadow 180ms ease, border-color 180ms ease",
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="min-w-0">
                  <div
                    className="font-bold text-sm"
                    style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                  >
                    {edu.school}
                  </div>
                  <div
                    className="text-xs font-medium"
                    style={{ color: "hsl(var(--mac-blue))", fontFamily: "var(--font-body)" }}
                  >
                    {edu.degree}
                  </div>
                  {edu.subtitle && (
                    <div
                      className="text-xs opacity-70 mt-0.5"
                      style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                    >
                      {edu.subtitle}
                    </div>
                  )}
                </div>
                <div
                  className="text-xs font-semibold flex-shrink-0"
                  style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--mac-dark))" }}
                >
                  {edu.period}
                </div>
              </div>
              <div className="mt-3">
                <div
                  className="window-section-label text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ fontFamily: "var(--font-mono)", opacity: 0.9 }}
                >
                  Key Coursework
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {edu.coursework.map((c) => (
                    <span key={c} className="mac-tag" style={{ fontSize: "10px" }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationWindow;
