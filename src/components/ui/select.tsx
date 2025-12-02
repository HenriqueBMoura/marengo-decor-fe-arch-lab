"use client";

import type { SelectHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: ReactNode;
}

export function Select({ label, children, className, ...props }: SelectProps) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label && (
        <span className="font-medium text-text-primary">{label}</span>
      )}
      <select
        className={clsx(
          "rounded-md border border-border bg-surface-soft px-3 py-2 text-sm text-text-primary",
          "outline-none transition",
          "focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}