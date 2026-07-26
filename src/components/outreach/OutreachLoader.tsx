"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import infinityLoaderAnimation from "@/assets/lottie/infinity-loader.json";

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
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const content = (
    <div
      className={`outreach-loader ${className}`.trim()}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="outreach-loader-lottie"
        style={{ width: dimension, height: dimension }}
        aria-hidden="true"
      >
        <Lottie
          animationData={infinityLoaderAnimation}
          loop={!reduceMotion}
          autoplay={!reduceMotion}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {label ? <p className="outreach-loader-label">{label}</p> : null}
      <span className="sr-only">{label ?? "Loading"}</span>
    </div>
  );

  if (variant === "overlay") {
    return (
      <div className="outreach-loader-overlay">
        <div className="outreach-loader-panel">{content}</div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="outreach-card flex min-h-[12rem] items-center justify-center p-8">
        {content}
      </div>
    );
  }

  return content;
}
