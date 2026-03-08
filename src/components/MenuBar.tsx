import React, { useState, useEffect } from "react";

interface MenuBarProps {
  activeWindow: string | null;
  onMenuAction?: (menu: string, item: string) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ activeWindow, onMenuAction }) => {
  const [time, setTime] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

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

  const menus = [
    {
      label: "🍎",
      items: ["About This Portfolio", "---", "Preferences…", "---", "Sleep", "Restart…"],
    },
    {
      label: "File",
      items: ["New Window", "Open…", "Close Window", "---", "Save", "Print…"],
    },
    {
      label: "Edit",
      items: ["Undo", "Redo", "---", "Cut", "Copy", "Paste"],
    },
    {
      label: "View",
      items: ["as Icons", "as List", "as Columns", "---", "Show Toolbar", "Hide Status Bar"],
    },
    {
      label: "Go",
      items: ["About", "Projects", "Experience", "Skills", "Contact", "---", "Home Folder"],
    },
    {
      label: "Window",
      items: ["Minimize", "Zoom", "---", "Bring All to Front"],
    },
    {
      label: "Help",
      items: ["Search…", "---", "Portfolio Help", "Contact Developer"],
    },
  ];

  return (
    <div className="mac-menubar select-none" onMouseLeave={() => setOpenMenu(null)}>
      {menus.map((menu) => (
        <div
          key={menu.label}
          className="relative"
          onMouseEnter={() => openMenu && setOpenMenu(menu.label)}
        >
          <button
            className="mac-menubar-item"
            onMouseDown={() => setOpenMenu(openMenu === menu.label ? null : menu.label)}
          >
            {menu.label}
          </button>

          {openMenu === menu.label && (
            <div
              className="absolute top-full left-0 glass-panel rounded shadow-xl border border-white/40 py-1 min-w-[180px] z-[200]"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.22)" }}
            >
              {menu.items.map((item, i) =>
                item === "---" ? (
                  <div key={i} className="my-1 mx-2 border-t border-gray-300/60" />
                ) : (
                  <button
                    key={item}
                    className="w-full text-left px-4 py-1 text-xs font-medium hover:bg-blue-500 hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-body)" }}
                    onClick={() => {
                      onMenuAction?.(menu.label, item);
                      setOpenMenu(null);
                    }}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      ))}

      {/* Right side: clock & status */}
      <div className="ml-auto flex items-center gap-3 pr-2">
        <span className="text-xs font-medium opacity-60" style={{ fontFamily: "var(--font-mono)" }}>
          {activeWindow || "Finder"}
        </span>
        <div className="w-px h-3 bg-current opacity-20" />
        <span
          className="text-xs font-semibold tabular-nums"
          style={{ fontFamily: "var(--font-body)", minWidth: "65px", textAlign: "right" }}
        >
          {time}
        </span>
      </div>
    </div>
  );
};

export default MenuBar;
