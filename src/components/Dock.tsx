import React from "react";
import { motion } from "framer-motion";

interface DockItemProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isOpen?: boolean;
  color?: string;
}

const DockItem: React.FC<DockItemProps> = ({ label, icon, onClick, isOpen, color = "#e0e0e0" }) => (
  <motion.div
    className="dock-item relative flex flex-col items-center"
    whileHover={{ scale: 1.28, y: -8 }}
    whileTap={{ scale: 0.92 }}
    onClick={onClick}
    title={label}
  >
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md border border-white/40"
      style={{ background: color }}
    >
      {icon}
    </div>
    <span className="dock-tooltip">{label}</span>
    {isOpen && (
      <div
        className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-gray-600"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      />
    )}
  </motion.div>
);

interface DockProps {
  openWindows: string[];
  onOpen: (id: string) => void;
}

const dockApps = [
  { id: "about", label: "About Me", icon: "👤", color: "linear-gradient(145deg, #6ab0f5, #3b82f6)" },
  { id: "projects", label: "Projects", icon: "📁", color: "linear-gradient(145deg, #fcd34d, #f59e0b)" },
  { id: "experience", label: "Experience", icon: "📄", color: "linear-gradient(145deg, #86efac, #22c55e)" },
  { id: "skills", label: "Skills", icon: "⚙️", color: "linear-gradient(145deg, #c4b5fd, #8b5cf6)" },
  { id: "contact", label: "Contact", icon: "✉️", color: "linear-gradient(145deg, #fdba74, #f97316)" },
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
            color={app.color}
            isOpen={openWindows.includes(app.id)}
            onClick={() => onOpen(app.id)}
          />
        ))}
        <div className="w-px h-8 bg-gray-400/40 mx-1" />
        <DockItem
          label="Trash"
          icon="🗑️"
          color="linear-gradient(145deg, #e2e8f0, #cbd5e1)"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default Dock;
