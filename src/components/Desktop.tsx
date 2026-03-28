import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Window from "./Window";
import DesktopIcon from "./DesktopIcon";
import AboutWindow from "./windows/AboutWindow";
import ProjectsWindow from "./windows/ProjectsWindow";
import ExperienceWindow from "./windows/ExperienceWindow";
import EducationWindow from "./windows/EducationWindow";
import InitiativeImpactWindow from "./windows/InitiativeImpactWindow";
import SkillsWindow from "./windows/SkillsWindow";
import ContactWindow from "./windows/ContactWindow";
import TrashWindow from "./windows/TrashWindow";
import ResumeWindow from "./windows/ResumeWindow";
import DesktopAssistant, { AssistantLauncher } from "./DesktopAssistant";
import wallpaper from "@/assets/desktop-wallpaper.png";
import { useTheme } from "@/contexts/ThemeContext";
import { useIsMobile } from "@/hooks/useMediaQuery";

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

type TimelineJumpTarget = {
  windowId: "experience" | "education" | "initiative-impact";
  entryId: string;
};

const BASE_Z = 10;

function getDefaultWindowLayout(): WindowState[] {
  const w = typeof window !== "undefined" ? window.innerWidth : 900;
  const h = typeof window !== "undefined" ? window.innerHeight : 700;
  const winW = Math.round(w * 0.80);
  const winH = Math.round(h * 0.80);
  const winX = Math.max(0, Math.round((w - winW) / 2));
  /* Position above center so window is not blocked by the dock */
  const winY = Math.max(28, Math.round((h - winH) * 0.22));

  return [
    { id: "home", title: "Home", icon: "🏠", isOpen: true, isMinimized: false, zIndex: BASE_Z + 5, position: { x: winX, y: winY }, size: { width: winW, height: winH } },
    { id: "experience", title: "Experience", icon: "💼", isOpen: false, isMinimized: false, zIndex: BASE_Z + 2, position: { x: winX, y: winY }, size: { width: winW, height: winH } },
    { id: "resume", title: "Resume", icon: "📄", isOpen: false, isMinimized: false, zIndex: BASE_Z + 1, position: { x: winX, y: winY }, size: { width: winW, height: winH } },
    { id: "projects", title: "Projects", icon: "📁", isOpen: false, isMinimized: false, zIndex: BASE_Z + 1, position: { x: winX, y: winY }, size: { width: winW, height: winH } },
    { id: "initiative-impact", title: "Initiative & Impact", icon: "🌟", isOpen: false, isMinimized: false, zIndex: BASE_Z + 4, position: { x: winX, y: winY }, size: { width: winW, height: winH } },
    { id: "education", title: "Education", icon: "🎓", isOpen: false, isMinimized: false, zIndex: BASE_Z + 3, position: { x: winX, y: winY }, size: { width: winW, height: winH } },
    { id: "skills", title: "Skills", icon: "🧩", isOpen: false, isMinimized: false, zIndex: BASE_Z + 6, position: { x: winX, y: winY }, size: { width: winW, height: winH } },
    { id: "contact", title: "Contact", icon: "✉️", isOpen: false, isMinimized: false, zIndex: BASE_Z, position: { x: winX, y: winY }, size: { width: winW, height: winH } },
    { id: "trash", title: "Trash", icon: "🗑️", isOpen: false, isMinimized: false, zIndex: BASE_Z - 1, position: { x: winX, y: winY }, size: { width: 420, height: 320 } },
  ];
}

const initialWindows = getDefaultWindowLayout();

/** Briefcase icon for Experience window title bar */
const ExperienceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const desktopIcons = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "resume", label: "Resume", icon: "📄" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "initiative-impact", label: "Initiative & Impact", icon: "🌟" },
  { id: "education", label: "Education", icon: "🎓" },
  { id: "skills", label: "Skills", icon: "🧩" },
  { id: "contact", label: "Contact", icon: "✉️" },
  { id: "trash", label: "Trash", icon: "🗑️" },
];

