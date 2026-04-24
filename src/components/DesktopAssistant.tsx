import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  filterSearchEntries,
  suggestedSearches,
  type SearchEntry,
  type SearchTarget,
} from "@/data/searchCatalog";
import { performUnifiedSearch } from "@/data/siteSearchEngine";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface DesktopAssistantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTarget: (target: SearchTarget) => void;
}

/** Sits in the dock row (see `Dock` `leading`) so it stays in the bottom chrome, not over the Home window. */
export function AssistantLauncher({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex max-w-[min(96vw,360px)] items-center justify-center gap-2 sm:max-w-none sm:gap-2.5">
      <div
        className="flex h-[52px] w-[min(52vw,200px)] flex-col justify-center gap-0.5 rounded-2xl border border-slate-200/80 bg-white/95 px-3 py-0 shadow-md backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-950/95 sm:h-16 sm:w-[min(46vw,220px)] sm:gap-2"
        style={{ boxShadow: "0 6px 28px rgba(0,0,0,0.12)" }}
      >
        <p className="text-[11px] font-semibold leading-snug text-slate-900 dark:text-slate-50 sm:text-[13px]">
          CoPilot
        </p>
        <p className="text-[9px] leading-relaxed text-slate-600 dark:text-slate-400 sm:text-[11px]">
          <span className="sm:hidden">Tap avatar to search</span>
          <span className="hidden sm:inline">
            <kbd className="rounded bg-slate-200/80 px-1 py-px font-mono text-[9px] dark:bg-slate-800">⌘K</kbd>
            {" · "}
            faster than folder archaeology
          </span>
        </p>
      </div>
      <motion.button
        type="button"
        onClick={onOpen}
        className="relative h-[52px] w-[52px] shrink-0 overflow-hidden rounded-full shadow-lg ring-[3px] ring-white/90 dark:ring-slate-600/90 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-400/70 sm:h-16 sm:w-16"
        aria-label="Open CoPilot search"
        whileTap={{ scale: 0.96 }}
      >
        <img src="/new-pic.png" alt="" className="h-full w-full object-cover" />
        <span
          className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-black/10 dark:ring-white/10"
          aria-hidden
        />
      </motion.button>
    </div>
  );
}

const DesktopAssistant: React.FC<DesktopAssistantProps> = ({
  open,
  onOpenChange,
  onTarget,
}) => {
  const isMobile = useIsMobile();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return [] as SearchEntry[];
    const unified = performUnifiedSearch(q);
    if (unified.length > 0) return unified;
    return filterSearchEntries(q);
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchEntry[]>();
    for (const e of filtered) {
      const key = e.group;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const quickPicks = useMemo(() => suggestedSearches.slice(0, 6), []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(filtered.length - 1, 0)));
  }, [filtered.length, query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      } else if (e.key === "ArrowDown") {
        if (filtered.length === 0) return;
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        if (filtered.length === 0) return;
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        if (filtered.length === 0) return;
        e.preventDefault();
        const targetEntry = filtered[activeIndex] ?? filtered[0];
        if (targetEntry) {
          onTarget(targetEntry.target);
          onOpenChange(false);
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, filtered, activeIndex, onOpenChange, onTarget]);

  const handleClickEntry = (entry: SearchEntry) => {
    onTarget(entry.target);
    onOpenChange(false);
  };

  const applySuggestion = (preset: string) => {
    setQuery(preset);
    setActiveIndex(0);
  };

  const hasQuery = query.trim().length > 0;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close search"
            className="desktop-assistant-backdrop fixed inset-0 z-[99980] bg-black/45 backdrop-blur-sm cursor-default border-0 p-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="desktop-assistant-panel fixed inset-0 z-[99990] flex items-center justify-center p-4 sm:p-8 pointer-events-none"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="assistant-search-label"
              className="pointer-events-auto flex h-[min(100dvh-2rem,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_32px_100px_rgba(0,0,0,0.22)] dark:border-slate-700/80 dark:bg-slate-950 dark:shadow-[0_32px_100px_rgba(0,0,0,0.55)] sm:h-[min(85vh,720px)]"
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex shrink-0 items-start gap-4 border-b border-slate-100 px-5 pb-4 pt-5 dark:border-slate-800">
                <img
                  src="/new-pic.png"
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-2xl object-cover shadow-md ring-1 ring-black/5 dark:ring-white/10"
                />
                <div className="min-w-0 flex-1">
                  <p id="assistant-search-label" className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    CoPilot
                  </p>
                  <p className="mt-0.5 text-[13px] text-slate-500 dark:text-slate-400">
                    Jump to a window or section — let&apos;s save the scavenger hunt for your real desktop.
                  </p>
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-900/90">
                    <svg
                      className="h-5 w-5 shrink-0 text-slate-400 dark:text-slate-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                      autoFocus
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setActiveIndex(0);
                      }}
                      placeholder="Type to search…"
                      className="min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="shrink-0 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  aria-label="Close"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="shrink-0 px-5 pb-4 pt-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-slate-500 dark:text-slate-500">
                  Shortcuts
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {quickPicks.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => applySuggestion(s.query ?? s.label)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-[13px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800/80"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto mac-scroll border-t border-slate-100 px-5 py-4 dark:border-slate-800/90">
                {!hasQuery && (
                  <div className="flex h-full min-h-[120px] flex-col items-center justify-center gap-1 text-center">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Type above to see matches</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Or choose a shortcut to fill the search</p>
                  </div>
                )}
                {hasQuery && grouped.length === 0 && (
                  <p className="py-8 text-center text-[15px] text-slate-600 dark:text-slate-400">
                    Nothing for{" "}
                    <span className="font-mono font-medium text-slate-900 dark:text-slate-200">"{query.trim()}"</span>
                  </p>
                )}
                {hasQuery &&
                  grouped.map(([group, list]) => (
                    <div key={group} className="mb-6 last:mb-0">
                      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-500">
                        {group}
                      </div>
                      <div className="flex flex-col gap-1">
                        {list.map((entry) => {
                          const globalIndex = filtered.indexOf(entry);
                          const isActive = globalIndex === activeIndex;
                          return (
                            <button
                              key={entry.id}
                              type="button"
                              className={`rounded-xl px-3 py-3 text-left transition ${
                                isActive
                                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950"
                                  : "text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80"
                              }`}
                              onMouseEnter={() => setActiveIndex(globalIndex)}
                              onClick={() => handleClickEntry(entry)}
                            >
                              <div className="text-[15px] font-semibold leading-snug">{entry.title}</div>
                              <div
                                className={`mt-1 text-[13px] leading-snug ${
                                  isActive
                                    ? "text-white/85 dark:text-slate-600"
                                    : "text-slate-600 dark:text-slate-400"
                                }`}
                              >
                                {entry.description}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="shrink-0 border-t border-slate-100 px-5 py-3 text-center text-xs text-slate-400 dark:border-slate-800">
                {isMobile ? (
                  <>Swipe backdrop or tap ✕ to close</>
                ) : (
                  <>
                    <kbd className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] dark:bg-slate-900">⌘K</kbd> toggle ·{" "}
                    <kbd className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] dark:bg-slate-900">esc</kbd> close
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DesktopAssistant;
