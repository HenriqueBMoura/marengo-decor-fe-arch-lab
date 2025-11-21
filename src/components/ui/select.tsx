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
      {label && <span className="font-medium text-neutral-800">{label}</span>}
      <select
        className={clsx(
          "rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}