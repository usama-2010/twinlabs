"use client";

import { stats, statsSection } from "@/lib/content/stats";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StaggerReveal, staggerItem } from "@/components/ui/StaggerReveal";
import { CountUp } from "@/components/ui/CountUp";
import { motion } from "framer-motion";

export function StatsStrip() {
  return (
    <section className="alt-band py-16 sm:py-20 md:py-24">
      <div className="container-main">
        <SectionHeader
          title={statsSection.eyebrow}
          subtitle={statsSection.tagline}
          align="center"
        />

        <StaggerReveal
          className="mt-14 grid grid-cols-2 gap-6 sm:gap-10 md:grid-cols-4 md:gap-8"
          stagger={0.1}
          delay={0.05}
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem} className="text-center">
              <p className="stat-value">
                <CountUp value={stat.value} />
              </p>
              <p className="mono-label mt-3">{stat.label}</p>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
