// @ts-nocheck
import React from "react";
import { StyleSheet, View } from "react-native";
import { DIMENSIONS } from "../constants/dimensions";
import { DynamicIsland } from "./DynamicIsland";
import { HomeIndicator } from "./HomeIndicator";
import { PhoneStatusBar } from "./PhoneStatusBar";

interface PhoneFrameProps {
  children: React.ReactNode;
  lightMode?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, lightMode = false }) => {
  return (
    <View style={styles.outerChassis}>
      {/* iOS Status Bar */}
      <PhoneStatusBar lightMode={lightMode} />

      {/* Dynamic Island */}
      <DynamicIsland />

      {/* Internal Artboard Screen */}
      <View style={styles.artboardContainer}>{children}</View>

      {/* Home Indicator */}
      <HomeIndicator lightMode={lightMode} />
    </View>
  );
};

const styles = StyleSheet.create({
  outerChassis: {
    width: DIMENSIONS.BASE_WIDTH,
    height: DIMENSIONS.BASE_HEIGHT,
    backgroundColor: "#000000",
    borderRadius: DIMENSIONS.CORNER_RADIUS,
    borderWidth: DIMENSIONS.BORDER_WIDTH,
    borderColor: "#252525",
    overflow: "hidden",
    position: "relative",
    // Shadow properties
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.45,
    shadowRadius: 30,
    elevation: 20,
  },
  artboardContainer: {
    flex: 1,
    borderRadius: DIMENSIONS.CORNER_RADIUS - 2,
    overflow: "hidden",
  },
});
