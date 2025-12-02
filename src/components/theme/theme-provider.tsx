"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Reads the initial theme without causing effect-driven setState.
// On the server, we fall back to "light".
function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem("theme") as Theme | null;
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeState, setThemeState] = useState<Theme>(() => getInitialTheme());

  // Sync current theme with the <html> element and localStorage.
  useEffect(() => {
    const root = document.documentElement;

    if (themeState === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    window.localStorage.setItem("theme", themeState);
  }, [themeState]);

  const toggleTheme = () => {
    setThemeState((current) => (current === "light" ? "dark" : "light"));
  };

  const setTheme = (value: Theme) => {
    setThemeState(value);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: themeState,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return ctx;
}