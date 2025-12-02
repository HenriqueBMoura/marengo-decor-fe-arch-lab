"use client";

import { clsx } from "clsx";
import { useTheme } from "./theme-provider";
import { SunIcon } from "@/components/icons/sun-icon";
import { MoonIcon } from "@/components/icons/moon-icon";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === "light";
  const isDark = theme === "dark";

  return (
    <div
      className="relative inline-flex h-9 w-28 items-center overflow-hidden rounded-full border border-border bg-surface-soft/90 text-xs text-text-muted shadow-sm backdrop-blur"
      aria-label="Toggle color theme"
    >
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-y-1 w-1/2 rounded-full bg-surface shadow-md transition-all duration-200 ease-out",
          isLight ? "left-1" : "left-1/2"
        )}
      />

      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Use light theme"
        className={clsx(
          "relative z-10 flex basis-1/2 items-center justify-center rounded-full px-2 py-1 transition-colors duration-150",
          isLight
            ? "text-brand"
            : "text-text-muted hover:text-text-primary"
        )}
      >
        <SunIcon />
      </button>

      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Use dark theme"
        className={clsx(
          "relative z-10 flex basis-1/2 items-center justify-center rounded-full px-2 py-1 transition-colors duration-150",
          isDark
            ? "text-brand"
            : "text-text-muted hover:text-text-primary"
        )}
      >
        <MoonIcon />
      </button>
    </div>
  );
}