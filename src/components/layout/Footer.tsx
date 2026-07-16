import Link from "next/link";
import { siteConfig, navLinks, footer } from "@/lib/content/site";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer border-t border-border bg-surface py-10 sm:py-14 md:py-20">
      <div className="container-main">
        <div className="site-footer-grid">
          <div className="site-footer-brand">
            <Logo layout="stacked" linked={false} className="site-footer-logo" />
            <p className="site-footer-copy mt-4 max-w-sm leading-relaxed text-muted sm:mt-5">
              A custom software partner for any industry. Booking systems, client
              portals, field apps, and e-commerce — built for how you actually work.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-arrow site-footer-email mt-4 inline-block break-all normal-case tracking-normal sm:mt-5 sm:break-normal"
            >
              {siteConfig.email}
            </a>
          </div>

          <div className="site-footer-col">
            <p className="mono-label">Site</p>
            <ul className="site-footer-links mt-3 space-y-2 text-muted sm:mt-4 sm:space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-hover transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/work" className="link-hover transition-colors hover:text-foreground">
                  All work
                </Link>
              </li>
            </ul>
          </div>

          <div className="site-footer-col">
            <p className="mono-label">Contact</p>
            <ul className="site-footer-links mt-3 space-y-2 text-muted sm:mt-4 sm:space-y-2.5">
              {footer.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/") ? (
                    <Link href={l.href} className="link-hover transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="link-hover break-all transition-colors hover:text-foreground sm:break-normal">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer-bottom mt-10 border-t border-border pt-6 md:mt-12 md:pt-8">
          <p className="text-xs leading-relaxed text-muted">
            © {year} {siteConfig.legalName} · {footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
