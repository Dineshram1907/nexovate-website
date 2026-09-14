import React, { useState } from "react";
import { COLORS } from "./constants/colors";
import { NavButton } from "./NavButton";
import { MenuOverlay } from "./MenuOverlay";
import { TypewriterText } from "./TypewriterText";

export const ScreenOne: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.surface,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "42px 20px 24px 20px",
        boxSizing: "border-box",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Background Micro Matrix */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(241, 229, 198, 0.04) 0%, transparent 60%), radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 20px 20px",
          pointerEvents: "none",
        }}
      />

      {/* 1. Header (y: 42, x: 20) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          zIndex: 10,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "17px",
              fontWeight: 500,
              letterSpacing: "1.5px",
              color: COLORS.white,
            }}
          >
            NEXOVATE
          </span>
          <span
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "8px",
              letterSpacing: "1.6px",
              color: COLORS.textMuted,
              marginTop: "2px",
            }}
          >
            BRAND SYSTEM / 01
          </span>
        </div>

        <NavButton onClick={() => setMenuOpen(true)} />
      </div>

      {/* 2. Main Visual: Abstract Intelligence Field (315 × 270) */}
      <div
        style={{
          width: "315px",
          height: "270px",
          margin: "12px auto 0 auto",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="315"
          height="270"
          viewBox="0 0 315 270"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={COLORS.cream} stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Concentric Intelligence Field Orbits */}
          <circle cx="157" cy="135" r="110" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="157" cy="135" r="82" fill="none" stroke="rgba(241, 229, 198, 0.15)" strokeWidth="1" />
          <circle cx="157" cy="135" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="157" cy="135" r="24" fill="none" stroke={COLORS.cream} strokeWidth="1.2" opacity="0.6" />

          {/* Center Neural Core */}
          <circle cx="157" cy="135" r="6" fill={COLORS.cream} />
          <circle cx="157" cy="135" r="14" fill="none" stroke={COLORS.cream} strokeWidth="0.8" opacity="0.4" />

          {/* Constellation Nodes & Rays */}
          {/* Node 1 Top Right */}
          <line x1="157" y1="135" x2="225" y2="75" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="225" cy="75" r="4" fill="#FFFFFF" />
          <circle cx="225" cy="75" r="8" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
          <text x="235" y="78" fill={COLORS.textMuted} fontSize="7" fontFamily="monospace" letterSpacing="1">
            SYN_A1
          </text>

          {/* Node 2 Bottom Left */}
          <line x1="157" y1="135" x2="80" y2="195" stroke="rgba(241, 229, 198, 0.25)" strokeWidth="0.8" />
          <circle cx="80" cy="195" r="3.5" fill={COLORS.cream} />
          <text x="50" y="210" fill={COLORS.cream} fontSize="7" fontFamily="monospace" letterSpacing="1">
            CORE_NODE
          </text>

          {/* Node 3 Top Left */}
          <line x1="157" y1="135" x2="90" y2="85" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
          <circle cx="90" cy="85" r="3" fill="#FFFFFF" opacity="0.6" />
          <text x="52" y="80" fill={COLORS.textMuted} fontSize="6" fontFamily="monospace">
            VEC_2048
          </text>

          {/* Node 4 Bottom Right */}
          <line x1="157" y1="135" x2="235" y2="185" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="235" cy="185" r="3" fill="#FFFFFF" />
          <text x="242" y="195" fill={COLORS.textMuted} fontSize="6" fontFamily="monospace">
            RUNTIME
          </text>

          {/* Subtle Outer Coordinates */}
          <text x="12" y="25" fill={COLORS.textMuted} fontSize="6" fontFamily="monospace" letterSpacing="1.2">
            LAT: 37.7749 // LON: -122.4194
          </text>
          <text x="210" y="255" fill={COLORS.textMuted} fontSize="6" fontFamily="monospace" letterSpacing="1.2">
            ENTROPY: 0.012
          </text>

          {/* Crosshair Markers */}
          <path d="M 157 20 L 157 32 M 157 238 L 157 250 M 42 135 L 54 135 M 260 135 L 272 135" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
        </svg>
      </div>

      {/* 3. Center Text: Large NEXOVATE + Subtitle */}
      <div style={{ textAlign: "left", width: "100%", padding: "0 8px" }}>
        <h1
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "58px",
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "-3px",
            color: COLORS.cream,
            margin: "0 0 12px 0",
          }}
        >
          <TypewriterText text="NEXOVATE" delay={200} speed={40} />
        </h1>

        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "2.5px",
            color: COLORS.textMuted,
            margin: 0,
            lineHeight: "18px",
          }}
        >
          INTELLIGENCE
          <br />
          DESIGNED TO EVOLVE
        </p>
      </div>

      {/* 4. Bottom Technical Metadata Row */}
      <div
        style={{
          borderTop: `1px solid ${COLORS.border}`,
          paddingTop: "14px",
          marginBottom: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "9px",
            fontWeight: 600,
            letterSpacing: "1.8px",
            color: COLORS.textMuted,
          }}
        >
          01 / 03
        </span>

        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "1.8px",
            color: COLORS.textMuted,
          }}
        >
          BRAND SYSTEM
        </span>
      </div>

      {/* Shared Navigation Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};
