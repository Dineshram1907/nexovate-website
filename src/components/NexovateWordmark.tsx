import React from "react";
import { nexovateSymbol } from "@/assets";

export interface NexovateWordmarkProps {
  className?: string;
  variant?: "hero" | "island" | "footer" | "badge";
  theme?: "dark" | "light"; // dark = light text on dark surface; light = navy text on light surface
  showText?: boolean;
  showTagline?: boolean;
  size?: number; // optional override for emblem size in px
}

export const NexovateWordmark: React.FC<NexovateWordmarkProps> = ({
  className = "",
  variant = "hero",
  theme = "dark",
  showText = true,
  showTagline = false,
  size,
}) => {
  const isIsland = variant === "island";
  const isBadge = variant === "badge";
  const isLight = theme === "light";

  const textColor = isLight ? "#0F1535" : "#FFFFFF";
  const accentGold = "#EFAF32";
  const accentTeal = "#12B8C9";

  // Optical sizing across variants
  const emblemSize = size ?? (isIsland ? 26 : isBadge ? 28 : variant === "footer" ? 34 : 32);
  const fontSizeClass = isIsland
    ? "text-[16px] sm:text-[17px]"
    : isBadge
    ? "text-[17px] sm:text-[19px]"
    : "text-[19px] sm:text-[22px]";

  const letterSpacing = isIsland ? "0.11em" : "0.15em";
  const gapClass = isIsland ? "gap-2 sm:gap-2.5" : "gap-2.5 sm:gap-3";

  return (
    <div
      className={`inline-flex items-center ${gapClass} select-none transition-all duration-300 ${className}`}
      style={{
        fontFamily: "'Cormorant Garamond', 'Instrument Serif', Georgia, serif",
      }}
    >
      {/* Nexovate Calligraphic Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src={nexovateSymbol}
          alt="Nexovate Emblem"
          className="h-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
          style={{ height: `${emblemSize}px`, width: "auto" }}
        />
      </div>

      {/* Editorial Wordmark */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`${fontSizeClass} font-semibold uppercase tracking-wider transition-all duration-300`}
            style={{
              color: textColor,
              letterSpacing,
              fontFeatureSettings: "'kern' 1, 'liga' 1",
            }}
          >
            NE
            <span style={{ color: accentGold }}>X</span>
            O
            <span style={{ color: textColor }}>VATE</span>
          </span>

          {showTagline && (
            <span
              className="text-[8px] sm:text-[9px] font-sans font-bold tracking-[0.22em] uppercase mt-1"
              style={{
                color: accentTeal,
                fontFamily: "var(--font-jakarta), system-ui, sans-serif",
              }}
            >
              LEARN. BUILD. SHAPE TOMORROW.
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default NexovateWordmark;
