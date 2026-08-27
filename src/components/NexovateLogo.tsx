import React from "react";
import { nexovateSymbol } from "@/assets";

interface NexovateLogoProps {
  className?: string;
  size?: number; // Height of symbol mark in px
  showText?: boolean;
  showTagline?: boolean;
  variant?: "light" | "dark" | "badge";
}

export const NexovateLogo: React.FC<NexovateLogoProps> = ({
  className = "",
  size = 40,
  showText = true,
  showTagline = false,
  variant = "light",
}) => {
  const isDark = variant === "dark";
  const isBadge = variant === "badge";
  const textColor = isDark ? "#FFFFFF" : "#101536";
  const accentGold = "#EFAF32";
  const accentTeal = "#119E9D";

  if (isBadge) {
    return (
      <div className={`inline-flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/20 shadow-md select-none ${className}`}>
        <img
          src={nexovateSymbol}
          alt="Nexovate"
          className="h-auto object-contain"
          style={{ height: `${size}px`, width: "auto" }}
        />
        {showText && (
          <div className="flex flex-col justify-center">
            <span className="font-serif font-bold text-lg sm:text-xl tracking-[0.16em] uppercase leading-none text-[#101536]">
              NE<span style={{ color: accentGold }}>X</span>O<span className="text-[#101536]">VATE</span>
            </span>
            {showTagline && (
              <span className="text-[9px] font-sans font-semibold tracking-[0.2em] uppercase mt-0.5 text-[#119E9D]">
                NEXT • LEARN • INNOVATE
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Exact Uploaded Calligraphic N Emblem PNG */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src={nexovateSymbol}
          alt="Nexovate Emblem"
          className="h-auto object-contain transition-transform duration-200 hover:scale-[1.03]"
          style={{ height: `${size}px`, width: "auto" }}
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col justify-center">
          <span
            className="font-serif font-bold text-lg sm:text-2xl tracking-[0.16em] uppercase leading-none"
            style={{ color: textColor }}
          >
            NE<span style={{ color: accentGold }}>X</span>O
            <span style={{ color: textColor }}>VATE</span>
          </span>

          {showTagline && (
            <span
              className="text-[8px] sm:text-[9px] font-sans font-bold tracking-[0.2em] uppercase mt-0.5"
              style={{ color: accentTeal }}
            >
              LEARN. BUILD. SHAPE TOMORROW.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
