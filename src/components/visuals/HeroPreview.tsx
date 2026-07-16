"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getFeaturedCaseStudies } from "@/lib/content/case-studies";
import { motionTokens } from "@/lib/motion";

const INTERVAL = 7000;
const silk = motionTokens.ease.silk;

export function HeroPreview() {
  const studies = getFeaturedCaseStudies();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), {
    stiffness: 140,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), {
    stiffness: 140,
    damping: 24,
  });

  const goTo = useCallback(
    (index: number) => {
      setActive((index + studies.length) % studies.length);
    },
    [studies.length]
  );

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);

  useEffect(() => {
    if (reduce || paused || studies.length <= 1) return;
    const timer = setInterval(goNext, INTERVAL);
    return () => clearInterval(timer);
  }, [reduce, paused, goNext, studies.length, active]);

  const current = studies[active];

  function onPointerMove(e: React.PointerEvent) {
    if (reduce || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      className="hero-preview"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        onPointerLeave();
      }}
      onPointerMove={onPointerMove}
    >
      <div className="hero-preview-ambient" aria-hidden="true">
        <div className="hero-preview-orb hero-preview-orb-a" />
        <div className="hero-preview-orb hero-preview-orb-b" />
      </div>

      <motion.div
        ref={frameRef}
        className="hero-preview-frame"
        style={
          reduce
            ? undefined
            : { rotateX, rotateY, transformPerspective: 1200 }
        }
        initial={reduce ? false : { opacity: 0, y: 36, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: silk, delay: 0.12 }}
      >
        <div className="hero-preview-chrome">
          <div className="hero-preview-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="hero-preview-url">twinlabs.co.uk / work</div>
        </div>

        <div className="hero-preview-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.slug}
              className="hero-preview-slide absolute inset-0"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: silk }}
            >
              {current ? (
                <motion.div
                  className="absolute inset-0"
                  initial={reduce ? false : { scale: 1 }}
                  animate={{ scale: reduce ? 1 : 1.06 }}
                  transition={{
                    duration: INTERVAL / 1000,
                    ease: "linear",
                  }}
                >
                  <Image
                    src={current.image}
                    alt={current.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 768px) 92vw, 520px"
                    className="object-cover"
                    style={{
                      objectPosition: current.imagePosition ?? "50% 50%",
                    }}
                  />
                </motion.div>
              ) : null}
              <div className="hero-preview-shade" aria-hidden="true" />
            </motion.div>
          </AnimatePresence>

          {current ? (
            <motion.div
              key={`meta-${current.slug}`}
              className="hero-preview-meta"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: silk, delay: 0.15 }}
            >
              <p className="hero-preview-meta-label">{current.industry}</p>
              <p className="hero-preview-meta-title">{current.title}</p>
              <Link href={`/work/${current.slug}`} className="hero-preview-meta-link">
                View project
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ) : null}
        </div>

        <div className="hero-preview-progress" aria-hidden="true">
          <span
            key={`progress-${active}`}
            className={`hero-preview-progress-fill ${paused ? "is-paused" : "is-running"}`}
            style={{ "--progress-duration": `${INTERVAL}ms` } as CSSProperties}
          />
        </div>
      </motion.div>

      <div className="hero-preview-tabs" role="tablist" aria-label="Featured work">
        {studies.map((study, i) => (
          <button
            key={study.slug}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={study.client}
            className={`hero-preview-tab ${i === active ? "is-active" : ""}`}
            onClick={() => goTo(i)}
          >
            <span className="hero-preview-tab-name">{study.client}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
