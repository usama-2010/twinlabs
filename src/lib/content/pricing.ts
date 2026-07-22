export const pricingSection = {
  eyebrow: "Pricing",
  title: "Typical project investment",
  titleEm: "for UK SMEs.",
  subtitle:
    "We quote fixed after discovery. The ranges below match projects we have delivered — all figures exclude VAT.",
  footnote: "Discovery and a written scope are free. Exact quote within 48 hours.",
  cta: {
    label: "Request a fixed quote",
    href: "/#contact",
  },
};

export type PricingCategory = {
  title: string;
  range: string;
  duration: string;
  description: string;
  reference: {
    label: string;
    href: string;
  };
  /** Shown on the card when this band is the usual fit */
  common?: boolean;
};

export const pricingCategories: PricingCategory[] = [
  {
    title: "Client portals & tools",
    range: "£4k – £6k",
    duration: "6–8 weeks",
    description:
      "A single-purpose build for one location — upload portals, internal tools, or a focused booking flow. Scope is mapped and signed off before development starts.",
    reference: {
      label: "Sharma & Co client portal",
      href: "/work/sharma-co-client-portal",
    },
  },
  {
    title: "Booking & operations",
    range: "£7k – £12k",
    duration: "8–12 weeks",
    common: true,
    description:
      "Multi-site booking, job management, staff roles, and links to Xero, SMS, or payments. Most of our salon, trade, and professional services work sits in this band.",
    reference: {
      label: "The London Hair Co. booking platform",
      href: "/work/london-hair-co-booking",
    },
  },
  {
    title: "Mobile & platforms",
    range: "£14k – £22k",
    duration: "12–16 weeks",
    description:
      "Offline field apps, multiple systems working together, or phased delivery with milestone billing. Requirements are locked down before build — scope changes are quoted separately.",
    reference: {
      label: "Morrison & Sons job management",
      href: "/work/morrison-sons-job-management",
    },
  },
];

export const pricingAssurances = [
  {
    title: "Fixed price after written scope",
    description:
      "Once discovery is done, you get a fixed quote in writing. No hourly billing, no surprise invoices mid-build.",
  },
  {
    title: "What moves the range",
    description:
      "Integrations, user roles, mobile apps, and phased delivery push projects between bands. We map these in discovery before quoting.",
  },
] as const;

function packageSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export type ContactPackageOption = {
  value: string;
  title: string;
  range: string;
  common?: boolean;
};

/** Contact form package options — derived from pricing bands */
export const contactPackageOptions: ContactPackageOption[] = [
  ...pricingCategories.map((category) => ({
    value: packageSlug(category.title),
    title: category.title,
    range: category.range,
    common: category.common,
  })),
  {
    value: "not-sure",
    title: "Not sure yet",
    range: "We will help you choose in discovery",
  },
];

export type ContactPackageValue = (typeof contactPackageOptions)[number]["value"];

export function getContactPackageLabel(value: string): string {
  const option = contactPackageOptions.find((item) => item.value === value);
  if (!option) return value;
  if (option.value === "not-sure") return option.title;
  return `${option.title} (${option.range})`;
}
