// @ts-nocheck
/**
 * NEXOVATE MOBILE APP SHOWCASE
 * Framework: React Native / Expo Router
 * Dependencies:
 *   - react-native
 *   - expo-router
 *   - react-native-reanimated
 *   - @expo-google-fonts/manrope
 *   - lucide-react-native / @expo/vector-icons
 */

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  useWindowDimensions,
  Platform,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import {
  useFonts,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
} from "@expo-google-fonts/manrope";

// ==========================================
// COLOR PALETTE & TOKENS
// ==========================================
const COLORS = {
  black: "#0A0A0A",
  deepBlack: "#111111",
  frameBorder: "#2A2A2A",
  white: "#FFFFFF",
  cream: "#F1E5C6",
  offWhite: "#F5F0E8",
  textMuted: "rgba(255,255,255,0.77)",
  textSecondary: "rgba(255,255,255,0.60)",
  textSubtle: "rgba(255,255,255,0.50)",
  textDim: "rgba(255,255,255,0.30)",
  accentTeal: "#18A9AA",
  accentGold: "#EFAF32",
};

// ==========================================
// 1. TYPEWRITER TEXT COMPONENT
// ==========================================
interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  style?: any;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 200,
  speed = 30,
  style,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timeout = setTimeout(() => {
      let index = 0;
      let interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return <Text style={style}>{displayedText}</Text>;
};

// ==========================================
// 2. DYNAMIC ISLAND COMPONENT
// ==========================================
export const DynamicIsland: React.FC = () => {
  return (
    <View style={styles.dynamicIslandContainer}>
      <View style={styles.sensorDot} />
      <View style={styles.cameraLens}>
        <View style={styles.cameraIris} />
      </View>
    </View>
  );
};

// ==========================================
// 3. HOME INDICATOR COMPONENT
// ==========================================
export const HomeIndicator: React.FC = () => {
  return <View style={styles.homeIndicator} />;
};

// ==========================================
// 4. HAMBURGER BUTTON COMPONENT
// ==========================================
interface HamburgerButtonProps {
  isOpen: boolean;
  onPress: () => void;
}

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({ isOpen, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.hamburgerButton} activeOpacity={0.7}>
      {isOpen ? (
        <Text style={styles.closeIconText}>✕</Text>
      ) : (
        <View style={styles.hamburgerLinesContainer}>
          <View style={styles.hamburgerLineLong} />
          <View style={styles.hamburgerLineLong} />
          <View style={styles.hamburgerLineShort} />
        </View>
      )}
    </TouchableOpacity>
  );
};

// ==========================================
// 5. NEXOVATE HEADER COMPONENT
// ==========================================
interface NexovateHeaderProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

export const NexovateHeader: React.FC<NexovateHeaderProps> = ({ isMenuOpen, onMenuToggle }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.brandTitle}>NEXOVATE</Text>
      <HamburgerButton isOpen={isMenuOpen} onPress={onMenuToggle} />
    </View>
  );
};

