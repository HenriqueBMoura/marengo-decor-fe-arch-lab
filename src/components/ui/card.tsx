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
        "rounded-lg border border-neutral-200 bg-white p-4 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}