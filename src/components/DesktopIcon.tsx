import React from "react";
import { motion } from "framer-motion";

interface DesktopIconProps {
  label: string;
  icon?: string;
  imageLight?: string;
  imageDark?: string;
  externalUrl?: string;
  isDark?: boolean;
  onClick: () => void;
  isSelected?: boolean;
  onDoubleClick?: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  label,
  icon,
  imageLight,
  imageDark,
  externalUrl,
  isDark,
  onClick,
  isSelected,
  onDoubleClick,
}) => {
  const imageSrc = imageLight && imageDark ? (isDark ? imageDark : imageLight) : null;

  return (
    <motion.div
      className={`desktop-icon ${isSelected ? "selected" : ""}`}
      onClick={onClick}
      onDoubleClick={externalUrl ? () => window.open(externalUrl, "_blank", "noopener,noreferrer") : onDoubleClick}
      whileTap={{ scale: 0.92 }}
    >
      <div
        className={`transition-all duration-100 flex items-center justify-center ${
          imageSrc ? "w-12 h-12" : "text-4xl"
        } ${isSelected ? "brightness-75" : ""}`}
        style={{
          filter: isSelected && !imageSrc ? "invert(0.15) sepia(1) hue-rotate(200deg) saturate(1.5)" : "none",
        }}
      >
        {imageSrc ? (
          <img src={imageSrc} alt={label} className="w-full h-full object-contain" />
        ) : (
          icon
        )}
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
