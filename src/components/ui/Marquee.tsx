"use client";

import { type ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
};

export function Marquee({ children, speed = 35, className = "" }: MarqueeProps) {
  return (
    <div className={`marquee-root overflow-hidden ${className}`}>
      <div
        className="marquee-track flex w-max items-center gap-12"
        style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
      >
        <div className="marquee-group flex shrink-0 items-center gap-12 pr-12">{children}</div>
        <div className="marquee-group flex shrink-0 items-center gap-12 pr-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
