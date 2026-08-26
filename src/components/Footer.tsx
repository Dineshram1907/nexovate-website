"use client";

import React from "react";
import { NexovateLogo } from "./NexovateLogo";

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-[#0B1028] text-white pt-16 pb-12 border-t border-white/08">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <NexovateLogo size={34} variant="dark" showTagline={true} className="mb-4" />
            <p className="text-sm text-[#9AA8BA] max-w-sm font-normal leading-relaxed mb-3">
              Nexovate is an applied EdTech learning platform helping students discover interests, master practical skills, and build a future they're excited about.
            </p>
            <p className="text-xs font-mono font-bold text-[#EFAF32] italic">
              "Keep learning. Keep building. Keep growing."
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-semibold tracking-wider text-[#9AA8BA] uppercase mb-4">
                Navigation
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#programs" className="text-white/80 hover:text-[#119E9D] transition-colors">
                    Programs
                  </a>
                </li>
                <li>
                  <a href="#why-nexovate" className="text-white/80 hover:text-[#119E9D] transition-colors">
                    Why Nexovate
                  </a>
                </li>
                <li>
                  <a href="#experience" className="text-white/80 hover:text-[#119E9D] transition-colors">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="text-white/80 hover:text-[#119E9D] transition-colors">
                    Student Reviews
                  </a>
                </li>
                <li>
                  <a href="#institutions" className="text-white/80 hover:text-[#119E9D] transition-colors">
                    For Institutions
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-white/80 hover:text-[#119E9D] transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white/80 hover:text-[#119E9D] transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-wider text-[#9AA8BA] uppercase mb-4">
                Programs
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#programs" className="text-white/80 hover:text-[#119E9D] transition-colors">
                    AI & Machine Learning
                  </a>
                </li>
                <li>
                  <a href="#programs" className="text-white/80 hover:text-[#119E9D] transition-colors">
                    Full Stack Web Dev
                  </a>
                </li>
                <li>
                  <a href="#programs" className="text-white/80 hover:text-[#119E9D] transition-colors">
                    Data Science & Analytics
                  </a>
                </li>
                <li>
                  <a href="#programs" className="text-white/80 hover:text-[#119E9D] transition-colors">
                    Cloud & DevOps
                  </a>
                </li>
                <li>
                  <a href="#programs" className="text-white/80 hover:text-[#119E9D] transition-colors">
                    Cybersecurity
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links (Dummy Hashtag URLs for Development) */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end">
            <h4 className="text-xs font-semibold tracking-wider text-[#9AA8BA] uppercase mb-4">
              Connect With Us
            </h4>
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="LinkedIn (Development Placeholder)"
                title="LinkedIn (Development Placeholder)"
                className="w-10 h-10 rounded-full bg-white/05 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#119E9D] hover:border-[#119E9D] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="Instagram (Development Placeholder)"
                title="Instagram (Development Placeholder)"
                className="w-10 h-10 rounded-full bg-white/05 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#119E9D] hover:border-[#119E9D] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                aria-label="YouTube (Development Placeholder)"
                title="YouTube (Development Placeholder)"
                className="w-10 h-10 rounded-full bg-white/05 border border-white/10 flex items-center justify-center text-white/80 hover:text-[#119E9D] hover:border-[#119E9D] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9AA8BA] gap-4">
          <p>© 2026 Nexovate. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
