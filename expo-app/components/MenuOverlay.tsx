// @ts-nocheck
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { id: "01", label: "HOME" },
  { id: "02", label: "ABOUT" },
  { id: "03", label: "PROGRAMS" },
  { id: "04", label: "PROJECTS" },
  { id: "05", label: "CONTACT" },
];

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      style={styles.overlay}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>NEXOVATE</Text>
          <Text style={styles.matrixLabel}>NAVIGATION MATRIX</Text>
        </View>

        <TouchableOpacity
          onPress={onClose}
          activeOpacity={0.7}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Close navigation menu"
          style={styles.closeBtn}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Links */}
      <View style={styles.linksContainer}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={onClose}
            activeOpacity={0.7}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            style={styles.linkRow}
          >
            <Text style={styles.linkIndex}>{item.id}</Text>
            <Text style={styles.linkLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.tagline}>
          LEARN.{"\n"}
          BUILD.{"\n"}
          SHAPE TOMORROW.
        </Text>
        <Text style={styles.versionText}>SYS // V2.6</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.surface,
    zIndex: 1000,
    justifyContent: "space-between",
    paddingTop: 48,
    paddingBottom: 36,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoText: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 15,
    letterSpacing: 2.4,
    color: COLORS.white,
  },
  matrixLabel: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 8,
    letterSpacing: 1.5,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  closeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "300",
  },
  linksContainer: {
    gap: 18,
    marginVertical: "auto",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 14,
    paddingVertical: 4,
  },
  linkIndex: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 11,
    letterSpacing: 1.5,
    color: COLORS.textMuted,
  },
  linkLabel: {
    fontFamily: TYPOGRAPHY.fontLight,
    fontSize: 34,
    letterSpacing: -1,
    color: COLORS.white,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  tagline: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.cream,
    lineHeight: 16,
  },
  versionText: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 9,
    letterSpacing: 1.5,
    color: COLORS.textMuted,
  },
});
