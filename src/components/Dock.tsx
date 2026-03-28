import React from "react";
import { motion } from "framer-motion";

interface DockItemProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isOpen?: boolean;
  isActive?: boolean;
  isBouncing?: boolean;
  gradient?: string;
  compact?: boolean;
}

const DockItem: React.FC<DockItemProps> = ({
  label,
  icon,
  onClick,
  isOpen,
  isActive,
  isBouncing,
  gradient,
  compact,
}) => (
  <motion.div
    className="dock-item relative flex flex-col items-center cursor-pointer touch-manipulation"
    whileHover={compact ? { scale: 1.06, y: -2 } : { scale: 1.28, y: -8 }}
    whileTap={{ scale: 0.88, y: 0 }}
    onClick={onClick}
    style={{ position: "relative" }}
    animate={isBouncing ? { y: [0, -14, -4, 0], scale: [1, 1.15, 1.05, 1] } : undefined}
    transition={isBouncing ? { duration: 0.5, ease: "easeOut" } : undefined}
  >
    {/* Ping/glow under active app */}
    {isOpen && isActive && (
      <div
        className="dock-item-ping absolute pointer-events-none z-0"
        style={{
          bottom: -2,
          left: "50%",
          transform: "translateX(-50%)",
          width: 44,
          height: 10,
          background: "radial-gradient(ellipse 70% 100% at center top, hsl(var(--mac-blue) / 0.4) 0%, transparent 75%)",
        }}
      />
    )}
    <div
      className={`${compact ? "h-10 w-10 rounded-[10px] text-xl" : "h-12 w-12 rounded-xl text-2xl"} flex items-center justify-center shadow-lg border border-white/50 relative z-10`}
      style={{
        background: gradient,
        boxShadow: "0 4px 14px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.5)",
      }}
    >
      {icon}
    </div>
    <div className="dock-tooltip">{label}</div>
    {isOpen && (
      <div
        className="absolute w-1.5 h-1.5 rounded-full z-10"
        style={{
          bottom: -6,
          left: "50%",
          transform: "translateX(-50%)",
          background: "hsl(var(--mac-dark))",
        }}
      />
    )}
  </motion.div>
);

interface DockProps {
  openWindows: string[];
  activeWindowId: string | null;
  lastOpenedFromDock: string | null;
  onOpen: (id: string) => void;
  /** Renders to the left of the dock pill (e.g. search launcher) — keeps UI in the bottom chrome, not over windows. */
  leading?: React.ReactNode;
  isMobile?: boolean;
}

const dockApps = [
  { id: "home", label: "Home", icon: "🏠", gradient: "linear-gradient(145deg, #93c5fd, #3b82f6)" },
  { id: "experience", label: "Experience", icon: "💼", gradient: "linear-gradient(145deg, #86efac, #22c55e)" },
  { id: "resume", label: "Resume", icon: "📄", gradient: "linear-gradient(145deg, #a5b4fc, #6366f1)" },
  { id: "projects", label: "Projects", icon: "📁", gradient: "linear-gradient(145deg, #fde047, #eab308)" },
  { id: "initiative-impact", label: "Initiative & Impact", icon: "🌟", gradient: "linear-gradient(145deg, #fde047, #ca8a04)" },
  { id: "education", label: "Education", icon: "🎓", gradient: "linear-gradient(145deg, #fda4af, #e11d48)" },
  { id: "skills", label: "Skills", icon: "🧩", gradient: "linear-gradient(145deg, #c4b5fd, #8b5cf6)" },
  { id: "contact", label: "Contact", icon: "✉️", gradient: "linear-gradient(145deg, #fdba74, #f97316)" },
];

const Dock: React.FC<DockProps> = ({ openWindows, activeWindowId, lastOpenedFromDock, onOpen, leading, isMobile }) => {
  const compact = Boolean(isMobile);

  return (
    <div
      className={`pointer-events-none z-50 flex justify-center px-2 sm:px-3 ${
        isMobile
          ? "fixed inset-x-0 bottom-0 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 flex-col items-stretch gap-2"
          : "fixed bottom-6 left-0 right-0"
      }`}
    >
      <div className={`relative pointer-events-auto ${isMobile ? "flex w-full max-w-[100vw] flex-col items-center gap-2" : ""}`}>
        {leading && isMobile ? (
          <div className="pointer-events-auto flex w-full justify-center px-1">{leading}</div>
        ) : null}
        {leading && !isMobile ? (
          <div className="pointer-events-auto absolute right-full top-1/2 mr-3 flex -translate-y-1/2 items-center">
            {leading}
          </div>
        ) : null}
        <div
          className={`mac-dock pointer-events-auto ${isMobile ? "mac-dock--scroll max-w-[min(100vw-12px,calc(100vw-0.75rem))] overflow-x-auto overflow-y-visible py-2 [-webkit-overflow-scrolling:touch]" : ""}`}
        >
          {dockApps.map((app) => (
            <DockItem
              key={app.id}
              label={app.label}
              icon={app.icon}
              gradient={app.gradient}
              compact={compact}
              isOpen={openWindows.includes(app.id)}
              isActive={activeWindowId === app.id}
              isBouncing={lastOpenedFromDock === app.id}
              onClick={() => onOpen(app.id)}
            />
          ))}
          <div
            className={`mx-0.5 w-px flex-shrink-0 ${compact ? "h-7" : "h-8"}`}
            style={{ background: "rgba(255,255,255,0.35)" }}
          />
          <DockItem
            label="Trash"
            icon="🗑️"
            gradient="linear-gradient(145deg, #e2e8f0, #cbd5e1)"
            compact={compact}
            isOpen={openWindows.includes("trash")}
            isActive={activeWindowId === "trash"}
            isBouncing={lastOpenedFromDock === "trash"}
            onClick={() => onOpen("trash")}
          />
        </div>
      </div>
    </div>
  );
};

export default Dock;
