import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
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
  cancelAnimation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing } from '@theme';

interface Slide1Props {
  isActive:   boolean;
  progress:   Animated.SharedValue<number>;
  translateX: Animated.SharedValue<number>;
  slideWidth: number;
  slideIndex: number;
}

const PHONE_W   = 100;
const PHONE_H   = 160;
const WAVE_SIZE = 260;

export function OnboardingSlide1({
  isActive,
  translateX,
  slideWidth,
  slideIndex,
}: Slide1Props) {
  // Radar waves
  const wave1Scale   = useSharedValue(0.3);
  const wave2Scale   = useSharedValue(0.3);
  const wave3Scale   = useSharedValue(0.3);
  const wave1Opacity = useSharedValue(0);
  const wave2Opacity = useSharedValue(0);
  const wave3Opacity = useSharedValue(0);

  // Phone
  const phoneY       = useSharedValue(0);
  const phoneScale   = useSharedValue(0.8);
  const phoneOpacity = useSharedValue(0);

  // Data layers
  const layer1Y  = useSharedValue(30);
  const layer1Op = useSharedValue(0);
  const layer2Y  = useSharedValue(40);
  const layer2Op = useSharedValue(0);
  const layer3Y  = useSharedValue(50);
  const layer3Op = useSharedValue(0);

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

    phoneOpacity.value = withTiming(1, { duration: 400 });
    phoneScale.value   = withSpring(1, { damping: 12, stiffness: 200 });

    const bobTimer = setTimeout(() => {
      phoneY.value = withRepeat(
        withSequence(
          withTiming(-8, { duration: 1500, easing: Easing.inOut(Easing.sine) }),
          withTiming(0,  { duration: 1500, easing: Easing.inOut(Easing.sine) })
        ),
        -1, true
      );
    }, 400);

    // Staggered radar waves
    const startWave = (
      scale:   Animated.SharedValue<number>,
      opacity: Animated.SharedValue<number>,
      delay:   number
    ) => {
      scale.value = withDelay(delay, withRepeat(
        withSequence(
          withTiming(0.3, { duration: 0 }),
          withTiming(1.8, { duration: 1800, easing: Easing.out(Easing.ease) })
        ),
        -1, false
      ));
      opacity.value = withDelay(delay, withRepeat(
        withSequence(
          withTiming(0.6, { duration: 300 }),
          withTiming(0,   { duration: 1500 })
        ),
        -1, false
      ));
    };

    startWave(wave1Scale, wave1Opacity, 0);
    startWave(wave2Scale, wave2Opacity, 600);
    startWave(wave3Scale, wave3Opacity, 1200);

    // Data layer stagger
    layer1Y.value  = withDelay(300, withSpring(0, { damping: 15 }));
    layer1Op.value = withDelay(300, withTiming(1, { duration: 400 }));
    layer2Y.value  = withDelay(500, withSpring(0, { damping: 15 }));
    layer2Op.value = withDelay(500, withTiming(1, { duration: 400 }));
    layer3Y.value  = withDelay(700, withSpring(0, { damping: 15 }));
    layer3Op.value = withDelay(700, withTiming(1, { duration: 400 }));

    return () => clearTimeout(bobTimer);
  }, [isActive]);

  const phoneStyle = useAnimatedStyle(() => ({
    opacity:   phoneOpacity.value,
    transform: [{ scale: phoneScale.value }, { translateY: phoneY.value }],
  }));

  const wave1Style = useAnimatedStyle(() => ({
    opacity:   wave1Opacity.value,
    transform: [{ scale: wave1Scale.value }],
  }));
  const wave2Style = useAnimatedStyle(() => ({
    opacity:   wave2Opacity.value,
    transform: [{ scale: wave2Scale.value }],
  }));
  const wave3Style = useAnimatedStyle(() => ({
    opacity:   wave3Opacity.value,
    transform: [{ scale: wave3Scale.value }],
  }));

  const layer1Style = useAnimatedStyle(() => ({
    opacity:   layer1Op.value,
    transform: [{ translateY: layer1Y.value }],
  }));
  const layer2Style = useAnimatedStyle(() => ({
    opacity:   layer2Op.value,
    transform: [{ translateY: layer2Y.value }],
  }));
  const layer3Style = useAnimatedStyle(() => ({
    opacity:   layer3Op.value,
    transform: [{ translateY: layer3Y.value }],
  }));

  return (
    <Animated.View style={[styles.container, slideProgress]}>

      {/* Radar waves */}
      <View style={styles.waveContainer}>
        {([wave1Style, wave2Style, wave3Style] as const).map((wStyle, i) => (
          <Animated.View key={i} style={[
            styles.wave,
            {
              width:        WAVE_SIZE,
              height:       WAVE_SIZE,
              borderRadius: WAVE_SIZE / 2,
              borderColor:  Colors.primary,
            },
            wStyle,
          ]} />
        ))}
      </View>

      {/* Floating data cards */}
      <View style={styles.layersContainer}>
        <Animated.View style={[styles.dataLayer, styles.layerGPR, layer3Style]}>
          <View style={[styles.layerDot, { backgroundColor: Colors.info }]} />
          <View style={styles.layerLines}>
            <View style={[styles.layerLine, { width: '70%', backgroundColor: Colors.info }]} />
            <View style={[styles.layerLine, { width: '45%', backgroundColor: Colors.info, opacity: 0.5 }]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.dataLayer, styles.layerERT, layer2Style]}>
          <View style={[styles.layerDot, { backgroundColor: Colors.warning }]} />
          <View style={styles.layerLines}>
            <View style={[styles.layerLine, { width: '60%', backgroundColor: Colors.warning }]} />
            <View style={[styles.layerLine, { width: '35%', backgroundColor: Colors.warning, opacity: 0.5 }]} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.dataLayer, styles.layerTopo, layer1Style]}>
          <View style={[styles.layerDot, { backgroundColor: Colors.success }]} />
          <View style={styles.layerLines}>
            <View style={[styles.layerLine, { width: '80%', backgroundColor: Colors.success }]} />
            <View style={[styles.layerLine, { width: '50%', backgroundColor: Colors.success, opacity: 0.5 }]} />
          </View>
        </Animated.View>
      </View>

      {/* Phone */}
      <Animated.View style={[styles.phoneWrapper, phoneStyle]}>
        <View style={[styles.phone, { width: PHONE_W, height: PHONE_H }]}>
          <LinearGradient
            colors={['#1C2333', '#111827']}
            style={styles.phoneScreen}
          >
            <View style={styles.miniRadar}>
              {([0.3, 0.6, 0.9] as const).map((r, i) => (
                <View key={i} style={{
                  position:     'absolute',
                  width:        60 * r,
                  height:       60 * r,
                  borderRadius: 30 * r,
                  borderWidth:  0.5,
                  borderColor:  Colors.primary,
                  top:          30 - 30 * r,
                  left:         30 - 30 * r,
                }} />
              ))}
              <View style={styles.miniTarget} />
            </View>
          </LinearGradient>
          <View style={styles.phoneNotch} />
          <View style={styles.phoneHome} />
        </View>
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

  waveContainer: {
    position:       'absolute',
    alignItems:     'center',
    justifyContent: 'center',
  },

  wave: {
    position:    'absolute',
    borderWidth: 1.5,
  },

  layersContainer: {
    position: 'absolute',
    width:    '100%',
    height:   '100%',
  },

  dataLayer: {
    position:          'absolute',
    flexDirection:     'row',
    alignItems:        'center',
    gap:               Spacing[2],
    backgroundColor:   Colors.surfaceElevated,
    borderRadius:      8,
    padding:           Spacing[2],
    paddingHorizontal: Spacing[3],
    borderWidth:       1,
    borderColor:       Colors.borderDefault,
    shadowColor:       '#000',
    shadowOpacity:     0.3,
    shadowRadius:      8,
    elevation:         4,
  },

  layerGPR:  { right: 20, top: 20,  width: 120 },
  layerERT:  { left:  10, top: 60,  width: 110 },
  layerTopo: { right: 10, top: 110, width: 130 },

  layerDot: {
    width:        8,
    height:       8,
    borderRadius: 4,
    flexShrink:   0,
  },

  layerLines: { flex: 1, gap: 3 },

  layerLine: { height: 3, borderRadius: 2 },

  phoneWrapper: { zIndex: 10 },

  phone: {
    backgroundColor: '#1a1a2e',
    borderRadius:    20,
    borderWidth:     2,
    borderColor:     'rgba(245,166,35,0.3)',
    overflow:        'hidden',
    alignItems:      'center',
    shadowColor:     Colors.primary,
    shadowOpacity:   0.3,
    shadowRadius:    16,
    shadowOffset:    { width: 0, height: 0 },
    elevation:       8,
  },

  phoneScreen: {
    flex:           1,
    width:          '100%',
    alignItems:     'center',
    justifyContent: 'center',
    marginTop:      16,
    marginBottom:   8,
  },

  phoneNotch: {
    position:        'absolute',
    top:             6,
    width:           40,
    height:          8,
    borderRadius:    4,
    backgroundColor: '#0A0E1A',
  },

  phoneHome: {
    width:           30,
    height:          4,
    borderRadius:    2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom:    4,
  },

  miniRadar: {
    width:    60,
    height:   60,
    position: 'relative',
  },

  miniTarget: {
    position:        'absolute',
    width:           8,
    height:          8,
    borderRadius:    4,
    backgroundColor: Colors.primary,
    top:             22,
    left:            18,
    shadowColor:     Colors.primary,
    shadowOpacity:   1,
    shadowRadius:    4,
    shadowOffset:    { width: 0, height: 0 },
    elevation:       3,
  },
});
