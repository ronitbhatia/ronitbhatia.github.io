import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Desktop from "@/components/Desktop";

const BootScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [phase, setPhase] = useState<"logo" | "loading" | "done">("logo");
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);

  const bootLines = [
    "Initializing kernel...",
    "Loading device drivers...",
    "Mounting volumes...",
    "Starting Alex.app...",
    "Loading portfolio assets...",
    "Compiling memories...",
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
          {/* Scanline effect */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)",
            }}
          />

          {/* Happy Mac icon */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="flex flex-col items-center gap-2"
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
                className="rounded-sm mb-2"
                style={{
                  width: 52,
                  height: 36,
                  background: "hsl(0 0% 12%)",
                  border: "2px solid hsl(0 0% 30%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                }}
              >
                😊
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

              {/* Progress bar */}
              <div
                className="w-full rounded-sm overflow-hidden"
                style={{
                  height: 8,
                  background: "hsl(0 0% 18%)",
                  border: "1px solid hsl(0 0% 28%)",
                }}
              >
                <motion.div
                  className="h-full rounded-sm"
                  style={{
                    background: "linear-gradient(90deg, hsl(142 72% 39%), hsl(142 72% 55%))",
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.25 }}
                />
              </div>

              <div
                className="text-xs opacity-40"
                style={{ fontFamily: "var(--font-mono)", color: "white" }}
              >
                {progress}% — Alex Chen OS v6.0
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Index: React.FC = () => {
  const [booted, setBooted] = useState(false);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <AnimatePresence>
        {!booted && <BootScreen key="boot" onFinish={() => setBooted(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {booted && (
          <motion.div
            key="desktop"
            className="w-full h-full"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
