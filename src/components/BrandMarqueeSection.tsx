import React from "react";

const KEYWORD_PHRASES = [
  "BUILD",
  "CREATE",
  "SHAPE",
  "DEPLOY",
  "INSPECT",
  "LEAD",
  "LEARN",
];

const COMPANY_LOGOS = [
  {
    name: "Zoho",
    component: () => (
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center -space-x-1 h-5">
          <span className="w-3.5 h-3.5 rounded-[3px] border-[2px] border-[#E42528] bg-transparent -rotate-6 transform" />
          <span className="w-3.5 h-3.5 rounded-[3px] border-[2px] border-[#22A048] bg-transparent rotate-3 transform" />
          <span className="w-3.5 h-3.5 rounded-[3px] border-[2px] border-[#0091D5] bg-transparent -rotate-3 transform" />
          <span className="w-3.5 h-3.5 rounded-[3px] border-[2px] border-[#F9A01B] bg-transparent rotate-6 transform" />
        </div>
        <span className="text-[7.5px] font-black tracking-[0.22em] text-[#071A2B]/80 font-sans -mt-0.5">ZOHO</span>
      </div>
    ),
  },
  {
    name: "Tata Consultancy Services",
    component: () => (
      <div className="flex items-center gap-1.5">
        <span className="text-sm sm:text-base font-black tracking-tight text-[#E6007E] font-sans lowercase leading-none">tcs</span>
        <div className="flex flex-col text-[7px] font-bold tracking-wider leading-[1.05] text-[#071A2B]/80 border-l border-[#071A2B]/20 pl-1.5 font-sans uppercase">
          <span>TATA</span>
          <span>CONSULTANCY</span>
          <span>SERVICES</span>
        </div>
      </div>
    ),
  },
  {
    name: "Wipro",
    component: () => (
      <div className="flex items-center gap-1.5">
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="2.8" fill="#11AFC0" />
          <circle cx="16" cy="6" r="1.6" fill="#E42528" />
          <circle cx="21" cy="7.5" r="1.6" fill="#F36F21" />
          <circle cx="24.5" cy="11" r="1.6" fill="#F9A01B" />
          <circle cx="26" cy="16" r="1.6" fill="#22A048" />
          <circle cx="24.5" cy="21" r="1.6" fill="#0091D5" />
          <circle cx="21" cy="24.5" r="1.6" fill="#005B94" />
          <circle cx="16" cy="26" r="1.6" fill="#6366F1" />
          <circle cx="11" cy="24.5" r="1.6" fill="#8B5CF6" />
          <circle cx="7.5" cy="21" r="1.6" fill="#A855F7" />
          <circle cx="6" cy="16" r="1.6" fill="#EC4899" />
          <circle cx="7.5" cy="11" r="1.6" fill="#EF4444" />
          <circle cx="11" cy="7.5" r="1.6" fill="#E42528" />
        </svg>
        <span className="font-bold text-xs sm:text-sm tracking-tight text-[#071A2B]/90 lowercase font-sans">wipro</span>
      </div>
    ),
  },
  {
    name: "HCLTech",
    component: () => (
      <div className="flex items-baseline gap-1">
        <span className="text-sm sm:text-base font-black italic tracking-tighter text-[#0284C7] font-sans">HCL</span>
        <span className="text-[10px] font-bold tracking-tight text-[#071A2B]/90 font-sans">Tech</span>
      </div>
    ),
  },
  {
    name: "Infosys",
    component: () => (
      <div className="flex items-center">
        <span className="text-sm sm:text-base font-bold tracking-tight text-[#0284C7] font-sans">Infosys</span>
      </div>
    ),
  },
  {
    name: "Accenture",
    component: () => (
      <div className="flex items-center">
        <span className="font-bold text-xs sm:text-[13px] text-[#071A2B]/90 font-sans tracking-tight">accenture</span>
        <span className="font-black text-xs sm:text-sm text-[#9333EA] ml-0.5 leading-none">&gt;</span>
      </div>
    ),
  },
  {
    name: "Cognizant",
    component: () => (
      <div className="flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-[#2563EB] shrink-0" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="12" cy="12" r="3.5" fill="currentColor" />
        </svg>
        <span className="font-bold text-xs sm:text-[13px] text-[#071A2B]/90 font-sans tracking-tight">Cognizant</span>
      </div>
    ),
  },
  {
    name: "Tech Mahindra",
    component: () => (
      <div className="flex items-center gap-1.5">
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="3.5" height="3.5" rx="0.8" fill="#DC2626" />
          <rect x="8" y="4" width="3.5" height="3.5" rx="0.8" fill="#DC2626" />
          <rect x="14" y="4" width="3.5" height="3.5" rx="0.8" fill="#DC2626" />
          <rect x="18" y="8" width="3.5" height="3.5" rx="0.8" fill="#DC2626" />
          <rect x="18" y="14" width="3.5" height="3.5" rx="0.8" fill="#DC2626" />
          <rect x="14" y="16" width="3.5" height="3.5" rx="0.8" fill="#DC2626" />
          <rect x="8" y="16" width="3.5" height="3.5" rx="0.8" fill="#DC2626" />
          <rect x="2" y="12" width="3.5" height="3.5" rx="0.8" fill="#DC2626" />
        </svg>
        <div className="flex items-center leading-none">
          <span className="font-extrabold text-[11px] sm:text-xs text-[#071A2B]/90 font-sans tracking-tight">Tech</span>
          <span className="font-normal text-[11px] sm:text-xs text-[#DC2626] font-sans tracking-tight ml-0.5">Mahindra</span>
        </div>
      </div>
    ),
  },
];

