"use client";

import { testimonialsSection, reviews } from "@/lib/content/reviews";
import { TestimonialMarquee } from "@/components/visuals/TestimonialMarquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section id="testimonials" className="surface-band py-20 md:py-28">
      <div className="container-main">
        <SectionHeader
          eyebrow="Testimonials"
          title={testimonialsSection.title}
          subtitle={testimonialsSection.subtitle}
          align="center"
        />

        <Reveal className="mt-14">
          <TestimonialMarquee reviews={reviews} />
        </Reveal>
      </div>
    </section>
  );
}
