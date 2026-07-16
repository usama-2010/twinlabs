import type { Metadata } from "next";
import { absoluteUrl, seoConfig } from "@/lib/seo/config";

type OgType = "website" | "article";

type PageMetadataInput = {
  title: string;
  description: string;
  pathname: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: OgType;
  noIndex?: boolean;
  keywords?: string[];
  /** Use for homepage so the root title template is not applied twice. */
  titleAbsolute?: boolean;
};

function buildOgImage(imagePath: string, alt: string) {
  const url = absoluteUrl(imagePath);
  return {
    url,
    width: 1200,
    height: 630,
    alt,
  };
}

export function createPageMetadata({
  title,
  description,
  pathname,
  ogImage = seoConfig.defaultOgImage,
  ogImageAlt = seoConfig.defaultOgImageAlt,
  ogType = "website",
  noIndex = false,
  keywords,
  titleAbsolute = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(pathname);
  const og = buildOgImage(ogImage, ogImageAlt);

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    keywords: keywords ?? [...seoConfig.keywords],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: seoConfig.siteName,
      locale: seoConfig.locale,
      type: ogType,
      images: [og],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [og.url],
      ...(seoConfig.twitterHandle
        ? { site: seoConfig.twitterHandle, creator: seoConfig.twitterHandle }
        : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    category: "technology",
  };
}

export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(seoConfig.url),
    title: {
      default: seoConfig.defaultTitle,
      template: seoConfig.titleTemplate,
    },
    description: seoConfig.defaultDescription,
    keywords: [...seoConfig.keywords],
    applicationName: seoConfig.siteName,
    authors: [{ name: seoConfig.siteName, url: seoConfig.url }],
    creator: seoConfig.siteName,
    publisher: seoConfig.legalName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: seoConfig.url,
    },
    openGraph: {
      title: seoConfig.defaultTitle,
      description: seoConfig.defaultDescription,
      url: seoConfig.url,
      siteName: seoConfig.siteName,
      locale: seoConfig.locale,
      type: "website",
      images: [
        buildOgImage(seoConfig.defaultOgImage, seoConfig.defaultOgImageAlt),
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoConfig.defaultTitle,
      description: seoConfig.defaultDescription,
      images: [absoluteUrl(seoConfig.defaultOgImage)],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
