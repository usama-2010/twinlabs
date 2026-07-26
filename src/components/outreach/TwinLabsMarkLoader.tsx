"use client";

import { useEffect, useState } from "react";

type TwinLabsMarkLoaderProps = {
  size?: number;
  className?: string;
};

// Angular infinity mark traced from the TwinLabs logo — sharp corners + NE arrow.
const MARK_PATH =
  "M 24 70 L 5 50 L 24 30 L 50 50 L 76 30 L 91 11 L 95 50 L 76 70 L 50 50 L 24 70";

export function TwinLabsMarkLoader({
  size = 120,
  className = "",
}: TwinLabsMarkLoaderProps) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`outreach-mark-loader ${className}`.trim()}
      aria-hidden="true"
    >
      <path
        d={MARK_PATH}
        pathLength={100}
        className={
          reduceMotion
            ? "outreach-mark-loader-path is-static"
            : "outreach-mark-loader-path"
        }
      />
    </svg>
  );
}
