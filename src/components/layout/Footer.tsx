import Link from "next/link";
import { siteConfig, navLinks, footer } from "@/lib/content/site";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface py-16 md:py-20">
      <div className="container-main">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo layout="stacked" linked={false} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              A custom software partner for any industry. Booking systems, client
              portals, field apps, and e-commerce — built for how you actually work.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-arrow mt-5 inline-block normal-case tracking-normal"
            >
              {siteConfig.email}
            </a>
          </div>

          <div>
            <p className="mono-label">Site</p>
            <ul className="mt-5 space-y-3 text-sm text-muted">
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

          <div>
            <p className="mono-label">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              {footer.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/") ? (
                    <Link href={l.href} className="link-hover transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="link-hover transition-colors hover:text-foreground">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <p className="text-xs text-muted">
            © {year} {siteConfig.legalName} · {footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
