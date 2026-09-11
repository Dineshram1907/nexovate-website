// @ts-nocheck
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";
import { NavButton } from "./NavButton";
import { MenuOverlay } from "./MenuOverlay";
import { TypewriterText } from "./TypewriterText";
import { ProjectCard } from "./ProjectCard";

export const ScreenThree: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>NEXOVATE</Text>
          <Text style={styles.systemText}>FUTURE LABS / 03</Text>
        </View>
        <NavButton onPress={() => setMenuOpen(true)} />
      </View>

      {/* Title */}
      <View style={styles.titleBlock}>
        <TypewriterText text="PROJECTS" delay={500} speed={40} style={styles.projectsTitle} />
        <Text style={styles.projectsSubtitle}>BUILD WHAT DOESN'T EXIST YET.</Text>
      </View>

      {/* Project Card */}
      <View style={styles.cardContainer}>
        <ProjectCard
          index="01"
          category="FUTURE LAB"
          title="AUTONOMOUS COGNITION MATRIX"
          description="Experiments at the intersection of intelligence, adaptive systems and human potential."
        />
      </View>

      {/* Telemetry Row */}
      <View style={styles.telemetryRow}>
        <Text style={styles.telemetryIndex}>03 / 03</Text>
        <Text style={styles.telemetryLabel}>ACTIVE EXPERIMENTS</Text>
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
  titleBlock: {
    marginTop: 10,
  },
  projectsTitle: {
    fontFamily: TYPOGRAPHY.fontLight,
    fontSize: 48,
    letterSpacing: -2,
    color: COLORS.white,
  },
  projectsSubtitle: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 14,
    color: COLORS.textSecondary,
    letterSpacing: -0.2,
    marginTop: 4,
  },
  cardContainer: {
    alignItems: "center",
  },
  telemetryRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  telemetryIndex: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 9,
    letterSpacing: 1.8,
    color: COLORS.cream,
  },
  telemetryLabel: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 9,
    letterSpacing: 1.8,
    color: COLORS.textMuted,
  },
});
