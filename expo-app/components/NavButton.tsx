// @ts-nocheck
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface NavButtonProps {
  onPress: () => void;
  lightMode?: boolean;
}

export const NavButton: React.FC<NavButtonProps> = ({ onPress, lightMode = false }) => {
  const borderColor = lightMode ? "rgba(10, 10, 10, 0.15)" : "rgba(255, 255, 255, 0.15)";
  const bgColor = lightMode ? "rgba(10, 10, 10, 0.04)" : "rgba(255, 255, 255, 0.04)";
  const lineColor = lightMode ? "#0A0A0A" : "#FFFFFF";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Open navigation menu"
      style={[
        styles.btn,
        {
          borderColor,
          backgroundColor: bgColor,
        },
      ]}
    >
      <View style={[styles.line, { backgroundColor: lineColor }]} />
      <View style={[styles.line, { backgroundColor: lineColor }]} />
      <View style={[styles.shortLine, { backgroundColor: lineColor }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  line: {
    width: 14,
    height: 1.5,
    borderRadius: 1,
  },
  shortLine: {
    width: 9,
    height: 1.5,
    borderRadius: 1,
    alignSelf: "flex-end",
    marginRight: 15,
  },
});
