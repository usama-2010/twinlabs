import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPageLayout } from "@/components/sections/LandingPageLayout";
import {
  getIndustryPageBySlug,
  industryPages,
} from "@/lib/content/industry-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industryPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndustryPageBySlug(slug);
  if (!page) return { title: "Not Found" };

  return createPageMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    pathname: `/industries/${page.slug}`,
    ogImage: page.image,
    ogImageAlt: page.imageAlt,
    keywords: page.keywords,
  });
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getIndustryPageBySlug(slug);
  if (!page) notFound();

  return (
    <LandingPageLayout
      page={page}
      sectionLabel="Industries"
      sectionPath="/industries"
    />
  );
}
