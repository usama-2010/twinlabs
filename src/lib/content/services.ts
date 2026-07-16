import type { Service } from "@/types";

export const servicesSection = {
  eyebrow: "Services",
  title: "Our expertise,",
  titleEm: "your success.",
  subtitle:
    "From a software studio that works across sectors. One senior team — discovery, design, and engineering — from first call to production.",
};

/** Bump when replacing photos in /public/images/services (browser cache bust). */
export const SERVICE_IMAGE_VERSION = 1;

export function serviceImageSrc(path: string): string {
  return `${path}?v=${SERVICE_IMAGE_VERSION}`;
}

export const services: Service[] = [
  {
    icon: "Calendar",
    title: "Booking & appointment systems",
    description:
      "Online booking, staff calendars, automated reminders, and waitlists — for dental chairs, salon stations, vet consults, gym classes, and viewing slots.",
    image: "/images/services/booking.jpg",
    imageAlt: "Planner calendar with appointment dates highlighted",
    industries: ["Dental", "Healthcare", "Veterinary", "Salons", "Gyms", "Estate agents"],
  },
  {
    icon: "Users",
    title: "Patient & client portals",
    description:
      "Secure logins for patients, pet owners, tenants, or accountancy clients to upload documents, check progress, and book follow-ups without ringing reception.",
    image: "/images/services/portals.jpg",
    imageAlt: "Healthcare professional using a laptop with a stethoscope nearby",
    industries: ["Healthcare", "Veterinary", "Legal", "Accounting", "Pharmacy"],
  },
  {
    icon: "Truck",
    title: "Field service & job management",
    description:
      "Dispatch boards, mobile apps for engineers and drivers, job sheets, photo capture, and invoicing from the van.",
    image: "/images/services/field-service.jpg",
    imageAlt: "Construction engineers working on site with safety gear",
    industries: ["Trades", "Logistics", "Facilities", "Construction"],
  },
  {
    icon: "ShoppingBag",
    title: "E-commerce & payments",
    description:
      "Custom storefronts, wholesale ordering, Stripe checkout, and inventory that stays in sync with how you actually fulfil orders.",
    image: "/images/services/ecommerce.jpg",
    imageAlt: "Shopping cart and bag representing online retail checkout",
    industries: ["Retail", "Furniture", "Food & drink", "Pharmacy"],
  },
  {
    icon: "BarChart",
    title: "Dashboards & reporting",
    description:
      "Live views of bookings, revenue, stock levels, and team performance — built around the numbers you check every Monday morning.",
    image: "/images/services/dashboards.jpg",
    imageAlt: "Analytics dashboard with charts and performance metrics on a laptop",
    industries: ["Hospitality", "Gyms", "Logistics", "Multi-site retail"],
  },
  {
    icon: "Workflow",
    title: "Workflow automation",
    description:
      "Repeat prescriptions, invoice chasing, document collection, recall letters, and status updates — triggered automatically instead of chased by hand.",
    image: "/images/services/automation.jpg",
    imageAlt: "Checklist being ticked off in a notebook for automated tasks",
    industries: ["Dental", "Pharmacy", "Accounting", "Legal", "Nurseries"],
  },
  {
    icon: "Smartphone",
    title: "Mobile & tablet apps",
    description:
      "Tools for staff on the move: kitchen displays, vet nurses, site managers, and delivery drivers. Offline support where connectivity is patchy.",
    image: "/images/services/mobile.jpg",
    imageAlt: "Smartphone displaying mobile apps next to a laptop",
    industries: ["Restaurants", "Veterinary", "Trades", "Logistics"],
  },
  {
    icon: "Plug",
    title: "Integrations & migrations",
    description:
      "Connecting to Xero, Sage, Dentally, Shopify, existing databases, and third-party APIs — or moving you off a tool that no longer fits.",
    image: "/images/services/integrations.jpg",
    imageAlt: "Developer writing code to connect software systems",
    industries: ["All sectors"],
  },
];
