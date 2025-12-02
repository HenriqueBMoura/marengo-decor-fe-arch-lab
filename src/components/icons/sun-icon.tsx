"use client";

import type { SVGProps } from "react";
import { clsx } from "clsx";

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function SunIcon({ className, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      role="img"
      className={clsx("h-4 w-4", className)}
      {...props}
    >
      <circle cx="12" cy="12" r="3.4" className="fill-current" />
      <g
        className="stroke-current"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <line x1="12" y1="3" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="21" />
        <line x1="3" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="21" y2="12" />
        <line x1="5.4" y1="5.4" x2="7.3" y2="7.3" />
        <line x1="16.7" y1="16.7" x2="18.6" y2="18.6" />
        <line x1="5.4" y1="18.6" x2="7.3" y2="16.7" />
        <line x1="16.7" y1="7.3" x2="18.6" y2="5.4" />
      </g>
    </svg>
  );
}