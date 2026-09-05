import React from "react";
import { Link } from "react-router-dom";
import { NexovateLogo } from "./NexovateLogo";
import { NAV_ROUTES } from "@/constants/navigation";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="w-full bg-[#050714] text-white pt-20 pb-12 px-6 sm:px-10 lg:px-16 border-t border-white/10 select-none font-sans">
      <div className="max-w-7xl mx-auto w-full text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <NexovateLogo size={36} variant="dark" showTagline={true} className="mb-5" />
            <p className="text-xs text-white/70 max-w-sm font-normal leading-relaxed mb-6">
              Nexovate is an applied education platform helping students discover practical skills, build real production software systems, and shape what's next.
            </p>
            <div className="text-xs text-white/60 space-y-1">
              <p className="font-bold text-white font-jakarta">Nexovate Innovation Hub</p>
              <p>208/9 Anna Salai, 4th Floor, Anna Nagar, Chennai, TN 600040</p>
              <p className="text-white/80 font-mono pt-1">support@nexovate.in • +91 98765 43210</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-5">
              Navigation
            </span>
            <ul className="space-y-3 text-xs text-white/70">
              {NAV_ROUTES.map((route) => (
                <li key={route.label}>
                  <Link
                    to={route.href}
                    className="hover:text-[#119E9D] transition-colors block"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="md:col-span-4">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block mb-5">
              Connect
            </span>
            <div className="flex flex-wrap gap-4 text-xs text-white/70 mb-6">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#119E9D] transition-colors">
                Instagram ↗
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#119E9D] transition-colors">
                LinkedIn ↗
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#119E9D] transition-colors">
                YouTube ↗
              </a>
            </div>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Curriculum aligned with NAAC/NBA criteria and practitioner engineering standards.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div className="flex items-center gap-4">
            <p>© 2026 Nexovate Technologies. All rights reserved.</p>
            <span>•</span>
            <Link to="/about" className="hover:text-white transition-colors">Privacy</Link>
            <span>•</span>
            <Link to="/about" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <button
            onClick={scrollToTop}
            className="text-[#119E9D] font-bold hover:text-white transition-colors cursor-pointer"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
