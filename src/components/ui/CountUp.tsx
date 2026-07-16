"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type CountUpProps = {
  value: string;
  duration?: number;
  className?: string;
};

type ParsedValue = {
  prefix: string;
  num: number;
  suffix: string;
  decimals: number;
};

function parseNumeric(value: string): ParsedValue | null {
  const match = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;

  const numStr = match[2];
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;

  return {
    prefix: match[1],
    num: parseFloat(numStr),
    suffix: match[3],
    decimals,
  };
}

function shouldAnimate(value: string): boolean {
  if (/[%+]/.test(value)) return true;
  if (/^\d+(?:\.\d+)?$/.test(value)) return true;
  return false;
}

export function CountUp({ value, duration = 1.4, className }: CountUpProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = useMemo(() => parseNumeric(value), [value]);
  const canAnimate = parsed !== null && shouldAnimate(value);
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    setDisplay(value);
    hasAnimated.current = false;
  }, [value]);

  useEffect(() => {
    if (reduce || !canAnimate || !parsed || !ref.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / (duration * 1000), 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = parsed.num * eased;
          const formatted =
            parsed.decimals > 0
              ? current.toFixed(parsed.decimals)
              : String(Math.round(current));
          setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reduce, canAnimate, parsed, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
