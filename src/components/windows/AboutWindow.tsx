import React, { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

/** Carousel items from current portfolio (index.html typing animation) */
const ROLLING_ITEMS = [
  "Software Development",
  "Machine Learning Engineering",
  "Data Analysis",
  "Product Management",
  "Web Development",
  "Business Analysis",
  "AI & Neural Networks",
  "Full-Stack Development",
];

const EMAIL = "roncy.bhatia@gmail.com";

interface AboutWindowProps {
  onOpenResume: () => void;
  onTimelineNavigate: (
    target: { windowId: "experience" | "education" | "initiative-impact"; entryId: string }
  ) => void;
}

/** Visual lane for the home timeline (distinct styling per lane). */
type HomeTimelineLane = "experience" | "initiative" | "education-start" | "education-graduation";

const timelineItems: {
  year: string;
  heading: string;
  description: string;
  tags: string[];
  target: { windowId: "experience" | "education" | "initiative-impact"; entryId: string };
  lane: HomeTimelineLane;
}[] = [
  { year: "Jan 2026 – Present", heading: "Technical Implementation Engineer Intern @ Y Meadows", description: "Supporting customer onboarding from setup through production by validating integrations, aligning requirements with engineering, and improving deployment reliability.", tags: ["Customer Onboarding", "Integrations", "JIRA", "Salesforce"], target: { windowId: "experience", entryId: "y-meadows" }, lane: "experience" },
  { year: "Oct 2025 – Feb 2026", heading: "ML Engineer @ QAlienAI", description: "Led AI compliance systems using LLMs for FTC/FDA analysis. Built multimodal pipelines with Claude, Gemini, and pgvector.", tags: ["LLMs", "AWS Bedrock", "Multimodal AI"], target: { windowId: "experience", entryId: "qalienai" }, lane: "experience" },
  { year: "Aug 2025", heading: "AI Hackathon – Conference Buddy", description: "Built AI solution for healthcare sales teams to identify prospects and book meetings. Achieved finalist position.", tags: ["Product Management", "AI", "Hackathon"], target: { windowId: "initiative-impact", entryId: "ai-hackathon" }, lane: "initiative" },
  { year: "May 2025", heading: "Graduated from Cornell University", description: "Completed Master of Engineering in Engineering Management. Focus on AI, Product Management, and Data Analytics.", tags: ["Cornell", "MEng", "Graduation"], target: { windowId: "education", entryId: "cornell" }, lane: "education-graduation" },
  { year: "Dec 2024 – May 2025", heading: "Outreach Leader @ Cornell PM Club", description: "Helped launch Cornell Graduate Product Management Club and established organizational framework for sustainable growth.", tags: ["Leadership", "Community Building"], target: { windowId: "initiative-impact", entryId: "pm-club" }, lane: "initiative" },
  { year: "Nov 2024 – Jan 2025", heading: "Software Engineer @ Gallox Semiconductors", description: "Built automated testing frameworks for semiconductor devices. Reduced manual debugging time by 40%.", tags: ["Python", "Test Automation", "Hardware"], target: { windowId: "experience", entryId: "gallox" }, lane: "experience" },
  { year: "Nov 2024 – May 2025", heading: "Associate Consultant @ Cornell Consulting", description: "Worked with MerQube fintech to identify strategic opportunities through market and value chain analysis.", tags: ["Consulting", "Market Analysis"], target: { windowId: "initiative-impact", entryId: "consulting" }, lane: "initiative" },
  { year: "Nov 2024", heading: "Talent 2.0 Hackathon Finalist", description: "Finalist in Cornell-J&J hackathon with VR onboarding solution focused on engagement and training efficiency.", tags: ["VR", "Innovation", "Finalist"], target: { windowId: "initiative-impact", entryId: "talent-hackathon" }, lane: "initiative" },
  { year: "Aug 2024 – Dec 2024", heading: "Research Assistant @ Cornell CALS", description: "Engineered ML pipelines for agricultural GHG emission analysis using k-means clustering and geospatial data.", tags: ["Machine Learning", "GeoPandas", "Climate Tech"], target: { windowId: "experience", entryId: "cornell-cals" }, lane: "experience" },
  { year: "Aug 2024", heading: "Started @ Cornell University", description: "Began Master of Engineering in Engineering Management. Exciting new chapter at an Ivy League institution!", tags: ["Cornell", "MEng", "New Beginning"], target: { windowId: "education", entryId: "cornell" }, lane: "education-start" },
  { year: "June 2024", heading: "Graduated from UC Davis", description: "Completed BS in Computer Science with Minor in Technology Management. Focused on AI, ML, and database systems.", tags: ["BS Degree", "Computer Science", "UC Davis"], target: { windowId: "education", entryId: "uc-davis" }, lane: "education-graduation" },
  { year: "Jan 2024 – Mar 2024", heading: "Software Developer @ ColentAI", description: "Fine-tuned LLMs and built NLP pipelines. Created skill taxonomy generator with 92% accuracy using BERT.", tags: ["NLP", "BERT", "Fine-tuning"], target: { windowId: "experience", entryId: "colentai" }, lane: "experience" },
  { year: "June 2021 – Sept 2021", heading: "Data Analyst @ Cardinality-AI", description: "First tech internship! Built data pipelines with SQL and MATLAB. Learned foundations of data engineering.", tags: ["SQL", "MATLAB", "First Role"], target: { windowId: "experience", entryId: "cardinality-ai" }, lane: "experience" },
  { year: "Sept 2020", heading: "Started @ UC Davis", description: "Began journey in Computer Science at University of California, Davis. The beginning of it all!", tags: ["UC Davis", "Computer Science", "New Beginning"], target: { windowId: "education", entryId: "uc-davis" }, lane: "education-start" },
];

/** Single-word lane titles — strong visual identity, minimal copy. */
const TIMELINE_LANE_LABEL: Record<HomeTimelineLane, string> = {
  experience: "Work",
  initiative: "Impact",
  "education-start": "Begin",
  "education-graduation": "Graduate",
};

const AboutWindow: React.FC<AboutWindowProps> = ({ onOpenResume, onTimelineNavigate }) => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleOpenEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast({ title: "Email copied", description: `${EMAIL} copied to clipboard.` });
    } catch {
      toast({
        title: "Could not copy email",
        description: "Opening your mail app anyway.",
        variant: "destructive",
      });
    }
    const mailto = `mailto:${EMAIL}`;
    window.location.href = mailto;
    window.open(mailto, "_self");
  };

  useEffect(() => {
    const id = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % ROLLING_ITEMS.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col h-full about-window">
      <div
        className="flex items-center gap-2 px-4 py-2 border-b text-xs window-chrome-bar"
        style={{
          borderColor: "hsl(var(--mac-border))",
          fontFamily: "var(--font-body)",
        }}
      >
        <span className="opacity-70">Home</span>
        <span className="opacity-50">/</span>
        <span>Ronit Bhatia</span>
        <span className="opacity-50">/</span>
        <span className="font-semibold">Home</span>
      </div>

      <div className="flex-1 overflow-y-auto mac-scroll p-8">
        <div className="flex flex-col gap-8">
          {/* Profile + contact + bio */}
          <div>
            <div className="flex gap-8 mb-8">
              <div
                className="about-photo-wrap flex-shrink-0 rounded-2xl overflow-hidden border-2"
                style={{
                  borderColor: "hsl(var(--mac-border))",
                  width: 96,
                  height: 96,
                  background: "hsl(var(--about-photo-bg))",
                }}
              >
                <img
                  src="/IMG_5623.jpeg"
                  alt="Ronit Bhatia"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <h1
                  className="text-2xl font-bold mb-0.5 tracking-tight"
                  style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                >
                  Ronit Bhatia
                </h1>
                <div className="about-carousel overflow-hidden relative mb-2" style={{ fontFamily: "var(--font-mono)", minHeight: "1.25rem" }}>
                  {ROLLING_ITEMS.map((item, i) => (
                    <p
                      key={item}
                      className={`about-carousel-item text-sm font-medium mb-0 absolute left-0 right-0 ${
                        i === carouselIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                      }`}
                      style={{
                        color: "hsl(var(--mac-blue))",
                        top: 0,
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {["Building impactful solutions", "Open to opportunities"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded border about-tag"
                      style={{
                        background: "hsl(var(--about-tag-bg))",
                        borderColor: "hsl(var(--about-tag-border))",
                        color: "hsl(var(--about-tag-fg))",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="retro-divider" />

            <div className="mb-6">
              <h2
                className="about-section-label text-xs font-bold uppercase tracking-widest mb-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "hsl(var(--about-section-label))",
                  opacity: "var(--about-section-label-opacity)",
                }}
              >
                Contact
              </h2>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleOpenEmail}
                  className="about-contact-btn flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold border btn-press"
                  style={{
                    borderColor: "hsl(200 70% 45%)",
                    background: "hsl(200 70% 45%)",
                    color: "white",
                    fontFamily: "var(--font-body)",
                    borderWidth: 1,
                  }}
                >
                  Email
                </button>
                <a
                  href="https://github.com/ronitbhatia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-contact-btn flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold btn-press"
                  style={{
                    background: "hsl(270 50% 50%)",
                    color: "white",
                    borderColor: "hsl(270 50% 40%)",
                    border: "1px solid hsl(270 50% 40%)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/ronit-bhatia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-contact-btn flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold border btn-press"
                  style={{
                    background: "hsl(var(--mac-blue))",
                    color: "white",
                    borderColor: "hsl(var(--mac-blue-dark))",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  LinkedIn
                </a>
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="about-contact-btn flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold btn-press"
                  style={{
                    background: "hsl(142 72% 35%)",
                    color: "white",
                    fontFamily: "var(--font-body)",
                    border: "0px",
                  }}
                >
                  Download Resume
                </button>
              </div>
            </div>

            <div className="retro-divider" />

            <div className="mb-6">
              <h2
                className="about-section-label text-xs font-bold uppercase tracking-widest mb-3"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "hsl(var(--about-section-label))",
                  opacity: "var(--about-section-label-opacity)",
                }}
              >
                Bio
              </h2>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
              >
                I turn complex problems into elegant code, and complex code into real-world impact. My approach combines deep technical execution with strategic thinking, building systems that don't just work, but work intelligently.
              </p>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
              >
                What gets me excited is translating ambitious ideas into engineering solutions that actually matter. Whether I'm developing neural networks, building data pipelines, or fine-tuning AI models, I bring both analytical thinking and creative problem-solving to every challenge.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
              >
                My engineering philosophy is simple: understand the bigger picture, then master the details. I'm drawn to challenges that require thinking differently, turning messy problems into clean, impactful solutions through thoughtful engineering.
              </p>
            </div>

            {/* Timeline – horizontal scroll below Bio */}
            <div className="retro-divider" />
            <h2
              className="about-section-label text-xs font-bold uppercase tracking-widest mb-2"
              style={{
                fontFamily: "var(--font-mono)",
                color: "hsl(var(--about-section-label))",
                opacity: "var(--about-section-label-opacity)",
              }}
            >
              My Journey
            </h2>
            <p className="about-timeline-subcopy mb-3">Scroll →</p>
            <div className="about-timeline-legend-minimal mb-5" role="presentation">
              <span className="about-timeline-legend-item about-timeline-legend-item--experience">Work</span>
              <span className="about-timeline-legend-item about-timeline-legend-item--initiative">Impact</span>
              <span className="about-timeline-legend-item about-timeline-legend-item--education-start">Begin</span>
              <span className="about-timeline-legend-item about-timeline-legend-item--education-graduation">Graduate</span>
            </div>
            <div className="about-timeline-horizontal">
              {timelineItems.map((item, i) => (
                <div
                  key={i}
                  className={`about-timeline-card about-timeline-card--lane-${item.lane} flex-shrink-0`}
                >
                  <button
                    type="button"
                    onClick={() => onTimelineNavigate(item.target)}
                    className="about-timeline-card-btn group h-full w-full flex flex-col text-left"
                  >
                    <div className="about-timeline-card-body">
                      <div className="about-timeline-lane-title">{TIMELINE_LANE_LABEL[item.lane]}</div>
                      <p className="about-timeline-date">{item.year}</p>
                      <h4 className="about-timeline-heading">{item.heading}</h4>
                      <p className="about-timeline-desc">{item.description}</p>
                      <p className="about-timeline-tags-line">{item.tags.join(" · ")}</p>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;
