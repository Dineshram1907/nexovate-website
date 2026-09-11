// @ts-nocheck
import React from "react";
import { StyleSheet, View } from "react-native";
import { DIMENSIONS } from "../constants/dimensions";

interface HomeIndicatorProps {
  lightMode?: boolean;
}

export const HomeIndicator: React.FC<HomeIndicatorProps> = ({ lightMode = false }) => {
  return (
    <View
      style={[
        styles.indicator,
        { backgroundColor: lightMode ? "rgba(10, 10, 10, 0.35)" : "rgba(255, 255, 255, 0.32)" },
      ]}
      pointerEvents="none"
    />
  );
};

const styles = StyleSheet.create({
  indicator: {
    width: DIMENSIONS.HOME_BAR_WIDTH,
    height: DIMENSIONS.HOME_BAR_HEIGHT,
    borderRadius: 3,
    position: "absolute",
    bottom: 8,
    left: "50%",
    marginLeft: -(DIMENSIONS.HOME_BAR_WIDTH / 2),
    zIndex: 100,
  },
});
