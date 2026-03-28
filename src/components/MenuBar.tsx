import React, { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface MenuBarProps {
  /** Title of the frontmost open window (from Desktop). */
  activeWindow: string | null;
}

const MenuBar: React.FC<MenuBarProps> = ({ activeWindow }) => {
  const { theme, toggleTheme } = useTheme();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mac-menubar select-none">
      <span
        className={`text-xs font-medium px-2 min-w-0 flex-1 truncate ${activeWindow ? "mac-menubar-active-window" : ""}`}
        style={{ fontFamily: "var(--font-mono)" }}
        title={activeWindow ?? undefined}
        aria-live="polite"
      >
        {activeWindow ?? "Desktop"}
      </span>

      <div className="ml-auto flex items-center gap-3 pr-2 flex-shrink-0">
        <button
          type="button"
          onClick={toggleTheme}
          className="mac-menubar-item flex items-center justify-center w-7 h-7 rounded-md p-0"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
        <div className="w-px h-3 bg-current opacity-30" />
        <span
          className="mac-menubar-status text-xs font-semibold tabular-nums"
          style={{ fontFamily: "var(--font-body)", minWidth: "65px", textAlign: "right" }}
        >
          {time}
        </span>
      </div>
    </div>
  );
};

export default MenuBar;
