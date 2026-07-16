import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPageLayout } from "@/components/sections/LandingPageLayout";
import {
  getServicePageBySlug,
  servicePages,
} from "@/lib/content/service-pages";
import { createPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePageBySlug(slug);
  if (!page) return { title: "Not Found" };

  return createPageMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    pathname: `/services/${page.slug}`,
    ogImage: page.image,
    ogImageAlt: page.imageAlt,
    keywords: page.keywords,
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getServicePageBySlug(slug);
  if (!page) notFound();

  return (
    <LandingPageLayout
      page={page}
      sectionLabel="Services"
      sectionPath="/services"
    />
  );
}
