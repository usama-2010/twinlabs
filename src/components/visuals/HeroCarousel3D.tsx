"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { getFeaturedCaseStudies } from "@/lib/content/case-studies";

export function HeroCarousel3D() {
  const [reduce, setReduce] = useState(false);
  const [paused, setPaused] = useState(false);
  const cards = getFeaturedCaseStudies();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const count = cards.length;

  return (
    <div
      className="hero-css-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        className={`hero-css-carousel-stage ${reduce ? "is-static" : ""} ${paused ? "is-paused" : ""}`}
        style={{ "--card-count": count } as CSSProperties}
      >
        {cards.map((study, i) => (
          <div
            key={study.slug}
            className="hero-css-card"
            style={{ "--i": i } as CSSProperties}
          >
            <Image
              src={study.image}
              alt={study.imageAlt}
              fill
              sizes="200px"
              className="object-cover"
              style={{ objectPosition: study.imagePosition ?? "50% 50%" }}
            />
          </div>
        ))}
      </div>
      <div className="hero-css-ring" aria-hidden="true" />
      <div className="hero-css-glow" aria-hidden="true" />
    </div>
  );
}
