// @ts-nocheck
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";

interface ProjectCardProps {
  index?: string;
  category?: string;
  title?: string;
  description?: string;
  onPress?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  index = "01",
  category = "FUTURE LAB",
  title = "AUTONOMOUS COGNITION MATRIX",
  description = "Experiments at the intersection of intelligence, technology and human potential.",
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${title} project`}
      style={styles.card}
    >
      {/* Visual Canvas Frame */}
      <View style={styles.canvasFrame}>
        {/* Abstract Geometry Simulation */}
        <View style={styles.orbitOuter}>
          <View style={styles.orbitInner}>
            <View style={styles.coreDot} />
          </View>
        </View>

        {/* Micro System Tags */}
        <View style={styles.sysTagLeft}>
          <Text style={styles.tagText}>NODE_01</Text>
        </View>
        <View style={styles.sysTagRight}>
          <Text style={[styles.tagText, { color: COLORS.cream }]}>LIVE_SYN</Text>
        </View>

        {/* Online Status */}
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>ONLINE</Text>
        </View>
      </View>

      {/* Content */}
      <View>
        <View style={styles.categoryRow}>
          <Text style={styles.indexText}>{index}</Text>
          <Text style={styles.dotSeparator}>•</Text>
          <Text style={styles.categoryText}>{category}</Text>
        </View>

        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descText}>{description}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.viewProjText}>View project →</Text>
        <Text style={styles.telemetryText}>EXP // 04.9</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 335,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
    gap: 16,
  },
  canvasFrame: {
    width: "100%",
    height: 140,
    borderRadius: 16,
    backgroundColor: "#050505",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  orbitOuter: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: "rgba(241, 229, 198, 0.25)",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  orbitInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  coreDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.cream,
  },
  sysTagLeft: {
    position: "absolute",
    left: 14,
    top: 20,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  sysTagRight: {
    position: "absolute",
    right: 14,
    bottom: 20,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: "#111",
    borderWidth: 1,
    borderColor: "rgba(241, 229, 198, 0.4)",
  },
  tagText: {
    fontSize: 7,
    color: COLORS.textMuted,
    fontFamily: "monospace",
  },
  statusBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statusDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.cream,
  },
  statusText: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 8,
    color: COLORS.cream,
    letterSpacing: 1,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  indexText: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 11,
    color: COLORS.cream,
    letterSpacing: 2,
  },
  dotSeparator: {
    color: COLORS.textMuted,
  },
  categoryText: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 10,
    color: COLORS.cream,
    letterSpacing: 1.8,
  },
  titleText: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 18,
    letterSpacing: -0.5,
    color: COLORS.white,
    marginBottom: 6,
  },
  descText: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textSecondary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.08)",
    paddingTop: 12,
  },
  viewProjText: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 12,
    color: COLORS.cream,
  },
  telemetryText: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 9,
    color: COLORS.textMuted,
    letterSpacing: 1,
  },
});
