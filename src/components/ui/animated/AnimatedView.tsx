import React, { useEffect, PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { Duration, Springs } from '@theme';

interface AnimatedViewProps extends PropsWithChildren {
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleIn' | 'none';
  delay?: number;
  duration?: number;
  style?: ViewStyle | ViewStyle[];
}

export function AnimatedView({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = Duration.normal,
  style,
}: AnimatedViewProps) {
  const opacity = useSharedValue(animation === 'none' ? 1 : 0);
  const translateY = useSharedValue(
    animation === 'slideUp' ? 20
      : animation === 'slideDown' ? -20
      : 0
  );
  const scale = useSharedValue(animation === 'scaleIn' ? 0.85 : 1);

  useEffect(() => {
    if (animation === 'none') return;

    opacity.value = withDelay(delay, withTiming(1, { duration }));

    if (animation === 'slideUp' || animation === 'slideDown') {
      translateY.value = withDelay(delay, withSpring(0, Springs.default));
    }

    if (animation === 'scaleIn') {
      scale.value = withDelay(delay, withSpring(1, Springs.bouncy));
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}
