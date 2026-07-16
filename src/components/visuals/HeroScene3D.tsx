"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getFeaturedCaseStudies } from "@/lib/content/case-studies";
import { motionTokens } from "@/lib/motion";

const silk = motionTokens.ease.silk;

const PANEL_LAYOUT = [
  { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0, scale: 1 },
  { x: -118, y: 24, z: -90, rotateX: 6, rotateY: 28, scale: 0.88 },
  { x: 124, y: 18, z: -70, rotateX: 4, rotateY: -26, scale: 0.9 },
  { x: 0, y: -36, z: -110, rotateX: -12, rotateY: 0, scale: 0.82 },
] as const;

export function HeroScene3D() {
  const studies = getFeaturedCaseStudies();
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), {
    stiffness: 90,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 90,
    damping: 22,
  });

  useEffect(() => {
    if (reduce || studies.length <= 1) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % studies.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [reduce, studies.length]);

  function onPointerMove(e: React.PointerEvent) {
    if (reduce || !rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  const ordered = studies.map((_, i) => studies[(active + i) % studies.length]);

  return (
    <div
      ref={rootRef}
      className="hero-scene"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="hero-scene-ambient" aria-hidden="true">
        <div className="hero-scene-orb hero-scene-orb-a" />
        <div className="hero-scene-orb hero-scene-orb-b" />
        <div className="hero-scene-grid" />
      </div>

      <motion.div
        className="hero-scene-stage"
        style={
          reduce
            ? undefined
            : { rotateX, rotateY, transformPerspective: 1400 }
        }
        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: silk, delay: 0.2 }}
      >
        <motion.div
          className="hero-scene-orbit"
          animate={reduce ? undefined : { rotateY: [0, 6, 0, -6, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        >
          {ordered.map((study, i) => {
            const layout = PANEL_LAYOUT[i] ?? PANEL_LAYOUT[3];
            const isFront = i === 0;

            return (
              <motion.div
                key={`${study.slug}-${i}`}
                className={`hero-scene-panel ${isFront ? "is-front" : ""}`}
                style={{
                  transform: `
                    translate3d(${layout.x}px, ${layout.y}px, ${layout.z}px)
                    rotateX(${layout.rotateX}deg)
                    rotateY(${layout.rotateY}deg)
                    scale(${layout.scale})
                  `,
                }}
                animate={
                  reduce
                    ? undefined
                    : { y: isFront ? [0, -8, 0] : [0, -5, 0] }
                }
                transition={{
                  y: {
                    duration: isFront ? 5.5 : 6.5 + i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <div className="hero-scene-panel-inner">
                  <Image
                    src={study.image}
                    alt={study.imageAlt}
                    fill
                    priority={isFront}
                    sizes="(max-width: 768px) 280px, 360px"
                    className="object-cover"
                    style={{
                      objectPosition: study.imagePosition ?? "50% 50%",
                    }}
                  />
                  <div className="hero-scene-panel-shade" />
                  <div className="hero-scene-panel-meta">
                    <p className="hero-scene-panel-industry">{study.industry}</p>
                    <p className="hero-scene-panel-title">{study.title}</p>
                    {isFront && study.metrics[0] ? (
                      <p className="hero-scene-panel-metric">
                        {study.metrics[0].value}{" "}
                        <span>{study.metrics[0].label}</span>
                      </p>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="hero-scene-ring" aria-hidden="true" />
      </motion.div>

      <div className="hero-scene-dots" role="tablist" aria-label="Featured work">
        {studies.map((study, i) => (
          <button
            key={study.slug}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={study.client}
            className={`hero-scene-dot ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      {studies[active] ? (
        <Link
          href={`/work/${studies[active].slug}`}
          className="hero-scene-link link-arrow mt-6 inline-flex items-center gap-1.5 lg:mt-0 lg:absolute lg:bottom-2 lg:left-0"
        >
          {studies[active].client}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      ) : null}
    </div>
  );
}
