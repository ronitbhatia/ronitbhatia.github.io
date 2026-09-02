import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    target: { windowId: "experience" | "education" | "initiative-impact" | "product-lab"; entryId: string }
  ) => void;
}

/** Visual lane for the home timeline (distinct styling per lane). */
type HomeTimelineLane = "experience" | "initiative" | "education-start" | "education-graduation";

const TimelineLaneIcon: React.FC<{ lane: HomeTimelineLane; className?: string }> = ({ lane, className }) => {
  const props = {
    className,
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (lane) {
    case "experience":
      return (
        <svg {...props}>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "initiative":
      return (
        <svg {...props}>
          <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L6 21l2.3-7-6-4.6h7.6z" />
        </svg>
      );
    case "education-start":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
        </svg>
      );
    case "education-graduation":
      return (
        <svg {...props}>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
        </svg>
      );
  }
};

const timelineItems: {
  year: string;
  heading: string;
  description: string;
  tags: string[];
  target: { windowId: "experience" | "education" | "initiative-impact" | "product-lab"; entryId: string };
  lane: HomeTimelineLane;
  isCurrent?: boolean;
}[] = [
  { year: "Jan 2026 – Present", heading: "Forward Deplpyed Engineer @ Y Meadows", description: "Supporting customer onboarding from setup through production by validating integrations, aligning requirements with engineering, and improving deployment reliability.", tags: ["Customer Onboarding", "Integrations", "JIRA", "Salesforce"], target: { windowId: "experience", entryId: "y-meadows" }, lane: "experience", isCurrent: true },
  { year: "Aug 2026", heading: "Treadwell @ DeepMind x UK AI Agents Lab", description: "Solo build: offline Gemma 4 hazard navigation for blind and low-vision users. On-device LiteRT-LM inference. Silence is the default.", tags: ["Gemma 4", "On-Device ML", "Accessibility", "Hackathon"], target: { windowId: "initiative-impact", entryId: "treadwell" }, lane: "initiative" },
  { year: "2026", heading: "Product Lab: case studies", description: "Archive of product thinking: Rhode camera, Fitbit monitor, Google treadmill, Nothing AI assistant, Wikipedia maps, clinic queues, Patagonia phone, and CAPTCHA.", tags: ["Product Thinking", "Redesign", "Speculative"], target: { windowId: "product-lab", entryId: "rhode-frame" }, lane: "initiative" },
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
  const [pulseIndex, setPulseIndex] = useState<number | null>(null);

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

  const handleTimelineClick = (index: number, target: (typeof timelineItems)[number]["target"]) => {
    setPulseIndex(index);
    window.setTimeout(() => {
      onTimelineNavigate(target);
      setPulseIndex(null);
    }, 220);
  };

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
        <span>Ronit Amar Bhatia</span>
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
                  src="/new-pic.png"
                  alt="Ronit Amar Bhatia"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <h1
                  className="text-2xl font-bold mb-0.5 tracking-tight"
                  style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                >
                  Ronit Amar Bhatia
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
                <motion.div
                  key={i}
                  className={`about-timeline-card about-timeline-card--lane-${item.lane} flex-shrink-0`}
                  animate={
                    pulseIndex === i
                      ? { scale: [1, 0.97, 1.02, 1], y: [0, 2, -4, 0] }
                      : { scale: 1, y: 0 }
                  }
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => handleTimelineClick(i, item.target)}
                    className={`about-timeline-card-btn group h-full w-full flex flex-col text-left${pulseIndex === i ? " about-timeline-card-btn--pulse" : ""}`}
                  >
                    <div className="about-timeline-card-body">
                      <div className="about-timeline-card-header">
                        <div className="about-timeline-lane-badge">
                          <TimelineLaneIcon lane={item.lane} />
                          <span>{TIMELINE_LANE_LABEL[item.lane]}</span>
                        </div>
                        {item.isCurrent && (
                          <span className="about-timeline-now-badge" aria-label="Current role">
                            Now
                          </span>
                        )}
                      </div>
                      <p className="about-timeline-date">{item.year}</p>
                      <h4 className="about-timeline-heading">{item.heading}</h4>
                      <p className="about-timeline-desc">{item.description}</p>
                      <p className="about-timeline-tags-line">{item.tags.join(" · ")}</p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;
