import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { NexovateLogo } from "./NexovateLogo";
import { ArrowUpRight } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { NAV_ROUTES } from "@/constants/navigation";

export const Navbar: React.FC = () => {
  const { openEnquiryModal } = usePresentation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, { stiffness: 280, damping: 30, restDelta: 0.001 });

  // Transform on scroll: starts transparent, fades in backdrop on scroll
  const navBgOpacity = useTransform(smoothScroll, [0, 80], [0, 0.94]);
  const navPaddingY = useTransform(smoothScroll, [0, 80], [20, 12]);

  const isHomePage = location.pathname === "/";
  // On home page, the dark hero transitions to the off-white canvas around 60% progress of the 500vh hero
  const [isPastHero, setIsPastHero] = useState(!isHomePage);

  useEffect(() => {
    const handleScroll = () => {
      if (!isHomePage) {
        setIsPastHero(true);
        return;
      }
      // When scrolled past both dark hero & cinematic sections into the light discovery content
      const discoveryEl = document.getElementById("discovery");
      const threshold = discoveryEl
        ? discoveryEl.offsetTop - window.innerHeight * 0.3
        : window.innerHeight * 4.5;
      setIsPastHero(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isLightText = isHomePage && !isPastHero;

  return (
    <motion.header
      style={{
        paddingTop: navPaddingY,
        paddingBottom: navPaddingY,
      }}
      className="fixed top-0 inset-x-0 z-50 select-none font-sans transition-all duration-300 pointer-events-auto"
    >
      {/* Background surface that fades in when past dark hero or on other pages */}
      <motion.div
        style={{
          opacity: isPastHero ? navBgOpacity : 0,
        }}
        className={`absolute inset-0 backdrop-blur-md border-b pointer-events-none -z-10 transition-colors duration-300 ${
          isPastHero
            ? "bg-[#F7F6F2]/90 border-[#0F1535]/08 shadow-xs"
            : "bg-transparent border-transparent"
        }`}
      />

      <div className="max-w-7xl mx-auto px-[var(--page-padding)] flex items-center justify-between relative min-h-[44px]">
        {/* LEFT: NEXOVATE LOGO / WORDMARK */}
        <Link
          to="/"
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#119E9D] rounded-xl transition-opacity hover:opacity-90 text-left py-1 shrink-0 cursor-pointer block group"
          aria-label="Nexovate Home"
        >
          <NexovateLogo size={32} variant={isLightText ? "dark" : "light"} showTagline={true} />
        </Link>

        {/* CENTER: MINIMAL EDITORIAL NAVIGATION (Home, About, Programs, Contact) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-10"
        >
          {NAV_ROUTES.map((item) => {
            const isRouteActive = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`relative py-1 text-[13px] font-medium tracking-wider uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#119E9D] rounded-sm cursor-pointer block ${
                  isLightText
                    ? isRouteActive
                      ? "text-white font-semibold"
                      : "text-white/70 hover:text-white"
                    : isRouteActive
                    ? "text-[#0F1535] font-semibold"
                    : "text-[#576071] hover:text-[#0F1535]"
                }`}
              >
                <span className="relative z-10">
                  {item.label}
                </span>
                {isRouteActive && (
                  <motion.div
                    layoutId="editorialNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#119E9D] rounded-full"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: EDITORIAL GET STARTED CTA */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={() => openEnquiryModal()}
            className={`group min-h-[42px] inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#119E9D] cursor-pointer shadow-sm active:scale-95 ${
              isLightText
                ? "bg-white text-[#0F1535] hover:bg-[#119E9D] hover:text-white"
                : "bg-[#0F1535] text-white hover:bg-[#119E9D]"
            }`}
          >
            <span>Get Started</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#EFAF32] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON (Minimum 44px hit target) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden relative w-11 h-11 rounded-full flex flex-col items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#119E9D] transition-all cursor-pointer active:scale-95 ${
            isLightText
              ? "bg-white/10 text-white backdrop-blur-md border border-white/20"
              : "bg-white text-[#0F1535] shadow-xs border border-[#0F1535]/10"
          }`}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`w-4 h-[1.5px] rounded-full transition-all duration-200 ${
              isLightText ? "bg-white" : "bg-[#0F1535]"
            } ${mobileMenuOpen ? "rotate-45 translate-y-[4.5px]" : ""}`}
          />
          <span
            className={`w-4 h-[1.5px] rounded-full transition-all duration-150 ${
              isLightText ? "bg-white" : "bg-[#0F1535]"
            } ${mobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"}`}
          />
          <span
            className={`w-4 h-[1.5px] rounded-full transition-all duration-200 ${
              isLightText ? "bg-white" : "bg-[#0F1535]"
            } ${mobileMenuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`}
          />
        </button>
      </div>

      {/* MOBILE FULL-WIDTH EDITORIAL DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-x-0 top-full bg-[#0F1535] text-white border-b border-white/10 shadow-2xl px-[var(--page-padding)] py-8 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              {NAV_ROUTES.map((item) => {
                const isRouteActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`min-h-[44px] text-xl font-black tracking-tight text-left py-2 flex items-center justify-between font-jakarta ${
                      isRouteActive ? "text-[#119E9D]" : "text-white/90 hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiryModal();
                }}
                className="w-full min-h-[48px] rounded-xl bg-white text-[#0F1535] hover:bg-[#119E9D] hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95"
              >
                <span>Get Started</span>
                <ArrowUpRight className="w-4 h-4 text-[#EFAF32]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;

