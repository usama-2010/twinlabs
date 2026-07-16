"use client";

import { stats, statsSection } from "@/lib/content/stats";
import { hero } from "@/lib/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";

export function DeliveryBand() {
  return (
    <section className="dark-band border-t border-white/8 py-20 md:py-24">
      <div className="container-main">
        <Reveal className="max-w-2xl">
          <h2 className="section-title text-white">How we deliver</h2>
          <p className="mt-4 text-base text-white/55">{statsSection.tagline}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <Marquee speed={45} className="opacity-80">
            {hero.marquee.map((item) => (
              <span
                key={item}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/4 px-5 py-2 text-sm font-medium text-white/60"
              >
                {item}
              </span>
            ))}
          </Marquee>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 md:gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="stat-value text-white">{stat.value}</p>
              <p className="mono-label mt-3 text-white/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
