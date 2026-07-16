import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { siteConfig } from "@/lib/content/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "TwinLabs | Custom Software for Any Business",
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: "TwinLabs | Custom Software for Any Business",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/brand/logo-stacked.png",
        width: 1024,
        height: 1024,
        alt: "TwinLabs — Web Development, Automation, Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TwinLabs | Custom Software for Any Business",
    description: siteConfig.description,
    images: ["/brand/logo-stacked.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      data-theme="light"
      className={`${dmSans.variable} ${playfair.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.setAttribute("data-theme","light");document.documentElement.style.colorScheme="light";try{localStorage.setItem("theme","light")}catch(e){}})();`,
          }}
        />
      </head>
      <body className="relative min-h-full flex flex-col bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
