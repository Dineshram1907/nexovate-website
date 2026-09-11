// @ts-nocheck
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";
import { NavButton } from "./NavButton";
import { MenuOverlay } from "./MenuOverlay";
import { TypewriterText } from "./TypewriterText";
import { ProgramRow } from "./ProgramRow";

export const ScreenTwo: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>NEXOVATE</Text>
          <Text style={styles.systemText}>LEARNING ENGINE / 02</Text>
        </View>
        <NavButton onPress={() => setMenuOpen(true)} lightMode={true} />
      </View>

      {/* Headline Block */}
      <View style={styles.headlineBlock}>
        <Text style={styles.programsLabel}>PROGRAMS / 01</Text>
        <TypewriterText
          text={"LEARN\nWHAT'S\nNEXT."}
          delay={350}
          speed={35}
          style={styles.mainHeadline}
        />
      </View>

      {/* Program Modules */}
      <View style={styles.modulesWrapper}>
        <ProgramRow
          index="01"
          title="AI & INTELLIGENCE"
          description="Explore emerging intelligence, generative systems, and real-world implementation."
          isDarkCard={true}
        />
        <ProgramRow
          index="02"
          title="BUILD & CREATE"
          description="Turn ideas into real products and scalable technical infrastructure."
          isDarkCard={false}
        />
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Explore Programs"
        style={styles.ctaButton}
      >
        <Text style={styles.ctaText}>EXPLORE PROGRAMS →</Text>
      </TouchableOpacity>

      {/* Menu Overlay */}
      <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
    paddingTop: 42,
    paddingBottom: 28,
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
    color: COLORS.darkText,
  },
  systemText: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 8,
    letterSpacing: 1.6,
    color: COLORS.darkTextMuted,
    marginTop: 2,
  },
  headlineBlock: {
    marginTop: 14,
  },
  programsLabel: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.darkTextMuted,
    marginBottom: 8,
  },
  mainHeadline: {
    fontFamily: TYPOGRAPHY.fontLight,
    fontSize: 54,
    lineHeight: 52,
    letterSpacing: -3,
    color: COLORS.darkText,
  },
  modulesWrapper: {
    gap: 10,
    alignItems: "center",
  },
  ctaButton: {
    width: "100%",
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.darkText,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  ctaText: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 15,
    letterSpacing: 0.5,
    color: COLORS.cream,
  },
});
