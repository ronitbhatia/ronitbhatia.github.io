import React from "react";
import avatarImg from "@/assets/developer-avatar.png";

const skills = ["React", "TypeScript", "Node.js", "Go", "PostgreSQL", "AWS"];

const AboutWindow: React.FC = () => {
  return (
    <div className="flex flex-col h-full mac-stripe-bg">
      {/* Finder-style path bar */}
      <div
        className="flex items-center gap-2 px-4 py-2 border-b text-xs"
        style={{
          background: "hsl(var(--mac-window-chrome))",
          borderColor: "hsl(var(--mac-border))",
          fontFamily: "var(--font-body)",
          color: "hsl(var(--muted-foreground))",
        }}
      >
        <span>🏠</span>
        <span className="opacity-40">/</span>
        <span>Alex Chen</span>
        <span className="opacity-40">/</span>
        <span className="font-semibold" style={{ color: "hsl(var(--mac-dark))" }}>About.txt</span>
      </div>

      <div className="flex-1 overflow-y-auto mac-scroll p-6">
        {/* Header section */}
        <div className="flex gap-6 mb-6">
          <div
            className="flex-shrink-0 rounded-2xl overflow-hidden border-2 shadow-lg"
            style={{
              borderColor: "hsl(var(--mac-border))",
              width: 96,
              height: 96,
              background: "hsl(0 0% 92%)",
            }}
          >
            <img src={avatarImg} alt="Alex Chen" className="w-full h-full object-contain" />
          </div>

          <div>
            <h1
              className="text-2xl font-bold mb-0.5 tracking-tight"
              style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
            >
              Alex Chen
            </h1>
            <p
              className="text-sm font-medium mb-2"
              style={{ color: "hsl(var(--mac-blue))", fontFamily: "var(--font-mono)" }}
            >
              Full-Stack Software Engineer
            </p>
            <div className="flex gap-2 flex-wrap">
              {["🌍 San Francisco, CA", "💼 Open to Work"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded border"
                  style={{
                    background: "hsl(0 0% 94%)",
                    borderColor: "hsl(var(--mac-border))",
                    color: "hsl(var(--mac-dark))",
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

        {/* Bio */}
        <div className="mb-5">
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-2 opacity-50"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Bio
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
          >
            I'm a full-stack engineer with 6 years of experience building products that people
            actually love using. I care deeply about clean architecture, delightful interfaces,
            and the craft of software. When I'm not shipping code, I'm probably tinkering with
            vintage hardware, playing guitar, or brewing questionable coffee.
          </p>
        </div>

        <div className="retro-divider" />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Years Exp.", value: "6+" },
            { label: "Projects", value: "40+" },
            { label: "Coffees", value: "∞" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border p-3 text-center pixel-border"
              style={{
                background: "hsl(0 0% 97%)",
                borderColor: "hsl(var(--mac-border))",
              }}
            >
              <div
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-retro)", fontSize: "28px", color: "hsl(var(--mac-blue))" }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs opacity-60 mt-0.5"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="retro-divider" />

        {/* Tech Stack */}
        <div>
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-3 opacity-50"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="mac-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="retro-divider" />

        {/* CTA */}
        <div className="flex gap-3 pt-1">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold transition-all"
            style={{
              background: "hsl(var(--mac-dark))",
              color: "white",
              fontFamily: "var(--font-body)",
            }}
          >
            GitHub →
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold border transition-all"
            style={{
              background: "hsl(var(--mac-blue))",
              color: "white",
              borderColor: "hsl(var(--mac-blue-dark))",
              fontFamily: "var(--font-body)",
            }}
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;
