import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { NAV_ROUTES } from "@/constants/navigation";
import { NexovateWordmark } from "./NexovateWordmark";
import "./Navbar.css";

export interface NavbarProps {
  theme?: "dark" | "light";
}

export const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  const { openEnquiryModal } = usePresentation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const location = useLocation();
  const reducedMotion = useReducedMotion() ?? false;
  const scrollPositionRef = useRef(0);

  /* ── 1. Scroll State: Detect when user scrolls beyond the cinematic hero ── */
  useEffect(() => {
    if (location.pathname !== "/") {
      setIsPastHero(true);
      return;
    }

    const handleScroll = () => {
      const heroEl = document.getElementById("landing-hero");
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        setIsPastHero(heroRect.bottom <= 72);
      } else {
        setIsPastHero(window.scrollY > 400);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Determine visual mode: dark = light text over dark video; light = navy text over off-white surface
  const isDark = theme ? theme === "dark" : !isPastHero;

  /* ── 2. Resize Lifecycle: Close mobile drawer on desktop resize ──────── */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1100) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ── 3. Route Changes: Close mobile drawer on route navigation ──────── */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  /* ── 4. Precision Background Scroll Lock (Zero Layout Shift) ────────── */
  useEffect(() => {
    if (mobileMenuOpen) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      const savedY = scrollPositionRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      if (savedY) {
        window.scrollTo(0, savedY);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /* ── 5. Escape Key Handler ──────────────────────────────────────────── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Persistent Fixed Navigation Header */}
      <header
        className={`nav-outer-wrap ${isPastHero ? "nav-outer-wrap--solid" : ""} ${
          mobileMenuOpen ? "opacity-0 pointer-events-none" : ""
        }`}
        aria-label="Main Navigation Header"
      >
        {/* Navigation Shell (Aligned with Hero Horizontal Grid) */}
        <nav
          className="nav-shell"
          aria-label="Primary Navigation"
        >
          {/* ── LEFT CELL: NEXOVATE WORDMARK ────────────────────────────── */}
          <div className="nav-cell-left">
            <Link
              to="/"
              className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11AFC0] rounded-lg transition-opacity hover:opacity-90 group block py-1"
              aria-label="Nexovate Home"
            >
              <NexovateWordmark
                variant="island"
                theme={isDark ? "dark" : "light"}
                showTagline={false}
              />
            </Link>
          </div>

          {/* ── CENTER CELL: EDITORIAL NAVIGATION LINKS ─────────────────── */}
          <div className="nav-cell-center">
            <div className="nav-links-wrap">
              {NAV_ROUTES.map((item) => {
                const isRouteActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`nav-link ${!isDark ? "nav-link--dark-theme" : ""} ${
                      isRouteActive ? "nav-link--active" : ""
                    }`}
                    aria-current={isRouteActive ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    {isRouteActive && (
                      <motion.div
                        layoutId="navActiveIndicator"
                        className="nav-active-bar"
                        transition={{
                          type: reducedMotion ? "tween" : "spring",
                          stiffness: 420,
                          damping: 32,
                          duration: reducedMotion ? 0.05 : undefined,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT CELL: GET STARTED CTA & MOBILE BURGER ─────────────── */}
          <div className="nav-cell-right">
            {/* Solid CTA */}
            <button
              type="button"
              onClick={() => openEnquiryModal()}
              className={`nav-cta-btn ${!isDark ? "nav-cta-btn--dark-theme" : ""}`}
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </button>

            {/* Mobile / Tablet Burger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={`nav-burger ${!isDark ? "nav-burger--dark-theme" : ""}`}
              aria-expanded={mobileMenuOpen}
              aria-label="Open navigation menu"
            >
              <span className={`nav-burger-bar ${!isDark ? "nav-burger-bar--dark-theme" : ""}`} />
              <span className={`nav-burger-bar ${!isDark ? "nav-burger-bar--dark-theme" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── PREMIUM FLOATING GLASSMORPHIC MOBILE CARD (< 1100px only) ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Subtle Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0.01 : 0.35, ease: "easeOut" }}
              className="fixed inset-0 z-[1090] bg-[#071A2B]/[0.06] backdrop-blur-[3px]"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Floating Glassmorphic Card */}
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.985 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.985 }}
              transition={{
                duration: reducedMotion ? 0.05 : 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed top-4 left-4 right-4 sm:top-[18px] sm:left-5 sm:right-5 max-w-[520px] mx-auto z-[1100] rounded-[28px] overflow-hidden max-h-[calc(100dvh-32px)] flex flex-col"
              style={{
                backgroundColor: "rgba(246, 245, 240, 0.92)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(7, 26, 43, 0.10)",
                boxShadow: "0 20px 60px rgba(7, 26, 43, 0.12)",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              {/* Header: Exact 1 Logo on Left, Exact 1 Clean Circle Close on Right */}
              <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-[#071A2B]/[0.10] flex items-center justify-between shrink-0">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="shrink-0 focus:outline-none"
                  aria-label="Nexovate Home"
                >
                  <NexovateWordmark
                    variant="island"
                    theme="light"
                    showTagline={false}
                    size={32}
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] rounded-full bg-transparent border border-[#11AFC0]/75 flex items-center justify-center text-[#071A2B] hover:bg-[#11AFC0]/[0.08] active:bg-[#11AFC0]/[0.12] transition-colors group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11AFC0]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-[#071A2B] transition-transform duration-300 ease-out group-hover:rotate-90 group-active:rotate-90" />
                </button>
              </div>

              {/* Body: Navigation Links + Clean Spacing */}
              <div className="px-5 sm:px-6 py-2 overflow-y-auto flex flex-col">
                <nav className="flex flex-col" aria-label="Mobile navigation links">
                  {NAV_ROUTES.map((item, index) => {
                    const isRouteActive = location.pathname === item.href;
                    return (
                      <motion.div
                        key={item.label}
                        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                        animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        transition={{
                          delay: reducedMotion ? 0 : 0.05 + index * 0.05,
                          duration: reducedMotion ? 0.05 : 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-4 sm:py-[18px] border-b border-[#071A2B]/[0.12] flex items-center justify-between group transition-colors cursor-pointer"
                          style={{
                            fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                          }}
                        >
                          <span
                            className={`text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                              isRouteActive
                                ? "text-[#11AFC0]"
                                : "text-[#071A2B] group-hover:text-[#11AFC0]"
                            }`}
                          >
                            {item.label}
                          </span>
                          <ArrowUpRight
                            className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                              isRouteActive
                                ? "opacity-100 text-[#11AFC0]"
                                : "opacity-40 text-[#071A2B] group-hover:opacity-100 group-hover:text-[#11AFC0]"
                            }`}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Natural flow CTA Button */}
                <motion.div
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  transition={{
                    delay: reducedMotion ? 0 : 0.05 + NAV_ROUTES.length * 0.05,
                    duration: reducedMotion ? 0.05 : 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="pt-5 pb-4"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openEnquiryModal();
                    }}
                    className="w-full h-14 rounded-full bg-[#071A2B] hover:bg-[#102B40] text-[#F6F5F0] font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#11AFC0]"
                    style={{
                      fontFamily: "var(--font-jakarta), system-ui, sans-serif",
                    }}
                  >
                    <span>Get Started</span>
                    <ArrowUpRight className="w-4 h-4 text-[#F6F5F0]" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