export const BrandMarqueeSection: React.FC = () => {
  return (
    <section id="brand-marquee" className="brand-marquee-section relative w-full bg-[#F6F5F0] text-[#071A2B] pt-20 pb-16 sm:pt-28 sm:pb-24 border-b border-[#071A2B]/10 overflow-hidden select-none font-sans">
      
      {/* ============================================================ */}
      {/* SECTION 3: "BUILD WHAT COMES NEXT." IMPACT HEADLINE          */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-12 sm:mb-16 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center justify-center gap-2.5 mb-4">
          <span className="w-5 h-[1.5px] bg-[#11AFC0]" />
          <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.22em] uppercase text-[#11AFC0]">
            LEARNING IS ONLY THE BEGINNING
          </span>
          <span className="w-5 h-[1.5px] bg-[#11AFC0]" />
        </div>

        {/* Monumental Impact Statement */}
        <h2 className="font-sans font-extrabold text-[clamp(38px,6.5vw,90px)] text-[#071A2B] leading-[0.92] tracking-[-0.055em] max-w-[900px] mb-4">
          <span>BUILD WHAT </span>
          <span className="text-[#11AFC0]">COMES NEXT</span>
          <span className="text-[#EFAF32]">.</span>
        </h2>

        {/* Supporting Subtitle */}
        <p className="font-sans text-[clamp(14px,1.5vw,18px)] text-[#071A2B]/75 font-normal leading-relaxed max-w-[540px] tracking-normal">
          Learn. Build. Shape Tomorrow.
        </p>
      </div>

      {/* ============================================================ */}
      {/* COMPANY MARQUEE / TICKER ROWS                                */}
      {/* ============================================================ */}
      <div className="w-full flex flex-col gap-6 sm:gap-8">
        
        {/* ROW 1: Principle & Keyword Marquee */}
        <div className="w-full overflow-hidden flex" aria-hidden="true">
          <div className="animate-marquee-infinite flex shrink-0 items-center">
            {Array.from({ length: 4 }).flatMap((_, setIdx) =>
              KEYWORD_PHRASES.map((phrase, idx) => (
                <div key={`phrase-${setIdx}-${idx}`} className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
                  <span className="text-[11px] sm:text-[13px] font-sans font-semibold uppercase tracking-[0.20em] text-[#071A2B]/50">
                    {phrase}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#11AFC0]" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* ROW 2: Enterprise Alumni Trust Marquee */}
        <div className="w-full overflow-hidden flex" aria-hidden="true">
          <div className="animate-marquee-infinite-reverse flex shrink-0 items-center">
            {Array.from({ length: 4 }).flatMap((_, setIdx) =>
              COMPANY_LOGOS.map((company, idx) => (
                <div
                  key={`company-${setIdx}-${idx}`}
                  className="flex items-center gap-10 sm:gap-16 pr-10 sm:pr-16 opacity-80 hover:opacity-100 transition-opacity"
                >
                  {company.component()}
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandMarqueeSection;
