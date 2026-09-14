import React from "react";
import { DIMENSIONS } from "./constants/dimensions";

interface HomeIndicatorProps {
  lightMode?: boolean;
}

export const HomeIndicator: React.FC<HomeIndicatorProps> = ({ lightMode = false }) => {
  return (
    <div
      style={{
        width: `${DIMENSIONS.HOME_BAR_WIDTH}px`,
        height: `${DIMENSIONS.HOME_BAR_HEIGHT}px`,
        borderRadius: "3px",
        backgroundColor: lightMode ? "rgba(10, 10, 10, 0.35)" : "rgba(255, 255, 255, 0.32)",
        position: "absolute",
        bottom: "8px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  );
};
