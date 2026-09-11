// @ts-nocheck
import React from "react";
import { StyleSheet, View } from "react-native";
import { DIMENSIONS } from "../constants/dimensions";

export const DynamicIsland: React.FC = () => {
  return (
    <View style={styles.islandContainer} pointerEvents="none">
      <View style={styles.lensWrapper}>
        <View style={styles.lensOuter} />
        <View style={styles.lensSensor} />
      </View>
      <View style={styles.sensorPill} />
    </View>
  );
};

const styles = StyleSheet.create({
  islandContainer: {
    width: DIMENSIONS.ISLAND_WIDTH,
    height: DIMENSIONS.ISLAND_HEIGHT,
    backgroundColor: "#000000",
    borderRadius: 18,
    position: "absolute",
    top: 12,
    left: "50%",
    marginLeft: -(DIMENSIONS.ISLAND_WIDTH / 2),
    zIndex: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  lensWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  lensOuter: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#111827",
  },
  lensSensor: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#0d1b2a",
  },
  sensorPill: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#151b26",
  },
});
