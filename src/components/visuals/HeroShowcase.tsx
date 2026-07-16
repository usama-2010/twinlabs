"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { getFeaturedCaseStudies } from "@/lib/content/case-studies";
import { motionTokens } from "@/lib/motion";

const INTERVAL = 5000;

export function HeroShowcase() {
  const studies = getFeaturedCaseStudies();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = useCallback(() => {
    setActive((i) => (i + 1) % studies.length);
  }, [studies.length]);

  useEffect(() => {
    if (reduce || paused || studies.length <= 1) return;
    const timer = setInterval(goNext, INTERVAL);
    return () => clearInterval(timer);
  }, [reduce, paused, goNext, studies.length]);

  const current = studies[active];
  const secondary = studies[(active + 1) % studies.length];

  return (
    <div
      className="hero-showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="hero-showcase-glow"
        aria-hidden="true"
        animate={reduce ? undefined : { opacity: [0.5, 0.85, 0.5], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="hero-showcase-card hero-showcase-card-back"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        {secondary ? (
          <Image
            src={secondary.image}
            alt=""
            fill
            sizes="280px"
            className="object-cover"
            style={{ objectPosition: secondary.imagePosition ?? "50% 50%" }}
          />
        ) : null}
      </motion.div>

      <motion.div
        className="hero-showcase-card hero-showcase-card-main"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={
          reduce
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: [0, -6, 0] }
        }
        transition={
          reduce
            ? { duration: 0.9, ease: motionTokens.ease.silk }
            : { y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.9 } }
        }
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current?.slug}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.65, ease: motionTokens.ease.silk }}
          >
            {current ? (
              <Image
                src={current.image}
                alt={current.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 480px"
                className="object-cover"
                style={{ objectPosition: current.imagePosition ?? "50% 50%" }}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>

        {current ? (
          <div className="hero-showcase-caption">
            <p className="text-xs font-semibold tracking-wide text-teal-800 uppercase">
              {current.industry}
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">{current.title}</p>
          </div>
        ) : null}
      </motion.div>

      <div className="hero-showcase-dots" role="tablist" aria-label="Featured work">
        {studies.map((study, i) => (
          <button
            key={study.slug}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Show ${study.client}`}
            className={`hero-showcase-dot ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
