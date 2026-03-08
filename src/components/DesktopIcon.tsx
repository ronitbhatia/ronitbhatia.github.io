import React from "react";
import { motion } from "framer-motion";

interface DesktopIconProps {
  label: string;
  icon: string;
  onClick: () => void;
  isSelected?: boolean;
  onDoubleClick?: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  label,
  icon,
  onClick,
  isSelected,
  onDoubleClick,
}) => {
  return (
    <motion.div
      className={`desktop-icon ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      whileTap={{ scale: 0.92 }}
    >
      <div
        className={`text-4xl transition-all duration-100 ${
          isSelected ? "brightness-75" : ""
        }`}
        style={{ filter: isSelected ? "invert(0.15) sepia(1) hue-rotate(200deg) saturate(1.5)" : "none" }}
      >
        {icon}
      </div>
      <span
        className={`text-center text-xs leading-tight px-1 rounded ${
          isSelected
            ? "text-white"
            : ""
        }`}
        style={{
          background: isSelected ? "hsl(207 89% 45%)" : "transparent",
          color: isSelected ? "white" : "hsl(var(--mac-dark))",
          textShadow: isSelected ? "none" : "0 1px 2px rgba(255,255,255,0.8)",
          maxWidth: "72px",
        }}
      >
        {label}
      </span>
    </motion.div>
  );
};

export default DesktopIcon;
