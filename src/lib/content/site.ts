import type { NavLink, ProcessStep } from "@/types";

export const siteConfig = {
  name: "TwinLabs",
  legalName: "Twinlabs Ltd",
  email: "info@twinlabs.co.uk",
  url: "https://twinlabs.co.uk",
  description:
    "Custom software for any business — booking systems, client portals, field apps, and automation. Fixed quotes, clear delivery.",
};

export const navLinks: NavLink[] = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

/** Footer site column — pages, not duplicates of header anchors. */
export const footerSiteLinks: NavLink[] = [
  { label: "Case studies", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  headline: "Build software.",
  headlineEm: "Ship outcomes.",
  headlineEmCycle: [
    "Ship outcomes.",
    "Ship on time.",
    "Ship with clarity.",
    "Ship what works.",
  ],
  eyebrow:
    "Custom software that cuts admin, missed bookings, and manual work — for UK businesses.",
  subheadline:
    "TwinLabs builds booking systems, client portals, and field apps for SMEs — scoped in writing, quoted upfront, delivered in weeks. You work directly with the founders.",
  primaryCta: { label: "Get in touch", href: "/#contact" },
  secondaryCta: { label: "Explore our services", href: "/#services" },
  trust: {
    label: "Built for every industry",
    items: [] as string[],
  },
  marquee: [
    "Booking systems",
    "Client portals",
    "Field apps",
    "E-commerce",
    "Workflow automation",
    "Mobile apps",
    "Integrations",
    "Dashboards",
  ],
  featuredQuote: {
    label: "Client note · 2024",
    quote: "No-shows are down massively and reception finally stopped firefighting.",
    highlight: "No-shows are down massively.",
    author: "Sarah Chen",
    role: "Owner, The London Hair Co.",
    href: "/work/london-hair-co-booking",
  },
};

export const ctaBand = {
  title: "Transform your operations",
  titleEm: "with software that fits.",
  subtext:
    "Tell us what you need built. We will review your operations and reply with a written scope and fixed quote if we are a fit.",
  primary: { label: "Get in touch", href: "/#contact" },
  secondary: { label: "Explore our services", href: "/#services" },
};

export const discoveryBand = {
  eyebrow: "Discovery",
  title: "Get a written scope",
  titleEm: "before you sign anything.",
  subtext:
    "We map your operations and pain points, then send a fixed quote within 48 hours — no commitment required.",
  cta: { label: "Request a quote", href: "/#contact" },
  note: "Reply within 24 hours · NDA on request",
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We map your operations, pain points, and constraints — then send a written scope and fixed price.",
  },
  {
    number: "02",
    title: "Design & plan",
    description:
      "Flows, data model, and milestones agreed before a line of code is written.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Fortnightly demos, staging links, and direct access to the developers doing the work.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Deployment, handover, training, and a support window so you are not alone on day one.",
  },
];

export const contact = {
  headline: "Tell us what you need built.",
  subtext:
    "Share your project details and budget. We will reply with an honest scope and written estimate within 48 hours if we are a fit.",
  cta: "Send enquiry",
  sidebar: {
    email: "info@twinlabs.co.uk",
    location: "United Kingdom",
    response: "Reply within 24 hours",
  },
};

export const footer = {
  tagline: "United Kingdom",
  links: [
    { label: "Email", href: "mailto:info@twinlabs.co.uk" },
    { label: "Get in touch", href: "/#contact" },
  ],
};