// ==========================================
// 6. SHARED FULL-SCREEN MENU OVERLAY
// ==========================================
interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoute?: (route: string) => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, onSelectRoute }) => {
  if (!isOpen) return null;

  const routes = ["Home", "About", "Programs", "Projects", "Contact"];

  return (
    <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} style={styles.menuOverlay}>
      <View style={styles.menuHeader}>
        <Text style={styles.brandTitle}>NEXOVATE</Text>
        <TouchableOpacity onPress={onClose} style={styles.menuCloseCircle}>
          <Text style={styles.closeIconText}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuLinksContainer}>
        {routes.map((route, i) => (
          <TouchableOpacity
            key={route}
            onPress={() => {
              onSelectRoute?.(route);
              onClose();
            }}
            style={styles.menuLinkRow}
          >
            <Text style={styles.menuLinkText}>{route}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={onClose} style={styles.menuCtaButton} activeOpacity={0.85}>
        <Text style={styles.menuCtaText}>Join Nexovate</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ==========================================
// 7. SCREEN 1 — NEXOVATE IDENTITY
// ==========================================
export const ScreenOne: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.screenContainer}>
      <NexovateHeader isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />

      {/* Side Rotated Identity Text */}
      <View style={styles.sideRotatedContainer}>
        <Text style={styles.sideRotatedText}>NEXOVATE • INTELLIGENCE / TECHNOLOGY</Text>
      </View>

      {/* Main Abstract Visual Core */}
      <View style={styles.screenOneVisualContainer}>
        <View style={styles.abstractGlow} />
        <View style={styles.abstractCard}>
          <Text style={styles.abstractTag}>SYS.01</Text>
          <Text style={styles.abstractTitle}>EVOLVE</Text>
          <View style={styles.liveBadgeRow}>
            <View style={styles.livePulseDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
        <Text style={styles.streamText}>[ LEARNING ] • [ CREATION ] • [ TOMORROW ]</Text>
      </View>

      {/* Philosophy Statement */}
      <View style={styles.philosophyContainer}>
        <TypewriterText
          text="“We don't just learn what comes next. We build it.”"
          delay={200}
          speed={24}
          style={styles.philosophyText}
        />
      </View>

      {/* Bottom Information Card */}
      <View style={styles.screenOneBottomCard}>
        <Text style={styles.bottomCardEyebrow}>LEARN • BUILD • SHAPE TOMORROW</Text>
        <Text style={styles.bottomCardTitle}>Intelligence{"\n"}Designed To Evolve</Text>
        <TouchableOpacity style={styles.darkCtaButton} activeOpacity={0.85}>
          <Text style={styles.darkCtaText}>Explore Nexovate</Text>
          <Text style={styles.ctaArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </View>
  );
};

// ==========================================
// 8. SCREEN 2 — NEXOVATE HOME
// ==========================================
export const ScreenTwo: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.screenContainer}>
      {/* Top Cinematic Visual (472px) */}
      <View style={styles.screenTwoHeroVisual}>
        <View style={styles.heroGradientOverlay} />
      </View>

      <NexovateHeader isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />

      {/* Community Indicator */}
      <View style={styles.communityIndicator}>
        <View style={styles.avatarPills}>
          <Text style={styles.avatarText}>01 • 02 • 03</Text>
          <Text style={styles.avatarHighlight}>+2K</Text>
        </View>
      </View>

      {/* Hero Headline & Subtext */}
      <View style={styles.screenTwoHeadlineBlock}>
        <TypewriterText
          text="Intelligence designed to evolve."
          delay={200}
          speed={24}
          style={styles.screenTwoHeroTitle}
        />
        <Text style={styles.screenTwoSubtext}>Learn. Build. Shape Tomorrow.</Text>
      </View>

      {/* Bottom Cream CTA */}
      <View style={styles.screenTwoCtaWrapper}>
        <TouchableOpacity style={styles.creamCtaButton} activeOpacity={0.85}>
          <Text style={styles.creamCtaText}>Explore Nexovate</Text>
          <Text style={styles.creamCtaArrow}>→</Text>
        </TouchableOpacity>
      </View>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </View>
  );
};

