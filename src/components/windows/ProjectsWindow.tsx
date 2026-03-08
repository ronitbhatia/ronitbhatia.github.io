import React, { useState } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  stack: string[];
  github: string;
  demo: string;
  icon: string;
  color: string;
  status: "Live" | "WIP" | "Open Source";
}

const projects: Project[] = [
  {
    id: 1,
    name: "Clarity.app",
    description: "A real-time collaborative whiteboard with AI-assisted diagramming. Built for remote teams who think visually.",
    stack: ["React", "WebSocket", "Canvas API", "OpenAI"],
    github: "https://github.com",
    demo: "https://example.com",
    icon: "🎨",
    color: "hsl(207 89% 94%)",
    status: "Live",
  },
  {
    id: 2,
    name: "Pulse API Gateway",
    description: "High-performance API gateway with rate limiting, auth, and observability. Handles 50k req/sec in production.",
    stack: ["Go", "Redis", "PostgreSQL", "Docker"],
    github: "https://github.com",
    demo: "https://example.com",
    icon: "⚡",
    color: "hsl(40 95% 94%)",
    status: "Open Source",
  },
  {
    id: 3,
    name: "Sprout Finance",
    description: "Personal finance tracker with automated categorization and smart budgeting insights powered by ML.",
    stack: ["Next.js", "Prisma", "Python", "TailwindCSS"],
    github: "https://github.com",
    demo: "https://example.com",
    icon: "🌱",
    color: "hsl(142 72% 93%)",
    status: "Live",
  },
  {
    id: 4,
    name: "DevShelf CLI",
    description: "A command-line tool to manage project scaffolding, secrets, and deployment configs across teams.",
    stack: ["Rust", "Clap", "TOML", "Shell"],
    github: "https://github.com",
    demo: "https://example.com",
    icon: "📦",
    color: "hsl(280 60% 94%)",
    status: "Open Source",
  },
  {
    id: 5,
    name: "Retro Weather",
    description: "Weather app styled like a 1980s terminal. Beautiful pixel forecasts with accurate real-time data.",
    stack: ["React", "TypeScript", "OpenWeather API"],
    github: "https://github.com",
    demo: "https://example.com",
    icon: "🌤️",
    color: "hsl(195 80% 93%)",
    status: "Live",
  },
  {
    id: 6,
    name: "ThreadLens",
    description: "AI-powered email thread summarizer Chrome extension. Reduce inbox overwhelm in one click.",
    stack: ["TypeScript", "Chrome APIs", "GPT-4"],
    github: "https://github.com",
    demo: "https://example.com",
    icon: "🔍",
    color: "hsl(0 70% 95%)",
    status: "WIP",
  },
];

const statusColors: Record<string, string> = {
  Live: "hsl(142 72% 30%)",
  WIP: "hsl(40 95% 35%)",
  "Open Source": "hsl(207 89% 35%)",
};

const statusBg: Record<string, string> = {
  Live: "hsl(142 72% 93%)",
  WIP: "hsl(40 95% 94%)",
  "Open Source": "hsl(207 89% 94%)",
};

const ProjectsWindow: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-col h-full">
      {/* Finder toolbar */}
      <div
        className="flex items-center gap-3 px-4 py-2 border-b"
        style={{
          background: "hsl(var(--mac-window-chrome))",
          borderColor: "hsl(var(--mac-border))",
        }}
      >
        <div className="flex gap-1">
          {["◀", "▶"].map((a) => (
            <button
              key={a}
              className="w-6 h-6 rounded text-xs flex items-center justify-center border pixel-border opacity-50 cursor-not-allowed"
              style={{
                background: "hsl(0 0% 90%)",
                borderColor: "hsl(var(--mac-border))",
                fontFamily: "var(--font-body)",
              }}
            >
              {a}
            </button>
          ))}
        </div>

        <div
          className="flex items-center gap-1 px-3 py-1 rounded border text-xs flex-1"
          style={{
            background: "hsl(0 0% 97%)",
            borderColor: "hsl(var(--mac-border))",
            fontFamily: "var(--font-mono)",
            color: "hsl(var(--mac-blue))",
          }}
        >
          <span className="opacity-50">finder://</span>
          <span>Projects ({projects.length} items)</span>
        </div>

        <div className="flex gap-1">
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              className="w-7 h-7 rounded text-sm flex items-center justify-center border transition-colors"
              style={{
                background: view === v ? "hsl(var(--mac-blue))" : "hsl(0 0% 90%)",
                borderColor: "hsl(var(--mac-border))",
                color: view === v ? "white" : "hsl(var(--mac-dark))",
              }}
              onClick={() => setView(v)}
            >
              {v === "grid" ? "⊞" : "≡"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto mac-scroll p-4">
        {view === "grid" ? (
          <div className="grid grid-cols-2 gap-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className={`rounded-lg border cursor-pointer transition-all duration-150 overflow-hidden ${
                  selected === p.id ? "ring-2" : ""
                }`}
                style={{
                  borderColor: selected === p.id ? "hsl(var(--mac-blue))" : "hsl(var(--mac-border))",
                  ringColor: "hsl(var(--mac-blue))",
                  background: "hsl(0 0% 98%)",
                  boxShadow: selected === p.id ? "0 2px 12px rgba(59,130,246,0.15)" : "0 1px 4px rgba(0,0,0,0.08)",
                }}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
              >
                <div
                  className="h-14 flex items-center px-4 gap-3"
                  style={{ background: p.color }}
                >
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <div
                      className="font-semibold text-sm"
                      style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                    >
                      {p.name}
                    </div>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded font-medium"
                      style={{
                        background: statusBg[p.status],
                        color: statusColors[p.status],
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {p.status}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p
                    className="text-xs leading-relaxed mb-2 opacity-70"
                    style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                  >
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {p.stack.map((s) => (
                      <span key={s} className="mac-tag" style={{ fontSize: "10px" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-2 py-1 rounded border font-medium transition-colors hover:bg-gray-100"
                      style={{
                        borderColor: "hsl(var(--mac-border))",
                        fontFamily: "var(--font-body)",
                        color: "hsl(var(--mac-dark))",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      GitHub
                    </a>
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
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {/* List header */}
            <div
              className="grid grid-cols-12 gap-2 px-3 py-1.5 rounded text-xs font-semibold opacity-50 border-b"
              style={{
                fontFamily: "var(--font-mono)",
                borderColor: "hsl(var(--mac-border))",
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
                className={`grid grid-cols-12 gap-2 px-3 py-2 rounded cursor-pointer transition-colors ${
                  selected === p.id ? "bg-blue-100" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
              >
                <div className="col-span-4 flex items-center gap-2">
                  <span>{p.icon}</span>
                  <span
                    className="text-xs font-medium"
                    style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                  >
                    {p.name}
                  </span>
                </div>
                <div
                  className="col-span-4 text-xs opacity-60 truncate"
                  style={{ fontFamily: "var(--font-body)" }}
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
                    className="text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{
                      background: statusBg[p.status],
                      color: statusColors[p.status],
                      fontFamily: "var(--font-mono)",
                    }}
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
        className="flex items-center px-4 py-1 border-t text-xs gap-4 opacity-60"
        style={{
          background: "hsl(var(--mac-window-chrome))",
          borderColor: "hsl(var(--mac-border))",
          fontFamily: "var(--font-mono)",
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
