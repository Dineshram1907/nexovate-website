// @ts-nocheck
import React from "react";
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
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import { TYPOGRAPHY } from "../constants/typography";

const TOTAL_FRAMES = 25;
const FRAME_END_SCROLL = 1000;
const TEXT_END_SCROLL = 1500;
const TOTAL_SECTION_HEIGHT = 1500 + 800;

export const CinematicFrameSequence: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Dark overlay increase during Phase 2
  const overlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [FRAME_END_SCROLL, TEXT_END_SCROLL],
      [0.3, 0.85],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  // ============================================================
  // PHASE 2: EXACT SCROLL-DRIVEN TEXT REVEAL (STRICTLY scrollY >= 1000)
  // ============================================================

  // 1. Headline ("Intelligence\nDesigned To Evolve."): scrollY 1050 -> 1200
  const headlineStyle = useAnimatedStyle(() => {
    if (scrollY.value < 1050) {
      return { opacity: 0, transform: [{ translateY: 70 }] };
    }
    const opacity = interpolate(scrollY.value, [1050, 1200], [0, 1], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [1050, 1200], [70, 0], Extrapolate.CLAMP);
    return { opacity, transform: [{ translateY }] };
  });

  // 2. Supporting Text ("Learn. Build. Shape Tomorrow."): scrollY 1150 -> 1300
  const subtextStyle = useAnimatedStyle(() => {
    if (scrollY.value < 1150) {
      return { opacity: 0, transform: [{ translateY: 35 }] };
    }
    const opacity = interpolate(scrollY.value, [1150, 1300], [0, 1], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [1150, 1300], [35, 0], Extrapolate.CLAMP);
    return { opacity, transform: [{ translateY }] };
  });

  // 3. CTA ("EXPLORE NEXOVATE →"): scrollY 1250 -> 1400
  const ctaStyle = useAnimatedStyle(() => {
    if (scrollY.value < 1250) {
      return { opacity: 0, transform: [{ translateY: 25 }] };
    }
    const opacity = interpolate(scrollY.value, [1250, 1400], [0, 1], Extrapolate.CLAMP);
    const translateY = interpolate(scrollY.value, [1250, 1400], [25, 0], Extrapolate.CLAMP);
    return { opacity, transform: [{ translateY }] };
  });

  // Debug Phase badge
  const debugPhaseStyle = useAnimatedStyle(() => {
    const isTextPhase = scrollY.value >= FRAME_END_SCROLL;
    return {
      backgroundColor: isTextPhase ? "rgba(241, 229, 198, 0.2)" : "rgba(255, 255, 255, 0.1)",
    };
  });

  return (
    <View style={styles.rootContainer}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ height: TOTAL_SECTION_HEIGHT }}
      >
        {/* Pinned Viewport */}
        <View style={[styles.stickyViewport, { height: windowHeight }]}>
          {/* ============================================================ */}
          {/* LAYER 0: STATIC FRAME VISUAL (Frame 01 -> 25, then Held) */}
          {/* ============================================================ */}
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
            }}
            style={styles.bgImage}
            resizeMode="cover"
          />

          {/* LAYER 1: DARK OVERLAYS */}
          <Animated.View style={[styles.darkOverlay, overlayStyle]} pointerEvents="none" />
          <View style={styles.topVignette} pointerEvents="none" />
          <View style={styles.bottomVignette} pointerEvents="none" />

          {/* HEADER & DEBUG INDICATOR */}
          <View style={[styles.header, { paddingTop: Math.max(insets.top, 24) }]}>
            <View>
              <Text style={styles.headerLogo}>NEXOVATE</Text>
              <Text style={styles.headerSub}>CINEMATIC SEQUENCE</Text>
            </View>
            <Animated.View style={[styles.liveIndicator, debugPhaseStyle]}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>SYSTEM 01</Text>
            </Animated.View>
          </View>

          {/* ============================================================ */}
          {/* LAYER 2: PHASE 2 TEXT CONTENT (STRICTLY >= 1000px) */}
          {/* ============================================================ */}
          <View style={styles.contentWrapper} pointerEvents="box-none">
            {/* 1. HEADLINE: 1050px -> 1200px */}
            <Animated.View style={headlineStyle}>
              <Text style={styles.headline}>
                Intelligence{"\n"}
                <Text style={styles.headlineItalic}>Designed To Evolve.</Text>
              </Text>
            </Animated.View>

            {/* 2. SUPPORTING TEXT: 1150px -> 1300px */}
            <Animated.View style={subtextStyle}>
              <Text style={styles.subtext}>Learn. Build. Shape Tomorrow.</Text>
            </Animated.View>

            {/* 3. CTA: 1250px -> 1400px */}
            <Animated.View style={[styles.ctaWrapper, ctaStyle]}>
              <TouchableOpacity
                activeOpacity={0.8}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel="Explore Nexovate"
                style={styles.ctaButton}
              >
                <Text style={styles.ctaText}>EXPLORE NEXOVATE</Text>
                <Text style={styles.ctaArrow}>→</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* FOOTER */}
          <View
            style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}
            pointerEvents="none"
          >
            <Text style={styles.footerStatus}>STAGE: SEQUENTIAL SCROLL</Text>
            <Text style={styles.footerPrompt}>SCROLL TO ADVANCE</Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#070913",
  },
  stickyViewport: {
    width: "100%",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(7, 9, 19, 0.75)",
  },
  topVignette: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: "rgba(7, 9, 19, 0.4)",
  },
  bottomVignette: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: "rgba(7, 9, 19, 0.9)",
  },
  header: {
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 20,
  },
  headerLogo: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 15,
    letterSpacing: 2,
    color: "#FFFFFF",
  },
  headerSub: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 8,
    letterSpacing: 1.5,
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: 2,
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  liveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.cream,
  },
  liveText: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 8,
    letterSpacing: 1.5,
    color: COLORS.cream,
  },
  contentWrapper: {
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
  },
  headline: {
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontSize: 48,
    fontWeight: "300",
    color: "#F5F0E8",
    textAlign: "center",
    lineHeight: 48,
    letterSpacing: -1.5,
  },
  headlineItalic: {
    fontStyle: "italic",
    color: "#FFFFFF",
  },
  subtext: {
    marginTop: 16,
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 18,
    lineHeight: 26,
    color: "rgba(255, 255, 255, 0.75)",
    textAlign: "center",
  },
  ctaWrapper: {
    marginTop: 24,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: COLORS.cream,
  },
  ctaText: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    color: "#0A0A0A",
  },
  ctaArrow: {
    fontSize: 14,
    color: "#0A0A0A",
  },
  footer: {
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 20,
  },
  footerStatus: {
    fontFamily: TYPOGRAPHY.fontMedium,
    fontSize: 8,
    letterSpacing: 2,
    color: "rgba(255, 255, 255, 0.4)",
  },
  footerPrompt: {
    fontFamily: TYPOGRAPHY.fontRegular,
    fontSize: 8,
    letterSpacing: 1.5,
    color: "rgba(255, 255, 255, 0.25)",
  },
});