const Desktop: React.FC = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const [windows, setWindows] = useState<WindowState[]>(initialWindows);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [maxZ, setMaxZ] = useState(BASE_Z + 10);
  const [lastOpenedFromDock, setLastOpenedFromDock] = useState<string | null>(null);
  const [justBooted, setJustBooted] = useState(true);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [timelineFocus, setTimelineFocus] = useState<{
    windowId: "experience" | "education" | "initiative-impact";
    entryId: string;
    token: number;
  } | null>(null);
  const [projectFocus, setProjectFocus] = useState<{ projectId: number; token: number } | null>(null);
  const [skillsFocus, setSkillsFocus] = useState<{ sectionId: string; token: number } | null>(null);

  const bringToFront = useCallback((id: string) => {
    setMaxZ((z) => z + 1);
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1 } : w))
    );
  }, [maxZ]);

  const openWindow = useCallback((id: string, fromDock = false) => {
    if (fromDock) {
      setLastOpenedFromDock(id);
      setTimeout(() => setLastOpenedFromDock(null), 700);
    }
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

  const handleTimelineNavigate = useCallback(
    (target: TimelineJumpTarget) => {
      openWindow(target.windowId);
      setTimelineFocus({
        windowId: target.windowId,
        entryId: target.entryId,
        token: Date.now(),
      });
    },
    [openWindow]
  );

  const windowContents: Record<string, React.ReactNode> = {
    projects: (
      <ProjectsWindow
        focusProjectId={projectFocus?.projectId ?? null}
        focusToken={projectFocus?.token}
      />
    ),
    experience: (
      <ExperienceWindow
        focusEntryId={timelineFocus?.windowId === "experience" ? timelineFocus.entryId : null}
        focusToken={timelineFocus?.windowId === "experience" ? timelineFocus.token : undefined}
      />
    ),
    education: (
      <EducationWindow
        focusEntryId={timelineFocus?.windowId === "education" ? timelineFocus.entryId : null}
        focusToken={timelineFocus?.windowId === "education" ? timelineFocus.token : undefined}
      />
    ),
    "initiative-impact": (
      <InitiativeImpactWindow
        focusEntryId={timelineFocus?.windowId === "initiative-impact" ? timelineFocus.entryId : null}
        focusToken={timelineFocus?.windowId === "initiative-impact" ? timelineFocus.token : undefined}
      />
    ),
    skills: (
      <SkillsWindow
        focusCategoryId={skillsFocus?.sectionId ?? null}
        focusToken={skillsFocus?.token}
      />
    ),
    contact: <ContactWindow />,
    resume: <ResumeWindow />,
    trash: <TrashWindow />,
  };

  // Assistant: Cmd+K / Ctrl+K — toggles open; when open, always closes (even from inputs)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key !== "k" && e.key !== "K") || (!e.metaKey && !e.ctrlKey)) return;
      const target = e.target as HTMLElement | null;
      e.preventDefault();
      setAssistantOpen((prev) => {
        if (prev) return false;
        const isInput = target && ["INPUT", "TEXTAREA"].includes(target.tagName);
        if (isInput) return false;
        return true;
      });
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  React.useEffect(() => {
    if (!justBooted) return;
    const t = setTimeout(() => setJustBooted(false), 600);
    return () => clearTimeout(t);
  }, [justBooted]);

  const isDark = theme === "dark";

  return (
    <motion.div
      className={`desktop-root relative w-full h-full overflow-hidden flex flex-col select-none ${isDark ? "desktop-dark-bg" : ""}`}
      style={isDark ? undefined : {
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={() => setSelectedIcon(null)}
      initial={justBooted ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay: justBooted ? 0.05 : 0 }}
    >
      {/* Menu bar must stack above the desktop/windows or dropdowns paint under windows and clicks never reach items */}
      <motion.div
        className="relative z-[100000]"
        initial={justBooted ? { opacity: 0, y: -4 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: justBooted ? 0.1 : 0 }}
      >
        <MenuBar activeWindow={activeWindow?.title ?? null} />
      </motion.div>

      <DesktopAssistant
        open={assistantOpen}
        onOpenChange={setAssistantOpen}
        onTarget={(target) => {
          if (target.type === "timeline") {
            handleTimelineNavigate({
              windowId: target.windowId,
              entryId: target.entryId,
            });
            return;
          }
          if (target.type === "project") {
            openWindow("projects");
            setProjectFocus({ projectId: target.projectId, token: Date.now() });
            return;
          }
          if (target.type === "skills-section") {
            openWindow("skills");
            setSkillsFocus({ sectionId: target.sectionId, token: Date.now() });
            return;
          }
          if (target.type === "window") {
            openWindow(target.id);
          } else if (target.type === "external") {
            window.open(target.url, "_blank", "noopener,noreferrer");
          } else if (target.type === "action") {
            if (target.action === "downloadResume") {
              const link = document.createElement("a");
              link.href = "/resume.pdf";
              link.download = "resume.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else if (target.action === "copyEmail") {
              const email = "roncy.bhatia@gmail.com";
              navigator.clipboard.writeText(email).catch(() => {
                // ignore failure
              });
            }
          }
        }}
      />

      {/* Desktop area */}
      <motion.div
        className="flex-1 relative overflow-hidden"
        initial={justBooted ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, delay: justBooted ? 0.15 : 0 }}
      >
        {/* Desktop icons – hidden on small screens (dock + search cover navigation) */}
        <div
          className="absolute top-4 right-4 hidden flex-col gap-1 md:flex"
          onClick={(e) => e.stopPropagation()}
        >
          {desktopIcons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              label={icon.label}
              icon={"icon" in icon ? icon.icon : undefined}
              imageLight={"imageLight" in icon ? icon.imageLight : undefined}
              imageDark={"imageDark" in icon ? icon.imageDark : undefined}
              externalUrl={"externalUrl" in icon ? icon.externalUrl : undefined}
              isDark={theme === "dark"}
              isSelected={selectedIcon === icon.id}
              onClick={() => setSelectedIcon(icon.id)}
              onDoubleClick={
                "externalUrl" in icon
                  ? undefined
                  : () => {
                      if (icon.id === "trash") {
                        openWindow("trash");
                        return;
                      }
                      openWindow(icon.id);
                    }
              }
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
                icon={
                  w.id === "experience" ? (
                    <ExperienceIcon className="text-sm opacity-90" />
                  ) : (
                    <span className="text-sm">{w.icon}</span>
                  )
                }
                initialPosition={w.position}
                initialSize={w.size}
                zIndex={w.zIndex}
                isMinimized={w.isMinimized}
                isFocused={activeWindow?.id === w.id}
                isMobile={isMobile}
                onClose={() => closeWindow(w.id)}
                onMinimize={() => minimizeWindow(w.id)}
                onFocus={() => bringToFront(w.id)}
              >
                {w.id === "home" ? (
                  <AboutWindow
                    onOpenResume={() => openWindow("resume")}
                    onTimelineNavigate={handleTimelineNavigate}
                  />
                ) : (
                  windowContents[w.id]
                )}
              </Window>
            ) : null
          )}
        </AnimatePresence>

        {/* Minimized window badges — top strip on mobile so dock stays usable */}
        <div
          className={`absolute z-[40] flex gap-2 ${
            isMobile
              ? "left-2 right-2 top-[calc(44px+env(safe-area-inset-top,0px))] flex-row flex-wrap justify-center"
              : "bottom-20 left-4 flex-col"
          }`}
        >
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
                <span className="text-base">{w.icon}</span>
                <span>{w.title}</span>
              </motion.button>
            ))}
        </div>
      </motion.div>

      {/* Dock */}
      <motion.div
        initial={justBooted ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: justBooted ? 0.2 : 0 }}
      >
        <Dock
          openWindows={openWindowIds}
          activeWindowId={activeWindow?.id ?? null}
          lastOpenedFromDock={lastOpenedFromDock}
          onOpen={(id) => openWindow(id, true)}
          isMobile={isMobile}
          leading={
            !assistantOpen ? (
              <AssistantLauncher onOpen={() => setAssistantOpen(true)} />
            ) : undefined
          }
        />
      </motion.div>
    </motion.div>
  );
};

export default Desktop;
