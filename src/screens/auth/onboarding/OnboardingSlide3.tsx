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

interface Slide3Props {
  isActive:   boolean;
  translateX: Animated.SharedValue<number>;
  slideWidth: number;
  slideIndex: number;
}

const GEO_LAYERS = [
  { label: 'سطح الأرض',   colors: ['#4A5568', '#718096'] as const, height: 20, opacity: 1    },
  { label: 'رمل (0-1.5م)',  colors: ['#C2955A', '#D4A96A'] as const, height: 32, opacity: 0.9  },
  { label: 'طين (1.5-3م)', colors: ['#8B6914', '#A07820'] as const, height: 32, opacity: 0.85 },
  { label: 'صخر (3-5م)',   colors: ['#5D5D5D', '#707070'] as const, height: 36, opacity: 0.8  },
  { label: 'طبقة مائية',  colors: ['#1A3A5C', '#2E5F8A'] as const, height: 28, opacity: 0.75 },
] as const;

const SECTION_WIDTH = 240;

export function OnboardingSlide3({
  isActive,
  translateX,
  slideWidth,
  slideIndex,
}: Slide3Props) {
  // Per-layer animation values (fixed count — not computed dynamically)
  const op0 = useSharedValue(0); const tx0 = useSharedValue(-40);
  const op1 = useSharedValue(0); const tx1 = useSharedValue(-40);
  const op2 = useSharedValue(0); const tx2 = useSharedValue(-40);
  const op3 = useSharedValue(0); const tx3 = useSharedValue(-40);
  const op4 = useSharedValue(0); const tx4 = useSharedValue(-40);

  const layerOps = [op0, op1, op2, op3, op4] as const;
  const layerTxs = [tx0, tx1, tx2, tx3, tx4] as const;

  const voidOpacity = useSharedValue(0);
  const voidScale   = useSharedValue(0);
  const voidPulse   = useSharedValue(1);
  const rotateY     = useSharedValue(0);
  const labelOpacity = useSharedValue(0);

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

    GEO_LAYERS.forEach((_, i) => {
      layerOps[i as 0 | 1 | 2 | 3 | 4].value = withDelay(
        i * 150, withTiming(1, { duration: 400 })
      );
      layerTxs[i as 0 | 1 | 2 | 3 | 4].value = withDelay(
        i * 150, withSpring(0, { damping: 15 })
      );
    });

    voidOpacity.value = withDelay(900, withTiming(1, { duration: 400 }));
    voidScale.value   = withDelay(900, withSpring(1, { damping: 8, stiffness: 300 }));

    const pulseTimer = setTimeout(() => {
      voidPulse.value = withRepeat(
        withSequence(
          withTiming(1.15, { duration: 800, easing: Easing.inOut(Easing.sine) }),
          withTiming(1.0,  { duration: 800, easing: Easing.inOut(Easing.sine) })
        ),
        -1, true
      );
    }, 1300);

    labelOpacity.value = withDelay(1200, withTiming(1, { duration: 400 }));

    rotateY.value = withRepeat(
      withSequence(
        withTiming(3,  { duration: 2000, easing: Easing.inOut(Easing.sine) }),
        withTiming(-3, { duration: 2000, easing: Easing.inOut(Easing.sine) })
      ),
      -1, true
    );

    return () => clearTimeout(pulseTimer);
  }, [isActive]);

  const layerStyle0 = useAnimatedStyle(() => ({ opacity: op0.value, transform: [{ translateX: tx0.value }] }));
  const layerStyle1 = useAnimatedStyle(() => ({ opacity: op1.value, transform: [{ translateX: tx1.value }] }));
  const layerStyle2 = useAnimatedStyle(() => ({ opacity: op2.value, transform: [{ translateX: tx2.value }] }));
  const layerStyle3 = useAnimatedStyle(() => ({ opacity: op3.value, transform: [{ translateX: tx3.value }] }));
  const layerStyle4 = useAnimatedStyle(() => ({ opacity: op4.value, transform: [{ translateX: tx4.value }] }));

  const layerStyles = [layerStyle0, layerStyle1, layerStyle2, layerStyle3, layerStyle4] as const;

  const voidStyle = useAnimatedStyle(() => ({
    opacity:   voidOpacity.value,
    transform: [{ scale: voidScale.value * voidPulse.value }],
  }));

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotateY.value}deg` }],
  }));

  const labelStyle = useAnimatedStyle(() => ({ opacity: labelOpacity.value }));

  return (
    <Animated.View style={[styles.container, slideProgress]}>

      {/* 3D Cross-section */}
      <Animated.View style={[styles.section, { width: SECTION_WIDTH }, rotateStyle]}>

        {/* Surface ruler label */}
        <Animated.View style={[styles.surfaceLine, labelStyle]}>
          <View style={styles.surfaceDash} />
          <Text style={styles.surfaceLabel}>سطح الأرض</Text>
          <View style={styles.surfaceDash} />
        </Animated.View>

        {/* Geological Layers */}
        {GEO_LAYERS.map((layer, index) => (
          <Animated.View key={index} style={layerStyles[index]}>
            <LinearGradient
              colors={layer.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.geoLayer,
                { height: layer.height, opacity: layer.opacity, width: SECTION_WIDTH },
              ]}
            >
              {index > 0 && <View style={styles.depthLine} />}
            </LinearGradient>
          </Animated.View>
        ))}

        {/* Void target */}
        <Animated.View style={[styles.voidContainer, voidStyle]}>
          <LinearGradient
            colors={['rgba(139,92,246,0.9)', 'rgba(109,40,217,0.7)']}
            style={styles.voidShape}
          >
            <Text style={styles.voidIcon}>⬡</Text>
          </LinearGradient>
          <View style={styles.voidGlow} />
        </Animated.View>

        {/* Section border */}
        <View style={[styles.sectionBorder, { width: SECTION_WIDTH }]} />

        {/* Depth ruler */}
        <View style={styles.depthRuler}>
          {(['0م', '2م', '4م', '6م'] as const).map((d, i) => (
            <View key={i} style={styles.rulerMark}>
              <View style={styles.rulerLine} />
              <Text style={styles.rulerText}>{d}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Legend */}
      <Animated.View style={[styles.legendPanel, labelStyle]}>
        {[
          { color: Colors.geoLayer1,            label: 'رمل' },
          { color: Colors.geoLayer3,            label: 'صخر' },
          { color: 'rgba(139,92,246,0.8)',       label: 'فراغ' },
        ].map((item, i) => (
          <View key={i} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </Animated.View>

      {/* 3D rotate hint */}
      <Animated.View style={[styles.rotateHint, labelStyle]}>
        <Text style={styles.rotateHintText}>↻ تدوير ثلاثي الأبعاد</Text>
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

  section: {
    overflow:     'hidden',
    borderRadius: 12,
    position:     'relative',
  },

  surfaceLine: {
    flexDirection:     'row',
    alignItems:        'center',
    gap:               Spacing[2],
    paddingHorizontal: Spacing[2],
    marginBottom:      Spacing[1],
  },

  surfaceDash: {
    flex:            1,
    height:          1,
    backgroundColor: Colors.textSecondary,
    opacity:         0.4,
  },

  surfaceLabel: {
    ...Typography.labelSmall,
    color:   Colors.textSecondary,
    opacity: 0.7,
  },

  geoLayer: { position: 'relative' },

  depthLine: {
    position:        'absolute',
    top:             0,
    left:            0,
    right:           0,
    height:          0.5,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  voidContainer: {
    position: 'absolute',
    top:      110,
    left:     80,
    zIndex:   10,
  },

  voidShape: {
    width:          44,
    height:         36,
    borderRadius:   8,
    alignItems:     'center',
    justifyContent: 'center',
  },

  voidIcon: {
    fontSize: 18,
    color:    'rgba(255,255,255,0.9)',
  },

  voidGlow: {
    position:        'absolute',
    width:           60,
    height:          52,
    borderRadius:    10,
    backgroundColor: 'rgba(139,92,246,0.3)',
    top:             -8,
    left:            -8,
    zIndex:          -1,
  },

  sectionBorder: {
    position:     'absolute',
    top:          0,
    left:         0,
    bottom:       0,
    borderWidth:  1,
    borderColor:  'rgba(245,166,35,0.3)',
    borderRadius: 12,
  },

  depthRuler: {
    position:        'absolute',
    right:           -40,
    top:             20,
    bottom:          0,
    justifyContent:  'space-between',
    paddingVertical: Spacing[1],
  },

  rulerMark: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           3,
  },

  rulerLine: {
    width:           6,
    height:          0.5,
    backgroundColor: Colors.textDisabled,
  },

  rulerText: {
    fontSize: 9,
    color:    Colors.textDisabled,
  },

  legendPanel: {
    position:      'absolute',
    bottom:        8,
    left:          16,
    flexDirection: 'row',
    gap:           Spacing[3],
  },

  legendItem: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Spacing[1],
  },

  legendDot: {
    width:        8,
    height:       8,
    borderRadius: 4,
  },

  legendText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },

  rotateHint: {
    position: 'absolute',
    bottom:   8,
    right:    16,
  },

  rotateHintText: {
    fontSize: 10,
    color:    Colors.textDisabled,
  },
});
