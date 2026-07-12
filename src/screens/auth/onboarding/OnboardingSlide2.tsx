import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  withSpring,
  interpolate,
  Extrapolation,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Typography } from '@theme';

interface Slide2Props {
  isActive:   boolean;
  translateX: Animated.SharedValue<number>;
  slideWidth: number;
  slideIndex: number;
}

const GRID_SIZE = 8;
const CELL_SIZE = 28;
const GRID_W    = GRID_SIZE * CELL_SIZE;

const CELL_INTENSITIES: readonly (readonly number[])[] = [
  [0.1, 0.1, 0.2, 0.3, 0.2, 0.1, 0.1, 0.1],
  [0.1, 0.2, 0.4, 0.6, 0.4, 0.2, 0.1, 0.1],
  [0.2, 0.4, 0.7, 0.9, 0.8, 0.5, 0.2, 0.1],
  [0.3, 0.6, 0.9, 1.0, 0.9, 0.6, 0.3, 0.2],
  [0.2, 0.4, 0.8, 0.9, 0.7, 0.4, 0.2, 0.1],
  [0.1, 0.2, 0.4, 0.6, 0.4, 0.3, 0.1, 0.1],
  [0.1, 0.1, 0.2, 0.3, 0.2, 0.1, 0.1, 0.1],
  [0.1, 0.1, 0.1, 0.2, 0.1, 0.1, 0.1, 0.1],
] as const;

function getHeatColor(intensity: number): string {
  if (intensity < 0.25)  return `rgba(30,58,95,${intensity * 4})`;
  if (intensity < 0.5)   return `rgba(123,45,139,${0.4 + intensity * 0.8})`;
  if (intensity < 0.75)  return `rgba(255,107,53,${0.6 + intensity * 0.5})`;
  return `rgba(255,229,0,${0.7 + intensity * 0.3})`;
}

