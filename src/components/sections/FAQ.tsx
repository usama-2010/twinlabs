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
          <div className="faq-grid mx-auto mt-12 max-w-3xl">
            {faqs.map((faq, i) => {
              const isOpen = expandAll || open === i;
              return (
                <div key={faq.question} className="faq-item" data-open={isOpen}>
                  <button
                    type="button"
                    className="flex w-full min-h-[3.75rem] items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-medium leading-snug tracking-tight">
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
                        <p className="border-t border-border px-5 pb-5 pt-4 text-sm leading-relaxed text-muted sm:px-6">
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
