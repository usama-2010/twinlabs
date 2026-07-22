import type { LandingPage } from "@/types";

/**
 * Keyword → page map (priority order)
 * 1. custom software development UK        → /
 * 2. bespoke software development UK         → /services/custom-software
 * 3. SME software development UK           → /services/custom-software
 * 4. booking system development UK         → /services/booking-appointment-systems
 * 5. client portal development UK          → /services/patient-client-portals
 * 6. field service app development UK        → /services/field-service-job-management
 * 7. custom e-commerce development UK      → /services/e-commerce-payments
 * 8. workflow automation software UK       → /services/workflow-automation
 * 9. dental booking system UK              → /industries/dental-clinics
 * 10. salon appointment software UK        → /industries/hair-beauty-aesthetics
 * 11. trades job management software       → /industries/trades-construction
 * 12. veterinary practice software UK      → /industries/veterinary-practices
 * 13. accountant client portal UK            → /industries/accounting-finance
 * 14. restaurant booking system UK         → /industries/restaurants-hospitality
 * 15. Next.js development agency UK        → /services/custom-software (tech section)
 */

export const servicePages: LandingPage[] = [
  {
    slug: "custom-software",
    seoTitle: "Bespoke Custom Software Development UK",
    metaDescription:
      "TwinLabs builds bespoke custom software for UK SMEs — fixed quotes, clear delivery, and a senior team from discovery to launch. Booking systems, portals, field apps, and more.",
    keywords: [
      "custom software development UK",
      "bespoke software development UK",
      "SME software development UK",
      "custom software agency UK",
      "Next.js development agency UK",
    ],
    eyebrow: "Custom software",
    h1: "Bespoke software built for how you work.",
    lede:
      "We design and build custom software for UK businesses that have outgrown spreadsheets, off-the-shelf tools, and manual workarounds — scoped upfront and delivered by a senior team.",
    image: "/images/hero-london.jpg",
    imageAlt: "London skyline representing UK software development",
    bullets: [
      "Fixed quotes after a written discovery scope",
      "Fortnightly demos and staging links throughout build",
      "Next.js, Node.js, PostgreSQL, and mobile where needed",
      "Launch support, handover, and training included",
    ],
    sections: [
      {
        title: "When off-the-shelf is not enough",
        body:
          "Generic SaaS tools force your team to adapt. Custom software adapts to your operations — your booking rules, your compliance needs, your integrations, and the way your staff actually work day to day.",
      },
      {
        title: "How we deliver",
        body:
          "Every project starts with discovery: we map pain points, data flows, and constraints, then send a written scope and fixed price within 48 hours. No vague day rates or surprise invoices.",
      },
      {
        title: "Typical project range",
        body:
          "Most SME builds sit between £4k and £22k depending on scope, integrations, and complexity. Timelines are typically 6–12 weeks for booking systems, portals, and field apps.",
      },
    ],
    relatedWorkSlugs: [
      "london-hair-co-booking",
      "morrison-sons-job-management",
      "sharma-co-client-portal",
    ],
    relatedLinks: [
      { label: "Booking systems", href: "/services/booking-appointment-systems" },
      { label: "Client portals", href: "/services/patient-client-portals" },
      { label: "Field service apps", href: "/services/field-service-job-management" },
    ],
  },
  {
    slug: "booking-appointment-systems",
    seoTitle: "Booking System Development UK",
    metaDescription:
      "Custom booking and appointment systems for UK businesses — online scheduling, staff calendars, SMS reminders, and waitlists. Built for dental, salons, vets, gyms, and estate agents.",
    keywords: [
      "booking system development UK",
      "custom booking system",
      "appointment scheduling software UK",
      "online booking system development",
      "appointment reminder software",
    ],
    eyebrow: "Booking systems",
    h1: "Custom booking systems that cut no-shows and admin.",
    lede:
      "We build online booking platforms with staff calendars, automated reminders, waitlists, and dashboards — tailored to chairs, stations, consult rooms, classes, or viewing slots.",
    image: "/images/services/booking.jpg",
    imageAlt: "Calendar with appointment dates highlighted",
    bullets: [
      "Multi-location and multi-staff scheduling",
      "SMS and email reminders with configurable rules",
      "Calendar sync and client self-service rescheduling",
      "Reporting on utilisation, no-shows, and revenue",
    ],
    sections: [
      {
        title: "Problems we solve",
        body:
          "Double-bookings, phone-heavy reception, missed appointments, and no visibility across sites. Custom booking software replaces manual diaries with a system your team and clients can trust.",
      },
      {
        title: "Built for your sector",
        body:
          "Dental practices need chair time and recall logic. Salons need stylist-level calendars. Vets need consult types and vaccination reminders. We configure rules around how you operate — not a generic template.",
      },
      {
        title: "Integrations",
        body:
          "Stripe deposits, Twilio SMS, Google Calendar, existing CRMs, and practice management tools. We connect to what you already use or replace it cleanly if it no longer fits.",
      },
    ],
    relatedWorkSlugs: ["london-hair-co-booking", "bridge-dental-patient-hub", "pawpath-vet-portal"],
    relatedLinks: [
      { label: "Dental clinics", href: "/industries/dental-clinics" },
      { label: "Salons & beauty", href: "/industries/hair-beauty-aesthetics" },
      { label: "Veterinary practices", href: "/industries/veterinary-practices" },
    ],
  },
  {
    slug: "patient-client-portals",
    seoTitle: "Client Portal Development UK",
    metaDescription:
      "Secure client and patient portals for UK businesses — document uploads, messaging, progress tracking, and booking. Built for accountants, legal firms, healthcare, and professional services.",
    keywords: [
      "client portal development UK",
      "patient portal development",
      "secure client portal software",
      "accountant client portal",
      "document upload portal UK",
    ],
    eyebrow: "Client portals",
    h1: "Secure portals your clients will actually use.",
    lede:
      "We build branded client and patient portals for secure uploads, messaging, deadline tracking, and self-service — replacing email chains and insecure attachments.",
    image: "/images/services/portals.jpg",
    imageAlt: "Healthcare professional using a client portal on a laptop",
    bullets: [
      "Encrypted document upload and audit trails",
      "Branded login experience for your firm or clinic",
      "Deadline reminders and status updates",
      "Role-based access for staff and clients",
    ],
    sections: [
      {
        title: "Why portals beat email",
        body:
          "Email is slow, hard to track, and risky for sensitive files. A portal gives clients one place to upload, message, and check progress — while your team gets visibility and compliance.",
      },
      {
        title: "Sectors we build for",
        body:
          "Accountancy firms chasing documents, legal teams exchanging case files, healthcare providers sharing results, and veterinary practices with pet owner records.",
      },
      {
        title: "Security and compliance",
        body:
          "Authentication, encrypted storage, access logs, and retention policies designed around UK professional services and healthcare expectations.",
      },
    ],
    relatedWorkSlugs: ["sharma-co-client-portal", "bridge-dental-patient-hub", "pawpath-vet-portal"],
    relatedLinks: [
      { label: "Accounting & finance", href: "/industries/accounting-finance" },
      { label: "Dental clinics", href: "/industries/dental-clinics" },
    ],
  },
  {
    slug: "field-service-job-management",
    seoTitle: "Field Service App Development UK",
    metaDescription:
      "Custom field service and job management software for UK trades and logistics — dispatch boards, mobile apps, photo capture, invoicing, and live engineer tracking.",
    keywords: [
      "field service app development UK",
      "job management software UK",
      "trades job management software",
      "mobile workforce app development",
      "engineer tracking software",
    ],
    eyebrow: "Field service",
    h1: "Field apps that replace paper job sheets.",
    lede:
      "We build mobile-first job management for engineers, plumbers, electricians, and delivery teams — dispatch, status updates, photo evidence, and invoicing from the van.",
    image: "/images/services/field-service.jpg",
    imageAlt: "Engineers working on site with safety gear",
    bullets: [
      "Real-time engineer tracking and dispatch boards",
      "Mobile job sheets with photo capture and signatures",
      "Automated invoicing and Stripe payments",
      "Customer SMS updates and ETA notifications",
    ],
    sections: [
      {
        title: "From paper to live visibility",
        body:
          "Trades firms lose hours to admin when job sheets live in vans and invoicing waits until Friday. A unified system gives the office a live view and engineers a tool that works offline on site.",
      },
      {
        title: "Built for the road",
        body:
          "React Native and progressive web apps with offline support, GPS where appropriate, and simple UX for staff who should not need a manual.",
      },
      {
        title: "Outcomes we target",
        body:
          "Less admin time, faster invoicing, fewer missed jobs, and happier customers who know when their engineer is arriving.",
      },
    ],
    relatedWorkSlugs: ["morrison-sons-job-management"],
    relatedLinks: [
      { label: "Trades & construction", href: "/industries/trades-construction" },
    ],
  },
  {
    slug: "e-commerce-payments",
    seoTitle: "Custom E-commerce Development UK",
    metaDescription:
      "Bespoke e-commerce and wholesale ordering for UK retailers — custom storefronts, Stripe checkout, inventory sync, and fulfilment workflows that match how you sell.",
    keywords: [
      "custom e-commerce development UK",
      "bespoke online shop development",
      "wholesale ordering portal UK",
      "Stripe e-commerce development",
      "custom storefront development",
    ],
    eyebrow: "E-commerce",
    h1: "E-commerce built around your fulfilment model.",
    lede:
      "We build custom storefronts and wholesale portals when Shopify templates or generic platforms cannot handle your pricing, inventory, or fulfilment rules.",
    image: "/images/services/ecommerce.jpg",
    imageAlt: "Online retail checkout and shopping cart",
    bullets: [
      "Custom catalogues, pricing tiers, and B2B ordering",
      "Stripe checkout and subscription support",
      "Inventory sync with warehouse or ERP systems",
      "Abandoned cart recovery and order tracking",
    ],
    sections: [
      {
        title: "When Shopify is not enough",
        body:
          "Complex wholesale rules, made-to-order furniture, multi-warehouse stock, or integrations with legacy systems often need a bespoke storefront rather than plugins stacked on plugins.",
      },
      {
        title: "Performance and SEO",
        body:
          "Next.js storefronts with fast page loads, structured product data, and analytics built in from day one.",
      },
      {
        title: "Launch and iterate",
        body:
          "We ship a focused v1, then iterate on conversion and operations based on real order data — not assumptions.",
      },
    ],
    relatedWorkSlugs: ["oak-co-ecommerce"],
    relatedLinks: [
      { label: "Retail case study", href: "/work/oak-co-ecommerce" },
    ],
  },
  {
    slug: "workflow-automation",
    seoTitle: "Workflow Automation Software UK",
    metaDescription:
      "Custom workflow automation for UK SMEs — prescription repeats, invoice chasing, document collection, recall letters, and status updates triggered automatically.",
    keywords: [
      "workflow automation software UK",
      "business process automation UK",
      "custom automation development",
      "document workflow automation",
      "SME automation software",
    ],
    eyebrow: "Automation",
    h1: "Stop chasing tasks that software can run.",
    lede:
      "We automate repeat workflows — recalls, prescription requests, invoice reminders, document collection, and status updates — so your team focuses on work that needs a human.",
    image: "/images/services/automation.jpg",
    imageAlt: "Checklist representing automated business tasks",
    bullets: [
      "Trigger-based workflows tied to your existing data",
      "Email, SMS, and in-app notifications",
      "Audit logs and exception handling",
      "Integrations with Xero, Sage, and practice systems",
    ],
    sections: [
      {
        title: "Automation that fits your process",
        body:
          "We do not sell generic RPA bots. We map your actual steps — who does what, when exceptions happen, and what systems hold the data — then build reliable automation around that.",
      },
      {
        title: "Common use cases",
        body:
          "Dental and pharmacy recall letters, accountant deadline reminders, legal milestone tracking, and logistics status updates to customers.",
      },
      {
        title: "Measurable time savings",
        body:
          "Clients typically recover hours of admin per week within the first month of launch, with fewer errors and better audit trails.",
      },
    ],
    relatedWorkSlugs: ["bridge-dental-patient-hub", "sharma-co-client-portal"],
    relatedLinks: [
      { label: "Dental clinics", href: "/industries/dental-clinics" },
      { label: "Accounting & finance", href: "/industries/accounting-finance" },
    ],
  },
];

export function getServicePageBySlug(slug: string): LandingPage | undefined {
  return servicePages.find((page) => page.slug === slug);
}

export const servicePagesIndex = {
  eyebrow: "Services",
  title: "Software services we build.",
  lede:
    "Dedicated landing pages for the systems UK businesses ask us for most — each scoped with a fixed quote after discovery.",
};
