import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
  clamp,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Colors,
  Typography,
  Spacing,
  Springs,
  Gradients,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';

interface SliderInputProps {
  label:           string;
  value:           number;
  min:             number;
  max:             number;
  step?:           number;
  onChange:        (value: number) => void;
  unit?:           string;
  containerStyle?: ViewStyle;
  showTicks?:      boolean;
}

export function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit = '',
  containerStyle,
  showTicks = false,
}: SliderInputProps) {
  const { light } = useHaptics();
  const trackWidth = useSharedValue(0);
  const thumbX     = useSharedValue(0);
  const scale      = useSharedValue(1);

  const valueToX = useCallback((val: number, width: number) => {
    return ((val - min) / (max - min)) * width;
  }, [min, max]);

  const xToValue = useCallback((x: number, width: number): number => {
    const raw    = (x / width) * (max - min) + min;
    const stepped = Math.round(raw / step) * step;
    return Math.max(min, Math.min(max, stepped));
  }, [min, max, step]);

  const initThumb = useCallback((width: number) => {
    trackWidth.value = width;
    thumbX.value = valueToX(value, width);
  }, [value]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      scale.value = withSpring(1.3, Springs.bouncy);
    })
    .onUpdate((e) => {
      const startX = valueToX(value, trackWidth.value);
      const newX   = clamp(startX + e.translationX, 0, trackWidth.value);
      thumbX.value = newX;
      const newValue = xToValue(newX, trackWidth.value);
      runOnJS(onChange)(newValue);
    })
    .onEnd(() => {
      scale.value = withSpring(1, Springs.default);
      runOnJS(light)();
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: thumbX.value - 12 },
      { scale: scale.value },
    ],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    width: thumbX.value,
  }));

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.valueText}>
          {step < 1 ? value.toFixed(1) : Math.round(value)}
          {unit && ` ${unit}`}
        </Text>
      </View>

      <View
        style={styles.trackWrapper}
        onLayout={(e) => initThumb(e.nativeEvent.layout.width)}
      >
        <View style={styles.track}>
          <Animated.View style={[styles.fill, fillStyle]}>
            <LinearGradient
              colors={Gradients.goldHorizontal.colors as any}
              start={Gradients.goldHorizontal.start}
              end={Gradients.goldHorizontal.end}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.thumb, thumbStyle]}>
            <View style={styles.thumbInner} />
          </Animated.View>
        </GestureDetector>

        {showTicks && (
          <View style={styles.ticks}>
            {Array.from({
              length: Math.floor((max - min) / step) + 1,
            }).map((_, i) => (
              <View key={i} style={[
                styles.tick,
                i * step + min <= value && { backgroundColor: Colors.primary },
              ]} />
            ))}
          </View>
        )}
      </View>

      <View style={styles.minMax}>
        <Text style={styles.minMaxText}>{min}{unit}</Text>
        <Text style={styles.minMaxText}>{max}{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing[3],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    ...Typography.labelMedium,
    color: Colors.textSecondary,
  },
  valueText: {
    ...Typography.dataMedium,
    color: Colors.primary,
    minWidth: 48,
    textAlign: 'left',
  },
  trackWrapper: {
    height: 24,
    justifyContent: 'center',
    position: 'relative',
  },
  track: {
    height: 4,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  thumb: {
    position: 'absolute',
    top: -10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  thumbInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textInverse,
  },
  ticks: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tick: {
    width: 2,
    height: 6,
    borderRadius: 1,
    backgroundColor: Colors.borderDefault,
  },
  minMax: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minMaxText: {
    ...Typography.caption,
    color: Colors.textDisabled,
  },
});
