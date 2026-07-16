"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ctaBand } from "@/lib/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { motionTokens } from "@/lib/motion";

export function CtaBand() {
  const reduce = useReducedMotion();

  return (
    <section className="dark-cta-band py-24 md:py-32">
      <div className="container-main relative z-10 max-w-3xl text-center">
        <Reveal>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: motionTokens.ease.silk }}
            className="headline-gradient"
          >
            {ctaBand.title}
            <br />
            <span className="font-display italic font-normal">{ctaBand.titleEm}</span>
          </motion.h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70">
            {ctaBand.subtext}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={ctaBand.primary.href} className="btn-primary-on-dark group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium">
              {ctaBand.primary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={ctaBand.secondary.href} className="text-sm font-medium text-white/75 transition-colors hover:text-white">
              {ctaBand.secondary.label}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
