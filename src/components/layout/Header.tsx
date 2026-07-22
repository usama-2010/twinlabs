"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/content/site";
import { Logo } from "@/components/brand/Logo";
import { motionTokens } from "@/lib/motion";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <header
        className={`site-nav fixed top-0 right-0 left-0 z-50 pt-[env(safe-area-inset-top)] ${scrolled || menuOpen ? "is-scrolled" : ""}`}
      >
        <div className="container-main flex h-14 min-w-0 items-center justify-between gap-3 sm:h-[3.75rem] md:h-[4.25rem] xl:grid xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:items-center">
          <Logo
            layout="horizontal"
            priority
            className="site-nav-logo max-w-[min(100%,11rem)] shrink-0 sm:max-w-none xl:justify-self-start"
          />

          <nav
            className="hidden min-w-0 items-center justify-center gap-5 xl:flex xl:justify-self-center 2xl:gap-8"
            aria-label="Main"
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link whitespace-nowrap">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-end gap-2 xl:justify-self-end">
            <a
              href="/#contact"
              className="btn-primary btn-nav-cta group !hidden xl:!inline-flex"
            >
              Get in touch
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground sm:h-[2.375rem] sm:w-[2.375rem] xl:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-y-auto border-t border-border bg-[rgba(244,250,248,0.98)] px-[max(1rem,env(safe-area-inset-left))] pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] backdrop-blur-md top-[calc(3.5rem+env(safe-area-inset-top))] sm:top-[calc(3.75rem+env(safe-area-inset-top))] md:top-[calc(4.25rem+env(safe-area-inset-top))] xl:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + i * 0.06,
                    duration: motionTokens.duration.base,
                    ease: motionTokens.ease.silk,
                  }}
                >
                  <a
                    href={link.href}
                    className="mobile-menu-link block"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="/#contact"
              className="btn-primary btn-menu-cta group mt-6 w-full justify-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35,
                duration: motionTokens.duration.base,
                ease: motionTokens.ease.silk,
              }}
              onClick={() => setMenuOpen(false)}
            >
              Get in touch
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
