import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { Colors, Typography, Spacing } from '@theme';

/**
 * Shown once, briefly, while `authStore.initialize()` validates the
 * rehydrated session on cold start. Distinct from the branded
 * `SplashScreen` (which is a longer decorative intro inside the Auth stack).
 */
export default function AuthLoadingScreen() {
  const ringOpacity = useSharedValue(0.3);
  const ringScale   = useSharedValue(0.9);
  const dotsOpacity = useSharedValue(0.3);

  useEffect(() => {
    ringOpacity.value = withRepeat(
      withSequence(
        withTiming(1,   { duration: 700, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 700, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
    ringScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 700, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.9, { duration: 700, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
    dotsOpacity.value = withRepeat(
      withSequence(
        withTiming(1,   { duration: 500 }),
        withTiming(0.3, { duration: 500 }),
      ),
      -1,
      false,
    );
  }, []);

  const ringStyle = useAnimatedStyle(() => ({
    opacity:   ringOpacity.value,
    transform: [{ scale: ringScale.value }],
  }));

  const dotsStyle = useAnimatedStyle(() => ({
    opacity: dotsOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ring, ringStyle]}>
        <View style={styles.core} />
      </Animated.View>

      <Animated.Text style={[styles.label, dotsStyle]}>
        جاري التحقق من الجلسة...
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: Colors.bgPrimary,
    alignItems:      'center',
    justifyContent:  'center',
    gap:             Spacing[5],
  },
  ring: {
    width:           72,
    height:          72,
    borderRadius:    36,
    borderWidth:     2,
    borderColor:     Colors.primary,
    alignItems:      'center',
    justifyContent:  'center',
  },
  core: {
    width:           28,
    height:          28,
    borderRadius:    14,
    backgroundColor: Colors.primary,
  },
  label: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
  },
});
