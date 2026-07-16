"use client";

import { useState, useEffect, useCallback, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  caseStudies,
  caseStudiesSection,
  getFeaturedCaseStudies,
} from "@/lib/content/case-studies";
import { CaseStudyImage } from "@/components/ui/CaseStudyImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { motionTokens } from "@/lib/motion";

const SLIDE_DURATION = motionTokens.carousel.slideDuration;

export function CaseStudies() {
  const studies = getFeaturedCaseStudies();
  const [active, setActive] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const current = studies[active];

  const goTo = useCallback((index: number) => {
    setActive((index + studies.length) % studies.length);
    setProgressKey((k) => k + 1);
  }, [studies.length]);

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (reduce || paused) return;
    const timer = setInterval(goNext, SLIDE_DURATION * 1000);
    return () => clearInterval(timer);
  }, [goNext, reduce, paused]);

  return (
    <section
      id="work"
      className="surface-band py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-main">
        <SectionHeader
          eyebrow={caseStudiesSection.eyebrow}
          title="Success stories"
          titleEm="not slide decks."
          subtitle={caseStudiesSection.subtitle}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <Reveal>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-seafoam-100 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current?.slug}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: motionTokens.ease.silk }}
                  className="absolute inset-0"
                >
                  {current ? (
                    <CaseStudyImage
                      study={current}
                      sizes="(max-width: 1024px) 100vw, 560px"
                      priority
                    />
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>

          <div>
            <ul>
              {studies.map((study, i) => {
                const isActive = i === active;
                return (
                  <li key={study.slug}>
                    <button
                      type="button"
                      className="case-tab w-full text-left"
                      data-active={isActive}
                      onClick={() => goTo(i)}
                    >
                      <h3 className="text-base font-medium md:text-lg">
                        {study.client} — {study.title}
                      </h3>
                      <div className="progress-bar mt-3">
                        <div
                          key={isActive ? progressKey : `idle-${i}`}
                          className={`progress-bar-fill ${isActive && !reduce && !paused ? "is-running" : ""}`}
                          style={
                            isActive && !reduce && !paused
                              ? ({ "--slide-duration": `${SLIDE_DURATION}s` } as CSSProperties)
                              : { width: isActive ? "100%" : "0%" }
                          }
                        />
                      </div>
                      {isActive ? (
                        <Link
                          href={`/work/${study.slug}`}
                          className="link-arrow mt-4 inline-flex items-center gap-1.5"
                        >
                          Read case study
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-teal-800 hover:text-teal-800"
                aria-label="Previous case study"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-teal-800 hover:text-teal-800"
                aria-label="Next case study"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <Reveal className="mt-12 text-center">
          <Link href="/work" className="btn-outline group inline-flex items-center gap-1.5">
            See all {caseStudies.length} case studies
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>

        <Reveal className="mt-16">
          <p className="mono-label text-center">All selected work</p>
          <div className="work-showcase-grid mt-8">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="work-showcase-card group"
              >
                <div className="work-showcase-thumb">
                  <CaseStudyImage
                    study={study}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="work-showcase-body">
                  <p className="mono-label">{study.industry}</p>
                  <h3 className="mt-2 text-base font-semibold tracking-tight">
                    {study.client}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{study.title}</p>
                  <span className="link-arrow mt-4 inline-flex items-center gap-1 text-xs">
                    Read case study
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
