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

  return (
    <>
      <header
        className={`site-nav fixed top-0 right-0 left-0 z-50 ${scrolled ? "is-scrolled" : ""}`}
      >
        <div className="container-main flex h-16 items-center justify-between md:h-[4.25rem]">
          <Logo layout="horizontal" priority />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" className="btn-primary group hidden text-sm sm:inline-flex">
              Get in touch
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mobile-menu lg:hidden"
            aria-label="Mobile"
          >
            <button
              type="button"
              className="absolute top-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>

            <ul className="mt-4 flex flex-col">
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
              href="#contact"
              className="btn-primary group mt-10 w-full justify-center"
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
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
