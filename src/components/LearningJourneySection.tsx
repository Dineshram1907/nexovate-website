import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Play,
  Maximize2,
  Volume2,
  Search,
  RefreshCw,
  ExternalLink,
  Users,
  CloudUpload,
  Star,
} from "lucide-react";
import { nexovateLogo, arjunAvatar } from "@/assets";

/* ── VISUAL 1: LEARN IT VISUAL LAYER ── */
const LearnItVisual: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#FBFAF7] rounded-[28px] sm:rounded-[36px] border border-[#071A2B]/8 shadow-[0_24px_70px_rgba(7,26,43,0.10)] overflow-hidden flex flex-col select-none text-[#071A2B]">
      {/* Top Header */}
      <div className="h-12 sm:h-14 px-4 sm:px-6 bg-white/90 border-b border-[#071A2B]/8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <img src={nexovateLogo} alt="Nexovate" className="h-4 sm:h-5 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#F2F1EC] px-3 py-1.5 rounded-full text-xs text-[#071A2B]/60 w-44">
            <Search className="w-3.5 h-3.5 text-[#071A2B]/40" />
            <span>Search lessons...</span>
          </div>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#071A2B]/10">
            <img src={arjunAvatar} alt="Student" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 grid grid-cols-12 min-h-0 divide-x divide-[#071A2B]/8">
        {/* Module Sidebar */}
        <div className="hidden lg:flex col-span-3 p-4 flex-col justify-between bg-white/50">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#071A2B]/50 mb-3 px-2 font-jakarta">
              Web Development
            </div>
            <div className="space-y-1">
              {[
                { num: "01", name: "Introduction", active: true },
                { num: "02", name: "HTML Fundamentals", active: false },
                { num: "03", name: "CSS Basics", active: false },
                { num: "04", name: "JavaScript Essentials", active: false },
                { num: "05", name: "Building Your First Project", active: false },
                { num: "06", name: "Next Steps", active: false },
              ].map((mod) => (
                <div
                  key={mod.num}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                    mod.active
                      ? "bg-[#11AFC0]/12 text-[#11AFC0] font-semibold"
                      : "text-[#071A2B]/70 hover:bg-[#071A2B]/4"
                  }`}
                >
                  <span className="text-[10px] opacity-60">{mod.num}</span>
                  <span className="truncate">{mod.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="col-span-12 lg:col-span-6 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-[#11AFC0] mb-1">01. Introduction</div>
            <h4 className="text-sm sm:text-base font-bold text-[#071A2B] tracking-tight mb-3 font-jakarta">
              Understand how the modern web works and what you'll build.
            </h4>

            <div className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-[#071A2B] via-[#0D263B] to-[#071A2B] overflow-hidden flex flex-col justify-between p-4 text-white shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-white/80">The Modern Web Made Simple</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#11AFC0]/20 text-[#11AFC0] border border-[#11AFC0]/30">
                  HD
                </span>
              </div>

              <div className="self-center flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110">
                  <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-[#11AFC0]" />
                </div>
                <div className="flex items-center justify-between text-[10px] text-white/70">
                  <span>0:00 / 8:24</span>
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-3.5 h-3.5" />
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Takeaways Sidebar */}
        <div className="hidden lg:flex col-span-3 p-4 flex-col justify-between bg-white/50">
          <div>
            <div className="flex items-center gap-3 border-b border-[#071A2B]/8 pb-2 mb-3 text-xs">
              <span className="font-bold text-[#071A2B] border-b-2 border-[#11AFC0] pb-1">Notes</span>
              <span className="text-[#071A2B]/50 hover:text-[#071A2B]">Resources</span>
              <span className="text-[#071A2B]/50 hover:text-[#071A2B]">Transcript</span>
            </div>

            <div className="text-xs font-bold text-[#071A2B] mb-2 font-jakarta">Key Takeaways</div>
            <ul className="space-y-1.5 text-xs text-[#071A2B]/75 mb-4">
              <li className="flex items-start gap-1.5">
                <span className="text-[#11AFC0] font-bold">•</span>
                <span>How the web works</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#11AFC0] font-bold">•</span>
                <span>Front-end vs back-end</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#11AFC0] font-bold">•</span>
                <span>Tools you'll use</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-[#11AFC0] font-bold">•</span>
                <span>What you'll build</span>
              </li>
            </ul>

            <div className="p-2.5 rounded-xl bg-[#11AFC0]/10 border border-[#11AFC0]/20 text-[11px] text-[#071A2B]/80 font-medium">
              Curiosity today. Capability tomorrow.
            </div>
          </div>

          <button className="w-full py-2 px-3 rounded-xl bg-[#071A2B] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#071A2B]/90 transition-colors">
            <span>Continue</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── VISUAL 2: BUILD IT VISUAL LAYER ── */
const BuildItVisual: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#0D1520] rounded-[28px] sm:rounded-[36px] border border-white/10 shadow-[0_24px_70px_rgba(7,26,43,0.18)] overflow-hidden flex flex-col select-none text-white">
      {/* Top Header */}
      <div className="h-11 sm:h-12 px-4 bg-[#090F17] border-b border-white/8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10">
            <span className="text-xs font-bold text-white/90 font-jakarta">Nexovate Studio</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#11AFC0] text-[#071A2B] font-bold text-xs px-3 py-1 rounded-full shadow-sm">
          <Play className="w-3 h-3 fill-[#071A2B]" />
          <span>Run</span>
        </div>
      </div>

      {/* Split Workspace */}
      <div className="flex-1 grid grid-cols-12 min-h-0 divide-x divide-white/8">
        {/* File Tree */}
        <div className="hidden md:flex col-span-3 p-3 bg-[#0B121C] flex-col text-xs text-white/70">
          <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2 px-1 font-jakarta">
            My Project
          </div>
          <div className="space-y-1 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 text-white/50 pl-1">
              <span>▼</span> <span>src</span>
            </div>
            <div className="pl-4 space-y-1 text-white/60">
              <div className="hover:text-white">components</div>
              <div className="hover:text-white">pages</div>
              <div className="hover:text-white">styles</div>
              <div className="hover:text-white">utils</div>
              <div className="bg-[#11AFC0]/20 text-[#11AFC0] font-semibold px-1.5 py-0.5 rounded">
                App.tsx
              </div>
              <div className="hover:text-white">main.tsx</div>
              <div className="hover:text-white">index.css</div>
            </div>
            <div className="pt-1 text-white/50 pl-1">package.json</div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="col-span-12 md:col-span-5 p-3 sm:p-4 bg-[#0D1520] font-mono text-[11px] sm:text-xs leading-relaxed overflow-hidden">
          <div className="flex items-center gap-2 mb-3 pb-1 border-b border-white/5 text-[11px] text-white/50">
            <span className="text-[#11AFC0] border-b border-[#11AFC0] pb-1 font-sans font-medium">
              App.tsx ×
            </span>
          </div>
          <pre className="text-white/80 overflow-x-hidden">
            <code>
              <span className="text-[#F43F5E]">import</span> React{" "}
              <span className="text-[#F43F5E]">from</span>{" "}
              <span className="text-[#10B981]">'react'</span>
              {"\n"}
              <span className="text-[#F43F5E]">import</span> Header{" "}
              <span className="text-[#F43F5E]">from</span>{" "}
              <span className="text-[#10B981]">'./components/Header'</span>
              {"\n"}
              <span className="text-[#F43F5E]">import</span> Hero{" "}
              <span className="text-[#F43F5E]">from</span>{" "}
              <span className="text-[#10B981]">'./components/Hero'</span>
              {"\n"}
              <span className="text-[#F43F5E]">import</span> Features{" "}
              <span className="text-[#F43F5E]">from</span>{" "}
              <span className="text-[#10B981]">'./components/Features'</span>
              {"\n\n"}
              <span className="text-[#60A5FA]">function</span>{" "}
              <span className="text-[#FBBF24]">App</span>() {"{\n"}
              {"  "}
              <span className="text-[#F43F5E]">return</span> ({"\n"}
              {"    "}&lt;<span className="text-[#60A5FA]">div</span>{" "}
              <span className="text-[#A78BFA]">className</span>=
              <span className="text-[#10B981]">"min-h-screen"</span>&gt;{"\n"}
              {"      "}&lt;<span className="text-[#FBBF24]">Header</span> /&gt;{"\n"}
              {"      "}&lt;<span className="text-[#FBBF24]">Hero</span> /&gt;{"\n"}
              {"      "}&lt;<span className="text-[#FBBF24]">Features</span> /&gt;{"\n"}
              {"    "}&lt;/<span className="text-[#60A5FA]">div</span>&gt;{"\n"}
              {"  "}&#41;{"\n"}
              {"}\n\n"}
              <span className="text-[#F43F5E]">export default</span> App;
            </code>
          </pre>
        </div>

        {/* Live Preview */}
        <div className="hidden sm:flex col-span-12 md:col-span-4 p-3 bg-[#111A26] flex-col">
          <div className="h-6 px-2 bg-[#1A2433] rounded-md flex items-center justify-between text-[10px] text-white/50 mb-2 font-mono">
            <div className="flex items-center gap-1.5">
              <span>🔒</span>
              <span className="text-white/80">http://localhost:5173</span>
            </div>
            <RefreshCw className="w-2.5 h-2.5 text-white/40" />
          </div>

          <div className="flex-1 bg-gradient-to-b from-white to-[#F6F5F0] rounded-lg p-3 text-[#071A2B] flex flex-col justify-between shadow-sm overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold tracking-tight font-jakarta">Nexovate</span>
                <div className="w-3 h-2 flex flex-col justify-between">
                  <span className="w-full h-0.5 bg-[#071A2B]" />
                  <span className="w-full h-0.5 bg-[#071A2B]" />
                </div>
              </div>

              <h5 className="text-xs font-bold text-[#071A2B] leading-tight mb-1 font-jakarta">
                Build Without Limits
              </h5>
              <p className="text-[9.5px] text-[#071A2B]/70 leading-snug mb-2">
                Turn your ideas into real projects with Nexovate.
              </p>
              <button className="px-2 py-1 rounded bg-[#071A2B] text-white text-[9px] font-semibold">
                Get Started
              </button>
            </div>

            <div className="w-full h-12 rounded bg-gradient-to-r from-[#11AFC0]/20 via-[#071A2B]/10 to-[#EFAF32]/20 flex items-center justify-center text-[9px] font-medium text-[#071A2B]/60">
              🏔️ Live Canvas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── VISUAL 3: MAKE IT REAL VISUAL LAYER ── */
const MakeItRealVisual: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#FFFFFF] rounded-[28px] sm:rounded-[36px] border border-[#071A2B]/8 shadow-[0_24px_70px_rgba(7,26,43,0.12)] overflow-hidden flex flex-col select-none text-[#071A2B]">
      {/* Top Header */}
      <div className="h-12 px-4 sm:px-6 bg-white border-b border-[#071A2B]/8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <img src={nexovateLogo} alt="Nexovate" className="h-4 sm:h-5 w-auto object-contain" />
          <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-[#071A2B]/70">
            <span className="text-[#071A2B] font-semibold">Home</span>
            <span>Features</span>
            <span>Pricing</span>
            <span>About</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live on the web</span>
          </div>
          <button className="hidden sm:block px-3 py-1 rounded-full bg-[#071A2B] text-white text-xs font-semibold">
            Get Started
          </button>
        </div>
      </div>

      {/* Hero Canvas */}
      <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-white via-[#FAF9F5] to-[#F2EFE9]">
        <div className="max-w-md">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#071A2B] tracking-tight leading-tight mb-2 font-jakarta">
            Ideas that make an impact.
          </h3>
          <p className="text-xs sm:text-sm text-[#071A2B]/70 leading-relaxed mb-4 font-sans">
            A modern platform to help teams build, collaborate and create without limits.
          </p>
          <div className="flex items-center gap-2.5">
            <button className="px-4 py-2 rounded-xl bg-[#071A2B] text-white text-xs font-bold shadow-md hover:bg-[#071A2B]/90 transition-colors">
              Get Started
            </button>
            <button className="px-3.5 py-2 rounded-xl bg-white border border-[#071A2B]/15 text-[#071A2B] text-xs font-semibold hover:bg-white/80 transition-colors flex items-center gap-1">
              <span>View Demo</span>
              <ExternalLink className="w-3 h-3 text-[#071A2B]/60" />
            </button>
          </div>
        </div>

        {/* Live Telemetry Capsule */}
        <div className="self-end mt-4 sm:mt-0 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-[#071A2B]/10 shadow-[0_16px_40px_rgba(7,26,43,0.12)] flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#11AFC0]/10 flex items-center justify-center text-[#11AFC0]">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-[#071A2B]">12.4K</div>
              <div className="text-[10px] text-[#071A2B]/60 font-medium">Users</div>
            </div>
          </div>

          <div className="h-6 w-px bg-[#071A2B]/10" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <CloudUpload className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-[#071A2B]">98%</div>
              <div className="text-[10px] text-[#071A2B]/60 font-medium">Uptime</div>
            </div>
          </div>

          <div className="h-6 w-px bg-[#071A2B]/10" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#EFAF32]/15 flex items-center justify-center text-[#EFAF32]">
              <Star className="w-4 h-4 fill-[#EFAF32]" />
            </div>
            <div>
              <div className="text-sm font-extrabold text-[#071A2B]">4.9</div>
              <div className="text-[10px] text-[#071A2B]/60 font-medium">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── STAGES DATA ── */
const STAGES = [
  {
    id: "learn-it",
    title: "LEARN IT",
    description:
      "Build strong fundamentals through concepts, practice, experimentation and mentorship.",
  },
  {
    id: "build-it",
    title: "BUILD IT",
    description:
      "Turn knowledge into projects through code, design, problem-solving and experimentation.",
  },
  {
    id: "make-it-real",
    title: "MAKE IT REAL",
    description:
      "Finish something real — a working product, portfolio piece or deployed experience.",
  },
];

/* ── SECTION 4 COMPONENT ── */
export const LearningJourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progressMotion = useMotionValue(0);

  const targetProgressRef = useRef(0);
  const visualProgressRef = useRef(0);
  const isAnimatingRef = useRef(false);

  // Single requestAnimationFrame interpolation loop for cinematic visual progress smoothing (damping ~0.10)
  useEffect(() => {
    let rafId: number | null = null;

    const startSmoothingLoop = () => {
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const tick = () => {
        const diff = targetProgressRef.current - visualProgressRef.current;
        if (Math.abs(diff) > 0.0005) {
          // Moderate damping (~0.10) for responsive, direct-connection feel without lag
          visualProgressRef.current += diff * 0.10;
          progressMotion.set(visualProgressRef.current);
          rafId = requestAnimationFrame(tick);
        } else {
          visualProgressRef.current = targetProgressRef.current;
          progressMotion.set(visualProgressRef.current);
          isAnimatingRef.current = false;
          rafId = null;
        }
      };

      rafId = requestAnimationFrame(tick);
    };

    const computeTargetProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollRange = sectionRef.current.offsetHeight - window.innerHeight;
      if (scrollRange <= 0) return;

      const rawProgress = Math.min(1, Math.max(0, -rect.top / scrollRange));

      // Piecewise progress remapping:
      // RAW 0.00 -> 0.25 : HOLD LEARN IT (storyProgress = 0)
      // RAW 0.25 -> 0.50 : SLOW LEARN -> BUILD transition (storyProgress: 0.00 -> 0.25)
      // RAW 0.50 -> 0.70 : BUILD IT (storyProgress: 0.25 -> 0.55)
      // RAW 0.70 -> 0.85 : SLOW BUILD -> MAKE REAL transition (storyProgress: 0.55 -> 0.78)
      // RAW 0.85 -> 1.00 : MAKE IT REAL (storyProgress: 0.78 -> 1.00)
      let storyProgress = 0;
      if (rawProgress <= 0.25) {
        storyProgress = 0;
      } else if (rawProgress <= 0.50) {
        storyProgress = ((rawProgress - 0.25) / 0.25) * 0.25;
      } else if (rawProgress <= 0.70) {
        storyProgress = 0.25 + ((rawProgress - 0.50) / 0.20) * 0.30;
      } else if (rawProgress <= 0.85) {
        storyProgress = 0.55 + ((rawProgress - 0.70) / 0.15) * 0.23;
      } else {
        storyProgress = 0.78 + ((rawProgress - 0.85) / 0.15) * 0.22;
      }

      targetProgressRef.current = Math.max(0, Math.min(1, storyProgress));
    };

    const handleScroll = () => {
      computeTargetProgress();
      startSmoothingLoop();
    };

    // Instant sync on mount without delay
    computeTargetProgress();
    visualProgressRef.current = targetProgressRef.current;
    progressMotion.set(visualProgressRef.current);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [progressMotion]);

  // ── LEFT HEADINGS DELIBERATE CINEMATIC TIMING ──
  // Stage 0: LEARN IT (storyProgress 0.00 -> 0.25)
  const title0Opacity = useTransform(progressMotion, [0, 0.15, 0.30], [1, 1, 0.35]);
  const title0Scale = useTransform(progressMotion, [0, 0.15, 0.30], [1, 1, 0.985]);
  const title0X = useTransform(progressMotion, [0, 0.15, 0.30], [8, 8, 0]);
  const title0Color = useTransform(progressMotion, [0, 0.15, 0.30], ["#071A2B", "#071A2B", "#68747D"]);

  // Stage 1: BUILD IT (storyProgress 0.25 -> 0.55)
  const title1Opacity = useTransform(progressMotion, [0.18, 0.30, 0.55, 0.70], [0.35, 1, 1, 0.35]);
  const title1Scale = useTransform(progressMotion, [0.18, 0.30, 0.55, 0.70], [0.985, 1, 1, 0.985]);
  const title1X = useTransform(progressMotion, [0.18, 0.30, 0.55, 0.70], [0, 8, 8, 0]);
  const title1Color = useTransform(progressMotion, [0.18, 0.30, 0.55, 0.70], ["#68747D", "#071A2B", "#071A2B", "#68747D"]);

  // Stage 2: MAKE IT REAL (storyProgress 0.55 -> 1.00)
  const title2Opacity = useTransform(progressMotion, [0.55, 0.75, 1], [0.35, 1, 1]);
  const title2Scale = useTransform(progressMotion, [0.55, 0.75, 1], [0.985, 1, 1]);
  const title2X = useTransform(progressMotion, [0.55, 0.75, 1], [0, 8, 8]);
  const title2Color = useTransform(progressMotion, [0.55, 0.75, 1], ["#68747D", "#071A2B", "#071A2B"]);

  // ── LEFT PARAGRAPH CONTINUOUS INTERPOLATED VALUES ──
  // Copy 0: LEARN IT
  const copy0Opacity = useTransform(progressMotion, [0, 0.14, 0.28], [1, 1, 0]);
  const copy0Y = useTransform(progressMotion, [0, 0.14, 0.28], [0, 0, -12]);

  // Copy 1: BUILD IT
  const copy1Opacity = useTransform(progressMotion, [0.20, 0.32, 0.53, 0.68], [0, 1, 1, 0]);
  const copy1Y = useTransform(progressMotion, [0.20, 0.32, 0.53, 0.68], [12, 0, 0, -12]);

  // Copy 2: MAKE IT REAL
  const copy2Opacity = useTransform(progressMotion, [0.55, 0.75, 1], [0, 1, 1]);
  const copy2Y = useTransform(progressMotion, [0.55, 0.75, 1], [12, 0, 0]);

  // ── RIGHT VISUAL LAYERS CONTINUOUS INTERPOLATED VALUES ──
  // Layer 0: LEARN IT
  const visual0Opacity = useTransform(progressMotion, [0, 0.15, 0.30], [1, 1, 0]);
  const visual0Scale = useTransform(progressMotion, [0, 0.15, 0.30], [1, 1, 0.985]);
  const visual0Y = useTransform(progressMotion, [0, 0.15, 0.30], [0, 0, -16]);

  // Layer 1: BUILD IT
  const visual1Opacity = useTransform(progressMotion, [0.18, 0.30, 0.55, 0.70], [0, 1, 1, 0]);
  const visual1Scale = useTransform(progressMotion, [0.18, 0.30, 0.55, 0.70], [0.98, 1, 1, 0.98]);
  const visual1Y = useTransform(progressMotion, [0.18, 0.30, 0.55, 0.70], [18, 0, 0, -16]);

  // Layer 2: MAKE IT REAL
  const visual2Opacity = useTransform(progressMotion, [0.55, 0.75, 1], [0, 1, 1]);
  const visual2Scale = useTransform(progressMotion, [0.55, 0.75, 1], [0.98, 1, 1]);
  const visual2Y = useTransform(progressMotion, [0.55, 0.75, 1], [18, 0, 0]);

  return (
    <section
      ref={sectionRef}
      id="learning-journey"
      className="journey-section relative w-full md:h-[300dvh] bg-[#F6F5F0] text-[#071A2B] select-none"
      aria-label="Section 04: The Journey — Learn It, Build It, Make It Real"
    >
      {/* ── DESKTOP STICKY VIEWPORT (Pinned at top: 0, height: 100dvh) ── */}
      <div className="journey-sticky hidden md:flex sticky top-0 h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#F6F5F0]">
        <div className="journey-content max-w-[1400px] w-full h-full mx-auto px-6 sm:px-10 lg:px-12 xl:px-16 grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Column: Anchored Stage Controls (Stationary inside sticky viewport) */}
          <div className="journey-left col-span-5 flex flex-col justify-center pr-4">
            <div className="space-y-4 mb-8">
              {/* STAGE 0: LEARN IT */}
              <div className="select-none">
                <motion.h2
                  style={{
                    opacity: title0Opacity,
                    scale: title0Scale,
                    x: title0X,
                    color: title0Color,
                  }}
                  className="text-4xl xl:text-5xl font-black tracking-tight font-jakarta"
                >
                  {STAGES[0].title}
                </motion.h2>
              </div>

              {/* STAGE 1: BUILD IT */}
              <div className="select-none">
                <motion.h2
                  style={{
                    opacity: title1Opacity,
                    scale: title1Scale,
                    x: title1X,
                    color: title1Color,
                  }}
                  className="text-4xl xl:text-5xl font-black tracking-tight font-jakarta"
                >
                  {STAGES[1].title}
                </motion.h2>
              </div>

              {/* STAGE 2: MAKE IT REAL */}
              <div className="select-none">
                <motion.h2
                  style={{
                    opacity: title2Opacity,
                    scale: title2Scale,
                    x: title2X,
                    color: title2Color,
                  }}
                  className="text-4xl xl:text-5xl font-black tracking-tight font-jakarta"
                >
                  {STAGES[2].title}
                </motion.h2>
              </div>
            </div>

            {/* Supporting Copy Container for Active State (Stationary & Clipped) */}
            <div className="relative min-h-[85px] overflow-hidden">
              <motion.p
                style={{ opacity: copy0Opacity, y: copy0Y }}
                className="absolute inset-0 text-base xl:text-lg text-[#071A2B]/85 leading-relaxed font-sans max-w-md pointer-events-none"
              >
                {STAGES[0].description}
              </motion.p>
              <motion.p
                style={{ opacity: copy1Opacity, y: copy1Y }}
                className="absolute inset-0 text-base xl:text-lg text-[#071A2B]/85 leading-relaxed font-sans max-w-md pointer-events-none"
              >
                {STAGES[1].description}
              </motion.p>
              <motion.p
                style={{ opacity: copy2Opacity, y: copy2Y }}
                className="absolute inset-0 text-base xl:text-lg text-[#071A2B]/85 leading-relaxed font-sans max-w-md pointer-events-none"
              >
                {STAGES[2].description}
              </motion.p>
            </div>
          </div>

          {/* Right Column: Visual Viewport with Absolute Layers (Stationary Frame) */}
          <div className="journey-right col-span-7">
            <div className="journey-visual relative w-full h-[480px] xl:h-[520px] rounded-[28px] sm:rounded-[36px] overflow-hidden">
              {/* Layer 0: LEARN IT */}
              <motion.div
                style={{
                  opacity: visual0Opacity,
                  scale: visual0Scale,
                  y: visual0Y,
                }}
                className="journey-visual-layer learn absolute inset-0 w-full h-full overflow-hidden will-change-[transform,opacity]"
              >
                <LearnItVisual />
              </motion.div>

              {/* Layer 1: BUILD IT */}
              <motion.div
                style={{
                  opacity: visual1Opacity,
                  scale: visual1Scale,
                  y: visual1Y,
                }}
                className="journey-visual-layer build absolute inset-0 w-full h-full overflow-hidden will-change-[transform,opacity]"
              >
                <BuildItVisual />
              </motion.div>

              {/* Layer 2: MAKE IT REAL */}
              <motion.div
                style={{
                  opacity: visual2Opacity,
                  scale: visual2Scale,
                  y: visual2Y,
                }}
                className="journey-visual-layer real absolute inset-0 w-full h-full overflow-hidden will-change-[transform,opacity]"
              >
                <MakeItRealVisual />
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* ── MOBILE VIEW: Natural Sequential Stack (No Sticky, Natural Flow, Zero Spacers) ── */}
      <div className="block md:hidden py-16 px-6 sm:px-10 space-y-16">
        {/* Block 1 */}
        <div className="space-y-4">
          <h3 className="text-3xl font-black text-[#071A2B] tracking-tight font-jakarta">
            LEARN IT
          </h3>
          <p className="text-base text-[#071A2B]/80 leading-relaxed font-sans pb-2">
            Build strong fundamentals through concepts, practice, experimentation and mentorship.
          </p>
          <div className="w-full">
            <LearnItVisual />
          </div>
        </div>

        {/* Block 2 */}
        <div className="space-y-4 pt-8 border-t border-[#071A2B]/10">
          <h3 className="text-3xl font-black text-[#071A2B] tracking-tight font-jakarta">
            BUILD IT
          </h3>
          <p className="text-base text-[#071A2B]/80 leading-relaxed font-sans pb-2">
            Turn knowledge into projects through code, design, problem-solving and experimentation.
          </p>
          <div className="w-full">
            <BuildItVisual />
          </div>
        </div>

        {/* Block 3 */}
        <div className="space-y-4 pt-8 border-t border-[#071A2B]/10">
          <h3 className="text-3xl font-black text-[#071A2B] tracking-tight font-jakarta">
            MAKE IT REAL
          </h3>
          <p className="text-base text-[#071A2B]/80 leading-relaxed font-sans pb-2">
            Finish something real — a working product, portfolio piece or deployed experience.
          </p>
          <div className="w-full">
            <MakeItRealVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningJourneySection;

