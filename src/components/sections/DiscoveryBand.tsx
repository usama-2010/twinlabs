"use client";

import { ArrowRight, Check } from "lucide-react";
import { discoveryBand } from "@/lib/content/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const benefits = [
  "Operations mapped before any build starts",
  "Fixed quote within 48 hours",
  "No commitment until you are ready",
  "NDA available on request",
];

export function DiscoveryBand() {
  return (
    <section className="alt-band py-16 sm:py-20 md:py-28">
      <div className="container-main">
        <SectionHeader
          eyebrow={discoveryBand.eyebrow}
          title={discoveryBand.title}
          titleEm={discoveryBand.titleEm}
          subtitle={discoveryBand.subtext}
          align="center"
        />

        <Reveal delay={0.08} className="mx-auto mt-14 max-w-2xl">
          <div className="discovery-card">
            <ul className="space-y-4">
              {benefits.map((item) => (
                <li key={item} className="discovery-check">
                  <span className="discovery-check-icon">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
              <p className="text-sm text-muted">{discoveryBand.note}</p>
              <a href={discoveryBand.cta.href} className="btn-primary group w-full shrink-0 sm:w-auto">
                {discoveryBand.cta.label}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
