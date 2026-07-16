import { faqs } from "@/lib/content/faq";
import { services } from "@/lib/content/services";
import { siteConfig } from "@/lib/content/site";
import type { CaseStudy } from "@/types";
import { absoluteUrl, seoConfig } from "@/lib/seo/config";

type JsonLd = Record<string, unknown>;

function graph(...nodes: JsonLd[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  });
}

export function organizationSchema(): JsonLd {
  return {
    "@type": "Organization",
    "@id": `${seoConfig.url}/#organization`,
    name: seoConfig.siteName,
    legalName: seoConfig.legalName,
    url: seoConfig.url,
    email: siteConfig.email,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/logo-stacked.png"),
    },
    areaServed: seoConfig.areaServed,
    sameAs: [],
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${seoConfig.url}/#website`,
    url: seoConfig.url,
    name: seoConfig.siteName,
    description: seoConfig.defaultDescription,
    publisher: { "@id": `${seoConfig.url}/#organization` },
    inLanguage: "en-GB",
  };
}

export function professionalServiceSchema(): JsonLd {
  return {
    "@type": "ProfessionalService",
    "@id": `${seoConfig.url}/#service`,
    name: seoConfig.siteName,
    url: seoConfig.url,
    image: absoluteUrl(seoConfig.defaultOgImage),
    description: seoConfig.defaultDescription,
    email: siteConfig.email,
    areaServed: {
      "@type": "Country",
      name: seoConfig.areaServed,
    },
    serviceType: [...seoConfig.serviceTypes],
    provider: { "@id": `${seoConfig.url}/#organization` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Custom software services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };
}

export function faqPageSchema(): JsonLd {
  return {
    "@type": "FAQPage",
    "@id": `${seoConfig.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function homePageJsonLd(): string {
  return graph(
    organizationSchema(),
    websiteSchema(),
    professionalServiceSchema(),
    faqPageSchema()
  );
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function workIndexJsonLd(): string {
  return graph(
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
    ])
  );
}

export function caseStudyJsonLd(study: CaseStudy): string {
  return graph(
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
      { name: study.client, path: `/work/${study.slug}` },
    ]),
    {
      "@type": "Article",
      "@id": absoluteUrl(`/work/${study.slug}`),
      headline: `${study.client} — ${study.title}`,
      description: study.challenge,
      image: absoluteUrl(study.image),
      author: { "@id": `${seoConfig.url}/#organization` },
      publisher: { "@id": `${seoConfig.url}/#organization` },
      mainEntityOfPage: absoluteUrl(`/work/${study.slug}`),
      articleSection: study.industry,
      keywords: [study.industry, study.title, ...study.tech].join(", "),
    }
  );
}

type LandingPageJsonLdInput = {
  page: {
    slug: string;
    seoTitle: string;
    metaDescription: string;
    h1: string;
    image?: string;
    keywords: string[];
  };
  sectionLabel: string;
  sectionPath: string;
};

export function landingPageJsonLd({
  page,
  sectionLabel,
  sectionPath,
}: LandingPageJsonLdInput): string {
  const pagePath = `${sectionPath}/${page.slug}`.replace("//", "/");

  return graph(
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: sectionLabel, path: sectionPath },
      { name: page.h1, path: pagePath },
    ]),
    {
      "@type": "Service",
      "@id": absoluteUrl(pagePath),
      name: page.seoTitle,
      description: page.metaDescription,
      provider: { "@id": `${seoConfig.url}/#organization` },
      areaServed: seoConfig.areaServed,
      ...(page.image ? { image: absoluteUrl(page.image) } : {}),
      keywords: page.keywords.join(", "),
    }
  );
}

export function indexListingJsonLd(
  label: string,
  path: string,
  items: { name: string; path: string }[]
): string {
  return graph(
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: label, path },
    ]),
    {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    }
  );
}
