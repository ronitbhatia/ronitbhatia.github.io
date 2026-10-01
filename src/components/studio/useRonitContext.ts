import { useEffect, useState } from "react";

export const ronitContexts = {
  experience: { pose: "build", note: "The work between a customer problem and production." },
  work: { pose: "think", note: "Look for the decisions behind each build." },
  lab: { pose: "explore", note: "A sketch, a customer need, and a tradeoff." },
} as const;
export type RonitContext = (typeof ronitContexts)[keyof typeof ronitContexts] | null;

export function useRonitContext(pathname: string) {
  const [context, setContext] = useState<RonitContext>(null);
  useEffect(() => {
    if (pathname !== "/" && pathname !== "/studio") {
      setContext(pathname.includes("/lab") ? ronitContexts.lab : pathname.includes("/work") ? ronitContexts.work : null);
      return;
    }
    let frame = 0;
    const update = () => {
      const root = document.querySelector(".studio");
      if (!root) return;
      const bounds = root.getBoundingClientRect();
      const line = bounds.top + bounds.height * .35;
      const active = Object.entries(ronitContexts).find(([id]) => {
        const rect = document.getElementById(id)?.getBoundingClientRect();
        return rect && rect.top <= line && rect.bottom > line;
      });
      setContext(active ? active[1] : null);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    // The scrolling container and sections may mount after a lazy route resolves.
    const observer = new MutationObserver(schedule);
    observer.observe(document.getElementById("root") ?? document.body, { childList: true, subtree: true });
    document.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);
    schedule();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener("scroll", schedule, true); window.removeEventListener("resize", schedule); };
  }, [pathname]);
  return context;
}