// ==========================================
// 9. SCREEN 3 — PROGRAMS / INNOVATION
// ==========================================
export const ScreenThree: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const programs = [
    { num: "01", title: "AI & Intelligence", desc: "Learn how emerging intelligence is changing the way we build." },
    { num: "02", title: "Build & Create", desc: "Turn ideas into real products, systems, and experiences." },
    { num: "03", title: "Future Labs", desc: "Explore what's next through experimentation and technology." },
    { num: "04", title: "Nexovate Community", desc: "Connect with people building the future." },
  ];

  return (
    <View style={styles.screenContainer}>
      {/* Top Innovation Hero (345px) with Play Button */}
      <View style={styles.screenThreeHero}>
        <View style={styles.screenThreeOverlay} />
        <TouchableOpacity style={styles.playButtonCircle} activeOpacity={0.85}>
          <Text style={styles.playTriangleIcon}>▶</Text>
        </TouchableOpacity>
      </View>

      <NexovateHeader isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />

      {/* Program Content Container */}
      <View style={styles.screenThreeContent}>
        {/* Dark Feature Band */}
        <View style={styles.darkFeatureBand}>
          <View>
            <Text style={styles.darkBandEyebrow}>CURRICULUM</Text>
            <Text style={styles.darkBandHeading}>Programs</Text>
          </View>
          <Text style={styles.cohortsBadge}>04 COHORTS</Text>
        </View>

        {/* Program Rows */}
        <ScrollView style={styles.programListScrollView} showsVerticalScrollIndicator={false}>
          {programs.map((prog) => (
            <View key={prog.num} style={styles.programRow}>
              <View style={styles.programBadge}>
                <Text style={styles.programBadgeText}>{prog.num}</Text>
              </View>
              <View style={styles.programRowBody}>
                <Text style={styles.programRowTitle}>{prog.title}</Text>
                <Text style={styles.programRowDesc}>{prog.desc}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </View>
  );
};

// ==========================================
// 10. PHONE FRAME COMPONENT
// ==========================================
interface PhoneFrameProps {
  children: React.ReactNode;
  label?: string;
  delay?: number;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, label, delay = 0 }) => {
  return (
    <Animated.View entering={FadeIn.delay(delay).duration(600)} style={styles.phoneChassis}>
      {label ? <Text style={styles.phoneTopLabel}>{label}</Text> : null}
      <View style={styles.phoneArtboard}>
        <DynamicIsland />
        <HomeIndicator />
        {children}
      </View>
    </Animated.View>
  );
};

// ==========================================
// 11. MAIN MASTER SHOWCASE COMPONENT
// ==========================================
export default function NexovateAppShowcase() {
  const { width: windowWidth } = useWindowDimensions();
  const isDesktop = windowWidth >= 900;

  const [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
  });

  if (!fontsLoaded) {
    return <View style={styles.loadingScreen} />;
  }

  // Calculate mobile scaling factor
  const mobileScale = Math.min(1, (windowWidth - 40) / 375);

  return (
    <ScrollView
      style={styles.showcaseMasterContainer}
      contentContainerStyle={styles.showcaseScrollContent}
      horizontal={isDesktop}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={isDesktop ? styles.desktopShowcaseRow : styles.mobileShowcaseColumn}>
        <View style={!isDesktop ? { transform: [{ scale: mobileScale }], width: 375, height: 812, marginBottom: (812 * (mobileScale - 1)) + 32 } : undefined}>
          <PhoneFrame label="01 • IDENTITY & PHILOSOPHY" delay={0}>
            <ScreenOne />
          </PhoneFrame>
        </View>

        <View style={!isDesktop ? { transform: [{ scale: mobileScale }], width: 375, height: 812, marginBottom: (812 * (mobileScale - 1)) + 32 } : undefined}>
          <PhoneFrame label="02 • HOME & LEARNING" delay={150}>
            <ScreenTwo />
          </PhoneFrame>
        </View>

        <View style={!isDesktop ? { transform: [{ scale: mobileScale }], width: 375, height: 812, marginBottom: (812 * (mobileScale - 1)) + 32 } : undefined}>
          <PhoneFrame label="03 • PROGRAMS & LABS" delay={300}>
            <ScreenThree />
          </PhoneFrame>
        </View>
      </View>
    </ScrollView>
  );
}

