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
  Extrapolation,
} from 'react-native-reanimated';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Springs,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';
import { AppIcon } from '../icons/AppIcon';

interface CheckboxInputProps {
  checked:    boolean;
  onToggle:   (checked: boolean) => void;
  label?:     string;
  subtitle?:  string;
  disabled?:  boolean;
  error?:     string;
  style?:     ViewStyle;
}

export function CheckboxInput({
  checked,
  onToggle,
  label,
  subtitle,
  disabled = false,
  error,
  style,
}: CheckboxInputProps) {
  const { light } = useHaptics();
  const progress = useSharedValue(checked ? 1 : 0);
  const scale    = useSharedValue(1);

  React.useEffect(() => {
    progress.value = withSpring(checked ? 1 : 0, Springs.snappy);
  }, [checked]);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    light();
    scale.value = withSpring(0.85, Springs.snappy, () => {
      scale.value = withSpring(1, Springs.bouncy);
    });
    onToggle(!checked);
  }, [checked, disabled, onToggle]);

  const boxStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      checked
        ? (error ? Colors.danger : Colors.primary)
        : 'transparent',
      { duration: 150 }
    ),
    borderColor: withTiming(
      error
        ? Colors.danger
        : checked
        ? Colors.primary
        : Colors.borderDefault,
      { duration: 150 }
    ),
    transform: [{ scale: scale.value }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      progress.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    ),
    transform: [{
      scale: interpolate(
        progress.value,
        [0, 1],
        [0.5, 1],
        Extrapolation.CLAMP
      ),
    }],
  }));

  return (
    <View style={style}>
      <Pressable
        onPress={handleToggle}
        disabled={disabled}
        style={[styles.row, disabled && { opacity: 0.5 }]}
      >
        <Animated.View style={[styles.box, boxStyle]}>
          <Animated.View style={checkStyle}>
            <AppIcon name="check" size={14} color={Colors.textInverse} />
          </Animated.View>
        </Animated.View>

        {(label || subtitle) && (
          <View style={styles.labels}>
            {label && (
              <Text style={[
                styles.label,
                disabled && { color: Colors.textDisabled },
              ]}>
                {label}
              </Text>
            )}
            {subtitle && (
              <Text style={styles.subtitle}>{subtitle}</Text>
            )}
          </View>
        )}
      </Pressable>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: Radius.xs,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
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
  errorText: {
    ...Typography.caption,
    color: Colors.danger,
    marginTop: Spacing[1],
    marginStart: Spacing[8],
  },
});
