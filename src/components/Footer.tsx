"use client";

import React from "react";
import { NexovateLogo } from "./NexovateLogo";
import { NAV_ITEMS } from "@/constants/navigation";

export const Footer: React.FC = () => {
  const handleScrollToAnchor = (target: string) => {
    const targetId = target.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="w-full bg-[#0B1028] text-white pt-16 pb-12 px-4 sm:px-6 lg:px-12 border-t border-white/10 select-none font-sans">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 text-left">
          {/* Brand & Direct Contact Coordinates */}
          <div className="md:col-span-5 flex flex-col items-start">
            <NexovateLogo size={36} variant="dark" showTagline={true} className="mb-4" />
            <p className="text-xs text-white/70 max-w-sm font-normal leading-relaxed mb-6">
              Nexovate is an applied EdTech learning platform helping students discover interests, master practical skills, and build real capstone projects.
            </p>

            <div className="space-y-1.5 text-xs text-white/80 leading-relaxed font-normal mb-5">
              <p className="font-bold text-white text-sm mb-1 font-jakarta">Nexovate Learning Hub</p>
              <p className="text-white/70">208/9 Anna Salai, 4th Floor, Anna Nagar, Chennai, TN 600040</p>
            </div>

            <div className="space-y-1.5 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-[#6366F1] font-bold text-[10px] uppercase w-14">PHONE</span>
                <span className="text-white font-semibold">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6366F1] font-bold text-[10px] uppercase w-14">EMAIL</span>
                <span className="text-white font-semibold">support@nexovate.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links, Social & Legal Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            {/* Quick Navigation Links (Using same NAV_ITEMS single-source order) */}
            <div>
              <span className="font-bold text-white uppercase tracking-wider block mb-4 text-xs">
                Navigation
              </span>
              <ul className="space-y-2.5 text-white/70">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleScrollToAnchor(item.target)}
                      className="hover:text-[#6366F1] transition-colors cursor-pointer text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <span className="font-bold text-white uppercase tracking-wider block mb-4 text-xs">
                Social
              </span>
              <ul className="space-y-3 text-white/70">
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#1877F2] transition-colors">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#E1306C] transition-colors">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#0A66C2] transition-colors">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#FF0000] transition-colors">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span>YouTube</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <span className="font-bold text-white uppercase tracking-wider block mb-4 text-xs">
                Legal
              </span>
              <ul className="space-y-2.5 text-white/70">
                <li><a href="#about" onClick={() => handleScrollToAnchor("#about")} className="hover:text-white transition-colors cursor-pointer">Terms of service</a></li>
                <li><a href="#about" onClick={() => handleScrollToAnchor("#about")} className="hover:text-white transition-colors cursor-pointer">Privacy policy</a></li>
                <li><a href="#about" onClick={() => handleScrollToAnchor("#about")} className="hover:text-white transition-colors cursor-pointer">Cookie policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© 2026 Nexovate. All rights reserved.</p>
          <button
            onClick={() => handleScrollToAnchor("#hero")}
            className="text-[#6366F1] font-bold hover:text-white transition-colors cursor-pointer"
          >
            Return to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
