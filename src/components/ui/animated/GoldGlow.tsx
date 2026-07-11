import React, { useEffect, PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@theme';

interface GoldGlowProps extends PropsWithChildren {
  active?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  style?: ViewStyle;
}

export function GoldGlow({
  children,
  active = true,
  intensity = 'medium',
  style,
}: GoldGlowProps) {
  const glowOpacity = useSharedValue(0.3);

  const intensityValues = {
    low:    { min: 0.1, max: 0.3, duration: 1500 },
    medium: { min: 0.2, max: 0.6, duration: 1200 },
    high:   { min: 0.4, max: 1.0, duration: 800 },
  };

  const { min, max, duration } = intensityValues[intensity];

  useEffect(() => {
    if (!active) {
      glowOpacity.value = withTiming(0);
      return;
    }

    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(max, { duration }),
        withTiming(min, { duration })
      ),
      -1,
      true
    );
  }, [active, intensity]);

  const animatedStyle = useAnimatedStyle(() => ({
    shadowColor: Colors.primary,
    shadowOpacity: glowOpacity.value,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}
