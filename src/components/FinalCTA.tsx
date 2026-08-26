import React, { useState } from "react";
import { ArrowRight, Star, Mail, MapPin, Phone, CheckCircle2, Sparkles } from "lucide-react";
import { NexovateLogo } from "./NexovateLogo";
import { usePresentation } from "@/context/PresentationContext";
import { realStudentsGroup, priyaAvatar, arjunAvatar, hariniAvatar } from "@/assets";

export const FinalCTA: React.FC = () => {
  const { openEnquiryModal } = usePresentation();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error">("idle");

  const handleScrollToAnchor = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setNewsletterStatus("error");
      return;
    }
    setNewsletterStatus("success");
    setNewsletterEmail("");
  };

  return (
    <footer id="final-cta" className="relative w-full overflow-x-clip select-none font-sans">
      {/* 1. TOP LIGHT NEWSLETTER SECTION (Matching screenshot layout & Nexovate brand) */}
      <div className="w-full bg-[#FAFBFC] pt-16 pb-28 px-4 sm:px-6 lg:px-12 border-t border-[#101536]/08 text-center text-[#101536]">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Aesthetic Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#6366F1]/10 text-[#6366F1] text-xs font-mono font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STAY AHEAD IN YOUR JOURNEY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#101536] mb-3 font-jakarta">
            Subscribe to our newsletter
          </h2>

          <p className="text-sm sm:text-base text-[#5E6675] font-medium mb-8 max-w-lg leading-relaxed">
            Sign up today and get updates on upcoming learning cohorts, skill roadmaps, and student project showcases.
          </p>

          {/* Centered Email Form */}
          <div className="w-full max-w-md mb-6">
            {newsletterStatus === "success" ? (
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#10B981] bg-[#D1FAE5] p-3.5 rounded-2xl border border-[#10B981]/30 shadow-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you for subscribing! We'll keep you updated.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
                <div className="relative w-full flex-1">
                  <Mail className="w-4 h-4 text-[#5E6675] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      setNewsletterStatus("idle");
                    }}
                    required
                    className="w-full pl-11 pr-4 py-3.5 text-xs bg-white border border-[#101536]/15 rounded-2xl text-[#101536] placeholder:text-[#5E6675]/50 focus:outline-none focus:border-[#6366F1] shadow-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto min-h-[46px] px-6 py-3.5 bg-[#101536] hover:bg-[#6366F1] text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md shrink-0"
                >
                  Get started
                </button>
              </form>
            )}
            {newsletterStatus === "error" && (
              <p className="text-[11px] text-red-500 mt-2 font-mono">
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/* Mentors Social Avatar Proof */}
          <div className="flex items-center gap-3 text-xs text-[#5E6675] font-medium">
            <div className="flex items-center -space-x-2">
              <img src={priyaAvatar} alt="Mentor" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
              <img src={arjunAvatar} alt="Mentor" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
              <img src={hariniAvatar} alt="Mentor" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
            </div>
            <span>Our academic mentors are ready to help!</span>
          </div>
        </div>
      </div>

      {/* 2. FLOATING OVERLAPPING CTA CARD (Overlaps between light section and dark footer) */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 -mb-20 z-20">
        <div className="w-full rounded-3xl bg-[#101536] border border-white/15 p-8 sm:p-10 shadow-2xl overflow-hidden text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="text-xs font-mono font-bold text-[#F97316] uppercase tracking-wider block mb-2">
                APPLIED LEARNING PLATFORM
              </span>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3 leading-tight font-jakarta">
                Experience applied learning <br />
                <span className="text-[#6366F1]">with real student projects.</span>
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-md mb-6 font-medium leading-relaxed">
                Explore 10+ emerging tracks across AI, Full Stack, Data Science & Design with practitioner mentorship.
              </p>

              <button
                onClick={() => openEnquiryModal()}
                className="min-h-[46px] inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[#101536] font-bold text-xs uppercase tracking-wider hover:bg-[#6366F1] hover:text-white transition-all shadow-lg group"
              >
                <span>Get started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Column Student Photo Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs aspect-[4/3] rounded-2xl bg-white p-2 shadow-xl border border-white/20 transform rotate-2">
                <div className="absolute -top-3 left-6 w-12 h-4 bg-[#F97316]/60 -rotate-6 rounded-xs shadow-xs z-10" />
                <img
                  src={realStudentsGroup}
                  alt="Nexovate Students"
                  className="w-full h-full object-cover rounded-xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FULL-WIDTH DARK NAVY FOOTER (Covers entire page width) */}
      <div className="w-full bg-[#0B1028] text-white pt-32 pb-12 px-4 sm:px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 text-left">
            {/* LEFT COLUMN: LOGO & DUMMY PHYSICAL ADDRESS */}
            <div className="md:col-span-5 flex flex-col items-start">
              <NexovateLogo size={36} variant="dark" showTagline={true} className="mb-5" />

              {/* Full Physical Dummy Address */}
              <div className="space-y-1.5 text-xs text-white/70 leading-relaxed font-normal mb-6">
                <p className="font-bold text-white text-sm mb-1 font-jakarta">Nexovate Learning Hub</p>
                <p>208/9 Anna Salai, 4th Floor</p>
                <p>Suite 116, Block B</p>
                <p>Anna Nagar, Chennai, TN 600040</p>
                <p>India</p>
              </div>

              {/* Direct Phone & Email */}
              <div className="space-y-2 text-xs font-mono text-white/80">
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

            {/* RIGHT COLUMNS: QUICK LINKS, SOCIAL & LEGAL (Matching screenshot structure) */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
              {/* Quick Links */}
              <div>
                <span className="font-bold text-white uppercase tracking-wider block mb-4 font-mono text-[11px]">
                  Quick links
                </span>
                <ul className="space-y-2.5 text-white/70">
                  <li><button onClick={() => handleScrollToAnchor("hero")} className="hover:text-[#6366F1] transition-colors">Hero</button></li>
                  <li><button onClick={() => handleScrollToAnchor("explore")} className="hover:text-[#6366F1] transition-colors">Explore</button></li>
                  <li><button onClick={() => handleScrollToAnchor("experience")} className="hover:text-[#6366F1] transition-colors">Journey</button></li>
                  <li><button onClick={() => handleScrollToAnchor("programs")} className="hover:text-[#6366F1] transition-colors">Programs</button></li>
                  <li><button onClick={() => handleScrollToAnchor("projects")} className="hover:text-[#6366F1] transition-colors">Projects</button></li>
                  <li><button onClick={() => handleScrollToAnchor("about")} className="hover:text-[#6366F1] transition-colors">About us</button></li>
                  <li><button onClick={() => handleScrollToAnchor("contact")} className="hover:text-[#6366F1] transition-colors">Contact us</button></li>
                </ul>
              </div>

              {/* Social Media Favicons & Links */}
              <div>
                <span className="font-bold text-white uppercase tracking-wider block mb-4 font-mono text-[11px]">
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
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#1DA1F2] transition-colors">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <span>Twitter</span>
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
                <span className="font-bold text-white uppercase tracking-wider block mb-4 font-mono text-[11px]">
                  Legal
                </span>
                <ul className="space-y-2.5 text-white/70">
                  <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Terms of service</a></li>
                  <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Privacy policy</a></li>
                  <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Cookie policy</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* BOTTOM COPYRIGHT BAR */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
            <p>© 2026 Nexovate. All rights reserved.</p>
            <button
              onClick={() => handleScrollToAnchor("hero")}
              className="text-[#6366F1] font-bold hover:text-white transition-colors font-mono"
            >
              Return to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
