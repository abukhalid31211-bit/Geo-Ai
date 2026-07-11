import React, {
  useState,
  useCallback,
  forwardRef,
} from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
  Extrapolation,
} from 'react-native-reanimated';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Duration,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';

interface TextAreaProps
  extends Omit<TextInputProps, 'style' | 'multiline'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  hint?: string;
  minLines?: number;
  maxLines?: number;
  maxLength?: number;
  showCharCount?: boolean;
  containerStyle?: ViewStyle;
  required?: boolean;
}

export const TextArea = forwardRef<RNTextInput, TextAreaProps>(
({
  label,
  value,
  onChangeText,
  error,
  hint,
  minLines = 3,
  maxLines = 8,
  maxLength,
  showCharCount = true,
  containerStyle,
  required = false,
  onFocus,
  onBlur,
  ...rest
}, ref) => {
  const { light } = useHaptics();
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  const focusProgress = useSharedValue(0);
  const labelProgress = useSharedValue(hasValue ? 1 : 0);

  const handleFocus = useCallback((e: any) => {
    setIsFocused(true);
    light();
    focusProgress.value  = withTiming(1, { duration: Duration.normal });
    labelProgress.value  = withTiming(1, { duration: Duration.normal });
    onFocus?.(e);
  }, [onFocus]);

  const handleBlur = useCallback((e: any) => {
    setIsFocused(false);
    focusProgress.value = withTiming(0, { duration: Duration.normal });
    if (!hasValue) {
      labelProgress.value = withTiming(0, { duration: Duration.normal });
    }
    onBlur?.(e);
  }, [hasValue, onBlur]);

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      focusProgress.value,
      [0, 1],
      [
        error ? Colors.danger : Colors.inputBorder,
        error ? Colors.danger : Colors.primary,
      ]
    ),
    borderWidth: interpolate(
      focusProgress.value,
      [0, 1],
      [1, 1.5],
      Extrapolation.CLAMP
    ),
  }));

  const labelStyle = useAnimatedStyle(() => ({
    transform: [{
      translateY: interpolate(
        labelProgress.value,
        [0, 1],
        [0, -22],
        Extrapolation.CLAMP
      ),
    }, {
      scale: interpolate(
        labelProgress.value,
        [0, 1],
        [1, 0.78],
        Extrapolation.CLAMP
      ),
    }],
    color: interpolateColor(
      focusProgress.value,
      [0, 1],
      [
        hasValue ? Colors.textSecondary : Colors.inputPlaceholder,
        error ? Colors.danger : Colors.primary,
      ]
    ),
  }));

  const glowStyle = useAnimatedStyle(() => ({
    shadowColor: Colors.primary,
    shadowOpacity: interpolate(
      focusProgress.value,
      [0, 1],
      [0, 0.2],
      Extrapolation.CLAMP
    ),
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: focusProgress.value * 3,
  }));

  const minHeight = minLines * 24 + Spacing[10];
  const maxHeight = maxLines * 24 + Spacing[10];

  return (
    <View style={containerStyle}>
      <Animated.View style={[styles.container, borderStyle, glowStyle]}>
        <Animated.Text
          style={[styles.floatLabel, labelStyle]}
          pointerEvents="none"
        >
          {label}
          {required && <Text style={{ color: Colors.danger }}> *</Text>}
        </Animated.Text>

        <RNTextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline
          textAlignVertical="top"
          style={[
            styles.input,
            {
              minHeight,
              maxHeight,
              paddingTop: hasValue || isFocused
                ? Spacing[6]
                : Spacing[4],
            },
          ]}
          maxLength={maxLength}
          textAlign="right"
          {...rest}
        />

        {showCharCount && maxLength && (
          <View style={styles.footer}>
            <Text style={[
              styles.charCount,
              value.length >= maxLength && { color: Colors.danger },
            ]}>
              {value.length}/{maxLength}
            </Text>
          </View>
        )}
      </Animated.View>

      {(error || hint) && (
        <Text style={[
          styles.bottomText,
          error ? styles.errorText : styles.hintText,
        ]}>
          {error || hint}
        </Text>
      )}
    </View>
  );
});

TextArea.displayName = 'TextArea';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.input,
    borderWidth: 1,
    paddingHorizontal: Spacing[4],
    paddingBottom: Spacing[2],
    position: 'relative',
  },
  floatLabel: {
    ...Typography.bodyMedium,
    position: 'absolute',
    top: Spacing[4],
    start: Spacing[4],
  },
  input: {
    ...Typography.bodyLarge,
    color: Colors.textPrimary,
    padding: 0,
  },
  footer: {
    alignItems: 'flex-start',
    paddingTop: Spacing[1],
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
  },
  charCount: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  bottomText: {
    ...Typography.caption,
    marginTop: Spacing[1],
    paddingHorizontal: Spacing[1],
  },
  errorText: {
    color: Colors.danger,
  },
  hintText: {
    color: Colors.textSecondary,
  },
});
