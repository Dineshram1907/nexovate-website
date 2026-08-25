"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
} from "lucide-react";
import { NexovateLogo } from "./NexovateLogo";
import { usePresentation } from "@/context/PresentationContext";

// DEMO CONTACT DATA — Replace before production.

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

export const FinalCTA: React.FC = () => {
  const { goToSection, setActiveProgramIndex } = usePresentation();

  const handleExplorePrograms = () => {
    setActiveProgramIndex(0);
    goToSection(2); // Slide 03 Programs
  };

  const handleTalkToUs = () => {
    goToSection(8); // Slide 09 Contact
  };

  const exploreLinks = [
    { name: "Why Nexovate", sectionIndex: 1, href: "#why-nexovate" },
    { name: "Programs", sectionIndex: 2, href: "#programs" },
    { name: "Experience", sectionIndex: 3, href: "#experience" },
    { name: "Projects", sectionIndex: 4, href: "#projects" },
    { name: "Student Reviews", sectionIndex: 5, href: "#reviews" },
  ];

  const companyLinks = [
    { name: "Institutions", sectionIndex: 6, href: "#institutions" },
    { name: "About", sectionIndex: 7, href: "#about" },
    { name: "Contact", sectionIndex: 8, href: "#contact" },
  ];

  const socialLinks = [
    { name: "Instagram", href: "#", icon: InstagramIcon },
    { name: "LinkedIn", href: "#", icon: LinkedinIcon },
    { name: "YouTube", href: "#", icon: YoutubeIcon },
  ];

  return (
    <footer
      id="final-cta"
      className="relative w-full min-h-[100svh] lg:h-full flex flex-col justify-between py-12 sm:py-16 px-6 sm:px-12 lg:px-20 bg-[#0B1028] text-[#F7F9FC] overflow-hidden select-none"
    >
      {/* Background Subtle Watermark & Atmospheric Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.025] flex items-center justify-center">
        <div className="scale-[2.2]">
          <NexovateLogo size={340} showText={false} />
        </div>
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[260px] bg-[#119E9D]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. TOP CINEMATIC STATEMENT & FINAL CALL TO ACTION                         */}
      {/* ========================================================================= */}
      <div className="max-w-4xl mx-auto w-full text-center z-10 my-auto pt-6 sm:pt-4 pb-8 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/06 border border-white/12 text-xs font-mono font-semibold tracking-widest text-[#EFAF32] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>READY FOR WHAT'S NEXT?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F7F9FC] mb-4 leading-tight">
            YOUR NEXT MOVE <br />
            <span className="text-[#119E9D] relative inline-block">
              STARTS HERE
              <span className="text-[#EFAF32]">.</span>
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#9AA5B5] max-w-lg mx-auto mb-8 font-light leading-relaxed">
            Stop waiting for permission. Master real engineering, build production repositories, and move forward.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={handleExplorePrograms}
              className="min-h-[46px] inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#119E9D] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#15b5b4] hover:-translate-y-0.5 transition-all duration-200 shadow-md group focus:outline-none focus:ring-2 focus:ring-[#119E9D]"
            >
              <span>EXPLORE PROGRAMS</span>
              <ArrowRight className="w-4 h-4 text-[#EFAF32] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleTalkToUs}
              className="min-h-[46px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/08 border border-white/15 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/15 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span>TALK TO US</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 2. COMPLETE PROFESSIONAL FOOTER NAVIGATION & BUSINESS INFORMATION        */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10 z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start mb-8">
          {/* LEFT COLUMN (Col 1-5): Exact Logo, Description, Address & Contacts */}
          <div className="md:col-span-5 flex flex-col items-start text-left">
            <NexovateLogo variant="dark" size={38} showTagline={true} className="mb-2" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#119E9D] uppercase mb-2 block">
              NEXT • LEARN • INNOVATE
            </span>

            <p className="text-xs text-[#9AA5B5] max-w-sm leading-relaxed mb-5 font-normal">
              Nexovate helps students build practical technology skills, explore emerging fields and prepare for what comes next.
            </p>

            {/* Business Contact Information */}
            <div className="space-y-2 text-xs font-mono text-[#9AA5B5]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#119E9D] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Nexovate Learning Centre, Anna Nagar, Chennai, Tamil Nadu 600040, India
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#119E9D] shrink-0" />
                <span className="text-[#F7F9FC] font-semibold">+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#119E9D] shrink-0" />
                <span className="text-[#F7F9FC] font-semibold">hello@nexovate.in</span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#EFAF32] shrink-0" />
                <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMNS (Col 6-12): EXPLORE, COMPANY, CONNECT */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8 text-xs">
            {/* EXPLORE Column */}
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#119E9D] uppercase block mb-3">
                EXPLORE
              </span>
              <ul className="space-y-2">
                {exploreLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => goToSection(link.sectionIndex)}
                      className="text-[#9AA5B5] hover:text-[#F7F9FC] transition-colors duration-200 text-left focus:outline-none"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPANY Column */}
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#119E9D] uppercase block mb-3">
                COMPANY
              </span>
              <ul className="space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => goToSection(link.sectionIndex)}
                      className="text-[#9AA5B5] hover:text-[#F7F9FC] transition-colors duration-200 text-left focus:outline-none"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONNECT Column with Social Icons */}
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#119E9D] uppercase block mb-3">
                CONNECT
              </span>
              <ul className="space-y-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        className="inline-flex items-center gap-2 text-[#9AA5B5] hover:text-[#119E9D] transition-all duration-200 group hover:-translate-y-0.5"
                      >
                        <Icon className="w-3.5 h-3.5 text-white/70 group-hover:text-[#119E9D] transition-colors" />
                        <span>{social.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. FOOTER BOTTOM BAR: COPYRIGHT, PRIVACY, TERMS & RETURN TO TOP            */}
        {/* ========================================================================= */}
        <div className="pt-4 border-t border-white/08 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#9AA5B5]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono">© 2026 Nexovate. All rights reserved.</span>
            <span>•</span>
            <a href="#" className="hover:text-[#F7F9FC] transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#F7F9FC] transition-colors">
              Terms & Conditions
            </a>
          </div>

          <button
            onClick={() => goToSection(0)}
            className="inline-flex items-center gap-1.5 text-[#F7F9FC] hover:text-[#119E9D] transition-colors focus:outline-none font-mono text-[10px] uppercase tracking-wider"
          >
            <span>Return to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#119E9D]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
