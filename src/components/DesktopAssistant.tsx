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
    <div className="copilot-launcher flex max-w-[min(96vw,360px)] items-center justify-center gap-2 sm:max-w-none sm:gap-2.5">
      <div className="copilot-launcher-card">
        <div className="copilot-launcher-card-header">
          <span className="copilot-launcher-dot" aria-hidden />
          <p className="copilot-launcher-title">CoPilot</p>
        </div>
        <p className="copilot-launcher-sub">
          <span className="sm:hidden">Tap avatar to search</span>
          <span className="hidden sm:inline">
            <kbd className="copilot-kbd">⌘K</kbd>
            {" · "}
            faster than folder archaeology
          </span>
        </p>
      </div>
      <motion.button
        type="button"
        onClick={onOpen}
        className="copilot-launcher-avatar"
        aria-label="Open CoPilot search"
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
      >
        <img src="/avatar.png" alt="" className="h-full w-full object-cover" />
        <span className="copilot-launcher-avatar-ring" aria-hidden />
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
            className="desktop-assistant-backdrop fixed inset-0 z-[99980] cursor-default border-0 p-0"
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
              className="copilot-panel pointer-events-auto"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="copilot-panel-titlebar">
                <div className="mac-btn-group flex items-center gap-1.5 pointer-events-none">
                  <span className="mac-btn mac-btn-close" />
                  <span className="mac-btn mac-btn-minimize" />
                  <span className="mac-btn mac-btn-maximize" />
                </div>
                <span className="copilot-panel-titlebar-label">CoPilot.app</span>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="copilot-panel-close"
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="copilot-panel-hero">
                <div className="copilot-panel-hero-avatar-wrap">
                  <img src="/avatar.png" alt="" className="copilot-panel-hero-avatar" />
                  <span className="copilot-panel-hero-status" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p id="assistant-search-label" className="copilot-panel-hero-title">
                    CoPilot
                  </p>
                  <p className="copilot-panel-hero-sub">
                    Your RonitOS navigator — jump to any window, section, or link.
                  </p>
                </div>
              </div>

              <div className="copilot-panel-search-wrap">
                <svg className="copilot-panel-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  placeholder="Ask CoPilot where to go…"
                  className="copilot-panel-search-input"
                />
              </div>

              <div className="copilot-panel-shortcuts">
                <p className="copilot-panel-section-label">Quick picks</p>
                <div className="copilot-chip-grid">
                  {quickPicks.map((s) => (
                    <motion.button
                      key={s.label}
                      type="button"
                      onClick={() => applySuggestion(s.query ?? s.label)}
                      className="copilot-chip"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {s.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="copilot-panel-results mac-scroll">
                {!hasQuery && (
                  <div className="copilot-panel-empty">
                    <p className="copilot-panel-empty-title">Ready when you are</p>
                    <p className="copilot-panel-empty-sub">Type above or tap a quick pick to navigate the desktop.</p>
                  </div>
                )}
                {hasQuery && grouped.length === 0 && (
                  <p className="copilot-panel-no-results">
                    Nothing for{" "}
                    <span className="font-mono font-semibold">&quot;{query.trim()}&quot;</span>
                  </p>
                )}
                {hasQuery &&
                  grouped.map(([group, list]) => (
                    <div key={group} className="copilot-result-group">
                      <div className="copilot-panel-section-label">{group}</div>
                      <div className="copilot-result-list">
                        {list.map((entry) => {
                          const globalIndex = filtered.indexOf(entry);
                          const isActive = globalIndex === activeIndex;
                          return (
                            <motion.button
                              key={entry.id}
                              type="button"
                              className={`copilot-result-row${isActive ? " copilot-result-row--active" : ""}`}
                              onMouseEnter={() => setActiveIndex(globalIndex)}
                              onClick={() => handleClickEntry(entry)}
                              layout
                              whileHover={{ x: 2 }}
                            >
                              <div className="copilot-result-bubble">
                                <div className="copilot-result-title">{entry.title}</div>
                                <div className="copilot-result-desc">{entry.description}</div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="copilot-panel-footer">
                {isMobile ? (
                  <>Tap backdrop or ✕ to close</>
                ) : (
                  <>
                    <kbd className="copilot-kbd">⌘K</kbd> toggle ·{" "}
                    <kbd className="copilot-kbd">↑↓</kbd> navigate ·{" "}
                    <kbd className="copilot-kbd">↵</kbd> open ·{" "}
                    <kbd className="copilot-kbd">esc</kbd> close
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
