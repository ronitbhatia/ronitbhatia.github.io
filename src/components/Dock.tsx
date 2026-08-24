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
    className="dock-item relative flex flex-col items-center cursor-pointer touch-manipulation flex-shrink-0"
    whileHover={compact ? { scale: 1.06, y: -2 } : { scale: 1.22, y: -6 }}
    whileTap={{ scale: 0.88, y: 0 }}
    onClick={onClick}
    style={{ position: "relative" }}
    animate={isBouncing ? { y: [0, -14, -4, 0], scale: [1, 1.15, 1.05, 1] } : undefined}
    transition={isBouncing ? { duration: 0.5, ease: "easeOut" } : undefined}
  >
    {isOpen && isActive && (
      <div
        className="dock-item-ping absolute pointer-events-none z-0"
        style={{
          bottom: -2,
          left: "50%",
          transform: "translateX(-50%)",
          width: 44,
          height: 10,
          background:
            "radial-gradient(ellipse 70% 100% at center top, hsl(var(--mac-blue) / 0.4) 0%, transparent 75%)",
        }}
      />
    )}
    <div
      className={`${compact ? "h-10 w-10 rounded-[10px] text-xl" : "h-11 w-11 rounded-[11px] text-xl"} flex items-center justify-center shadow-lg border border-white/50 relative z-10`}
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
  /** Renders beside the dock pill (e.g. CoPilot launcher). */
  leading?: React.ReactNode;
  isMobile?: boolean;
}

const dockApps = [
  { id: "home", label: "Home", icon: "🏠", gradient: "linear-gradient(145deg, #93c5fd, #3b82f6)" },
  { id: "experience", label: "Experience", icon: "💼", gradient: "linear-gradient(145deg, #86efac, #22c55e)" },
  { id: "resume", label: "Resume", icon: "📄", gradient: "linear-gradient(145deg, #a5b4fc, #6366f1)" },
  { id: "projects", label: "Projects", icon: "📁", gradient: "linear-gradient(145deg, #fde047, #eab308)" },
  { id: "product-lab", label: "Product Lab", icon: "💡", gradient: "linear-gradient(145deg, #fda4af, #f43f5e)" },
  { id: "initiative-impact", label: "Initiative & Impact", icon: "🌟", gradient: "linear-gradient(145deg, #fde047, #ca8a04)" },
  { id: "education", label: "Education", icon: "🎓", gradient: "linear-gradient(145deg, #fda4af, #e11d48)" },
  { id: "skills", label: "Skills", icon: "🧩", gradient: "linear-gradient(145deg, #c4b5fd, #8b5cf6)" },
  { id: "contact", label: "Contact", icon: "✉️", gradient: "linear-gradient(145deg, #fdba74, #f97316)" },
];

const Dock: React.FC<DockProps> = ({
  openWindows,
  activeWindowId,
  lastOpenedFromDock,
  onOpen,
  leading,
  isMobile,
}) => {
  const compact = Boolean(isMobile);

  const dockContent = (
    <>
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
        className="mx-0.5 h-7 w-px flex-shrink-0"
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
    </>
  );

  return (
    <div
      className={`pointer-events-none z-50 ${
        isMobile
          ? "fixed inset-x-0 bottom-0 flex flex-col items-stretch gap-2 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1"
          : "fixed bottom-5 left-0 right-0 overflow-visible px-3 py-2"
      }`}
    >
      {isMobile ? (
        <div className="pointer-events-auto flex w-full flex-col items-center gap-2">
          {leading ? <div className="flex w-full justify-center">{leading}</div> : null}
          <div className="mac-dock mac-dock--fit mac-dock--scroll pointer-events-auto max-w-[min(100vw-12px,calc(100vw-0.75rem))] overflow-x-auto overflow-y-visible py-2 [-webkit-overflow-scrolling:touch]">
            {dockContent}
          </div>
        </div>
      ) : (
        <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-2">
          <div className="pointer-events-auto flex items-center justify-end overflow-visible py-1 pr-1">
            {leading}
          </div>
          <div className="mac-dock mac-dock--fit pointer-events-auto justify-self-center max-w-[min(100%,calc(100vw-2rem))] overflow-x-auto overflow-y-visible">
            {dockContent}
          </div>
          <div aria-hidden />
        </div>
      )}
    </div>
  );
};

export default Dock;
