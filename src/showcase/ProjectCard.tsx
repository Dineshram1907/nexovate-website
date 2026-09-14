import React, { useState } from "react";
import { COLORS } from "./constants/colors";

interface ProjectCardProps {
  index?: string;
  category?: string;
  title?: string;
  description?: string;
  onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  index = "01",
  category = "FUTURE LAB",
  title = "NEURAL COGNITION RUNTIME",
  description = "Experiments at the intersection of intelligence, technology and human potential.",
  onClick,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      style={{
        width: "335px",
        backgroundColor: COLORS.surface,
        borderRadius: "24px",
        border: `1px solid ${COLORS.border}`,
        padding: "20px",
        boxSizing: "border-box",
        cursor: "pointer",
        transition: "transform 0.14s ease, border-color 0.2s ease, box-shadow 0.2s ease",
        transform: isPressed ? "scale(0.97)" : "scale(1)",
        boxShadow: "0 12px 28px rgba(0, 0, 0, 0.4)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      {/* Visual Canvas */}
      <div
        style={{
          width: "100%",
          height: "140px",
          borderRadius: "16px",
          backgroundColor: "#050505",
          border: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Abstract Geometric Composition */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 295 140"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {/* Subtle Grid */}
          <defs>
            <pattern id="cardGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cardGrid)" />

          {/* Glowing Cream Orbit */}
          <circle cx="147" cy="70" r="48" fill="none" stroke={COLORS.cream} strokeWidth="1" opacity="0.25" strokeDasharray="3 3" />
          <circle cx="147" cy="70" r="28" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          <circle cx="147" cy="70" r="10" fill={COLORS.cream} opacity="0.85" />

          {/* Technical Floating Blocks */}
          <rect x="35" y="30" width="45" height="22" rx="4" fill="#111" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
          <text x="42" y="44" fill={COLORS.textMuted} fontSize="7" fontFamily="monospace">NODE_01</text>

          <rect x="215" y="88" width="52" height="22" rx="4" fill="#111" stroke={COLORS.cream} strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="222" y="102" fill={COLORS.cream} fontSize="7" fontFamily="monospace">LIVE_SYN</text>

          {/* Connection Lines */}
          <line x1="80" y1="41" x2="137" y2="70" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="2 2" />
          <line x1="157" y1="70" x2="215" y2="99" stroke="rgba(241,229,198,0.3)" strokeWidth="0.8" strokeDasharray="2 2" />

          {/* Micro Telemetry */}
          <text x="14" y="128" fill={COLORS.textMuted} fontSize="6" fontFamily="monospace" letterSpacing="1">
            FREQ: 432Hz // CORE: ALPHA
          </text>
        </svg>

        {/* Status Tag */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "3px 8px",
            borderRadius: "10px",
            backgroundColor: "rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: COLORS.cream }} />
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "8px", color: COLORS.cream, letterSpacing: "1px" }}>
            ONLINE
          </span>
        </div>
      </div>

      {/* Content */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 600, color: COLORS.cream, letterSpacing: "2px" }}>
            {index}
          </span>
          <span style={{ color: COLORS.textMuted }}>•</span>
          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 500, color: COLORS.cream, letterSpacing: "1.8px" }}>
            {category}
          </span>
        </div>

        <h4
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "18px",
            fontWeight: 400,
            letterSpacing: "-0.5px",
            color: COLORS.white,
            margin: "0 0 6px 0",
          }}
        >
          {title}
        </h4>

        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "13px",
            lineHeight: "18px",
            color: COLORS.textSecondary,
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>

      {/* Action Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            color: COLORS.cream,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          View project
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>

        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "9px",
            color: COLORS.textMuted,
            letterSpacing: "1px",
          }}
        >
          EXP // 04.9
        </span>
      </div>
    </div>
  );
};