// ==========================================
// STYLESHEET
// ==========================================
const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  showcaseMasterContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  showcaseScrollContent: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  desktopShowcaseRow: {
    flexDirection: "row",
    gap: 48,
    alignItems: "center",
  },
  mobileShowcaseColumn: {
    flexDirection: "column",
    gap: 32,
    alignItems: "center",
    width: "100%",
  },
  phoneChassis: {
    alignItems: "center",
  },
  phoneTopLabel: {
    fontSize: 12,
    fontFamily: "Manrope_400Regular",
    color: COLORS.cream,
    letterSpacing: 2,
    marginBottom: 12,
  },
  phoneArtboard: {
    width: 375,
    height: 812,
    backgroundColor: COLORS.black,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.frameBorder,
    overflow: "hidden",
    position: "relative",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
      web: {
        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
      },
    }),
  },
  dynamicIslandContainer: {
    width: 126,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#000000",
    position: "absolute",
    top: 12,
    alignSelf: "center",
    zIndex: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  sensorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#111111",
  },
  cameraLens: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: "#0a0f1d",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIris: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(24,169,170,0.4)",
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.30)",
    position: "absolute",
    bottom: 8,
    alignSelf: "center",
    zIndex: 50,
  },
  screenContainer: {
    width: 375,
    height: 812,
    backgroundColor: COLORS.black,
    position: "relative",
  },
  headerContainer: {
    paddingTop: 48,
    paddingHorizontal: 19,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 40,
  },
  brandTitle: {
    fontSize: 17,
    fontFamily: "Manrope_400Regular",
    lineHeight: 20,
    color: COLORS.white,
    letterSpacing: 1.2,
  },
  hamburgerButton: {
    width: 36,
    height: 36,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  hamburgerLinesContainer: {
    gap: 5,
    alignItems: "flex-end",
  },
  hamburgerLineLong: {
    width: 20,
    height: 1.5,
    backgroundColor: COLORS.white,
    borderRadius: 1,
  },
  hamburgerLineShort: {
    width: 14,
    height: 1.5,
    backgroundColor: COLORS.white,
    borderRadius: 1,
  },
  closeIconText: {
    color: COLORS.white,
    fontSize: 18,
    fontFamily: "Manrope_300Light",
  },
  sideRotatedContainer: {
    position: "absolute",
    left: -55,
    top: 260,
    transform: [{ rotate: "-90deg" }],
    zIndex: 20,
  },
  sideRotatedText: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    letterSpacing: 1.2,
    color: COLORS.textSubtle,
  },
  screenOneVisualContainer: {
    position: "absolute",
    top: 100,
    width: 375,
    height: 320,
    alignItems: "center",
    justifyContent: "center",
  },
  abstractGlow: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(241,229,198,0.12)",
    position: "absolute",
  },
  abstractCard: {
    width: 110,
    height: 110,
    borderRadius: 20,
    backgroundColor: "#161616",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  abstractTag: {
    fontSize: 9,
    fontFamily: "Manrope_500Medium",
    color: COLORS.cream,
    letterSpacing: 2,
    marginBottom: 4,
  },
  abstractTitle: {
    fontSize: 20,
    fontFamily: "Manrope_300Light",
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  liveBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  livePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accentTeal,
  },
  liveText: {
    fontSize: 8,
    color: COLORS.textSubtle,
    fontFamily: "Manrope_400Regular",
  },
  streamText: {
    fontSize: 10,
    color: COLORS.textDim,
    letterSpacing: 1,
    marginTop: 16,
  },
  philosophyContainer: {
    position: "absolute",
    top: 420,
    left: 20,
    right: 20,
  },
  philosophyText: {
    fontSize: 20,
    lineHeight: 27,
    fontFamily: "Manrope_400Regular",
    color: COLORS.textMuted,
  },
  screenOneBottomCard: {
    position: "absolute",
    bottom: 24,
    left: 14,
    right: 14,
    backgroundColor: COLORS.offWhite,
    borderRadius: 28,
    padding: 20,
  },
  bottomCardEyebrow: {
    fontSize: 10,
    fontFamily: "Manrope_500Medium",
    letterSpacing: 1.6,
    color: "#576071",
    marginBottom: 4,
  },
  bottomCardTitle: {
    fontSize: 22,
    lineHeight: 26,
    fontFamily: "Manrope_500Medium",
    color: COLORS.black,
    marginBottom: 12,
  },
  darkCtaButton: {
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  darkCtaText: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: "Manrope_500Medium",
  },
  ctaArrow: {
    color: COLORS.cream,
    fontSize: 16,
  },
  screenTwoHeroVisual: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 472,
    backgroundColor: "#161823",
  },
  heroGradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  communityIndicator: {
    position: "absolute",
    top: 442,
    left: 19,
  },
  avatarPills: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  avatarText: {
    color: COLORS.cream,
    fontSize: 10,
    fontFamily: "Manrope_500Medium",
  },
  avatarHighlight: {
    color: COLORS.accentTeal,
    fontSize: 10,
    fontFamily: "Manrope_500Medium",
  },
  screenTwoHeadlineBlock: {
    position: "absolute",
    top: 500,
    left: 19,
    right: 19,
  },
  screenTwoHeroTitle: {
    fontSize: 48,
    lineHeight: 50,
    fontFamily: "Manrope_300Light",
    letterSpacing: -2.5,
    color: COLORS.cream,
    marginBottom: 8,
  },
  screenTwoSubtext: {
    fontSize: 21,
    lineHeight: 27,
    fontFamily: "Manrope_400Regular",
    color: COLORS.textSecondary,
  },
  screenTwoCtaWrapper: {
    position: "absolute",
    bottom: 32,
    left: 19,
    right: 19,
  },
  creamCtaButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.cream,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  creamCtaText: {
    fontSize: 20,
    fontFamily: "Manrope_500Medium",
    color: COLORS.black,
  },
  creamCtaArrow: {
    fontSize: 20,
    color: COLORS.black,
  },
  screenThreeHero: {
    height: 345,
    width: "100%",
    backgroundColor: "#161823",
    alignItems: "center",
    justifyContent: "center",
  },
  screenThreeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.30)",
  },
  playButtonCircle: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: COLORS.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  playTriangleIcon: {
    fontSize: 24,
    color: COLORS.black,
    marginLeft: 4,
  },
  screenThreeContent: {
    position: "absolute",
    top: 343,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.offWhite,
  },
  darkFeatureBand: {
    height: 100,
    backgroundColor: COLORS.black,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  darkBandEyebrow: {
    fontSize: 10,
    fontFamily: "Manrope_500Medium",
    color: COLORS.cream,
    letterSpacing: 1.8,
  },
  darkBandHeading: {
    fontSize: 34,
    fontFamily: "Manrope_400Regular",
    letterSpacing: -0.8,
    color: COLORS.white,
  },
  cohortsBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
  },
  programListScrollView: {
    flex: 1,
    padding: 18,
  },
  programRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    gap: 12,
  },
  programBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
  programBadgeText: {
    color: COLORS.cream,
    fontSize: 12,
    fontFamily: "Manrope_500Medium",
  },
  programRowBody: {
    flex: 1,
  },
  programRowTitle: {
    fontSize: 18,
    fontFamily: "Manrope_500Medium",
    color: COLORS.black,
    marginBottom: 2,
  },
  programRowDesc: {
    fontSize: 13,
    fontFamily: "Manrope_400Regular",
    color: "#576071",
    lineHeight: 18,
  },
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.black,
    zIndex: 100,
    paddingHorizontal: 19,
    paddingTop: 48,
    paddingBottom: 36,
    justifyContent: "space-between",
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuCloseCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  menuLinksContainer: {
    gap: 22,
    marginVertical: "auto",
  },
  menuLinkRow: {
    paddingVertical: 4,
  },
  menuLinkText: {
    fontSize: 36,
    fontFamily: "Manrope_300Light",
    letterSpacing: -0.8,
    color: COLORS.white,
  },
  menuCtaButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.cream,
    alignItems: "center",
    justifyContent: "center",
  },
  menuCtaText: {
    fontSize: 19,
    fontFamily: "Manrope_500Medium",
    color: COLORS.black,
  },
});
