"use client";

import { TwinLabsMarkLoader } from "@/components/outreach/TwinLabsMarkLoader";

type OutreachLoaderProps = {
  label?: string;
  size?: "sm" | "md" | "lg";
  variant?: "inline" | "overlay" | "card";
  className?: string;
};

const sizePixels = {
  sm: 80,
  md: 120,
  lg: 200,
} as const;

export function OutreachLoader({
  label,
  size = "md",
  variant = "inline",
  className = "",
}: OutreachLoaderProps) {
  const dimension = sizePixels[size];

  const content = (
    <div
      className={`outreach-loader ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <TwinLabsMarkLoader size={dimension} />

      {label ? <p className="outreach-loader-label">{label}</p> : null}
      <span className="sr-only">{label ?? "Loading"}</span>
    </div>
  );

  if (variant === "overlay") {
    return <div className="outreach-loader-overlay">{content}</div>;
  }

  if (variant === "card") {
    return <div className="outreach-loader-card">{content}</div>;
  }

  return content;
}
