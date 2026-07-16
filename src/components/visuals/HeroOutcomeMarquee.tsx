"use client";

import { heroOutcomes } from "@/lib/content/hero-outcomes";

export function HeroOutcomeMarquee() {
  const items = [...heroOutcomes, ...heroOutcomes];

  return (
    <div className="enso-marquee-root">
      <div className="enso-marquee-track">
        {items.map((item, i) => (
          <article key={`${item.value}-${i}`} className="enso-outcome-card">
            <p className="enso-outcome-value">{item.value}</p>
            <p className="enso-outcome-label">{item.label}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
