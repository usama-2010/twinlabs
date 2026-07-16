"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";
import { motionTokens } from "@/lib/motion";

interface StaggerMountProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function StaggerMount({
  children,
  className,
  stagger = motionTokens.stagger.base,
  delay = motionTokens.hero.mountDelay,
}: StaggerMountProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const mountItem = {
  hidden: {
    opacity: 0,
    y: motionTokens.hero.y,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.duration.hero, ease: motionTokens.ease.out },
  },
};
