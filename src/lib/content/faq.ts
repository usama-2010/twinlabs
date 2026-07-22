import type { FAQ } from "@/types";

export const faqSection = {
  title: "Questions",
  subtitle: "Pricing, timelines, and how we work — answered directly.",
};

export const faqs: FAQ[] = [
  {
    question: "How much does custom software cost?",
    answer:
      "Most SME projects sit between £4k and £22k depending on scope — see the pricing section above. Client portals and focused tools start around £4k–£6k; booking and operations systems usually land at £7k–£12k; mobile and platform builds run £14k–£22k. We send a fixed quote in writing after discovery, before you commit.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Typically 6–12 weeks for most builds. Smaller projects like client portals can be done in 6 weeks; larger systems with mobile apps may take 10–14 weeks. We'll agree a realistic timeline upfront.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "Yes. We offer monthly support retainers covering bug fixes, minor updates, and hosting monitoring. Most clients stay with us long-term — we're invested in your success, not just the launch.",
  },
  {
    question: "Are you based in the UK?",
    answer:
      "Yes. We're a UK-based team working with businesses across England, Scotland, and Wales. We work remotely but are available for on-site discovery sessions when needed.",
  },
  {
    question: "Can you work with our existing systems?",
    answer:
      "Usually, yes. We regularly integrate with Xero, Sage, Shopify, existing databases, and third-party APIs. We'll assess your current setup during discovery and be upfront about what's feasible.",
  },
];
