import React, {
  useRef,
  useCallback,
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';

interface OTPInputProps {
  length?:         number;
  value:           string;
  onChangeText:    (text: string) => void;
  onComplete?:     (code: string) => void;
  error?:          boolean;
  containerStyle?: ViewStyle;
}

export function OTPInput({
  length = 6,
  value,
  onChangeText,
  onComplete,
  error = false,
  containerStyle,
}: OTPInputProps) {
  const { light, success: successHaptic } = useHaptics();
  const inputRef = useRef<TextInput>(null);

  const digits = value.split('').slice(0, length);
  while (digits.length < length) digits.push('');

  const shakeX = useSharedValue(0);

  React.useEffect(() => {
    if (error) {
      shakeX.value = withSequence(
        withTiming(-10, { duration: 60 }),
        withTiming(10,  { duration: 60 }),
        withTiming(-8,  { duration: 60 }),
        withTiming(8,   { duration: 60 }),
        withTiming(0,   { duration: 60 })
      );
    }
  }, [error]);

  const handleChange = useCallback((text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);
    light();
    onChangeText(cleaned);
    if (cleaned.length === length) {
      successHaptic();
      onComplete?.(cleaned);
    }
  }, [length, onComplete]);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  return (
    <Animated.View style={[styles.container, shakeStyle, containerStyle]}>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={length}
        style={styles.hiddenInput}
        autoFocus
        caretHidden
      />

      {digits.map((digit, index) => {
        const isFilled = digit !== '';
        const isActive = index === value.length;

        return (
          <Animated.View
            key={index}
            style={[
              styles.digitBox,
              isActive && styles.digitBoxActive,
              isFilled && !error && styles.digitBoxFilled,
              error && styles.digitBoxError,
            ]}
          >
            <Text style={[
              styles.digitText,
              error && { color: Colors.danger },
            ]}>
              {digit}
            </Text>

            {isActive && !digit && (
              <View style={styles.cursor} />
            )}
          </Animated.View>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing[2],
    justifyContent: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  digitBox: {
    width: 48,
    height: 56,
    borderRadius: Radius.cardSm,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.inputBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitBoxActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryGlowDim,
  },
  digitBoxFilled: {
    borderColor: Colors.primary,
  },
  digitBoxError: {
    borderColor: Colors.danger,
    backgroundColor: Colors.dangerBg,
  },
  digitText: {
    ...Typography.displaySmall,
    color: Colors.textPrimary,
  },
  cursor: {
    width: 2,
    height: 24,
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
});
