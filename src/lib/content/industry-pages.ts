import type { LandingPage } from "@/types";

export const industryPages: LandingPage[] = [
  {
    slug: "dental-clinics",
    seoTitle: "Dental Booking System & Patient Software UK",
    metaDescription:
      "Custom dental booking systems, patient portals, recall automation, and practice dashboards for UK clinics — NHS and private, fixed quotes from TwinLabs.",
    keywords: [
      "dental booking system UK",
      "dental appointment software",
      "dental patient portal UK",
      "dental practice software development",
      "dental recall system",
    ],
    eyebrow: "Dental clinics",
    h1: "Software for dental practices that run on appointments.",
    lede:
      "We build booking, patient hubs, recall automation, and billing workflows for UK dental clinics tired of double-booked chairs and phone-heavy reception.",
    image: "/images/dental.jpg",
    imageAlt: "Modern dental clinic treatment room",
    bullets: [
      "Chair-time scheduling with hygienist and surgeon rules",
      "Patient booking, reminders, and online forms",
      "Recall letters and treatment plan tracking",
      "NHS and private billing views where needed",
    ],
    sections: [
      {
        title: "Typical pain points",
        body:
          "No-shows, manual recalls, treatment plans scattered across systems, and reception staff juggling phones while clinicians wait. Custom software connects booking, records, and follow-up in one flow.",
      },
      {
        title: "What we have delivered",
        body:
          "Patient hubs with booking and document upload, automated reminders, and dashboards that show utilisation across sites — built to match how your practice actually runs.",
      },
      {
        title: "Integrations",
        body:
          "We integrate with or replace legacy tools, connect to SMS providers, and design migrations that do not disrupt clinic hours.",
      },
    ],
    relatedWorkSlugs: ["bridge-dental-patient-hub"],
    relatedLinks: [
      { label: "Booking systems", href: "/services/booking-appointment-systems" },
      { label: "Client portals", href: "/services/patient-client-portals" },
      { label: "Workflow automation", href: "/services/workflow-automation" },
    ],
  },
  {
    slug: "hair-beauty-aesthetics",
    seoTitle: "Salon Appointment Software UK",
    metaDescription:
      "Custom salon booking software for UK hair, beauty, and aesthetics businesses — multi-site calendars, stylist scheduling, SMS reminders, and client history.",
    keywords: [
      "salon appointment software UK",
      "salon booking system",
      "beauty salon scheduling software",
      "multi-site salon software",
      "hair salon booking app UK",
    ],
    eyebrow: "Salons & beauty",
    h1: "Salon booking software that fills chairs, not inboxes.",
    lede:
      "We build multi-site salon and beauty booking platforms with stylist-level calendars, SMS reminders, and client history — so reception stops firefighting double-bookings.",
    image: "/images/salon.jpg",
    imageAlt: "Hair stylist working with a client in a salon",
    bullets: [
      "Stylist and room-level availability",
      "SMS reminders and waitlist management",
      "Client history and rebooking prompts",
      "Multi-location dashboards for owners",
    ],
    sections: [
      {
        title: "Why generic booking tools fail salons",
        body:
          "Salons need stylist skills, service durations, patch tests, and cross-site staff — not a one-size calendar. We model your rules so online booking matches what reception would have done manually.",
      },
      {
        title: "Proven outcomes",
        body:
          "Our salon clients have seen major reductions in no-shows and meaningful revenue recovered when booking moves online with the right reminder logic.",
      },
      {
        title: "Owner visibility",
        body:
          "Live views across sites: utilisation, repeat rates, and revenue trends without exporting spreadsheets every Monday.",
      },
    ],
    relatedWorkSlugs: ["london-hair-co-booking"],
    relatedLinks: [
      { label: "Booking systems", href: "/services/booking-appointment-systems" },
    ],
  },
  {
    slug: "trades-construction",
    seoTitle: "Trades Job Management Software UK",
    metaDescription:
      "Custom job management software for UK trades and construction firms — dispatch, mobile job sheets, engineer tracking, invoicing, and photo evidence from site.",
    keywords: [
      "trades job management software",
      "construction job management UK",
      "plumber scheduling software",
      "trade business software UK",
      "engineer dispatch software",
    ],
    eyebrow: "Trades & construction",
    h1: "Job management for teams on the road.",
    lede:
      "We build dispatch boards and mobile job tools for plumbing, heating, electrical, and construction firms that have outgrown paper job sheets and Friday invoicing.",
    image: "/images/trades.jpg",
    imageAlt: "Plumber repairing pipework under a sink",
    bullets: [
      "Live engineer tracking and job assignment",
      "Mobile forms, photos, and customer signatures",
      "Quotes, job sheets, and invoicing in one flow",
      "Customer updates and ETA notifications",
    ],
    sections: [
      {
        title: "Office and van connected",
        body:
          "When the office cannot see who is where, jobs slip and invoices lag. A single system links dispatch, field work, and billing so admin hours drop sharply.",
      },
      {
        title: "Works in poor connectivity",
        body:
          "Site work means patchy signal. Our mobile apps cache job data offline and sync when back on network.",
      },
      {
        title: "Results we aim for",
        body:
          "Faster invoicing, less admin, clearer customer communication, and a live view of your fleet without ringing every engineer.",
      },
    ],
    relatedWorkSlugs: ["morrison-sons-job-management"],
    relatedLinks: [
      { label: "Field service apps", href: "/services/field-service-job-management" },
    ],
  },
  {
    slug: "veterinary-practices",
    seoTitle: "Veterinary Practice Software UK",
    metaDescription:
      "Custom veterinary software for UK practices — pet appointment booking, vaccination reminders, client portals, and surgery scheduling built around consult types.",
    keywords: [
      "veterinary practice software UK",
      "vet appointment booking system",
      "pet clinic software development",
      "veterinary client portal",
      "vet surgery scheduling software",
    ],
    eyebrow: "Veterinary",
    h1: "Software for vet practices and pet owners.",
    lede:
      "We build booking, client portals, and reminder workflows for veterinary practices — consult types, vaccination schedules, and pet owner self-service without overloading reception.",
    image: "/images/veterinary.jpg",
    imageAlt: "Veterinary professional caring for a pet",
    bullets: [
      "Consult and surgery scheduling rules",
      "Pet owner booking and vaccination reminders",
      "Client portals for records and messaging",
      "Staff tools for nurses and reception",
    ],
    sections: [
      {
        title: "Reception under pressure",
        body:
          "Vet phones ring constantly for bookings, repeats, and updates. Online booking and portals deflect routine work while staff handle cases that need a human.",
      },
      {
        title: "Reminder logic that matters",
        body:
          "Vaccination due dates, follow-up consults, and repeat prescriptions need reliable automation — not sticky notes and spreadsheets.",
      },
      {
        title: "Built with clinicians",
        body:
          "We map consult types, room usage, and nurse workflows before writing code so the system matches the practice floor.",
      },
    ],
    relatedWorkSlugs: ["pawpath-vet-portal"],
    relatedLinks: [
      { label: "Booking systems", href: "/services/booking-appointment-systems" },
      { label: "Client portals", href: "/services/patient-client-portals" },
    ],
  },
  {
    slug: "accounting-finance",
    seoTitle: "Accountant Client Portal UK",
    metaDescription:
      "Secure client portals for UK accountants and finance firms — document collection, deadline reminders, encrypted uploads, and audit trails. Fixed-quote delivery.",
    keywords: [
      "accountant client portal UK",
      "accounting client portal software",
      "secure document portal accountants",
      "client upload portal UK",
      "accountancy practice software",
    ],
    eyebrow: "Accounting & finance",
    h1: "Client portals that end the email chase.",
    lede:
      "We build branded portals for UK accountancy firms — secure uploads, deadline reminders, messaging, and audit trails replacing insecure email attachments.",
    image: "/images/office.jpg",
    imageAlt: "Accountants reviewing client documents at a desk",
    bullets: [
      "Encrypted client uploads and folder structure",
      "Deadline and filing reminders",
      "Partner dashboards and staff assignment",
      "Adoption-focused UX clients actually use",
    ],
    sections: [
      {
        title: "800 clients, one inbox problem",
        body:
          "Growing firms drown in document-chasing emails. A portal gives clients a single branded place to upload while partners see who has submitted and what is missing.",
      },
      {
        title: "Compliance and traceability",
        body:
          "Access logs, retention rules, and secure storage designed for professional services — not consumer file-sharing tools.",
      },
      {
        title: "Fast adoption",
        body:
          "Simple login flows and clear requests drive adoption quickly — our accounting portal clients have reached high uptake within months of launch.",
      },
    ],
    relatedWorkSlugs: ["sharma-co-client-portal"],
    relatedLinks: [
      { label: "Client portals", href: "/services/patient-client-portals" },
      { label: "Workflow automation", href: "/services/workflow-automation" },
    ],
  },
  {
    slug: "restaurants-hospitality",
    seoTitle: "Restaurant Booking System UK",
    metaDescription:
      "Custom restaurant and hospitality software — table reservations, kitchen display, loyalty, and delivery coordination built for UK restaurants and hospitality groups.",
    keywords: [
      "restaurant booking system UK",
      "table reservation software",
      "restaurant operations software",
      "hospitality booking platform UK",
      "kitchen display system development",
    ],
    eyebrow: "Restaurants & hospitality",
    h1: "Operations software for busy kitchens and dining rooms.",
    lede:
      "We build reservation, kitchen display, and coordination tools for UK restaurants and hospitality groups when off-the-shelf tools do not match service flow or multi-site needs.",
    image: "/images/restaurant.jpg",
    imageAlt: "Restaurant kitchen and dining service",
    bullets: [
      "Table management and online reservations",
      "Kitchen display and order routing",
      "Loyalty and repeat guest tracking",
      "Delivery and multi-site coordination",
    ],
    sections: [
      {
        title: "Service flow on screen",
        body:
          "During service, paper tickets and shouting orders break down. Kitchen displays and clear order routing keep front-of-house and kitchen aligned.",
      },
      {
        title: "Bookings that match covers",
        body:
          "Turn times, party sizes, and section assignments need rules — not a generic calendar. We build booking logic around your floor plan and service style.",
      },
      {
        title: "Group and multi-site",
        body:
          "Hospitality groups need consolidated reporting and consistent guest experience across locations — we design for that from discovery.",
      },
    ],
    relatedWorkSlugs: ["copper-pot-kitchen-ops"],
    relatedLinks: [
      { label: "Booking systems", href: "/services/booking-appointment-systems" },
    ],
  },
];

export function getIndustryPageBySlug(slug: string): LandingPage | undefined {
  return industryPages.find((page) => page.slug === slug);
}

export const industryPagesIndex = {
  eyebrow: "Industries",
  title: "Sectors we build for.",
  lede:
    "Industry-focused pages for the verticals where we deliver booking systems, portals, field apps, and automation most often.",
};
