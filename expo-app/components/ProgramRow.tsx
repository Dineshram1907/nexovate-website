// @ts-nocheck
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";

interface ProgramRowProps {
  index: string;
  title: string;
  description: string;
  isDarkCard?: boolean;
  onPress?: () => void;
}

export const ProgramRow: React.FC<ProgramRowProps> = ({
  index,
  title,
  description,
  isDarkCard = false,
  onPress,
}) => {
  if (isDarkCard) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${title} module`}
        style={styles.darkCard}
      >
        <View style={styles.darkCardTop}>
          <View>
            <Text style={styles.darkCardModule}>MODULE / {index}</Text>
            <Text style={styles.darkCardTitle}>{title}</Text>
          </View>
          <Text style={styles.darkCardIndex}>{index}</Text>
        </View>

        <Text style={styles.darkCardDesc}>{description}</Text>

        <View style={styles.arrowCircle}>
          <Text style={styles.arrowText}>→</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${title} program`}
      style={styles.lightRow}
    >
      <View style={styles.lightRowContent}>
        <Text style={styles.lightRowIndex}>{index}</Text>
        <Text style={styles.lightRowTitle}>{title}</Text>
      </View>
      <View style={styles.lightArrowCircle}>
        <Text style={styles.lightArrowText}>→</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  darkCard: {
    width: 335,
    height: 170,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  darkCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  darkCardModule: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.cream,
    marginBottom: 4,
  },
  darkCardTitle: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 20,
    letterSpacing: -0.5,
    color: COLORS.white,
  },
  darkCardIndex: {
    fontFamily: TYPOGRAPHY.fontLight,
    fontSize: 14,
    color: COLORS.textMuted,
  },
  darkCardDesc: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.textSecondary,
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(241, 229, 198, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  arrowText: {
    color: COLORS.cream,
    fontSize: 14,
  },
  lightRow: {
    width: 335,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(10, 10, 10, 0.12)",
  },
  lightRowContent: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 12,
  },
  lightRowIndex: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 12,
    color: COLORS.darkTextMuted,
    letterSpacing: 1,
  },
  lightRowTitle: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 17,
    letterSpacing: -0.3,
    color: COLORS.darkText,
  },
  lightArrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(10, 10, 10, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  lightArrowText: {
    color: COLORS.darkText,
    fontSize: 12,
  },
});
