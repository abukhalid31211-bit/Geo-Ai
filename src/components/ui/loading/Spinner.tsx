import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import {
  Colors,
  Typography,
  Spacing,
} from '@theme';

type SpinnerSize    = 'sm' | 'md' | 'lg' | 'xl';
type SpinnerVariant = 'gold' | 'white' | 'radar';

interface SpinnerProps {
  size?:    SpinnerSize;
  variant?: SpinnerVariant;
  label?:   string;
  style?:   ViewStyle;
}

const SIZE_CONFIG = {
  sm: { outer: 24, inner: 16, border: 2 },
  md: { outer: 40, inner: 28, border: 3 },
  lg: { outer: 56, inner: 40, border: 3 },
  xl: { outer: 80, inner: 58, border: 4 },
} as const;

export function Spinner({
  size    = 'md',
  variant = 'gold',
  label,
  style,
}: SpinnerProps) {
  const rotation = useSharedValue(0);
  const pulse    = useSharedValue(0.5);
  const config   = SIZE_CONFIG[size];

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1100, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  React.useEffect(() => {
    if (variant === 'radar') {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1,   { duration: 600 }),
          withTiming(0.5, { duration: 600 })
        ),
        -1,
        false
      );
    }
  }, [variant]);

  const spinStyle  = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
  }));

  return (
    <View style={[styles.container, style]}>
      {variant === 'radar' && (
        <Animated.View style={[
          styles.radarRing,
          pulseStyle,
          {
            width:        config.outer * 1.6,
            height:       config.outer * 1.6,
            borderRadius: config.outer * 0.8,
            borderColor:  Colors.primary,
          },
        ]} />
      )}

      <Animated.View style={[
        spinStyle,
        {
          width:          config.outer,
          height:         config.outer,
          borderRadius:   config.outer / 2,
          borderWidth:    config.border,
          borderColor:    Colors.borderDefault,
          borderTopColor: variant === 'white' ? Colors.textPrimary : Colors.primary,
        },
      ]} />

      {/* Centre dot */}
      <View style={[
        StyleSheet.absoluteFill,
        { alignItems: 'center', justifyContent: 'center' },
      ]}>
        <View style={{
          width:           config.inner * 0.25,
          height:          config.inner * 0.25,
          borderRadius:    config.inner * 0.125,
          backgroundColor: Colors.primary,
        }} />
      </View>

      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:     'center',
    justifyContent: 'center',
    gap:            Spacing[2],
    position:       'relative',
  },
  radarRing: {
    position:    'absolute',
    borderWidth: 1,
    opacity:     0.4,
  },
  label: {
    ...Typography.caption,
    color:     Colors.textSecondary,
    marginTop: Spacing[1],
  },
});
