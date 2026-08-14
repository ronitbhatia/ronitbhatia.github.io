import React, { createContext, useContext, useEffect, useState } from "react";

export type ResolvedTheme = "light" | "dark";
export type ThemePreference = "system" | ResolvedTheme;

interface ThemeContextType {
  /** User preference: system, light, or dark */
  preference: ThemePreference;
  /** Theme actually applied to the document */
  theme: ResolvedTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio-theme-preference";
const LEGACY_STORAGE_KEY = "portfolio-theme";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStoredPreference(): ThemePreference {
  if (typeof window === "undefined") return "system";

  const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
  if (stored === "system" || stored === "light" || stored === "dark") return stored;

  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY) as ResolvedTheme | null;
  if (legacy === "light" || legacy === "dark") return legacy;

  return "system";
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === "system" ? getSystemTheme() : preference;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preference, setPreference] = useState<ThemePreference>(readStoredPreference);
  const [theme, setTheme] = useState<ResolvedTheme>(() => resolveTheme(readStoredPreference()));

  useEffect(() => {
    const resolved = resolveTheme(preference);
    setTheme(resolved);

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolved);
    localStorage.setItem(STORAGE_KEY, preference);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  }, [preference]);

  useEffect(() => {
    if (preference !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const resolved = getSystemTheme();
      setTheme(resolved);
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(resolved);
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [preference]);

  const toggleTheme = () => {
    setPreference((prev) => {
      const current = resolveTheme(prev);
      return current === "light" ? "dark" : "light";
    });
  };

  return (
    <ThemeContext.Provider value={{ preference, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
