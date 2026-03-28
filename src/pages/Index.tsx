import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Desktop from "@/components/Desktop";

const BootScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [phase, setPhase] = useState<"logo" | "loading" | "done">("logo");
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);

  const bootLines = [
    "Initializing kernel...",
    "Loading device drivers...",
    "Mounting volumes...",
    "Loading memories...",
    "Mounting projects...",
    "Starting Ronit Bhatia.app...",
    "Loading portfolio assets...",
    "Almost ready...",
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("loading"), 800);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;
    let i = 0;
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 14, 98));
      if (i < bootLines.length) {
        setLines((l) => [...l, bootLines[i]]);
        i++;
      }
    }, 300);

    const t = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setPhase("done");
        setTimeout(onFinish, 400);
      }, 500);
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(t);
    };
  }, [phase, onFinish]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="boot-screen"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {/* Static scanline texture */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)",
            }}
          />
          {/* Moving CRT scanline */}
          <div
            className="boot-scanline-moving absolute left-0 right-0 h-px opacity-[0.06]"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.8), transparent)" }}
          />

          {/* Happy Mac icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="flex flex-col items-center gap-2 boot-logo-pulse"
          >
            {/* Retro Mac face */}
            <div
              className="relative flex flex-col items-center justify-center rounded-2xl border-2"
              style={{
                width: 80,
                height: 88,
                background: "hsl(0 0% 96%)",
                borderColor: "hsl(0 0% 30%)",
                boxShadow: "4px 4px 0 hsl(0 0% 30%)",
              }}
            >
              {/* Screen */}
              <div
                className="rounded-sm mb-2 flex items-center justify-center font-bold text-white"
                style={{
                  width: 52,
                  height: 36,
                  background: "hsl(0 0% 12%)",
                  border: "2px solid hsl(0 0% 30%)",
                  fontSize: "16px",
                  fontFamily: "var(--font-body)",
                }}
              >
                R
              </div>
              {/* Floppy slot */}
              <div
                style={{
                  width: 36,
                  height: 4,
                  background: "hsl(0 0% 25%)",
                  borderRadius: "1px",
                }}
              />
            </div>

            <div
              className="text-white text-center"
              style={{ fontFamily: "var(--font-retro)", fontSize: "22px", letterSpacing: "0.05em" }}
            >
              Welcome
            </div>
          </motion.div>

          {phase === "loading" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3 w-64"
            >
              {/* Boot log */}
              <div
                className="w-full rounded border text-left px-3 py-2 h-32 overflow-hidden"
                style={{
                  background: "hsl(0 0% 5%)",
                  borderColor: "hsl(0 0% 25%)",
                }}
              >
                {lines.map((line, i) => (
                  <div
                    key={i}
                    className="text-green-400 text-xs leading-5"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    <span className="opacity-50">$ </span>
                    {line}
                    {i === lines.length - 1 && (
                      <span className="animate-blink ml-0.5 text-green-400">█</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Progress bar – glow */}
              <div
                className="boot-progress-wrap w-full rounded-sm overflow-hidden"
                style={{
                  height: 8,
                  background: "hsl(0 0% 18%)",
                  border: "1px solid hsl(0 0% 28%)",
                }}
              >
                <motion.div
                  className="h-full rounded-sm"
                  style={{
                    background: "linear-gradient(90deg, hsl(142 72% 35%), hsl(142 72% 50%), hsl(142 72% 58%))",
                    boxShadow: "0 0 12px hsl(142 72% 45% / 0.4)",
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.25 }}
                />
              </div>

              <div
                className="text-xs opacity-40"
                style={{ fontFamily: "var(--font-mono)", color: "white" }}
              >
                {progress}% — Ronit Bhatia OS v6.0
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SITE_TITLE = "Ronit Bhatia | Portfolio";

const Index: React.FC = () => {
  const [showBootScreen, setShowBootScreen] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    document.title = SITE_TITLE;
  }, []);

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { effectiveType?: string; saveData?: boolean };
    };
    const connection = nav.connection;
    const effectiveType = connection?.effectiveType ?? "";
    const isSlowConnection =
      Boolean(connection?.saveData) ||
      effectiveType === "slow-2g" ||
      effectiveType === "2g" ||
      effectiveType === "3g";

    if (isSlowConnection) {
      setShowBootScreen(true);
      return;
    }
    setBooted(true);
  }, []);

  /* Ensure favicon stays the site “R” mark (some hosts inject their own icon). */
  useEffect(() => {
    const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"><rect width="32" height="32" rx="6" fill="hsl(207 89% 54%)"/><rect x="4" y="4" width="24" height="18" rx="2" fill="hsl(0 0% 98%)" stroke="hsl(0 0% 75%)" stroke-width="1"/><text x="16" y="15" text-anchor="middle" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="hsl(207 89% 36%)">R</text><rect x="6" y="6" width="6" height="2" rx="0.5" fill="hsl(0 0% 85%)"/></svg>`;
    const dataUrl = "data:image/svg+xml," + encodeURIComponent(faviconSvg);

    const applyFavicon = () => {
      document.querySelectorAll('link[rel="icon"]').forEach((el) => el.remove());
      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      link.href = dataUrl;
      document.head.appendChild(link);
    };

    applyFavicon();
    const t1 = setTimeout(applyFavicon, 300);
    const t2 = setTimeout(applyFavicon, 1000);
    const t3 = setTimeout(applyFavicon, 2500);

    const obs = new MutationObserver(() => {
      const icons = document.querySelectorAll('link[rel="icon"]');
      const hasForeign = Array.from(icons).some((el) => !(el as HTMLLinkElement).href?.includes("data:image"));
      if (hasForeign) applyFavicon();
    });
    obs.observe(document.head, { childList: true, subtree: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      obs.disconnect();
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <AnimatePresence>
        {showBootScreen && !booted && (
          <BootScreen key="boot" onFinish={() => setBooted(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {booted && (
          <ThemeProvider>
            <motion.div
              key="desktop"
              className="w-full h-full"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Desktop />
            </motion.div>
          </ThemeProvider>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
