"use client";

import { useEffect } from "react";

/** Site is light-only. This component resets any saved dark/system preference. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.style.colorScheme = "light";
    try {
      localStorage.setItem("theme", "light");
    } catch {
      /* ignore */
    }
  }, []);

  return children;
}
