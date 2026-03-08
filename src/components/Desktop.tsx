import React, { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Window from "./Window";
import DesktopIcon from "./DesktopIcon";
import AboutWindow from "./windows/AboutWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import ExperienceWindow from "./windows/ExperienceWindow";
import SkillsWindow from "./windows/SkillsWindow";
import ContactWindow from "./windows/ContactWindow";
import wallpaper from "@/assets/desktop-wallpaper.png";

interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const BASE_Z = 10;

const initialWindows: WindowState[] = [
  {
    id: "about",
    title: "About Me",
    icon: "👤",
    isOpen: true,
    isMinimized: false,
    zIndex: BASE_Z + 4,
    position: { x: 160, y: 48 },
    size: { width: 520, height: 480 },
  },
  {
    id: "projects",
    title: "Projects",
    icon: "📁",
    isOpen: false,
    isMinimized: false,
    zIndex: BASE_Z + 1,
    position: { x: 220, y: 70 },
    size: { width: 620, height: 480 },
  },
  {
    id: "experience",
    title: "Experience — Resume",
    icon: "📄",
    isOpen: false,
    isMinimized: false,
    zIndex: BASE_Z + 2,
    position: { x: 260, y: 80 },
    size: { width: 560, height: 500 },
  },
  {
    id: "skills",
    title: "System Preferences — Skills",
    icon: "⚙️",
    isOpen: false,
    isMinimized: false,
    zIndex: BASE_Z + 3,
    position: { x: 240, y: 60 },
    size: { width: 560, height: 420 },
  },
  {
    id: "contact",
    title: "Mail — Contact",
    icon: "✉️",
    isOpen: false,
    isMinimized: false,
    zIndex: BASE_Z,
    position: { x: 300, y: 90 },
    size: { width: 580, height: 440 },
  },
];

const desktopIcons = [
  { id: "about", label: "About Me", icon: "👤" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "experience", label: "Resume.pdf", icon: "📄" },
  { id: "skills", label: "Skills.app", icon: "⚙️" },
  { id: "contact", label: "Contact.mail", icon: "✉️" },
  { id: "trash", label: "Trash", icon: "🗑️" },
];

const windowContents: Record<string, React.ReactNode> = {
  about: <AboutWindow />,
  projects: <ProjectsWindow />,
  experience: <ExperienceWindow />,
  skills: <SkillsWindow />,
  contact: <ContactWindow />,
};

const Desktop: React.FC = () => {
  const [windows, setWindows] = useState<WindowState[]>(initialWindows);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [maxZ, setMaxZ] = useState(BASE_Z + 10);

  const bringToFront = useCallback((id: string) => {
    setMaxZ((z) => z + 1);
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1 } : w))
    );
  }, [maxZ]);

  const openWindow = useCallback((id: string) => {
    setMaxZ((z) => z + 1);
    setWindows((ws) =>
      ws.map((w) =>
        w.id === id
          ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZ + 1 }
          : w
      )
    );
  }, [maxZ]);

  const closeWindow = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)));
  }, []);

  const activeWindow = windows.find(
    (w) => w.isOpen && !w.isMinimized && w.zIndex === Math.max(...windows.filter((x) => x.isOpen && !x.isMinimized).map((x) => x.zIndex), 0)
  );

  const openWindowIds = windows.filter((w) => w.isOpen && !w.isMinimized).map((w) => w.id);

  const handleMenuAction = useCallback((menu: string, item: string) => {
    const idMap: Record<string, string> = {
      About: "about",
      Projects: "projects",
      Experience: "experience",
      Skills: "skills",
      Contact: "contact",
    };
    if (menu === "Go" && idMap[item]) {
      openWindow(idMap[item]);
    }
  }, [openWindow]);

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col select-none"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => setSelectedIcon(null)}
    >
      {/* Menu Bar */}
      <MenuBar
        activeWindow={activeWindow?.title ?? null}
        onMenuAction={handleMenuAction}
      />

      {/* Desktop area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Desktop icons – right column */}
        <div
          className="absolute top-4 right-4 flex flex-col gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          {desktopIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              label={icon.label}
              icon={icon.icon}
              isSelected={selectedIcon === icon.id}
              onClick={() => setSelectedIcon(icon.id)}
              onDoubleClick={() => {
                if (icon.id !== "trash") openWindow(icon.id);
              }}
            />
          ))}
        </div>

        {/* Windows */}
        <AnimatePresence>
          {windows.map((w) =>
            w.isOpen && !w.isMinimized ? (
              <Window
                key={w.id}
                id={w.id}
                title={w.title}
                icon={<span className="text-sm">{w.icon}</span>}
                initialPosition={w.position}
                initialSize={w.size}
                zIndex={w.zIndex}
                isMinimized={w.isMinimized}
                onClose={() => closeWindow(w.id)}
                onMinimize={() => minimizeWindow(w.id)}
                onFocus={() => bringToFront(w.id)}
              >
                {windowContents[w.id]}
              </Window>
            ) : null
          )}
        </AnimatePresence>

        {/* Minimized window badges */}
        <div className="absolute bottom-20 left-4 flex flex-col gap-2">
          {windows
            .filter((w) => w.isMinimized)
            .map((w) => (
              <motion.button
                key={w.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium"
                style={{
                  background: "rgba(245,245,247,0.82)",
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(255,255,255,0.5)",
                  fontFamily: "var(--font-body)",
                  color: "hsl(var(--mac-dark))",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                }}
                onClick={() => openWindow(w.id)}
              >
                <span>{w.icon}</span>
                <span>{w.title}</span>
              </motion.button>
            ))}
        </div>
      </div>

      {/* Dock */}
      <Dock openWindows={openWindowIds} onOpen={openWindow} />
    </div>
  );
};

export default Desktop;
