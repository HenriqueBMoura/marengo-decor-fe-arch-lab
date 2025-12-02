"use client";

import type { InputHTMLAttributes } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label && (
        <span className="font-medium text-text-primary">{label}</span>
      )}
      <input
        className={clsx(
          // Base
          "rounded-md border border-border bg-surface-soft px-3 py-2 text-sm text-text-primary",
          "outline-none transition",
          // Placeholder + disabled + focus states rely on design tokens
          "placeholder:text-text-muted",
          "focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...props}
      />
    </label>
  );
}