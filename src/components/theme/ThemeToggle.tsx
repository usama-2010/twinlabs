"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type Theme } from "@/components/theme/ThemeProvider";

const cycle: Theme[] = ["system", "light", "dark"];

const labels: Record<Theme, string> = {
  system: "Use system theme",
  light: "Use light theme",
  dark: "Use dark theme",
};

interface ThemeToggleProps {
  variant?: "dark" | "light";
}

export function ThemeToggle({ variant = "light" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  function handleToggle() {
    const index = cycle.indexOf(theme);
    const next = cycle[(index + 1) % cycle.length];
    setTheme(next);
  }

  const Icon =
    theme === "system" ? Monitor : theme === "light" ? Sun : Moon;

  const className =
    variant === "dark"
      ? "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:text-white"
      : "flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground";

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={className}
      aria-label={labels[theme]}
      title={labels[theme]}
      suppressHydrationWarning
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  );
}
