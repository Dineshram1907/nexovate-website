// @ts-nocheck
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  FadeIn,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";

export const CinematicHero: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Responsive headline font sizing
  const headlineFontSize =
    windowWidth <= 360 ? 41 : windowWidth <= 390 ? 45 : windowWidth <= 430 ? 49 : 52;
  const headlineLineHeight = headlineFontSize * 1.02;

  // Parallax Animations via Reanimated
  // Layer 1: Background Image parallax & darkening
  const bgStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, 600], [0, 90], Extrapolate.CLAMP);
    const opacity = interpolate(scrollY.value, [0, 400, 700], [1, 0.6, 0.15], Extrapolate.CLAMP);
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  // Layer 2: Technical metadata
  const metaStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, 600], [0, -40], Extrapolate.CLAMP);
    const opacity = interpolate(scrollY.value, [0, 350, 600], [1, 0.8, 0.2], Extrapolate.CLAMP);
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  // Layer 3: Main Editorial Headline Stage-by-Stage Reveal
  const line1Style = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 60, 200, 550, 700], [0.3, 1, 1, 0.8, 0], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [0, 100, 550, 700], [40, 0, 0, -35], Extrapolate.CLAMP);
    return { opacity, transform: [{ translateY }] };
  });

  const line2Style = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120, 260, 550, 700], [0, 1, 1, 0.8, 0], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [0, 150, 550, 700], [50, 0, 0, -35], Extrapolate.CLAMP);
    return { opacity, transform: [{ translateY }] };
  });

  const line3Style = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 180, 320, 550, 700], [0, 1, 1, 0.8, 0], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [0, 200, 550, 700], [60, 0, 0, -35], Extrapolate.CLAMP);
    return { opacity, transform: [{ translateY }] };
  });

  // Layer 4: Secondary copy and CTA
  const secondaryStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [200, 360, 580, 720], [0, 1, 0.9, 0], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [200, 380, 720], [35, 0, -25], Extrapolate.CLAMP);
    return { opacity, transform: [{ translateY }] };
  });

  const ctaStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [300, 450, 620, 750], [0, 1, 0.9, 0], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [300, 480, 750], [30, 0, -20], Extrapolate.CLAMP);
    return { opacity, transform: [{ translateY }] };
  });

  // Transition to Next Phase (LEARN. BUILD. SHAPE TOMORROW.)
  const transitionStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [550, 720, 900], [0, 1, 1], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [550, 750, 900], [60, 0, 0], Extrapolate.CLAMP);
    return { opacity, transform: [{ translateY }] };
  });

  return (
    <View style={styles.rootContainer}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ height: 1100 }}
      >
        {/* Sticky Hero Viewport */}
        <View style={[styles.heroViewport, { height: windowHeight }]}>
          {/* ============================================================ */}
          {/* 1. CINEMATIC BACKGROUND PHOTOGRAPH */}
          {/* ============================================================ */}
          <Animated.View style={[styles.bgContainer, bgStyle]}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
              }}
              style={styles.bgImage}
              resizeMode="cover"
            />
            {/* Layer 1: Tint */}
            <View style={styles.tintOverlay} />
            {/* Layer 2: Gradient Darkening Simulation */}
            <View style={styles.gradientTop} />
            <View style={styles.gradientBottom} />
          </Animated.View>

          {/* ============================================================ */}
          {/* 2. SHOWCASE HEADER */}
          {/* ============================================================ */}
          <View style={[styles.header, { paddingTop: Math.max(insets.top, 24) }]}>
            {/* Logo + Title */}
            <View style={styles.logoRow}>
              <View style={styles.logoIcon}>
                <Text style={styles.logoIconText}>N</Text>
              </View>
              <View>
                <Text style={styles.logoTitle}>NEXOVATE</Text>
                <Text style={styles.logoSubtitle}>SYSTEM 01</Text>
              </View>
            </View>

            {/* Circular 50x50 Menu Button */}
            <TouchableOpacity
              onPress={() => setIsMenuOpen(true)}
              activeOpacity={0.7}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Open Navigation Menu"
              style={styles.menuButton}
            >
              <View style={[styles.menuLine, { width: 22 }]} />
              <View style={[styles.menuLine, { width: 22 }]} />
              <View style={[styles.menuLine, { width: 14, alignSelf: "flex-end", marginRight: 13 }]} />
            </TouchableOpacity>
          </View>

          {/* Technical Metadata */}
          <Animated.View style={[styles.metaRow, metaStyle]}>
            <View style={styles.metaLeft}>
              <Text style={styles.metaGold}>01</Text>
              <Text style={styles.metaSlash}>//</Text>
              <Text style={styles.metaLabel}>LIVE / DIGITAL EXPERIENCE</Text>
            </View>
            <Text style={styles.metaGold}>11001 • 2026</Text>
          </Animated.View>

          {/* ============================================================ */}
          {/* 3. MAIN EDITORIAL HERO TYPOGRAPHY */}
          {/* ============================================================ */}
          <View style={styles.contentContainer}>
            <Animated.View style={line1Style}>
              <Text
                style={[
                  styles.headlineText,
                  { fontSize: headlineFontSize, lineHeight: headlineLineHeight, fontStyle: "italic" },
                ]}
              >
                practitioners
              </Text>
            </Animated.View>

            <Animated.View style={line2Style}>
              <Text
                style={[
                  styles.headlineText,
                  { fontSize: headlineFontSize, lineHeight: headlineLineHeight },
                ]}
              >
                in live production
              </Text>
            </Animated.View>

            <Animated.View style={line3Style}>
              <Text
                style={[
                  styles.headlineText,
                  { fontSize: headlineFontSize, lineHeight: headlineLineHeight },
                ]}
              >
                environments.
              </Text>
            </Animated.View>

            {/* Secondary Copy */}
            <Animated.View style={secondaryStyle}>
              <Text style={styles.secondaryText}>
                Real people. Real projects.{"\n"}
                A global community building what comes next.
              </Text>
            </Animated.View>

            {/* CTA */}
            <Animated.View style={ctaStyle}>
              <TouchableOpacity
                activeOpacity={0.8}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Explore Nexovate"
                style={styles.ctaRow}
              >
                <View>
                  <Text style={styles.ctaLabel}>EXPLORE NEXOVATE</Text>
                  <View style={styles.ctaUnderline} />
                </View>
                <View style={styles.ctaArrowCircle}>
                  <Text style={styles.ctaArrow}>→</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* ============================================================ */}
          {/* 4. RIGHT-SIDE VERTICAL MESSAGE */}
          {/* ============================================================ */}
          <View style={styles.verticalMessageContainer} pointerEvents="none">
            <View style={styles.verticalLine} />
            <Text style={styles.verticalText}>
              LEARN.{"\n"}
              BUILD.{"\n"}
              SHAPE{"\n"}
              TOMORROW.
            </Text>
          </View>

          {/* ============================================================ */}
          {/* 5. BOTTOM SCROLL INDICATOR */}
          {/* ============================================================ */}
          <View
            style={[styles.bottomRow, { paddingBottom: Math.max(insets.bottom, 16) }]}
            pointerEvents="none"
          >
            <View style={styles.scrollIndicator}>
              <View style={styles.scrollLine}>
                <View style={styles.scrollDot} />
              </View>
              <Text style={styles.scrollText}>SCROLL TO DISCOVER</Text>
            </View>
            <Text style={styles.nxFrameText}>NX_FRAME // 01</Text>
          </View>

          {/* ============================================================ */}
          {/* 6. NEXT SECTION TRANSITION (LEARN. BUILD. SHAPE TOMORROW.) */}
          {/* ============================================================ */}
          <Animated.View style={[styles.transitionContainer, transitionStyle]} pointerEvents="none">
            <Text style={styles.phaseLabel}>NEXT PHASE</Text>
            <Text style={styles.phaseTitleGold}>LEARN.</Text>
            <Text style={styles.phaseTitleWhite}>BUILD.</Text>
            <Text style={styles.phaseTitleMuted}>SHAPE TOMORROW.</Text>
          </Animated.View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#07080D",
  },
  heroViewport: {
    width: "100%",
    position: "relative",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  bgContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#07080D",
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },
  tintOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(5, 5, 8, 0.30)",
  },
  gradientTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: "rgba(5, 5, 8, 0.25)",
  },
  gradientBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    backgroundColor: "rgba(5, 5, 8, 0.92)",
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 30,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(20, 20, 22, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoIconText: {
    color: "#F1E5C6",
    fontSize: 12,
    fontWeight: "700",
  },
  logoTitle: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 15,
    letterSpacing: 1.5,
    color: "#FFFFFF",
  },
  logoSubtitle: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 8,
    letterSpacing: 2,
    color: "rgba(255, 255, 255, 0.40)",
  },
  menuButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(20, 20, 20, 0.78)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  menuLine: {
    height: 1.5,
    backgroundColor: "#FFFFFF",
    opacity: 0.85,
    borderRadius: 1,
  },
  metaRow: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 20,
    marginTop: 6,
  },
  metaLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaGold: {
    fontSize: 9,
    fontFamily: TYPOGRAPHY.fontMedium,
    color: "#B38A35",
    letterSpacing: 2,
  },
  metaSlash: {
    color: "rgba(255, 255, 255, 0.2)",
    fontSize: 9,
  },
  metaLabel: {
    fontSize: 9,
    fontFamily: TYPOGRAPHY.fontRegular,
    color: "rgba(255, 255, 255, 0.40)",
    letterSpacing: 2,
  },
  contentContainer: {
    paddingHorizontal: 24,
    justifyContent: "center",
    zIndex: 20,
  },
  headlineText: {
    color: "#F5F0E8",
    letterSpacing: -1.5,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontWeight: "400",
  },
  secondaryText: {
    marginTop: 20,
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 17,
    lineHeight: 25,
    color: "rgba(255, 255, 255, 0.70)",
  },
  ctaRow: {
    marginTop: 26,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  ctaLabel: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 11,
    letterSpacing: 3,
    color: "#FFFFFF",
  },
  ctaUnderline: {
    width: 160,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.50)",
    marginTop: 4,
  },
  ctaArrowCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.20)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaArrow: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  verticalMessageContainer: {
    position: "absolute",
    right: 24,
    top: "54%",
    alignItems: "center",
    zIndex: 20,
  },
  verticalLine: {
    width: 1,
    height: 90,
    backgroundColor: "rgba(255, 255, 255, 0.20)",
    marginBottom: 10,
  },
  verticalText: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 9,
    letterSpacing: 2.5,
    color: "rgba(255, 255, 255, 0.60)",
    textAlign: "center",
    lineHeight: 16,
  },
  bottomRow: {
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    zIndex: 20,
  },
  scrollIndicator: {
    gap: 8,
  },
  scrollLine: {
    width: 1,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.20)",
    position: "relative",
  },
  scrollDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    bottom: 0,
    left: -1.5,
  },
  scrollText: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 9,
    letterSpacing: 3,
    color: "rgba(255, 255, 255, 0.60)",
  },
  nxFrameText: {
    fontSize: 8,
    color: "rgba(255, 255, 255, 0.25)",
    fontFamily: "monospace",
  },
  transitionContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#07080D",
    justifyContent: "center",
    paddingHorizontal: 24,
    zIndex: 40,
  },
  phaseLabel: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 11,
    letterSpacing: 3,
    color: "#B38A35",
    marginBottom: 12,
  },
  phaseTitleGold: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 64,
    fontWeight: "300",
    color: "#F1E5C6",
    letterSpacing: -2,
    marginBottom: 4,
  },
  phaseTitleWhite: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 64,
    fontWeight: "300",
    color: "#FFFFFF",
    letterSpacing: -2,
    opacity: 0.8,
    marginBottom: 4,
  },
  phaseTitleMuted: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 52,
    fontWeight: "300",
    color: "rgba(255, 255, 255, 0.6)",
    letterSpacing: -2,
  },
});
