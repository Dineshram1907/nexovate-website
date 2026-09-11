// @ts-nocheck
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { COLORS } from "../constants/colors";
import { DIMENSIONS } from "../constants/dimensions";
import { TYPOGRAPHY } from "../constants/typography";
import { PhoneFrame } from "./PhoneFrame";
import { ScreenOne } from "./ScreenOne";
import { ScreenTwo } from "./ScreenTwo";
import { ScreenThree } from "./ScreenThree";

export const Showcase: React.FC = () => {
  const { width } = useWindowDimensions();

  const isMobile = width < 900;
  const isTablet = width >= 900 && width < 1200;

  // Responsive scale engine
  const horizontalPadding = isMobile ? 20 : isTablet ? 24 : 40;
  const availableWidth = width - horizontalPadding * 2;
  const mobileScale = Math.min(1, Math.max(0.7, availableWidth / DIMENSIONS.BASE_WIDTH));
  const phoneScale = isMobile ? mobileScale : isTablet ? 0.9 : 1;

  const renderedWidth = DIMENSIONS.BASE_WIDTH * phoneScale;
  const renderedHeight = DIMENSIONS.BASE_HEIGHT * phoneScale;

  return (
    <ScrollView
      style={styles.rootContainer}
      contentContainerStyle={styles.scrollContent}
      horizontal={!isMobile && Platform.OS === "web"}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={true}
    >
      {/* Outer Technical Header */}
      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <View>
          <Text style={styles.brandTitle}>NEXOVATE</Text>
          <Text style={styles.brandSubtitle}>INTELLIGENCE DESIGNED TO EVOLVE</Text>
        </View>

        {!isMobile && <Text style={styles.centerMeta}>MOBILE EXPERIENCE / 2026</Text>}

        <View style={styles.statusGroup}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>DIGITAL PRODUCT</Text>
        </View>
      </View>

      {/* Editorial Intro */}
      <View
        style={[
          styles.introRow,
          {
            paddingHorizontal: horizontalPadding,
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
          },
        ]}
      >
        <Text style={styles.introExp}>01 — EXPERIENCE</Text>
        <Text
          style={[
            styles.introDesc,
            { textAlign: isMobile ? "left" : "right", marginTop: isMobile ? 8 : 0 },
          ]}
        >
          A digital environment for people{"\n"}who learn, build and shape what comes next.
        </Text>
      </View>

      {/* 3-Phone Showcase Container */}
      <View
        style={[
          styles.phonesRow,
          {
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "flex-start",
            gap: isMobile ? 40 : isTablet ? 32 : 48,
            paddingHorizontal: horizontalPadding,
          },
        ]}
      >
        {/* ========================================== */}
        {/* PHONE 01: IDENTITY */}
        {/* ========================================== */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(0)}
          style={[styles.phoneWrapper, { width: renderedWidth }]}
        >
          <View style={styles.phoneLabelRow}>
            <Text style={styles.phoneLabelMain}>01 // IDENTITY</Text>
            <Text style={styles.phoneLabelSub}>PHILOSOPHY</Text>
          </View>
          <View
            style={[
              styles.scaledBox,
              {
                transform: [{ scale: phoneScale }],
                marginBottom: isMobile ? renderedHeight - DIMENSIONS.BASE_HEIGHT : 0,
              },
            ]}
          >
            <PhoneFrame>
              <ScreenOne />
            </PhoneFrame>
          </View>
        </Animated.View>

        {/* ========================================== */}
        {/* PHONE 02: LEARN */}
        {/* ========================================== */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(150)}
          style={[styles.phoneWrapper, { width: renderedWidth }]}
        >
          <View style={styles.phoneLabelRow}>
            <Text style={styles.phoneLabelMain}>02 // LEARN</Text>
            <Text style={styles.phoneLabelSub}>PROGRAMS</Text>
          </View>
          <View
            style={[
              styles.scaledBox,
              {
                transform: [{ scale: phoneScale }],
                marginBottom: isMobile ? renderedHeight - DIMENSIONS.BASE_HEIGHT : 0,
              },
            ]}
          >
            <PhoneFrame lightMode={true}>
              <ScreenTwo />
            </PhoneFrame>
          </View>
        </Animated.View>

        {/* ========================================== */}
        {/* PHONE 03: BUILD */}
        {/* ========================================== */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(300)}
          style={[styles.phoneWrapper, { width: renderedWidth }]}
        >
          <View style={styles.phoneLabelRow}>
            <Text style={styles.phoneLabelMain}>03 // BUILD</Text>
            <Text style={styles.phoneLabelSub}>FUTURE LABS</Text>
          </View>
          <View
            style={[
              styles.scaledBox,
              {
                transform: [{ scale: phoneScale }],
                marginBottom: isMobile ? renderedHeight - DIMENSIONS.BASE_HEIGHT : 0,
              },
            ]}
          >
            <PhoneFrame>
              <ScreenThree />
            </PhoneFrame>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    paddingTop: 28,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.06)",
  },
  brandTitle: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 15,
    letterSpacing: 2.4,
    color: COLORS.white,
  },
  brandSubtitle: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 9,
    letterSpacing: 1.8,
    color: "rgba(255, 255, 255, 0.35)",
    marginTop: 2,
  },
  centerMeta: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 9,
    letterSpacing: 2,
    color: "rgba(255, 255, 255, 0.35)",
  },
  statusGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.cream,
  },
  statusText: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 9,
    letterSpacing: 1.5,
    color: "rgba(255, 255, 255, 0.7)",
  },
  introRow: {
    paddingTop: 32,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  introExp: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.cream,
  },
  introDesc: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 13,
    lineHeight: 19,
    color: "rgba(255, 255, 255, 0.45)",
    maxWidth: 380,
  },
  phonesRow: {
    paddingTop: 20,
    justifyContent: "center",
  },
  phoneWrapper: {
    alignItems: "center",
  },
  phoneLabelRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    paddingHorizontal: 8,
  },
  phoneLabelMain: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 9,
    letterSpacing: 2,
    color: "rgba(255, 255, 255, 0.35)",
  },
  phoneLabelSub: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 9,
    letterSpacing: 1.5,
    color: "rgba(255, 255, 255, 0.25)",
  },
  scaledBox: {
    width: DIMENSIONS.BASE_WIDTH,
    height: DIMENSIONS.BASE_HEIGHT,
    transformOrigin: "top center",
  },
});
