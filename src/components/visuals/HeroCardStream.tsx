"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { caseStudies } from "@/lib/content/case-studies";
import type { CaseStudy } from "@/types";

function shorten(text: string, max = 72) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

function StreamCard({ study }: { study: CaseStudy }) {
  return (
    <article className="hero-stream-card">
      <p className="hero-stream-card-title">{shorten(study.challenge)}</p>
      <div className="hero-stream-card-head">
        <span className="hero-stream-card-tag">{study.industry}</span>
        <span className="hero-stream-card-status">Delivered</span>
      </div>
      <div className="hero-stream-metrics">
        {study.metrics.slice(0, 3).map((metric) => (
          <div key={metric.label} className="hero-stream-metric">
            <span className="hero-stream-metric-value">{metric.value}</span>
            <span className="hero-stream-metric-label">{metric.label}</span>
          </div>
        ))}
      </div>
      <Link href={`/work/${study.slug}`} className="hero-stream-card-client">
        {study.client} · {study.timeline}
      </Link>
    </article>
  );
}

function Column({
  items,
  duration,
  reverse = false,
}: {
  items: CaseStudy[];
  duration: number;
  reverse?: boolean;
}) {
  const loop = [...items, ...items];

  return (
    <div
      className={`hero-stream-col ${reverse ? "is-reverse" : ""}`}
      style={{ "--stream-duration": `${duration}s` } as React.CSSProperties}
    >
      {loop.map((study, i) => (
        <StreamCard key={`${study.slug}-${i}`} study={study} />
      ))}
    </div>
  );
}

export function HeroCardStream() {
  const reduce = useReducedMotion();
  const studies = caseStudies;

  const col1 = studies;
  const col2 = [...studies.slice(2), ...studies.slice(0, 2)];
  const col3 = [...studies.slice(1), ...studies.slice(0, 1)];

  if (reduce) {
    return (
      <div className="hero-stream hero-stream-static">
        <div className="hero-stream-col-static">
          {studies.slice(0, 2).map((study) => (
            <StreamCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="hero-stream" aria-label="Featured project outcomes">
      <Column items={col1} duration={38} />
      <Column items={col2} duration={46} reverse />
      <Column items={col3} duration={42} />
    </div>
  );
}
