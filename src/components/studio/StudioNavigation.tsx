import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

import { readScrollSnapshot, saveScrollSnapshot, type Snapshot } from "./scrollMemory";

export default function StudioNavigation() {
  const location = useLocation();
  const navigation = useNavigationType();
  const first = useRef(true);
  useLayoutEffect(() => {
    const url = location.pathname + location.search + location.hash;
    const returned = first.current
      ? (performance.getEntriesByType?.("navigation")[0] as PerformanceNavigationTiming | undefined)?.type === "back_forward"
      : navigation === "POP";
    first.current = false;
    const snapshot = returned ? readScrollSnapshot(url) : null;
    let root: HTMLElement | null = null;
    let latest: Snapshot | null = null;
    let resizing: ResizeObserver | null = null;
    let frame = 0;
    let timeout: ReturnType<typeof setTimeout>;
    let restoring = true;
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const capture = () => {
      if (!root || restoring) return;
      latest = { top: root.scrollTop, details: Array.from(root.querySelectorAll("details")).flatMap((detail, index) => detail.open ? [index] : []) };
      saveScrollSnapshot(url, latest);
    };
    const finish = () => { restoring = false; resizing?.disconnect(); capture(); };
    const attach = () => {
      if (root) return;
      const candidate = document.querySelector<HTMLElement>(".studio");
      if (!candidate || candidate.dataset.scrollPage !== location.pathname) return;
      root = candidate;
      if (snapshot) {
        root.querySelectorAll("details").forEach((detail, index) => { detail.open = snapshot.details.includes(index); });
      }
      const restore = () => {
        if (!root || !restoring) return;
        if (snapshot) root.scrollTo({ top: snapshot.top, behavior: "instant" });
        else if (location.hash) {
          let id: string;
          try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
          const target = document.getElementById(id);
          if (target === root) root.scrollTo({ top: 0, behavior: "instant" });
          else target?.scrollIntoView({ block: "start", behavior: "instant" });
        } else root.scrollTo({ top: 0, behavior: "instant" });
      };
      restore();
      frame = requestAnimationFrame(restore);
      resizing = new ResizeObserver(restore);
      if (root.querySelector("main")) resizing.observe(root.querySelector("main")!);
      root.addEventListener("scroll", capture, { passive: true });
      root.addEventListener("toggle", capture, true);
      root.addEventListener("wheel", finish, { passive: true });
      root.addEventListener("pointerdown", finish);
      root.addEventListener("keydown", finish);
      timeout = setTimeout(finish, 1500);
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("pagehide", capture);
    document.addEventListener("click", capture, true);
    return () => {
      // Use the captured position; the outgoing DOM may already have been replaced.
      if (latest) saveScrollSnapshot(url, latest);
      clearTimeout(timeout); cancelAnimationFrame(frame); observer.disconnect(); resizing?.disconnect();
      root?.removeEventListener("scroll", capture); root?.removeEventListener("toggle", capture, true);
      root?.removeEventListener("wheel", finish); root?.removeEventListener("pointerdown", finish); root?.removeEventListener("keydown", finish);
      window.removeEventListener("pagehide", capture); document.removeEventListener("click", capture, true);
      history.scrollRestoration = previousRestoration;
    };
  }, [location.key, location.pathname, location.search, location.hash, navigation]);
  return null;
}
