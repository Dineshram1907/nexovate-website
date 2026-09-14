import React from "react";
import { DIMENSIONS } from "./constants/dimensions";

interface PhoneStatusBarProps {
  lightMode?: boolean;
}

export const PhoneStatusBar: React.FC<PhoneStatusBarProps> = ({ lightMode = false }) => {
  const textColor = lightMode ? "#0A0A0A" : "#FFFFFF";

  return (
    <div
      style={{
        height: `${DIMENSIONS.STATUS_BAR_HEIGHT}px`,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 90,
        pointerEvents: "none",
        boxSizing: "border-box",
      }}
    >
      {/* Time */}
      <span
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: "14px",
          fontWeight: 600,
          color: textColor,
          letterSpacing: "-0.2px",
        }}
      >
        9:41
      </span>

      {/* Right status symbols */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {/* Signal */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "1.5px", height: "10px" }}>
          <div style={{ width: "3px", height: "3px", backgroundColor: textColor, borderRadius: "0.5px" }} />
          <div style={{ width: "3px", height: "5px", backgroundColor: textColor, borderRadius: "0.5px" }} />
          <div style={{ width: "3px", height: "7.5px", backgroundColor: textColor, borderRadius: "0.5px" }} />
          <div style={{ width: "3px", height: "10px", backgroundColor: textColor, borderRadius: "0.5px" }} />
        </div>

        {/* 5G / Wifi */}
        <svg width="12" height="10" viewBox="0 0 16 12" fill={textColor}>
          <path d="M8 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4.24-4.24a6 6 0 0 1 8.48 0 .75.75 0 1 0 1.06-1.06 7.5 7.5 0 0 0-10.6 0 .75.75 0 0 0 1.06 1.06zm-2.83-2.83a10 10 0 0 1 14.14 0 .75.75 0 1 0 1.06-1.06 11.5 11.5 0 0 0-16.26 0 .75.75 0 1 0 1.06 1.06z" />
        </svg>

        {/* Battery */}
        <div
          style={{
            width: "20px",
            height: "10px",
            borderRadius: "3px",
            border: `1px solid ${textColor}`,
            padding: "1px",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "100%",
              backgroundColor: textColor,
              borderRadius: "1.5px",
            }}
          />
          <div
            style={{
              width: "1.5px",
              height: "4px",
              backgroundColor: textColor,
              position: "absolute",
              right: "-3.5px",
              top: "2px",
              borderTopRightRadius: "1px",
              borderBottomRightRadius: "1px",
            }}
          />
        </div>
      </div>
    </div>
  );
};
