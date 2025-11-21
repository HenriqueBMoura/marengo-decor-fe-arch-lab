"use client";

import type { InputHTMLAttributes } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label && <span className="font-medium text-neutral-800">{label}</span>}
      <input
        className={clsx(
          "rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black",
          className
        )}
        {...props}
      />
    </label>
  );
}