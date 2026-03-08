import React from "react";
import { motion } from "framer-motion";

interface DockItemProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isOpen?: boolean;
  gradient?: string;
}

const DockItem: React.FC<DockItemProps> = ({ label, icon, onClick, isOpen, gradient }) => (
  <motion.div
    className="relative flex flex-col items-center cursor-pointer"
    whileHover={{ scale: 1.28, y: -8 }}
    whileTap={{ scale: 0.92 }}
    onClick={onClick}
    style={{ position: "relative" }}
  >
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md border"
      style={{
        background: gradient,
        borderColor: "rgba(255,255,255,0.5)",
      }}
    >
      {icon}
    </div>
    <div className="dock-tooltip">{label}</div>
    {isOpen && (
      <div
        className="absolute w-1.5 h-1.5 rounded-full"
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
  onOpen: (id: string) => void;
}

const dockApps = [
  { id: "about", label: "About Me", icon: "👤", gradient: "linear-gradient(145deg, #6ab0f5, #3b82f6)" },
  { id: "projects", label: "Projects", icon: "📁", gradient: "linear-gradient(145deg, #fcd34d, #f59e0b)" },
  { id: "experience", label: "Experience", icon: "📄", gradient: "linear-gradient(145deg, #86efac, #22c55e)" },
  { id: "skills", label: "Skills", icon: "⚙️", gradient: "linear-gradient(145deg, #c4b5fd, #8b5cf6)" },
  { id: "contact", label: "Contact", icon: "✉️", gradient: "linear-gradient(145deg, #fdba74, #f97316)" },
];

const Dock: React.FC<DockProps> = ({ openWindows, onOpen }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="mac-dock">
        {dockApps.map((app) => (
          <DockItem
            key={app.id}
            label={app.label}
            icon={app.icon}
            gradient={app.gradient}
            isOpen={openWindows.includes(app.id)}
            onClick={() => onOpen(app.id)}
          />
        ))}
        <div className="w-px h-8 mx-1" style={{ background: "rgba(150,150,150,0.4)" }} />
        <DockItem
          label="Trash"
          icon="🗑️"
          gradient="linear-gradient(145deg, #e2e8f0, #cbd5e1)"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default Dock;
