"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { motionTokens } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: motionTokens.viewport.once, margin: motionTokens.viewport.margin }}
      transition={{ duration: motionTokens.duration.slow, delay, ease: motionTokens.ease.smooth }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
