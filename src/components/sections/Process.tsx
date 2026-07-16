"use client";

import { processSteps } from "@/lib/content/site";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section id="process" className="apple-section apple-divider">
      <div className="container-main">
        <Reveal className="container-narrow mx-auto text-center">
          <h2 className="apple-display">How we work</h2>
          <p className="apple-subhead mx-auto mt-4 max-w-md">
            Fixed scope after discovery. Fortnightly demos. Direct access to the
            team building it.
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.06}>
              <article className="text-center">
                <p className="text-sm font-medium text-accent">{step.number}</p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="apple-body mt-2 text-sm">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
