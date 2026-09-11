import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Globe, ArrowUpRight } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
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

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
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

export const Footer: React.FC = () => {
  const { openEnquiryModal } = usePresentation();

  return (
    <section className="w-full bg-[#050714] text-white pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-10 relative overflow-hidden select-none font-sans">
      <div className="max-w-7xl mx-auto w-full flex flex-col">
        
        {/* ============================================================ */}
        {/* 1. RESTRAINED TOP CTA                                        */}
        {/* ============================================================ */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20 md:mb-24 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white font-jakarta mb-3 uppercase">
            BUILD WHAT&apos;S NEXT.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/65 max-w-md leading-relaxed mb-6 font-normal">
            Learn the skills. Build real things. Make them real.
          </p>
          <button
            onClick={() => openEnquiryModal()}
            className="group inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white/[0.07] hover:bg-white text-white hover:text-[#071A2B] border border-white/20 hover:border-white text-xs sm:text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.12)] cursor-pointer"
            aria-label="Get Started with Nexovate"
          >
            <span>GET STARTED</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* ============================================================ */}
        {/* 2. LIQUID GLASS FOOTER CONTAINER                            */}
        {/* ============================================================ */}
        <motion.footer
          id="footer"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: "easeOut",
          }}
          className="liquid-glass w-full rounded-[28px] p-6 sm:p-8 md:p-10 text-white/70 relative"
          aria-label="Nexovate Footer"
        >
          {/* Content Layer (Keeps text above border pseudo-element) */}
          <div className="relative z-[1] flex flex-col justify-between">
            
            {/* Main Footer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-10 sm:pb-12">
              
              {/* Brand Column (md:col-span-5) */}
              <div className="md:col-span-5 flex flex-col items-start pr-0 md:pr-6">
                <Link
                  to="/"
                  className="text-xl sm:text-2xl font-black tracking-tight text-white font-jakarta hover:opacity-90 transition-opacity"
                  aria-label="Nexovate Home"
                >
                  NEXOVATE
                </Link>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#11AFC0] block mt-1.5 font-jakarta">
                  LEARN. BUILD. MAKE IT REAL.
                </span>
                <p className="text-xs sm:text-[13px] text-white/60 max-w-sm font-normal leading-relaxed mt-3">
                  A modern learning platform helping students turn technology skills into real-world projects and opportunities.
                </p>
              </div>

              {/* Navigation Grid (md:col-span-7) -> 3 Columns */}
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6">
                
                {/* Column 1: EXPLORE */}
                <div>
                  <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-white/90 block mb-3.5">
                    EXPLORE
                  </span>
                  <ul className="space-y-2.5 text-sm text-white/60">
                    <li>
                      <Link to="/about" className="hover:text-white transition-colors duration-200 block">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses" className="hover:text-white transition-colors duration-200 block">
                        Programs
                      </Link>
                    </li>
                    <li>
                      <Link to="/showcase" className="hover:text-white transition-colors duration-200 block">
                        Student Work
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="hover:text-white transition-colors duration-200 block">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 2: LEARN */}
                <div>
                  <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-white/90 block mb-3.5">
                    LEARN
                  </span>
                  <ul className="space-y-2.5 text-sm text-white/60">
                    <li>
                      <Link to="/courses" className="hover:text-white transition-colors duration-200 block">
                        Programs
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses" className="hover:text-white transition-colors duration-200 block">
                        Workshops
                      </Link>
                    </li>
                    <li>
                      <Link to="/showcase" className="hover:text-white transition-colors duration-200 block">
                        Projects
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Column 3: CONNECT */}
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-white/90 block mb-3.5">
                    CONNECT
                  </span>
                  <ul className="space-y-2.5 text-sm text-white/60">
                    <li>
                      <a
                        href="https://www.linkedin.com/in/nexovate-edutech-private-limted-506ab6434/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-white transition-all duration-200 group"
                      >
                        <LinkedinIcon className="w-4 h-4 opacity-65 group-hover:opacity-100 group-hover:-translate-y-px transition-all duration-200 shrink-0" />
                        <span>LinkedIn</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/nexovateedutech?stkn=MWV2NGJvZDhva29lcg=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-white transition-all duration-200 group"
                      >
                        <InstagramIcon className="w-4 h-4 opacity-65 group-hover:opacity-100 group-hover:-translate-y-px transition-all duration-200 shrink-0" />
                        <span>Instagram</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://nexovate.org.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:text-white transition-all duration-200 group"
                      >
                        <Globe className="w-4 h-4 opacity-65 group-hover:opacity-100 group-hover:-translate-y-px transition-all duration-200 shrink-0" />
                        <span>Website</span>
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] uppercase tracking-widest text-white/50">
              <div>
                © 2026 NEXOVATE
              </div>
              <div className="flex items-center gap-4">
                <Link to="/about" className="hover:text-white transition-colors duration-200">
                  Privacy
                </Link>
                <span className="opacity-30">·</span>
                <Link to="/about" className="hover:text-white transition-colors duration-200">
                  Terms
                </Link>
                <span className="opacity-30">·</span>
                <a
                  href="https://www.linkedin.com/in/nexovate-edutech-private-limted-506ab6434/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  LinkedIn
                </a>
                <span className="opacity-30">·</span>
                <a
                  href="https://www.instagram.com/nexovateedutech?stkn=MWV2NGJvZDhva29lcg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Instagram
                </a>
              </div>
            </div>

          </div>
        </motion.footer>

      </div>
    </section>
  );
};

export default Footer;
