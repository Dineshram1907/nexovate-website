// @ts-nocheck
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { DIMENSIONS } from "../constants/dimensions";

interface PhoneStatusBarProps {
  lightMode?: boolean;
}

export const PhoneStatusBar: React.FC<PhoneStatusBarProps> = ({ lightMode = false }) => {
  const textColor = lightMode ? "#0A0A0A" : "#FFFFFF";

  return (
    <View style={styles.statusBar} pointerEvents="none">
      <Text style={[styles.timeText, { color: textColor }]}>9:41</Text>
      <View style={styles.iconsRow}>
        <View style={styles.signalGroup}>
          <View style={[styles.bar1, { backgroundColor: textColor }]} />
          <View style={[styles.bar2, { backgroundColor: textColor }]} />
          <View style={[styles.bar3, { backgroundColor: textColor }]} />
          <View style={[styles.bar4, { backgroundColor: textColor }]} />
        </View>
        <View style={[styles.batteryOuter, { borderColor: textColor }]}>
          <View style={[styles.batteryInner, { backgroundColor: textColor }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: DIMENSIONS.STATUS_BAR_HEIGHT,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 28,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 90,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: -0.2,
  },
  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  signalGroup: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 1.5,
    height: 10,
  },
  bar1: { width: 3, height: 3, borderRadius: 0.5 },
  bar2: { width: 3, height: 5, borderRadius: 0.5 },
  bar3: { width: 3, height: 7.5, borderRadius: 0.5 },
  bar4: { width: 3, height: 10, borderRadius: 0.5 },
  batteryOuter: {
    width: 20,
    height: 10,
    borderRadius: 3,
    borderWidth: 1,
    padding: 1,
    justifyContent: "center",
  },
  batteryInner: {
    width: "80%",
    height: "100%",
    borderRadius: 1.5,
  },
});
