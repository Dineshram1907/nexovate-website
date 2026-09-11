import React from "react";
import { DIMENSIONS } from "./constants/dimensions";
import { DynamicIsland } from "./DynamicIsland";
import { HomeIndicator } from "./HomeIndicator";
import { PhoneStatusBar } from "./PhoneStatusBar";

interface PhoneFrameProps {
  children: React.ReactNode;
  lightMode?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, lightMode = false }) => {
  return (
    <div
      style={{
        width: `${DIMENSIONS.BASE_WIDTH}px`,
        height: `${DIMENSIONS.BASE_HEIGHT}px`,
        backgroundColor: "#000000",
        borderRadius: `${DIMENSIONS.CORNER_RADIUS}px`,
        border: `${DIMENSIONS.BORDER_WIDTH}px solid #252525`,
        boxShadow:
          "0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        boxSizing: "border-box",
        transform: "translateZ(0)",
      }}
    >
      {/* iOS Status Bar */}
      <PhoneStatusBar lightMode={lightMode} />

      {/* Dynamic Island */}
      <DynamicIsland />

      {/* Internal App Screen Artboard (Clips to frame) */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          borderRadius: `${DIMENSIONS.CORNER_RADIUS - 2}px`,
        }}
      >
        {children}
      </div>

      {/* Bottom Home Indicator */}
      <HomeIndicator lightMode={lightMode} />
    </div>
  );
};
