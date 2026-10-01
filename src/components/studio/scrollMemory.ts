import type { MouseEvent } from "react";
export type Snapshot = { top: number; details: number[] };
const prefix = "studio-scroll:";
export function readScrollSnapshot(url: string): Snapshot | null {
  try { return JSON.parse(sessionStorage.getItem(prefix + url) ?? "null"); } catch { return null; }
}
export function saveScrollSnapshot(url: string, snapshot: Snapshot) {
  try { sessionStorage.setItem(prefix + url, JSON.stringify(snapshot)); } catch { /* Storage may be disabled. */ }
}
export function scrollToStudioTop(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  const root = event.currentTarget.closest<HTMLElement>(".studio");
  root?.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  root?.querySelector<HTMLElement>(".studio-brand")?.focus({ preventScroll: true });
}
