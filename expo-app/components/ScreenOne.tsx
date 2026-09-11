// @ts-nocheck
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";
import { NavButton } from "./NavButton";
import { MenuOverlay } from "./MenuOverlay";
import { TypewriterText } from "./TypewriterText";

export const ScreenOne: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>NEXOVATE</Text>
          <Text style={styles.systemText}>BRAND SYSTEM / 01</Text>
        </View>
        <NavButton onPress={() => setMenuOpen(true)} />
      </View>

      {/* Main Visual: Intelligence Field Simulation */}
      <View style={styles.fieldWrapper}>
        <View style={styles.outerOrbit}>
          <View style={styles.midOrbit}>
            <View style={styles.innerOrbit}>
              <View style={styles.centerNode} />
            </View>
          </View>
        </View>

        {/* Constellation Nodes */}
        <View style={[styles.nodePoint, { top: 40, right: 50 }]} />
        <View style={[styles.nodePoint, { bottom: 45, left: 60 }]} />
        <View style={[styles.nodePoint, { top: 60, left: 40 }]} />

        <Text style={styles.fieldLabelLeft}>LAT: 37.7749 // LON: -122.4194</Text>
        <Text style={styles.fieldLabelRight}>ENTROPY: 0.012</Text>
      </View>

      {/* Center Text */}
      <View style={styles.centerBlock}>
        <TypewriterText text="NEXOVATE" delay={200} speed={40} style={styles.heroTitle} />
        <Text style={styles.heroSubtitle}>
          INTELLIGENCE{"\n"}DESIGNED TO EVOLVE
        </Text>
      </View>

      {/* Bottom Metadata */}
      <View style={styles.bottomRow}>
        <Text style={styles.metaIndex}>01 / 03</Text>
        <Text style={styles.metaLabel}>BRAND SYSTEM</Text>
      </View>

      {/* Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    paddingTop: 42,
    paddingBottom: 24,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  logoText: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 17,
    letterSpacing: 1.5,
    color: COLORS.white,
  },
  systemText: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 8,
    letterSpacing: 1.6,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  fieldWrapper: {
    width: 315,
    height: 270,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  outerOrbit: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  midOrbit: {
    width: 164,
    height: 164,
    borderRadius: 82,
    borderWidth: 1,
    borderColor: "rgba(241, 229, 198, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  innerOrbit: {
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  centerNode: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.cream,
  },
  nodePoint: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  fieldLabelLeft: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 6,
    color: COLORS.textMuted,
    fontFamily: "monospace",
  },
  fieldLabelRight: {
    position: "absolute",
    bottom: 10,
    right: 10,
    fontSize: 6,
    color: COLORS.textMuted,
    fontFamily: "monospace",
  },
  centerBlock: {
    width: "100%",
    paddingHorizontal: 8,
  },
  heroTitle: {
    fontFamily: TYPOGRAPHY.fontLight,
    fontSize: 58,
    letterSpacing: -3,
    color: COLORS.cream,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 12,
    letterSpacing: 2.5,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  bottomRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 14,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaIndex: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 9,
    letterSpacing: 1.8,
    color: COLORS.textMuted,
  },
  metaLabel: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 9,
    letterSpacing: 1.8,
    color: COLORS.textMuted,
  },
});
