import type { Industry } from "@/types";

export const industriesSection = {
  title: "Who we build for",
  subtitle:
    "Any sector where software can save time, reduce errors, or grow revenue — if your team is juggling spreadsheets, phones, and paper, we can usually help.",
};

export const industries: Industry[] = [
  {
    name: "Dental clinics",
    solutions: ["Patient booking", "Recall reminders", "Treatment plans", "NHS & private billing"],
  },
  {
    name: "GP & private healthcare",
    solutions: ["Appointment scheduling", "Patient portals", "Referral tracking", "Clinic dashboards"],
  },
  {
    name: "Veterinary practices",
    solutions: ["Pet appointment booking", "Vaccination reminders", "Client records", "Surgery scheduling"],
  },
  {
    name: "Pharmacies",
    solutions: ["Prescription workflows", "Repeat request handling", "Delivery routing", "Stock alerts"],
  },
  {
    name: "Hair, beauty & aesthetics",
    solutions: ["Multi-site booking", "Staff calendars", "Client history", "SMS reminders"],
  },
  {
    name: "Restaurants & hospitality",
    solutions: ["Table reservations", "Kitchen display", "Loyalty schemes", "Delivery coordination"],
  },
  {
    name: "Gyms & leisure",
    solutions: ["Membership management", "Class booking", "Access control", "Trainer scheduling"],
  },
  {
    name: "Estate agents",
    solutions: ["Viewing schedulers", "Lead CRM", "Property portals", "Offer tracking"],
  },
  {
    name: "Legal & conveyancing",
    solutions: ["Case management", "Client portals", "Document exchange", "Milestone tracking"],
  },
  {
    name: "Accounting & finance",
    solutions: ["Secure client uploads", "Deadline reminders", "Workflow automation", "Audit trails"],
  },
  {
    name: "Trades & construction",
    solutions: ["Job dispatch", "Engineer tracking", "Quotes & invoicing", "Photo evidence"],
  },
  {
    name: "Logistics & delivery",
    solutions: ["Driver tracking", "Route planning", "Proof of delivery", "Customer ETAs"],
  },
  {
    name: "Retail & e-commerce",
    solutions: ["Custom storefronts", "Inventory sync", "Abandoned cart recovery", "Wholesale portals"],
  },
  {
    name: "Nurseries & childcare",
    solutions: ["Parent communication", "Attendance registers", "Billing & subsidies", "Room planning"],
  },
];
