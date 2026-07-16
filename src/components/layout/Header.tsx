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
        className={`site-nav fixed top-0 right-0 left-0 z-50 ${scrolled || menuOpen ? "is-scrolled" : ""}`}
      >
        <div className="site-nav-inner container-main">
          <Logo layout="horizontal" priority className="site-nav-logo" />

          <nav className="site-nav-links" aria-label="Main">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="site-nav-actions">
            <a href="/#contact" className="btn-primary btn-nav-cta group">
              Get in touch
              <ArrowRight className="h-3 w-3 lg:h-3.5 lg:w-3.5" />
            </a>
            <button
              type="button"
              className="site-nav-menu-btn"
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
            className="mobile-menu"
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
