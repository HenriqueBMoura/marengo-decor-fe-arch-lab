"use client";

import type { SVGProps } from "react";
import { clsx } from "clsx";

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function MoonIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      role="img"
      className={clsx("h-4 w-4", className)}
      {...props}
    >
      <path
        className="fill-current"
        d="M19.5 13.1A7.5 7.5 0 0 1 10.9 4.5 5.7 5.7 0 1 0 19.5 13.1z"
      />
      <circle
        cx="17.5"
        cy="7"
        r="1.3"
        className="fill-current opacity-70"
      />
    </svg>
  );
}