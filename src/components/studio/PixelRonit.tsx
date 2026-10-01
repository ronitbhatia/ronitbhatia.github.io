import { useEffect, useId, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { projectSummaries } from "@/data/projectSummaries";
import { productLabCases } from "@/data/productLabCases";
import "@/styles/pixel-ronit.css";

type Pose = "hello" | "think" | "build" | "explore";
const frames: Record<Pose, string> = { hello: "0 0 627 650", think: "627 0 627 650", build: "0 650 627 604", explore: "627 650 627 604" };

/** One transparent atlas shared by every appearance throughout the Studio. */
export function PixelRonit({ pose = "hello", className = "" }: { pose?: Pose; className?: string }) {
  const clip = useId();
  const [x, y, width, height] = frames[pose].split(" ").map(Number);
  return <svg className={`pixel-ronit ${className}`} viewBox={frames[pose]} aria-hidden="true" focusable="false"><defs><clipPath id={clip}><rect x={x} y={y} width={width} height={height} /></clipPath></defs><image clipPath={`url(#${clip})`} href="/pixel-ronit/poses.png" width="1254" height="1254" /></svg>;
}

export function RonitHello() {
  const [greeting, setGreeting] = useState(0);
  const [paused, setPaused] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const greetings = ["Hi, I’m Ronit. The smaller one.", "Same curiosity. Fewer pixels.", "I built the projects. He gets the attention.", "Go on. Have a look around."];
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      const bounds = host.current?.getBoundingClientRect();
      if (!document.hidden && bounds && bounds.bottom > 0 && bounds.top < window.innerHeight) setGreeting(value => (value + 1) % greetings.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [paused, greetings.length]);
  return <div ref={host} className="ronit-hello"><div key={greeting} className={`ronit-wave ronit-auto${paused ? " is-paused" : ""}`}><PixelRonit pose={greeting === 2 ? "build" : greeting === 1 ? "think" : "hello"} /></div><div className="ronit-speech"><span className="ronit-label">Your studio host</span><p key={greeting} className={paused ? "" : "ronit-dialogue"}>{greetings[greeting]}</p><button className="ronit-hint ronit-pause" aria-label={paused ? "Resume host dialogue" : "Pause host dialogue"} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "Resume" : "Pause"}</button></div></div>;
}

export function RonitNote({ pose = "think", children }: { pose?: Pose; children: React.ReactNode }) {
  return <aside className="ronit-note"><PixelRonit pose={pose} /><p>{children}</p></aside>;
}

const discoveries = [
  ...projects.map(p => ({ title: p.name.split(": ")[0], description: projectSummaries[p.id], url: `/studio/work/${p.id}`, kind: "Project · From the workbench", pose: "build" as Pose })),
  ...productLabCases.map(p => ({ title: p.title, description: p.subject, url: `/studio/lab/${p.id}`, kind: `${p.type === "redesign" ? "Redesign" : "Speculative concept"} · Product Lab`, pose: "explore" as Pose })),
];
export function RonitDiscovery({ compact = false, exclude = "" }: { compact?: boolean; exclude?: string }) {
  const [pick, setPick] = useState<(typeof discoveries)[number] | null>(null);
  function discover() {
    const options = discoveries.filter(item => item.url !== exclude && item.url !== pick?.url);
    setPick(options[Math.floor(Math.random() * options.length)]);
  }
  return <div className={`ronit-discovery${compact ? " ronit-discovery-compact" : ""}`}>
    <PixelRonit pose={pick?.pose ?? "think"} />
    <div><span className="ronit-label">{pick?.kind ?? "A small detour"}</span><div aria-live="polite" aria-atomic="true"><p>{pick ? <a href={pick.url}>{pick.title} ↗</a> : "Not sure where to start?"}</p>{pick && <p className="ronit-discovery-description">{pick.description}</p>}</div><button type="button" onClick={discover}>{pick ? "Pick another" : "Pick something for me"}<span aria-hidden="true"> ✳</span></button></div>
  </div>;
}
