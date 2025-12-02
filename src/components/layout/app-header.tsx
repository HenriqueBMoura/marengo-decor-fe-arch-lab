"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";

export function AppHeader() {
  return (
    <header className="flex items-center justify-between py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
        Marengo Decor · Frontend Architecture
      </p>
      <ThemeToggle />
    </header>
  );
}