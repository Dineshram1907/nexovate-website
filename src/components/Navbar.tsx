"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NexovateLogo } from "./NexovateLogo";
import { ArrowUpRight } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";

export const Navbar: React.FC = () => {
  const { openEnquiryModal } = usePresentation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Explore", href: "#explore" },
    { name: "Programs", href: "#programs" },
    { name: "How It Works", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Student Stories", href: "#reviews" },
    { name: "Institutions", href: "#institutions" },
    { name: "About", href: "#about" },
  ];

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#FAFBFC]/90 backdrop-blur-md border-b border-[#101536]/06 select-none transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Official Brand Logo with Tagline */}
          <a
            href="#hero"
            onClick={(e) => handleAnchorClick(e, "#hero")}
            className="focus:outline-none focus:ring-2 focus:ring-[#119E9D] rounded-lg transition-transform hover:opacity-90 text-left py-1"
            aria-label="Go to Home"
          >
            <NexovateLogo size={32} showTagline={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#5E6675] hover:text-[#101536] hover:bg-[#101536]/04 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA (NO LOGIN BUTTON) */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => openEnquiryModal()}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-5 py-2.5 rounded-xl bg-[#6366F1] text-white hover:bg-[#4F46E5] transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative w-11 h-11 rounded-2xl bg-[#101536]/05 hover:bg-[#101536]/10 flex flex-col items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#119E9D] transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`w-5 h-0.5 bg-[#101536] rounded-full transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-[#101536] rounded-full transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-[#101536] rounded-full transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* MOBILE DROPDOWN MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 sm:top-18 bg-[#FAFBFC] border-b border-[#101536]/10 shadow-xl z-40 lg:hidden p-6"
          >
            <div className="flex flex-col gap-3 max-w-md mx-auto">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleAnchorClick(e, item.href)}
                  className="py-2.5 px-4 rounded-xl text-sm font-bold text-[#101536] hover:bg-[#6366F1]/10 hover:text-[#6366F1] transition-colors text-left"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2 border-t border-[#101536]/10">
                <a
                  href="#contact"
                  onClick={(e) => handleAnchorClick(e, "#contact")}
                  className="w-full py-3 px-4 rounded-xl bg-[#6366F1] text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Get Started</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
