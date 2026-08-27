"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, CheckCircle2, Sparkles, Phone, MapPin } from "lucide-react";
import { usePresentation } from "@/context/PresentationContext";
import { realStudentsGroup, priyaAvatar, arjunAvatar, hariniAvatar } from "@/assets";

export const FinalCTA: React.FC = () => {
  const { openEnquiryModal } = usePresentation();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error">("idle");

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
    <section id="contact" className="relative w-full overflow-x-clip select-none font-sans bg-[#FAFBFC] scroll-mt-20">
      {/* 1. TOP NEWSLETTER SUBSCRIPTION BLOCK */}
      <div className="w-full pt-16 pb-12 px-4 sm:px-6 lg:px-12 border-t border-[#101536]/08 text-center text-[#101536]">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#6366F1]/10 text-[#6366F1] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STAY AHEAD IN YOUR JOURNEY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#101536] mb-3 font-jakarta">
            Subscribe to our newsletter<span className="text-[#F97316]">.</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#5E6675] font-medium mb-6 max-w-md leading-relaxed">
            Get updates on upcoming learning cohorts, skill roadmaps, and student project showcases.
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
                    className="w-full pl-11 pr-4 py-3 text-xs bg-white border border-[#101536]/15 rounded-xl text-[#101536] placeholder:text-[#5E6675]/50 focus:outline-none focus:border-[#6366F1] shadow-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto min-h-[44px] px-6 py-3 bg-[#101536] hover:bg-[#6366F1] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
            {newsletterStatus === "error" && (
              <p className="text-[11px] text-red-500 mt-2 font-medium">
                Please enter a valid email address.
              </p>
            )}
          </div>

          {/* Mentors Avatar Proof */}
          <div className="flex items-center gap-3 text-xs text-[#5E6675] font-medium">
            <div className="flex items-center -space-x-2">
              <img src={priyaAvatar} alt="Mentor" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
              <img src={arjunAvatar} alt="Mentor" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
              <img src={hariniAvatar} alt="Mentor" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
            </div>
            <span>Academic mentors ready to guide your learning journey</span>
          </div>
        </div>
      </div>

      {/* 2. DIRECT CONTACT INFO STRIP */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-3xl bg-white border border-[#101536]/08 shadow-xs text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#5E6675] uppercase block">CALL OUR ADVISORS</span>
              <span className="text-xs font-bold text-[#101536]">+91 98765 43210</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#119E9D]/10 text-[#119E9D] flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#5E6675] uppercase block">EMAIL INQUIRIES</span>
              <span className="text-xs font-bold text-[#101536]">support@nexovate.in</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#F97316]/10 text-[#F97316] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#5E6675] uppercase block">CAMPUS LOCATION</span>
              <span className="text-xs font-bold text-[#101536]">Anna Nagar, Chennai, TN</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HIGH-IMPACT CLOSING CTA CARD */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-10">
        <div className="w-full rounded-3xl bg-[#101536] border border-white/15 p-8 sm:p-12 shadow-2xl overflow-hidden text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider block mb-2">
                APPLIED LEARNING PLATFORM
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3 leading-tight font-jakarta">
                LET'S BUILD <br />
                <span className="text-[#6366F1]">WHAT'S NEXT.</span> TOGETHER.
              </h3>
              <p className="text-xs sm:text-sm text-white/70 max-w-md mb-6 font-medium leading-relaxed">
                Connect directly with our academic mentors to explore track roadmaps, scholarship eligibility, and upcoming cohorts.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => openEnquiryModal()}
                  className="min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#101536] font-bold text-xs uppercase tracking-wider hover:bg-[#6366F1] hover:text-white transition-all shadow-lg group cursor-pointer"
                >
                  <span>Get Started Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => openEnquiryModal()}
                  className="min-h-[46px] inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors border border-white/15 cursor-pointer"
                >
                  <span>Contact Us</span>
                </button>
              </div>
            </div>

            {/* Right Column Realistic Student Photo */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs aspect-[4/3] rounded-2xl bg-white p-2 shadow-xl border border-white/20 transform rotate-1">
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
    </section>
  );
};
