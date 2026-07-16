import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content/case-studies";
import { industryPages } from "@/lib/content/industry-pages";
import { servicePages } from "@/lib/content/service-pages";
import { seoConfig } from "@/lib/seo/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const workUrls = caseStudies.map((study) => ({
    url: `${seoConfig.url}/work/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const serviceUrls = servicePages.map((page) => ({
    url: `${seoConfig.url}/services/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const industryUrls = industryPages.map((page) => ({
    url: `${seoConfig.url}/industries/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: seoConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${seoConfig.url}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${seoConfig.url}/industries`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${seoConfig.url}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...serviceUrls,
    ...industryUrls,
    ...workUrls,
  ];
}

