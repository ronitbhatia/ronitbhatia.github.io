import { useEffect, useRef, useState } from "react";
import { Check, Link } from "lucide-react";

export function ReadingProgress() {
  const marker = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  useEffect(() => {
    const container = marker.current?.closest<HTMLElement>(".studio");
    if (!container) return;
    const update = () => {
      const distance = container.scrollHeight - container.clientHeight;
      setScrollable(distance > 1);
      setProgress(distance > 0 ? Math.min(100, Math.max(0, container.scrollTop / distance * 100)) : 0);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    if (container.querySelector("main")) observer.observe(container.querySelector("main")!);
    container.addEventListener("scroll", update, { passive: true });
    container.addEventListener("load", update, true);
    return () => { observer.disconnect(); container.removeEventListener("scroll", update); container.removeEventListener("load", update, true); };
  }, []);
  return <div ref={marker} className="studio-reading-progress" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} hidden={!scrollable}><span style={{ transform: `scaleX(${progress / 100})` }} /></div>;
}

export function CopyLink() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    clearTimeout(timer.current);
    try { await navigator.clipboard.writeText(window.location.href); setStatus("copied"); }
    catch { setStatus("error"); }
    timer.current = setTimeout(() => setStatus("idle"), 2500);
  }
  return <div className="studio-share"><button type="button" onClick={copy} aria-label="Copy link to this page">{status === "copied" ? <Check size={16} aria-hidden="true" /> : <Link size={16} aria-hidden="true" />}<span aria-live="polite">{status === "copied" ? "Copied" : "Copy link"}</span></button>{status === "error" && <span role="status">Copy unavailable. Copy the address from your browser.</span>}</div>;
}
