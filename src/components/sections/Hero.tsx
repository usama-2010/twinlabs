"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/content/site";
import { motionTokens } from "@/lib/motion";
import { VanishingText } from "@/components/ui/VanishingText";
import { HeroOutcomeMarquee } from "@/components/visuals/HeroOutcomeMarquee";

const silk = motionTokens.ease.silk;

const line = {
  hidden: { opacity: 0, y: 48 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: silk, delay: 0.1 + i * 0.12 },
  }),
};

/** Longest cycling headline — reserves space so the hero never jumps. */
const cycleReserveText =
  hero.headlineEmCycle.reduce(
    (longest, phrase) => (phrase.length > longest.length ? phrase : longest),
    ""
  ) || hero.headlineEm;

export function Hero() {
  const reduce = useReducedMotion();
  const stackLines = ["Scoped upfront.", "Fixed quotes.", "You own the code."];

  return (
    <section className="hero-enso relative flex min-h-svh flex-col justify-between overflow-hidden">
      <div className="container-main relative z-10 pt-28 md:pt-32 lg:pt-36">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: silk }}
          className="enso-hero-eyebrow max-w-xl"
        >
          {hero.eyebrow}
        </motion.p>

        <div className="mt-8 md:mt-10">
          <motion.h1
            custom={0}
            initial={reduce ? false : "hidden"}
            animate="show"
            variants={line}
            className="enso-hero-display"
          >
            {hero.headline}
          </motion.h1>
          <motion.h1
            custom={1}
            initial={reduce ? false : "hidden"}
            animate="show"
            variants={line}
            className="enso-hero-display enso-hero-display-muted enso-hero-cycle-line"
          >
            <span aria-hidden className="enso-hero-cycle-reserve">
              {cycleReserveText}
            </span>
            <span className="enso-hero-cycle-active">
              <VanishingText phrases={hero.headlineEmCycle} />
            </span>
          </motion.h1>
        </div>

        <div className="mt-10 space-y-1 md:mt-12">
          {stackLines.map((text, i) => (
            <motion.p
              key={text}
              initial={reduce ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: silk, delay: 0.35 + i * 0.08 }}
              className="enso-hero-stack-line"
            >
              {text}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: silk, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-4 md:mt-12"
        >
          <a href={hero.primaryCta.href} className="btn-primary group">
            {hero.primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a href={hero.secondaryCta.href} className="enso-hero-cta-secondary">
            {hero.secondaryCta.label}
          </a>
        </motion.div>
      </div>

      <HeroOutcomeMarquee />
    </section>
  );
}
