"use client";

import type { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl bg-surface shadow-soft border border-border",
        "p-6 md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}