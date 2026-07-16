"use client";

import { Marquee } from "@/components/ui/Marquee";
import { hero } from "@/lib/content/site";
import { industries } from "@/lib/content/industries";

const tickerItems = [
  ...hero.trust.items,
  ...industries.map((i) => i.name),
];

export function TrustTicker() {
  return (
    <section className="alt-band border-y border-border py-5">
      <div className="container-main mb-3">
        <p className="text-center text-xs font-semibold tracking-widest text-teal-800 uppercase">
          {hero.trust.label}
        </p>
      </div>
      <Marquee speed={45}>
        {tickerItems.map((item) => (
          <span
            key={item}
            className="whitespace-nowrap text-sm font-medium text-foreground/75"
          >
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
