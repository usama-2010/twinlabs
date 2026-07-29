"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  growthPathSection,
  growthSteps,
} from "@/lib/content/growth-path";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { StaggerReveal, staggerItem } from "@/components/ui/StaggerReveal";

export function GrowthPath() {
  return (
    <section id="growth" className="alt-band py-16 sm:py-20 md:py-28">
      <div className="container-main">
        <SectionHeader
          eyebrow={growthPathSection.eyebrow}
          title={growthPathSection.title}
          titleEm={growthPathSection.titleEm}
          subtitle={growthPathSection.subtitle}
          align="center"
        />

        <StaggerReveal
          className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:gap-8"
          stagger={0.08}
        >
          {growthSteps.map((step) => (
            <motion.article
              key={step.number}
              variants={staggerItem}
              className="growth-step-card group"
            >
              <p className="text-sm font-medium text-accent">{step.number}</p>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted italic">
                {step.pain}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
              <p className="mt-4 border-t border-border pt-4 text-sm font-medium leading-relaxed text-teal-800">
                {step.outcome}
              </p>
            </motion.article>
          ))}
        </StaggerReveal>

        <Reveal className="mx-auto mt-14 max-w-2xl text-center">
          <p className="text-base leading-relaxed text-muted">
            {growthPathSection.footnote}
          </p>
          <Link
            href="/#contact"
            className="link-arrow mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
          >
            Tell us where you&apos;re stuck
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