export function OnboardingSlide2({
  isActive,
  translateX,
  slideWidth,
  slideIndex,
}: Slide2Props) {
  const gridOpacity   = useSharedValue(0);
  const gridScale     = useSharedValue(0.8);
  const markerScale   = useSharedValue(0);
  const markerOpacity = useSharedValue(0);
  const pulse1Scale   = useSharedValue(1);
  const pulse1Op      = useSharedValue(0);
  const pulse2Scale   = useSharedValue(1);
  const pulse2Op      = useSharedValue(0);
  const badgeScale    = useSharedValue(0);
  const badgeOpacity  = useSharedValue(0);
  const scanY         = useSharedValue(0);
  const scanOpacity   = useSharedValue(0);

  const slideProgress = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [
        -(slideIndex + 0.8) * slideWidth,
        -slideIndex * slideWidth,
        -(slideIndex - 0.8) * slideWidth,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  useEffect(() => {
    if (!isActive) return;

    gridOpacity.value = withTiming(1, { duration: 500 });
    gridScale.value   = withSpring(1, { damping: 14 });

    scanOpacity.value = withDelay(300, withTiming(1, { duration: 200 }));
    scanY.value = withDelay(300, withRepeat(
      withTiming(GRID_W - 3, { duration: 1200, easing: Easing.linear }),
      -1, false
    ));

    const markerTimer = setTimeout(() => {
      markerScale.value   = withSpring(1, { damping: 8, stiffness: 300 });
      markerOpacity.value = withTiming(1, { duration: 300 });

      pulse1Scale.value = withRepeat(
        withSequence(
          withTiming(1,   { duration: 0 }),
          withTiming(2.5, { duration: 1200, easing: Easing.out(Easing.ease) })
        ),
        -1, false
      );
      pulse1Op.value = withRepeat(
        withSequence(
          withTiming(0.7, { duration: 200 }),
          withTiming(0,   { duration: 1000 })
        ),
        -1, false
      );
      pulse2Scale.value = withDelay(600, withRepeat(
        withSequence(
          withTiming(1,   { duration: 0 }),
          withTiming(2.5, { duration: 1200, easing: Easing.out(Easing.ease) })
        ),
        -1, false
      ));
      pulse2Op.value = withDelay(600, withRepeat(
        withSequence(
          withTiming(0.5, { duration: 200 }),
          withTiming(0,   { duration: 1000 })
        ),
        -1, false
      ));
    }, 1200);

    badgeScale.value   = withDelay(1600, withSpring(1, { damping: 8, stiffness: 400 }));
    badgeOpacity.value = withDelay(1600, withTiming(1, { duration: 300 }));

    return () => clearTimeout(markerTimer);
  }, [isActive]);

  const gridStyle   = useAnimatedStyle(() => ({
    opacity:   gridOpacity.value,
    transform: [{ scale: gridScale.value }],
  }));
  const scanStyle   = useAnimatedStyle(() => ({
    opacity:   scanOpacity.value,
    transform: [{ translateY: scanY.value }],
  }));
  const markerStyle = useAnimatedStyle(() => ({
    opacity:   markerOpacity.value,
    transform: [{ scale: markerScale.value }],
  }));
  const pulse1Style = useAnimatedStyle(() => ({
    opacity:   pulse1Op.value,
    transform: [{ scale: pulse1Scale.value }],
  }));
  const pulse2Style = useAnimatedStyle(() => ({
    opacity:   pulse2Op.value,
    transform: [{ scale: pulse2Scale.value }],
  }));
  const badgeStyle  = useAnimatedStyle(() => ({
    opacity:   badgeOpacity.value,
    transform: [{ scale: badgeScale.value }],
  }));

  return (
    <Animated.View style={[styles.container, slideProgress]}>

      {/* Heatmap Grid */}
      <Animated.View style={[styles.gridWrapper, gridStyle]}>
        <View style={[styles.grid, { width: GRID_W }]}>
          {CELL_INTENSITIES.map((row, ri) =>
            row.map((intensity, ci) => (
              <View
                key={`${ri}-${ci}`}
                style={[
                  styles.cell,
                  {
                    width:           CELL_SIZE,
                    height:          CELL_SIZE,
                    backgroundColor: getHeatColor(intensity),
                  },
                ]}
              />
            ))
          )}
        </View>

        {/* AI Scan Line */}
        <Animated.View style={[styles.scanLine, { width: GRID_W }, scanStyle]}>
          <LinearGradient
            colors={['transparent', 'rgba(6,182,212,0.6)', 'rgba(6,182,212,0.8)', 'rgba(6,182,212,0.6)', 'transparent']}
            style={{ flex: 1 }}
          />
        </Animated.View>

        {/* Target Marker */}
        <View style={styles.targetArea}>
          <Animated.View style={[styles.pulseRing, pulse1Style]} />
          <Animated.View style={[styles.pulseRing, pulse2Style]} />
          <Animated.View style={[styles.marker, markerStyle]}>
            <LinearGradient
              colors={['#FFD27A', '#F5A623', '#C47D0E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.markerInner}
            />
          </Animated.View>
        </View>

        {/* Grid border */}
        <View style={[styles.gridBorder, { width: GRID_W, height: GRID_W }]} />
      </Animated.View>

      {/* Confidence Badge */}
      <Animated.View style={[styles.badge, badgeStyle]}>
        <LinearGradient
          colors={['rgba(28,35,51,0.98)', 'rgba(17,24,39,0.98)']}
          style={styles.badgeInner}
        >
          <Text style={styles.badgePercent}>89%</Text>
          <Text style={styles.badgeLabel}>احتمال ذهب</Text>
          <View style={styles.badgeBar}>
            <View style={styles.badgeBarFill} />
          </View>
          <Text style={styles.badgeDepth}>عمق: 4.2م</Text>
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:          '100%',
    height:         280,
    alignItems:     'center',
    justifyContent: 'center',
    position:       'relative',
  },

  gridWrapper: {
    position:     'relative',
    overflow:     'hidden',
    borderRadius: 12,
  },

  grid: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    borderRadius:  12,
    overflow:      'hidden',
  },

  cell: {},

  scanLine: {
    position: 'absolute',
    height:   3,
    left:     0,
    top:      0,
    zIndex:   5,
  },

  targetArea: {
    position:       'absolute',
    top:            '43%',
    left:           '44%',
    width:          24,
    height:         24,
    alignItems:     'center',
    justifyContent: 'center',
  },

  pulseRing: {
    position:    'absolute',
    width:       24,
    height:      24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },

  marker: {
    width:         24,
    height:        24,
    borderRadius:  12,
    overflow:      'hidden',
    shadowColor:   Colors.primary,
    shadowOpacity: 0.8,
    shadowRadius:  8,
    elevation:     6,
  },

  markerInner: { flex: 1 },

  gridBorder: {
    position:     'absolute',
    top:          0,
    left:         0,
    borderRadius: 12,
    borderWidth:  1,
    borderColor:  'rgba(245,166,35,0.3)',
  },

  badge: {
    position:      'absolute',
    bottom:        10,
    right:         24,
    borderRadius:  12,
    overflow:      'hidden',
    borderWidth:   1,
    borderColor:   Colors.borderGold,
    shadowColor:   Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius:  10,
    elevation:     6,
  },

  badgeInner: {
    padding:    Spacing[3],
    alignItems: 'center',
    gap:        Spacing[0.5],
    minWidth:   100,
  },

  badgePercent: {
    fontSize:   24,
    fontWeight: '800',
    color:      Colors.primary,
  },

  badgeLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  badgeBar: {
    width:           80,
    height:          3,
    backgroundColor: Colors.surfaceElevated,
    borderRadius:    2,
    overflow:        'hidden',
    marginVertical:  Spacing[1],
  },

  badgeBarFill: {
    width:           '89%',
    height:          '100%',
    backgroundColor: Colors.primary,
    borderRadius:    2,
  },

  badgeDepth: {
    ...Typography.caption,
    color: Colors.info,
  },
});
