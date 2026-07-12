import React, { useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withSequence,
  withRepeat,
  runOnJS,
  interpolate,
  Extrapolation,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '@navigation/types';
import {
  Colors,
  Typography,
  Spacing,
  Springs,
} from '@theme';
import { SplashUtils } from '@utils/splashUtils';

type SplashNavProp = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

// ── Animation Timing (ms) ────────────────────────────────────
const TIMING = {
  RADAR_START:  200,
  DOT_START:    500,
  RING_START:   900,
  GLOW_START:   1000,
  ICON_START:   1100,
  NAME_START:   1400,
  TAG_START:    1700,
  BAR_START:    2000,
  BAR_DURATION: 800,
  NAV_DELAY:    2950,
} as const;

export default function SplashScreen() {
  const navigation = useNavigation<SplashNavProp>();
  const { width }  = useWindowDimensions();
  const navDone    = useRef(false);

  const logoSize = Math.min(width * 0.35, 140);

  // ── Shared Values ────────────────────────────────────────────
  const radarRot = useSharedValue(0);
  const radarOp  = useSharedValue(0);
  const radarSc  = useSharedValue(0.5);

  const dotSc    = useSharedValue(0);
  const dotOp    = useSharedValue(0);

  const ringSc   = useSharedValue(0.3);
  const ringOp   = useSharedValue(0);

  const glowOp   = useSharedValue(0);
  const glowSc   = useSharedValue(0.5);

  const iconOp   = useSharedValue(0);
  const iconSc   = useSharedValue(0.6);

  const nameOp   = useSharedValue(0);
  const nameY    = useSharedValue(24);

  const tagOp    = useSharedValue(0);
  const tagY     = useSharedValue(12);

  const barOp    = useSharedValue(0);
  const barW     = useSharedValue(0);

  const pulseOp  = useSharedValue(0);
  const pulseSc  = useSharedValue(1);

  // ── Navigation ───────────────────────────────────────────────
  const goNext = useCallback(async () => {
    if (navDone.current) return;
    navDone.current = true;

    cancelAnimation(radarRot);
    cancelAnimation(pulseOp);
    cancelAnimation(pulseSc);

    // Auth store state is persisted — more reliable than raw AsyncStorage
    const { useAuthStore } = await import('@store/authStore');
    const authState = useAuthStore.getState();
    const onboardingDone = await SplashUtils.hasSeenOnboarding();

    if (authState.isAuthenticated && authState.token) {
      // Already authenticated — RootNavigator will redirect to Main automatically
      navigation.replace('Login');
    } else if (onboardingDone) {
      navigation.replace('Login');
    } else {
      navigation.replace('Onboarding');
    }
  }, [navigation]);

  // ── Animation Sequence ───────────────────────────────────────
  useEffect(() => {
    ExpoSplashScreen.hideAsync().catch(() => {});

    // Phase 1 — Radar grid
    radarOp.value = withDelay(TIMING.RADAR_START, withTiming(1, { duration: 700 }));
    radarSc.value = withDelay(TIMING.RADAR_START, withSpring(1, Springs.gentle));
    radarRot.value = withDelay(
      TIMING.RADAR_START,
      withRepeat(withTiming(360, { duration: 12000, easing: Easing.linear }), -1, false)
    );

    // Phase 2 — Gold dot
    dotOp.value = withDelay(TIMING.DOT_START, withTiming(1, { duration: 250 }));
    dotSc.value = withDelay(TIMING.DOT_START, withSpring(1, Springs.bouncy));

    // Phase 3 — Outer ring
    ringOp.value = withDelay(TIMING.RING_START, withTiming(1, { duration: 400 }));
    ringSc.value = withDelay(TIMING.RING_START, withSpring(1, Springs.default));

    // Phase 4 — Glow blob
    glowOp.value = withDelay(TIMING.GLOW_START, withTiming(0.7, { duration: 500 }));
    glowSc.value = withDelay(TIMING.GLOW_START, withSpring(1.1, Springs.gentle));

    // Phase 5 — SG icon
    iconOp.value = withDelay(TIMING.ICON_START, withTiming(1, { duration: 350 }));
    iconSc.value = withDelay(TIMING.ICON_START, withSpring(1, Springs.bouncy));

    // Phase 5b — Pulse ring (continuous after icon)
    const PULSE_START = TIMING.ICON_START + 350;
    pulseOp.value = withDelay(
      PULSE_START,
      withRepeat(
        withSequence(
          withTiming(0.35, { duration: 900 }),
          withTiming(0,    { duration: 900 })
        ),
        -1, false
      )
    );
    pulseSc.value = withDelay(
      PULSE_START,
      withRepeat(
        withSequence(
          withTiming(1.6, { duration: 900, easing: Easing.out(Easing.ease) }),
          withTiming(1,   { duration: 900 })
        ),
        -1, false
      )
    );

    // Phase 6 — App name
    nameOp.value = withDelay(TIMING.NAME_START, withTiming(1, { duration: 450 }));
    nameY.value  = withDelay(TIMING.NAME_START, withSpring(0, Springs.default));

    // Phase 7 — Tagline
    tagOp.value = withDelay(TIMING.TAG_START, withTiming(1, { duration: 350 }));
    tagY.value  = withDelay(TIMING.TAG_START, withSpring(0, Springs.default));

    // Phase 8 — Loading bar
    barOp.value = withDelay(TIMING.BAR_START, withTiming(1, { duration: 200 }));
    barW.value  = withDelay(TIMING.BAR_START, withTiming(1, {
      duration: TIMING.BAR_DURATION,
      easing:   Easing.bezier(0.25, 0.1, 0.25, 1),
    }));

    // Phase 9 — Navigate
    const timer = setTimeout(() => runOnJS(goNext)(), TIMING.NAV_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // ── Animated Styles ──────────────────────────────────────────
  const radarStyle = useAnimatedStyle(() => ({
    opacity:   radarOp.value,
    transform: [{ scale: radarSc.value }, { rotate: `${radarRot.value}deg` }],
  }));

  const dotStyle = useAnimatedStyle(() => ({
    opacity:   dotOp.value,
    transform: [{ scale: dotSc.value }],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    opacity:   ringOp.value,
    transform: [{ scale: ringSc.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity:   glowOp.value,
    transform: [{ scale: glowSc.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity:   pulseOp.value,
    transform: [{ scale: pulseSc.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    opacity:   iconOp.value,
    transform: [{ scale: iconSc.value }],
  }));

  const nameStyle = useAnimatedStyle(() => ({
    opacity:   nameOp.value,
    transform: [{ translateY: nameY.value }],
  }));

  const tagStyle = useAnimatedStyle(() => ({
    opacity:   tagOp.value,
    transform: [{ translateY: tagY.value }],
  }));

  const barContainerStyle = useAnimatedStyle(() => ({ opacity: barOp.value }));

  const barFillStyle = useAnimatedStyle(() => ({
    width: `${interpolate(barW.value, [0, 1], [0, 100], Extrapolation.CLAMP)}%`,
  }));

  // ── Render ───────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} translucent />

      {/* ── Radar Background ───────────────────────────────── */}
      <Animated.View
        style={[styles.radarWrap, { width: width * 1.6, height: width * 1.6 }, radarStyle]}
      >
        <SplashRadarGrid size={width * 1.6} />
      </Animated.View>

      {/* ── Logo Area ──────────────────────────────────────── */}
      <View style={styles.logoArea}>

        {/* Glow blob */}
        <Animated.View style={[
          styles.glowBlob,
          { width: logoSize * 2.8, height: logoSize * 2.8 },
          glowStyle,
        ]} />

        {/* Pulse ring */}
        <Animated.View style={[
          styles.pulseRing,
          {
            width:        logoSize * 1.5,
            height:       logoSize * 1.5,
            borderRadius: logoSize * 0.75,
          },
          pulseStyle,
        ]} />

        {/* Logo wrapper */}
        <View style={[styles.logoWrap, { width: logoSize, height: logoSize }]}>

          {/* Outer ring */}
          <Animated.View style={[
            styles.outerRing,
            {
              width:        logoSize,
              height:       logoSize,
              borderRadius: logoSize / 2,
            },
            ringStyle,
          ]} />

          {/* Gold circle */}
          <Animated.View style={dotStyle}>
            <LinearGradient
              colors={['#FFD27A', '#F5A623', '#C47D0E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width:        logoSize * 0.86,
                height:       logoSize * 0.86,
                borderRadius: logoSize * 0.43,
              }}
            />
          </Animated.View>

          {/* SG monogram */}
          <Animated.View style={[StyleSheet.absoluteFill, styles.iconCenter, iconStyle]}>
            <Text style={[styles.sgText, { fontSize: logoSize * 0.34 }]}>
              SG
            </Text>
            <View style={styles.sgLines}>
              <View style={[styles.sgLine, { width: logoSize * 0.22 }]} />
              <View style={[styles.sgLineFaint, { width: logoSize * 0.08 }]} />
              <View style={[styles.sgLine, { width: logoSize * 0.22 }]} />
            </View>
          </Animated.View>
        </View>

        {/* App name */}
        <Animated.View style={nameStyle}>
          <Text style={styles.appName}>SAMGOLD</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View style={[styles.taglineWrap, tagStyle]}>
          <Text style={styles.tagline}>المسح الشامل والكشف الذكي</Text>
          <View style={styles.taglineLine} />
        </Animated.View>
      </View>

      {/* ── Loading Bar ────────────────────────────────────── */}
      <Animated.View style={[styles.barWrap, barContainerStyle]}>
        <View style={styles.barTrack}>
          <Animated.View style={[styles.barFillWrap, barFillStyle]}>
            <LinearGradient
              colors={['#FFD27A', '#F5A623', '#C47D0E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>
        <Text style={styles.barLabel}>جارٍ التحضير...</Text>
      </Animated.View>

      {/* ── Footer ─────────────────────────────────────────── */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>SAMGOLD © 2025</Text>
      </View>
    </View>
  );
}

// ── Radar Grid ───────────────────────────────────────────────
function SplashRadarGrid({ size }: { size: number }) {
  const center     = size / 2;
  const ringRatios = [0.12, 0.25, 0.38, 0.51, 0.64, 0.77, 0.9];
  const lineAngles = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);

  return (
    <View style={{ width: size, height: size }}>
      {/* Concentric rings */}
      {ringRatios.map((r, i) => (
        <View key={`r${i}`} style={{
          position:     'absolute',
          width:        size * r,
          height:       size * r,
          borderRadius: (size * r) / 2,
          borderWidth:  0.4,
          borderColor:  Colors.radarGrid,
          top:          center - (size * r) / 2,
          left:         center - (size * r) / 2,
        }} />
      ))}

      {/* Radial lines */}
      {lineAngles.map((angle, i) => (
        <View key={`l${i}`} style={{
          position:        'absolute',
          width:           size * 0.48,
          height:          0.4,
          backgroundColor: Colors.radarGrid,
          top:             center,
          left:            center,
          transformOrigin: '0% 50%',
          transform:       [{ rotate: `${angle}deg` }],
        }} />
      ))}

      {/* Active sweep gradient */}
      <View style={{
        position:        'absolute',
        width:           size * 0.46,
        height:          1.5,
        top:             center,
        left:            center,
        transformOrigin: '0% 50%',
        overflow:        'hidden',
      }}>
        <LinearGradient
          colors={[Colors.radarLine, 'rgba(245,166,35,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </View>

      {/* Center dot */}
      <View style={{
        position:        'absolute',
        width:           6,
        height:          6,
        borderRadius:    3,
        backgroundColor: Colors.primary,
        top:             center - 3,
        left:            center - 3,
      }} />
    </View>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex:            1,
    backgroundColor: Colors.bgPrimary,
    alignItems:      'center',
    justifyContent:  'center',
  },

  radarWrap: {
    position:       'absolute',
    alignItems:     'center',
    justifyContent: 'center',
    opacity:        0.65,
  },

  logoArea: {
    alignItems: 'center',
    gap:        Spacing[5],
  },

  glowBlob: {
    position:        'absolute',
    borderRadius:    9999,
    backgroundColor: Colors.primaryGlow,
  },

  pulseRing: {
    position:    'absolute',
    borderWidth: 1,
    borderColor: Colors.primary,
  },

  logoWrap: {
    alignItems:     'center',
    justifyContent: 'center',
    position:       'relative',
  },

  outerRing: {
    position:    'absolute',
    borderWidth: 1.5,
    borderColor: Colors.borderGold,
  },

  iconCenter: {
    alignItems:     'center',
    justifyContent: 'center',
    gap:            4,
  },

  sgText: {
    fontWeight:    '900',
    color:         Colors.textInverse,
    letterSpacing: -2,
    textAlign:     'center',
  },

  sgLines: {
    flexDirection: 'row',
    gap:           6,
    alignItems:    'center',
  },

  sgLine: {
    height:          1.5,
    backgroundColor: Colors.textInverse,
    opacity:         0.7,
    borderRadius:    1,
  },

  sgLineFaint: {
    height:          1.5,
    backgroundColor: Colors.textInverse,
    opacity:         0.35,
    borderRadius:    1,
  },

  appName: {
    fontSize:         44,
    fontWeight:       '900',
    color:            Colors.primary,
    letterSpacing:    8,
    textAlign:        'center',
    textShadowColor:  Colors.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },

  taglineWrap: {
    alignItems: 'center',
    gap:        Spacing[2],
  },

  tagline: {
    ...Typography.bodyMedium,
    color:         Colors.textSecondary,
    letterSpacing: 1.5,
    textAlign:     'center',
  },

  taglineLine: {
    width:           80,
    height:          1,
    backgroundColor: Colors.borderGold,
    borderRadius:    1,
  },

  barWrap: {
    position:   'absolute',
    bottom:     72,
    left:       Spacing[10],
    right:      Spacing[10],
    gap:        Spacing[2],
    alignItems: 'center',
  },

  barTrack: {
    width:           '100%',
    height:          2,
    backgroundColor: Colors.surfaceElevated,
    borderRadius:    1,
    overflow:        'hidden',
  },

  barFillWrap: {
    position:     'absolute',
    top:          0,
    bottom:       0,
    left:         0,
    overflow:     'hidden',
    borderRadius: 1,
  },

  barLabel: {
    ...Typography.caption,
    color:         Colors.textDisabled,
    letterSpacing: 1,
  },

  footer: {
    position: 'absolute',
    bottom:   Spacing[5],
  },

  footerText: {
    ...Typography.caption,
    color: 'rgba(75,85,99,0.5)',
  },
});
