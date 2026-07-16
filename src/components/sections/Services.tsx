"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { services, servicesSection, serviceImageSrc } from "@/lib/content/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { staggerItem, StaggerReveal } from "@/components/ui/StaggerReveal";

const featured = services.slice(0, 3);

export function Services() {
  return (
    <section id="services" className="surface-band py-20 md:py-28">
      <div className="container-main">
        <SectionHeader
          eyebrow={servicesSection.eyebrow}
          title={servicesSection.title}
          titleEm={servicesSection.titleEm}
          subtitle={servicesSection.subtitle}
        />

        <StaggerReveal className="mt-16 divide-y divide-border" stagger={0.1}>
          {featured.map((service, index) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              className={`feature-row ${index % 2 === 1 ? "is-reversed" : ""}`}
            >
              <div className="feature-row-visual feature-visual relative">
                <Image
                  src={serviceImageSrc(service.image)}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  className="link-arrow mt-5 inline-flex items-center gap-1.5"
                >
                  Discuss this service
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </StaggerReveal>

        <Reveal className="mt-12 text-center">
          <a href="#contact" className="btn-outline group inline-flex items-center gap-1.5">
            View all services
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
