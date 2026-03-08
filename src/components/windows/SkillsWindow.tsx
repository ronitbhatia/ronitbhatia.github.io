import React, { useState } from "react";

interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  skills: { name: string; level: number; years: number }[];
}

const categories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: "🖥️",
    color: "hsl(207 89% 54%)",
    skills: [
      { name: "React / Next.js", level: 96, years: 5 },
      { name: "TypeScript", level: 94, years: 5 },
      { name: "TailwindCSS", level: 92, years: 4 },
      { name: "WebGL / Canvas", level: 78, years: 3 },
      { name: "Vue.js", level: 72, years: 2 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: "⚙️",
    color: "hsl(142 72% 39%)",
    skills: [
      { name: "Node.js", level: 93, years: 6 },
      { name: "Go", level: 88, years: 3 },
      { name: "Python", level: 82, years: 4 },
      { name: "Rust", level: 65, years: 1 },
      { name: "Ruby", level: 70, years: 2 },
    ],
  },
  {
    id: "data",
    name: "Data & DB",
    icon: "🗄️",
    color: "hsl(280 60% 55%)",
    skills: [
      { name: "PostgreSQL", level: 91, years: 5 },
      { name: "Redis", level: 87, years: 4 },
      { name: "MongoDB", level: 79, years: 3 },
      { name: "Elasticsearch", level: 72, years: 2 },
    ],
  },
  {
    id: "infra",
    name: "Infra & Cloud",
    icon: "☁️",
    color: "hsl(25 95% 50%)",
    skills: [
      { name: "AWS (ECS, Lambda)", level: 88, years: 4 },
      { name: "Docker / K8s", level: 85, years: 4 },
      { name: "CI/CD (GitHub Actions)", level: 90, years: 5 },
      { name: "Terraform", level: 74, years: 2 },
    ],
  },
];

const SkillsWindow: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");
  const active = categories.find((c) => c.id === activeCategory)!;

  return (
    <div className="flex h-full">
      {/* Sidebar – System Preferences style */}
      <div
        className="w-40 flex-shrink-0 border-r flex flex-col py-3 gap-0.5"
        style={{
          background: "hsl(0 0% 90%)",
          borderColor: "hsl(var(--mac-border))",
        }}
      >
        <div
          className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest opacity-40 mb-1"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Categories
        </div>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md mx-2 text-left transition-all"
            style={{
              background: activeCategory === cat.id ? "hsl(var(--mac-blue))" : "transparent",
              color: activeCategory === cat.id ? "white" : "hsl(var(--mac-dark))",
              fontFamily: "var(--font-body)",
            }}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="text-base">{cat.icon}</span>
            <span className="text-xs font-medium">{cat.name}</span>
          </button>
        ))}

        <div className="mt-auto px-3 pt-3 border-t" style={{ borderColor: "hsl(var(--mac-border))" }}>
          <div
            className="text-xs opacity-40 leading-relaxed"
            style={{ fontFamily: "var(--font-mono)", color: "hsl(var(--mac-dark))" }}
          >
            Sys Prefs v2.1
            <br />
            Build 6YE4
          </div>
        </div>
      </div>

      {/* Main panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Panel header */}
        <div
          className="flex items-center gap-3 px-5 py-3 border-b"
          style={{
            background: "hsl(var(--mac-window-chrome))",
            borderColor: "hsl(var(--mac-border))",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
            style={{
              background: `${active.color}20`,
              border: `1.5px solid ${active.color}40`,
            }}
          >
            {active.icon}
          </div>
          <div>
            <div
              className="font-semibold text-sm"
              style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
            >
              {active.name}
            </div>
            <div
              className="text-xs opacity-50"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {active.skills.length} installed
            </div>
          </div>
        </div>

        {/* Skills list */}
        <div className="flex-1 overflow-y-auto mac-scroll p-4 space-y-3 mac-stripe-bg">
          {active.skills.map((skill) => (
            <div
              key={skill.name}
              className="rounded-lg border p-4"
              style={{
                background: "hsl(0 0% 98%)",
                borderColor: "hsl(var(--mac-border))",
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span
                    className="font-semibold text-sm"
                    style={{ fontFamily: "var(--font-body)", color: "hsl(var(--mac-dark))" }}
                  >
                    {skill.name}
                  </span>
                  <span
                    className="ml-2 text-xs opacity-50"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {skill.years}yr{skill.years > 1 ? "s" : ""}
                  </span>
                </div>
                <div
                  className="text-sm font-bold"
                  style={{
                    fontFamily: "var(--font-retro)",
                    fontSize: "18px",
                    color: active.color,
                  }}
                >
                  {skill.level}%
                </div>
              </div>

              {/* Progress bar – pixel style */}
              <div
                className="h-3 rounded-sm overflow-hidden border"
                style={{
                  background: "hsl(0 0% 88%)",
                  borderColor: "hsl(var(--mac-border))",
                }}
              >
                <div
                  className="h-full rounded-sm transition-all duration-700"
                  style={{
                    width: `${skill.level}%`,
                    background: `linear-gradient(90deg, ${active.color}, ${active.color}cc)`,
                    backgroundSize: "20px 100%",
                    backgroundImage: `linear-gradient(90deg, ${active.color} 0%, ${active.color}cc 100%), repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.25) 18px, rgba(255,255,255,0.25) 20px)`,
                  }}
                />
              </div>

              {/* Level label */}
              <div className="mt-1.5 flex justify-between text-xs opacity-40" style={{ fontFamily: "var(--font-mono)" }}>
                <span>
                  {skill.level >= 90
                    ? "Expert"
                    : skill.level >= 75
                    ? "Advanced"
                    : skill.level >= 60
                    ? "Proficient"
                    : "Intermediate"}
                </span>
                <span>■ {Math.round(skill.level / 10)} / 10</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsWindow;
