import type { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "london-hair-co-booking",
    client: "The London Hair Co.",
    title: "Salon booking platform",
    industry: "Hair & Beauty",
    featured: true,
    image: "/images/salon.jpg",
    imageAlt: "Hair stylist working with a client in a salon",
    challenge:
      "A three-location salon chain losing 15–20 clients a month to double-bookings, missed appointments, and manual phone scheduling.",
    solution:
      "Custom web booking with stylist calendars, SMS reminders, calendar sync, and a client management dashboard across all sites.",
    results: [
      "70% reduction in no-shows",
      "25% increase in repeat bookings",
      "£8,000 monthly revenue recovered",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Twilio"],
    timeline: "8 weeks",
    metrics: [
      { label: "No-show reduction", value: "70%" },
      { label: "Repeat bookings", value: "+25%" },
      { label: "Revenue recovered", value: "£8k/mo" },
    ],
    reviewId: "london-hair-co",
  },
  {
    slug: "morrison-sons-job-management",
    client: "Morrison & Sons Plumbing",
    title: "Trade job management system",
    industry: "Trades / Construction",
    featured: true,
    image: "/images/trades.jpg",
    imageAlt: "Plumber repairing pipework under a sink",
    challenge:
      "A 12-van plumbing and heating firm drowning in paper job sheets, slow invoicing, and no live view of engineers on the road.",
    solution:
      "Mobile-first job management with real-time engineer tracking, automated invoicing, photo capture, and customer status updates.",
    results: [
      "Admin time cut from 15 hours to under 4 per week",
      "Invoicing turnaround reduced from 7 days to 2",
      "Improved customer satisfaction scores",
    ],
    tech: ["React Native", "Firebase", "Stripe", "Google Maps"],
    timeline: "12 weeks",
    metrics: [
      { label: "Admin time saved", value: "73%" },
      { label: "Invoicing", value: "7d → 2d" },
      { label: "Engineers tracked", value: "18" },
    ],
    reviewId: "morrison-sons",
  },
  {
    slug: "sharma-co-client-portal",
    client: "Sharma & Co. Accountants",
    title: "Accountant client portal",
    industry: "Professional Services",
    featured: true,
    image: "/images/office.jpg",
    imageAlt: "Accountants reviewing paperwork at a desk",
    challenge:
      "A six-partner firm with 800+ clients relying on email for document collection — slow, insecure, and hard to track.",
    solution:
      "White-label client portal with encrypted uploads, secure messaging, deadline reminders, and audit trails.",
    results: [
      "90% client adoption within three months",
      "50% reduction in document-chasing emails",
      "Improved compliance and file traceability",
    ],
    tech: ["Next.js", "AWS S3", "SendGrid", "JWT auth"],
    timeline: "6 weeks",
    metrics: [
      { label: "Client adoption", value: "90%" },
      { label: "Chasing emails", value: "-50%" },
      { label: "Delivery", value: "6 weeks" },
    ],
    reviewId: "sharma-co",
  },
  {
    slug: "oak-co-ecommerce",
    client: "Oak & Co. Furniture",
    title: "E-commerce rebuild",
    industry: "Retail",
    featured: true,
    image: "/images/furniture.jpg",
    imageAlt: "Handmade sofa in a furniture showroom",
    challenge:
      "A handmade furniture business on a slow, clunky Shopify setup with poor mobile experience and high cart abandonment.",
    solution:
      "Custom storefront with faster checkout, improved product search, mobile-first UX, and abandoned cart recovery.",
    results: [
      "40% sales increase within three months",
      "55% faster page load times",
      "30% reduction in cart abandonment",
    ],
    tech: ["React", "Node.js", "Stripe", "Algolia"],
    timeline: "10 weeks",
    metrics: [
      { label: "Sales increase", value: "+40%" },
      { label: "Load time", value: "-55%" },
      { label: "Cart abandonment", value: "-30%" },
    ],
    reviewId: "oak-co",
  },
  {
    slug: "bridge-dental-patient-hub",
    client: "Bridge Dental Clinic",
    title: "Patient booking & recall system",
    industry: "Dental",
    featured: true,
    image: "/images/dental.jpg",
    imageAlt: "Dentist with a patient in a treatment room",
    challenge:
      "A busy NHS and private practice with fragmented recall lists, phone-only booking, and chairs sitting empty between cancellations.",
    solution:
      "Online booking by treatment type, automated recall SMS, waitlist backfill, and a reception dashboard tied to practice management.",
    results: [
      "Chair utilisation up 18% within two months",
      "Recall attendance improved by 34%",
      "Reception call volume down 40%",
    ],
    tech: ["Next.js", "PostgreSQL", "Twilio", "REST integrations"],
    timeline: "7 weeks",
    metrics: [
      { label: "Chair utilisation", value: "+18%" },
      { label: "Recall attendance", value: "+34%" },
      { label: "Call volume", value: "-40%" },
    ],
    reviewId: "bridge-dental",
  },
  {
    slug: "pawpath-vet-portal",
    client: "PawPath Veterinary",
    title: "Vet practice management portal",
    industry: "Veterinary",
    featured: true,
    image: "/images/veterinary.jpg",
    imageAlt: "Veterinary nurse examining a dog in clinic",
    challenge:
      "A four-vet practice juggling paper consent forms, missed vaccination reminders, and owners calling for repeat prescription updates.",
    solution:
      "Client portal with pet profiles, vaccination reminders, online consult booking, and repeat prescription requests.",
    results: [
      "62% of repeat prescriptions now self-serve",
      "Vaccination reminder compliance up 28%",
      "Front-desk calls reduced by a third",
    ],
    tech: ["Next.js", "Supabase", "SendGrid", "Stripe"],
    timeline: "9 weeks",
    metrics: [
      { label: "Self-serve scripts", value: "62%" },
      { label: "Vaccination compliance", value: "+28%" },
      { label: "Call reduction", value: "-33%" },
    ],
    reviewId: "pawpath-vet",
  },
  {
    slug: "copper-pot-kitchen-ops",
    client: "Copper Pot Kitchen",
    title: "Restaurant operations platform",
    industry: "Hospitality",
    featured: false,
    image: "/images/restaurant.jpg",
    imageAlt: "Plated dishes being served in a restaurant",
    challenge:
      "An independent restaurant group running reservations on WhatsApp, kitchen tickets on paper, and no single view of covers per site.",
    solution:
      "Table booking, kitchen display system, shift handover notes, and a group dashboard for covers, waste, and labour cost.",
    results: [
      "Double-bookings eliminated across three sites",
      "Average ticket time down 22%",
      "Manager reporting cut from 6 hours to 45 minutes weekly",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "WebSockets"],
    timeline: "11 weeks",
    metrics: [
      { label: "Ticket time", value: "-22%" },
      { label: "Reporting time", value: "-87%" },
      { label: "Sites live", value: "3" },
    ],
    reviewId: "copper-pot",
  },
  {
    slug: "flexfit-gym-platform",
    client: "FlexFit Leeds",
    title: "Gym membership & class booking",
    industry: "Leisure",
    featured: false,
    image: "/images/gym.jpg",
    imageAlt: "People training with weights in a gym",
    challenge:
      "A growing gym chain on generic booking software that could not handle class caps, trainer swaps, or access control at turnstiles.",
    solution:
      "Custom member app with class booking, direct debit integration, QR check-in, and trainer scheduling across two locations.",
    results: [
      "Class fill rate up from 71% to 94%",
      "Membership churn down 19%",
      "Front-of-house admin halved",
    ],
    tech: ["React Native", "Node.js", "PostgreSQL", "GoCardless"],
    timeline: "10 weeks",
    metrics: [
      { label: "Class fill rate", value: "94%" },
      { label: "Churn reduction", value: "-19%" },
      { label: "Members", value: "2.4k" },
    ],
    reviewId: "flexfit",
  },
  {
    slug: "harrison-webb-conveyancing",
    client: "Harrison & Webb Legal",
    title: "Conveyancing case management",
    industry: "Legal",
    featured: false,
    image: "/images/legal.jpg",
    imageAlt: "Legal professional reviewing property documents",
    challenge:
      "A conveyancing team tracking 120+ active matters in spreadsheets with clients constantly chasing milestone updates.",
    solution:
      "Case pipeline with automated client updates, document checklist, e-signature handoff, and lender portal integrations.",
    results: [
      "Average matter cycle shortened by 11 days",
      "Client status calls down 58%",
      "Compliance audit prep time cut in half",
    ],
    tech: ["Next.js", "PostgreSQL", "DocuSign", "Azure Blob"],
    timeline: "8 weeks",
    metrics: [
      { label: "Cycle time", value: "-11 days" },
      { label: "Status calls", value: "-58%" },
      { label: "Active matters", value: "120+" },
    ],
    reviewId: "harrison-webb",
  },
  {
    slug: "northline-pharmacy-hub",
    client: "Northline Pharmacy",
    title: "Prescription workflow system",
    industry: "Pharmacy",
    featured: false,
    image: "/images/pharmacy.jpg",
    imageAlt: "Pharmacist preparing prescriptions behind the counter",
    challenge:
      "A multi-branch pharmacy with repeat requests by phone, delivery routes planned manually, and stock alerts on sticky notes.",
    solution:
      "Repeat prescription portal, delivery route planner, low-stock alerts, and branch performance dashboard.",
    results: [
      "Repeat requests processed 45% faster",
      "Delivery failures down 31%",
      "Stock-outs reduced across all branches",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Google Maps"],
    timeline: "9 weeks",
    metrics: [
      { label: "Processing speed", value: "+45%" },
      { label: "Delivery failures", value: "-31%" },
      { label: "Branches", value: "5" },
    ],
    reviewId: "northline",
  },
  {
    slug: "keystone-estates-crm",
    client: "Keystone Estates",
    title: "Viewing scheduler & lead CRM",
    industry: "Property",
    featured: false,
    image: "/images/estate.jpg",
    imageAlt: "Estate agent showing a property to prospective buyers",
    challenge:
      "An independent agency losing leads after hours, double-booking viewings, and agents working from outdated buyer lists.",
    solution:
      "Online viewing booking, lead scoring, automated follow-ups, and a mobile app for agents in the field.",
    results: [
      "Lead response time under 5 minutes on average",
      "Viewing no-shows down 44%",
      "Offer conversion up 21%",
    ],
    tech: ["Next.js", "PostgreSQL", "Twilio", "React Native"],
    timeline: "7 weeks",
    metrics: [
      { label: "Response time", value: "<5 min" },
      { label: "Viewing no-shows", value: "-44%" },
      { label: "Offer conversion", value: "+21%" },
    ],
    reviewId: "keystone",
  },
  {
    slug: "swifthaul-dispatch",
    client: "SwiftHaul Logistics",
    title: "Driver dispatch & proof of delivery",
    industry: "Logistics",
    featured: false,
    image: "/images/logistics.jpg",
    imageAlt: "Logistics warehouse with delivery vans loading",
    challenge:
      "A regional courier with 28 drivers relying on phone dispatch, paper proof of delivery, and customers calling for ETAs.",
    solution:
      "Dispatch board, driver mobile app with GPS, photo POD, customer tracking links, and automated invoicing on delivery.",
    results: [
      "On-time delivery rate up to 96%",
      "Dispatch desk headcount unchanged while volume grew 35%",
      "Invoice disputes down 60%",
    ],
    tech: ["React Native", "Node.js", "PostgreSQL", "Mapbox"],
    timeline: "12 weeks",
    metrics: [
      { label: "On-time rate", value: "96%" },
      { label: "Volume growth", value: "+35%" },
      { label: "Disputes", value: "-60%" },
    ],
    reviewId: "swifthaul",
  },
  {
    slug: "bloom-aesthetics-booking",
    client: "Bloom Aesthetics",
    title: "Medical aesthetics booking suite",
    industry: "Healthcare / Beauty",
    featured: false,
    image: "/images/aesthetics.jpg",
    imageAlt: "Beauty therapist preparing a treatment room",
    challenge:
      "A clinic offering injectables and skin treatments with consent forms on paper, deposits taken manually, and practitioners sharing one WhatsApp diary.",
    solution:
      "Treatment-specific booking, digital consent, deposit capture, practitioner calendars, and automated aftercare instructions.",
    results: [
      "Deposit no-shows down 52%",
      "Practitioner utilisation up 24%",
      "Consent compliance fully auditable",
    ],
    tech: ["Next.js", "Stripe", "PostgreSQL", "Twilio"],
    timeline: "6 weeks",
    metrics: [
      { label: "No-shows", value: "-52%" },
      { label: "Utilisation", value: "+24%" },
      { label: "Go-live", value: "6 weeks" },
    ],
    reviewId: "bloom-aesthetics",
  },
  {
    slug: "meridian-gp-scheduling",
    client: "Meridian Private GP",
    title: "Private GP scheduling platform",
    industry: "Healthcare",
    featured: false,
    image: "/images/gp-clinic.jpg",
    imageAlt: "Doctor speaking with a patient in a private clinic",
    challenge:
      "A private GP clinic with GPs on rotas in Google Calendar, patients booking by email, and no triage before appointments.",
    solution:
      "Online triage forms, GP-specific availability, video consult links, and a patient history summary before each appointment.",
    results: [
      "Same-day appointment fill rate up 31%",
      "Admin triage time reduced by 4 hours daily",
      "Patient satisfaction score highest in clinic history",
    ],
    tech: ["Next.js", "PostgreSQL", "Daily.co", "SendGrid"],
    timeline: "8 weeks",
    metrics: [
      { label: "Same-day fill", value: "+31%" },
      { label: "Triage time", value: "-4h/day" },
      { label: "Consult types", value: "4" },
    ],
    reviewId: "meridian-gp",
  },
  {
    slug: "apex-facilities-maintenance",
    client: "Apex Facilities Group",
    title: "Facilities maintenance platform",
    industry: "Facilities",
    featured: false,
    image: "/images/facilities.jpg",
    imageAlt: "Facilities engineer inspecting building equipment",
    challenge:
      "A facilities contractor managing SLAs across 40+ commercial sites with reactive jobs logged by email and no asset history.",
    solution:
      "Asset register, planned maintenance schedules, mobile job sheets, SLA timers, and client portals for ticket submission.",
    results: [
      "SLA breaches down 47%",
      "First-time fix rate up 29%",
      "Client renewals at 100% after rollout",
    ],
    tech: ["React Native", "Node.js", "PostgreSQL", "PDF generation"],
    timeline: "14 weeks",
    metrics: [
      { label: "SLA breaches", value: "-47%" },
      { label: "First-time fix", value: "+29%" },
      { label: "Sites managed", value: "40+" },
    ],
    reviewId: "apex-facilities",
  },
  {
    slug: "harbour-group-reservations",
    client: "Harbour Group Hospitality",
    title: "Multi-site reservation hub",
    industry: "Hospitality",
    featured: false,
    image: "/images/hospitality.jpg",
    imageAlt: "Busy restaurant dining room during evening service",
    challenge:
      "A hospitality group with five venues sharing one phone line for bookings, no deposit policy enforcement, and walk-ins throwing off forecasts.",
    solution:
      "Central reservation widget, venue-specific capacity rules, deposit handling, and a group-wide covers forecast dashboard.",
    results: [
      "Online bookings up 3× in six months",
      "Large-party no-shows down 61%",
      "Revenue per cover increased 12%",
    ],
    tech: ["Next.js", "Stripe", "PostgreSQL", "Metabase"],
    timeline: "9 weeks",
    metrics: [
      { label: "Online bookings", value: "3×" },
      { label: "Party no-shows", value: "-61%" },
      { label: "Venues", value: "5" },
    ],
    reviewId: "harbour-group",
  },
];

export const caseStudiesSection = {
  eyebrow: "Selected work",
  title: "Outcomes,",
  titleEm: "not output.",
  subtitle: `${caseStudies.length} projects across dental, legal, logistics, hospitality, healthcare, retail, and more.`,
};

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((s) => s.slug === slug);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((s) => s.featured);
}

/** Bump when replacing photos in /public/images (browser cache bust). */
export const CASE_STUDY_IMAGE_VERSION = 4;

export function caseStudyImageSrc(path: string): string {
  return `${path}?v=${CASE_STUDY_IMAGE_VERSION}`;
}
