import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  interpolateColor,
  Extrapolation,
} from 'react-native-reanimated';
import { Colors, Spacing } from '@theme';

interface OnboardingDotsProps {
  total:      number;
  current:    number;
  translateX: Animated.SharedValue<number>;
  slideWidth: number;
}

export function OnboardingDots({
  total,
  translateX,
  slideWidth,
}: OnboardingDotsProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <AnimatedDot
          key={index}
          index={index}
          translateX={translateX}
          slideWidth={slideWidth}
        />
      ))}
    </View>
  );
}

function AnimatedDot({
  index,
  translateX,
  slideWidth,
}: {
  index:      number;
  translateX: Animated.SharedValue<number>;
  slideWidth: number;
}) {
  const dotStyle = useAnimatedStyle(() => {
    const progress = interpolate(
      translateX.value,
      [
        -(index + 0.5) * slideWidth,
        -index * slideWidth,
        -(index - 0.5) * slideWidth,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    const width = interpolate(
      progress,
      [0, 1],
      [8, 24],
      Extrapolation.CLAMP
    );

    const bgColor = interpolateColor(
      progress,
      [0, 1],
      [Colors.surfaceElevated, Colors.primary]
    );

    const opacity = interpolate(
      progress,
      [0, 1],
      [0.4, 1],
      Extrapolation.CLAMP
    );

    return { width, backgroundColor: bgColor, opacity };
  });

  return <Animated.View style={[styles.dot, dotStyle]} />;
}

const styles = StyleSheet.create({
  container: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            Spacing[1.5],
  },

  dot: {
    height:          8,
    borderRadius:    4,
    backgroundColor: Colors.surfaceElevated,
  },
});
