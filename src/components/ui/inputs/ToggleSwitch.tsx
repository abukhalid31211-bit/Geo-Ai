import React, { useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  interpolateColor,
  Extrapolation,
} from 'react-native-reanimated';
import {
  Colors,
  Typography,
  Spacing,
  Springs,
  Duration,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';

interface ToggleSwitchProps {
  value:     boolean;
  onToggle:  (value: boolean) => void;
  label?:    string;
  subtitle?: string;
  disabled?: boolean;
  size?:     'sm' | 'md' | 'lg';
  color?:    string;
  style?:    ViewStyle;
}

const SIZE_CONFIG = {
  sm: { width: 40, height: 22, thumb: 16, padding: 3 },
  md: { width: 52, height: 28, thumb: 22, padding: 3 },
  lg: { width: 64, height: 34, thumb: 28, padding: 3 },
} as const;

export function ToggleSwitch({
  value,
  onToggle,
  label,
  subtitle,
  disabled = false,
  size = 'md',
  color = Colors.primary,
  style,
}: ToggleSwitchProps) {
  const { light } = useHaptics();
  const progress = useSharedValue(value ? 1 : 0);
  const config   = SIZE_CONFIG[size];

  React.useEffect(() => {
    progress.value = withSpring(value ? 1 : 0, Springs.snappy);
  }, [value]);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    light();
    onToggle(!value);
  }, [value, disabled, onToggle]);

  const thumbOffset = config.width - config.thumb - config.padding * 2;

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [Colors.surfaceElevated, color]
    ),
    borderColor: interpolateColor(
      progress.value,
      [0, 1],
      [Colors.borderDefault, color]
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: interpolate(
        progress.value,
        [0, 1],
        [0, thumbOffset],
        Extrapolation.CLAMP
      ),
    }],
    backgroundColor: withTiming(
      progress.value > 0.5 ? Colors.textPrimary : Colors.textSecondary,
      { duration: Duration.fast }
    ),
  }));

  return (
    <Pressable
      onPress={handleToggle}
      disabled={disabled}
      style={[styles.row, disabled && { opacity: 0.5 }, style]}
    >
      {(label || subtitle) && (
        <View style={styles.labels}>
          {label && <Text style={styles.label}>{label}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}

      <Animated.View style={[
        styles.track,
        trackStyle,
        {
          width:        config.width,
          height:       config.height,
          borderRadius: config.height / 2,
          padding:      config.padding,
        },
      ]}>
        <Animated.View style={[
          styles.thumb,
          thumbStyle,
          {
            width:        config.thumb,
            height:       config.thumb,
            borderRadius: config.thumb / 2,
          },
        ]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing[3],
  },
  labels: {
    flex: 1,
    gap: 2,
  },
  label: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  track: {
    borderWidth: 1,
    justifyContent: 'center',
  },
  thumb: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});
