export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  industries?: string[];
  /** SEO landing page slug under /services */
  landingSlug?: string;
}

export interface Industry {
  name: string;
  solutions: string[];
}

export interface CaseStudy {
  slug: string;
  client: string;
  title: string;
  industry: string;
  featured: boolean;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  challenge: string;
  solution: string;
  results: string[];
  tech: string[];
  timeline: string;
  metrics: { label: string; value: string }[];
  reviewId: string;
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  initials: string;
  caseStudySlug: string;
  projectLabel: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Value {
  title: string;
  description: string;
}

export interface LandingPage {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  lede: string;
  image?: string;
  imageAlt?: string;
  sections: { title: string; body: string }[];
  bullets: string[];
  relatedWorkSlugs: string[];
  relatedLinks: { label: string; href: string }[];
}
