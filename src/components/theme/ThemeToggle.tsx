"use client";

import { Sun } from "lucide-react";

/** Light-only site — theme toggle disabled. */
export function ThemeToggle() {
  return (
    <span
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted"
      aria-hidden="true"
      title="Light theme"
    >
      <Sun className="h-3.5 w-3.5" />
    </span>
  );
}
