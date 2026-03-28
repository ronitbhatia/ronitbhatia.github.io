import React from "react";

const ResumeWindow: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Download button bar at top */}
      <div
        className="window-chrome-bar flex items-center justify-between gap-3 px-4 py-2 border-b shrink-0"
        style={{ borderColor: "hsl(var(--mac-border))" }}
      >
        <span
          className="text-xs opacity-70"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Resume
        </span>
        <a
          href="/resume.pdf"
          download="resume.pdf"
          className="btn-press inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors"
          style={{
            background: "hsl(var(--mac-blue))",
            color: "white",
            fontFamily: "var(--font-body)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Resume
        </a>
      </div>

      {/* PDF viewer */}
      <div
        className="flex-1 min-h-0 overflow-hidden mac-scroll"
        style={{ background: "hsl(var(--window-input-bg-alt))" }}
      >
        <iframe
          src="/resume.pdf#toolbar=0"
          title="Resume"
          className="w-full h-full border-0"
          style={{ minHeight: 400 }}
        />
      </div>
    </div>
  );
};

export default ResumeWindow;
