"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs, faqSection } from "@/lib/content/faq";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { motionTokens } from "@/lib/motion";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const [expandAll, setExpandAll] = useState(false);

  const toggle = (index: number) => {
    setExpandAll(false);
    setOpen(open === index ? null : index);
  };

  const handleExpandAll = () => {
    setExpandAll((prev) => !prev);
    setOpen(null);
  };

  return (
    <section id="faq" className="surface-band py-16 sm:py-20 md:py-28">
      <div className="container-main max-w-5xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader title="FAQ" subtitle={faqSection.subtitle} />
          <button
            type="button"
            onClick={handleExpandAll}
            className="btn-outline shrink-0 text-sm"
          >
            {expandAll ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <Reveal delay={0.08}>
          <div className="faq-grid mt-12">
            {faqs.map((faq, i) => {
              const isOpen = expandAll || open === i;
              return (
                <div key={faq.question} className="faq-item" data-open={isOpen}>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 p-5 text-left"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-medium leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: motionTokens.duration.base,
                          ease: motionTokens.ease.silk,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
