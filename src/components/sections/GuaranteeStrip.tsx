"use client";

import { Check } from "lucide-react";
import { guarantees, guaranteesSection } from "@/lib/content/guarantees";
import { Reveal } from "@/components/ui/Reveal";

export function GuaranteeStrip() {
  return (
    <section className="border-b border-border bg-surface/80">
      <div className="container-main py-8 sm:py-10">
        <Reveal>
          <p className="mono-label text-center">{guaranteesSection.eyebrow}</p>
        </Reveal>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {guarantees.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.04}>
              <li className="flex gap-3">
                <span className="discovery-check-icon mt-0.5 shrink-0">
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-tight">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
