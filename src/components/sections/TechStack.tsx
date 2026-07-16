"use client";

import { techStack, techStackSection } from "@/lib/content/tech-stack";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function TechStack() {
  return (
    <section className="alt-band py-16 sm:py-20 md:py-24">
      <div className="container-main">
        <SectionHeader
          eyebrow={techStackSection.eyebrow}
          title={techStackSection.title}
          titleEm={techStackSection.titleEm}
          subtitle={techStackSection.subtitle}
          align="center"
        />

        <Reveal delay={0.08} className="mt-12">
          <div className="pill-cloud">
            {techStack.map((tool) => (
              <span key={tool} className="pill-tag">
                {tool}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
