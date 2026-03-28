import React, { useEffect, useRef, useState } from "react";

interface Initiative {
  id: string;
  title: string;
  role?: string;
  period: string;
  description: string;
  tags: string[];
  more?: string[];
  github?: string;
  color: string;
}

const iconSvgProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Meaningful line icons per initiative (not generic letters). */
function InitiativeEntryIcon({ id }: { id: string }) {
  switch (id) {
    case "ai-hackathon":
      return (
        <svg {...iconSvgProps}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" rx="0.5" />
          <path d="M9 2v2M15 2v2M9 20v2M15 20v2M20 9h2M20 14h2M2 9h2M2 14h2" />
        </svg>
      );
    case "ambassador":
      return (
        <svg {...iconSvgProps}>
          <path d="m3 11 18-5v12L3 13v-2z" />
          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
      );
    case "pm-club":
      return (
        <svg {...iconSvgProps}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "consulting":
      return (
        <svg {...iconSvgProps}>
          <path d="M3 3v18h18" />
          <path d="m18 17-5-5-4 4-3-3" />
          <path d="M18 8V3h-5" />
        </svg>
      );
    case "talent-hackathon":
      return (
        <svg {...iconSvgProps}>
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </svg>
      );
    default:
      return (
        <svg {...iconSvgProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
      );
  }
}

const initiatives: Initiative[] = [
  {
    id: "ai-hackathon",
    title: "Participant: AI Hackathon – Conference Buddy",
    period: "Aug 2025",
    description:
      "Built Conference Buddy, a web app that helps healthcare sales teams identify high-value prospects before conferences and book meetings ahead of time.",
    more: [
      "Strategic Problem Definition: I authored a comprehensive Product Requirements Document (PRD) that clearly defined the problem statement, identified target audience segments, and established measurable success metrics. This foundational work ensured all stakeholders had clarity on what success looked like and aligned the prototype development with the specific needs of healthcare sales teams.",
      "Rapid Technical Implementation: I architected the complete tech stack and rapidly implemented the application using cutting-edge AI tools like Emergent, Cursor, and Lovable to streamline prompt engineering, debugging, and deployment processes. Within a single day, the prototype successfully identified conference attendees, enriched their profiles with relevant data, and integrated scheduling features to pre-book meetings.",
      "End-to-End Solution Delivery: The comprehensive solution demonstrated how AI-driven rapid prototyping can create high-value business tools in compressed timelines. This project showcased my ability to combine product sense, technical implementation skills, and business impact understanding in a high-pressure hackathon setting.",
    ],
    tags: ["Product Management", "Generative AI", "Prompt Engineering", "Full-Stack Development"],
    github: "https://github.com/ronitbhatia/ConferenceBuddy",
    color: "hsl(267 83% 55%)",
  },
  {
    id: "ambassador",
    title: "Student Ambassador: Cornell University",
    period: "Feb 2025 – Present",
    description:
      "Served as a dedicated ambassador for the Cornell University MEng department, engaging with prospective students to provide authentic insights on academic programs, campus life, and career opportunities while fostering an inclusive and supportive community environment.",
    more: [
      "Prospective Student Engagement: Actively engaged with prospective students through UniBuddy, providing personalized guidance on academic programs, research opportunities, and the unique Cornell experience. Offered authentic perspectives on coursework rigor, faculty relationships, and the collaborative learning environment that defines Cornell's MEng. programs.",
      "Career Development Support: Provided comprehensive insights into career opportunities, industry connections, and professional development resources available at Cornell. Shared firsthand experiences about networking events, career fairs, and the strong alumni network that supports students in achieving their professional goals across various industries.",
      "Inclusive Community Building: Played a key role in fostering an inclusive and supportive community by connecting with students from diverse backgrounds and experiences. Helped create a welcoming environment where prospective students felt comfortable asking questions and could envision themselves as part of the Cornell community, contributing to increased enrollment of underrepresented groups.",
    ],
    tags: ["Leadership", "Student Outreach", "Community Building", "Mentorship"],
    color: "hsl(0 72% 47%)",
  },
  {
    id: "pm-club",
    title: "Outreach and Growth Leader: Cornell Graduate Product Management Club",
    period: "Dec 2024 – May 2025",
    description:
      "Helped launch the Cornell Graduate Product Management Club and set the foundation for sustainable programming and member growth.",
    more: [
      "Organizational Development: I assisted in the official registration of the club with Cornell, establishing it as a recognized graduate student organization. This formal recognition enabled the group to secure essential resources, funding opportunities, and increased visibility on campus, making it significantly easier to attract members and secure high-profile guest speakers.",
      "Strategic Framework Creation: I collaborated with fellow leaders to develop the club's charter, structure, and comprehensive membership framework. This foundational work provided a clear organizational roadmap and established governance procedures that future leaders could build upon to ensure the club's long-term sustainability and growth.",
      "Program Development: I contributed to setting the foundation for future programming and growth opportunities for graduate students interested in product management. This included outlining early initiatives such as workshops, case competitions, and speaker events that would create valuable learning and networking opportunities for the community.",
    ],
    tags: ["Leadership", "Team Collaboration", "Strategic Planning", "Growth Strategy"],
    color: "hsl(142 72% 39%)",
  },
  {
    id: "consulting",
    title: "Associate Consultant: Cornell Graduate Consulting Club",
    period: "Nov 2024 – May 2025",
    description:
      "Worked with MerQube, a financial technology firm, to identify strategic opportunities and sharpen product positioning.",
    more: [
      "Strategic Market Assessment: As an Associate Consultant, I led a semester-long engagement with MerQube, a fintech firm specializing in packaging financial products for investment banks. My role focused on evaluating the competitive landscape and uncovering strategic opportunities where MerQube could differentiate itself and expand its market presence.",
      "Comprehensive Analysis Framework: I conducted in-depth landscape and value chain analyses, systematically mapping competitors, distribution channels, and potential partnership opportunities. This rigorous analytical approach helped identify untapped opportunities for MerQube in structured products and index services, providing actionable insights for strategic decision-making.",
      "Actionable Strategic Recommendations: By combining thorough market research with strategic insights, I developed comprehensive recommendations that guided MerQube on refining its product positioning and strengthening its market presence with institutional clients. These findings directly informed the company's strategic planning and competitive positioning efforts.",
    ],
    tags: ["Consulting", "Market Analysis", "Value Chain Analysis"],
    color: "hsl(207 89% 45%)",
  },
  {
    id: "talent-hackathon",
    title: "Talent 2.0 Hackathon Finalist",
    period: "Nov 2024",
    description:
      "Finalist in a three-day hackathon cohosted by Cornell and Johnson & Johnson with a VR onboarding solution focused on engagement and efficiency.",
    more: [
      "Innovative Solution Design: I led a multidisciplinary team in developing a cutting-edge VR simulation designed to revolutionize onboarding and employee engagement processes. The solution aimed to reduce training costs, significantly shorten ramp-up times, and dramatically improve overall employee experience by offering immersive and interactive learning environments.",
      "Strategic Business Analysis: My contributions included comprehensive problem scoping, detailed cost-saving estimations, and strategic framing of the financial benefits of a VR-based approach. I worked closely with teammates to design sophisticated interaction flows, performance metrics, and feedback mechanisms within the VR environment to ensure optimal user experience.",
      "Competitive Success: Throughout the hackathon, we collaborated closely with industry mentors to refine our solution and perfect our pitch. Our final presentation earned us a prestigious finalist position, demonstrating both the creativity of our concept and the practical viability of its business case in real-world corporate environments.",
    ],
    tags: ["Project Management", "Cost Estimation", "Strategic Thinking"],
    color: "hsl(40 95% 45%)",
  },
];

interface InitiativeImpactWindowProps {
  focusEntryId?: string | null;
  focusToken?: number;
}

const InitiativeImpactWindow: React.FC<InitiativeImpactWindowProps> = ({
  focusEntryId,
  focusToken,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!focusEntryId) return;
    const entry = initiatives.find((init) => init.id === focusEntryId);
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
    <div className="flex flex-col h-full initiative-impact-window">
      <div
        className="flex items-center gap-2 px-4 py-2 border-b text-xs window-chrome-bar"
        style={{
          borderColor: "hsl(var(--mac-border))",
          fontFamily: "var(--font-body)",
          color: "hsl(var(--mac-dark))",
        }}
      >
        <span className="font-semibold">Initiative & Impact</span>
      </div>

      <div className="flex-1 overflow-y-auto mac-scroll p-6 mac-stripe-bg">
        <h2
          className="window-section-label text-xs font-bold uppercase tracking-widest mb-5"
          style={{ fontFamily: "var(--font-mono)", opacity: 1 }}
        >
          Leadership & Initiatives
        </h2>

        <div className="flex flex-col gap-6">
          {initiatives.map((init) => (
            <div
              key={init.id}
              ref={(node) => {
                itemRefs.current[init.id] = node;
              }}
              className="rounded-lg border p-5 window-card-bg"
              style={{
                borderColor:
                  highlightedId === init.id
                    ? "hsl(var(--mac-blue))"
                    : "hsl(var(--mac-border))",
                boxShadow:
                  highlightedId === init.id
                    ? "0 0 0 2px hsl(var(--mac-blue) / 0.35), 0 8px 24px rgba(0,0,0,0.12)"
                    : undefined,
                transition: "box-shadow 180ms ease, border-color 180ms ease",
              }}
            >
              <div className="flex items-start gap-3 flex-wrap">
                <div
                  className="initiative-entry-icon w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={
                    {
                      "--init-icon": init.color,
                      background: "color-mix(in hsl, var(--init-icon) 18%, transparent)",
                      border: "1px solid color-mix(in hsl, var(--init-icon) 42%, transparent)",
                      color: "var(--init-icon)",
                      boxShadow:
                        "0 1px 0 color-mix(in hsl, var(--init-icon) 28%, transparent), inset 0 1px 0 color-mix(in hsl, var(--init-icon) 10%, transparent)",
                    } as React.CSSProperties
                  }
                >
                  <InitiativeEntryIcon id={init.id} />
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className="font-bold text-sm"
                    style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                  >
                    {init.title}
                  </div>
                  <div
                    className="text-xs font-semibold mt-0.5"
                    style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--mac-blue))" }}
                  >
                    {init.period}
                  </div>
                </div>
                {init.github && (
                  <a
                    href={init.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-1 rounded border font-medium flex-shrink-0"
                    style={{
                      borderColor: "hsl(var(--mac-border))",
                      fontFamily: "var(--font-body)",
                      color: "hsl(var(--mac-dark))",
                    }}
                  >
                    GitHub
                  </a>
                )}
              </div>
              <p
                className="text-xs leading-relaxed mt-2"
                style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
              >
                {init.description}
              </p>
              {expandedId === init.id && init.more && (
                <div className="mt-2 space-y-2">
                  {init.more.map((para, i) => (
                    <p
                      key={i}
                      className="text-xs leading-relaxed"
                      style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))", opacity: 0.9 }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              )}
              {init.more && init.more.length > 0 && (
                <button
                  type="button"
                  className="text-xs px-2 py-1 rounded border font-medium mt-2"
                  style={{
                    borderColor: "hsl(var(--mac-border))",
                    fontFamily: "var(--font-body)",
                    color: "hsl(var(--mac-dark))",
                    background: "hsl(var(--window-input-bg-alt))",
                  }}
                  onClick={() => setExpandedId(expandedId === init.id ? null : init.id)}
                >
                  {expandedId === init.id ? "Read Less" : "Read More"}
                </button>
              )}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {init.tags.map((t) => (
                  <span key={t} className="mac-tag" style={{ fontSize: "10px" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InitiativeImpactWindow;
