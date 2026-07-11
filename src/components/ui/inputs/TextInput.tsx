import React, {
  useState,
  useCallback,
  forwardRef,
} from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  ViewStyle,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
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
  Springs,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';
import { AppIcon, AppIconName } from '../icons/AppIcon';

export interface TextInputComponentProps
  extends Omit<RNTextInputProps, 'style'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  success?: boolean;
  hint?: string;
  leftIcon?: AppIconName;
  rightIcon?: AppIconName;
  onRightIconPress?: () => void;
  onLeftIconPress?: () => void;
  disabled?: boolean;
  required?: boolean;
  containerStyle?: ViewStyle;
  characterCount?: boolean;
  maxLength?: number;
}

export const TextInputComponent = forwardRef<
  RNTextInput,
  TextInputComponentProps
>(({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  success,
  hint,
  leftIcon,
  rightIcon,
  onRightIconPress,
  onLeftIconPress,
  disabled = false,
  required = false,
  containerStyle,
  characterCount = false,
  maxLength,
  onFocus,
  onBlur,
  ...rest
}, ref) => {
  const { light, warning: warnHaptic } = useHaptics();
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  const focusProgress = useSharedValue(0);
  const labelProgress = useSharedValue(hasValue ? 1 : 0);
  const shakeX        = useSharedValue(0);
  const errorOpacity  = useSharedValue(error ? 1 : 0);

  React.useEffect(() => {
    if (error) {
      warnHaptic();
      shakeX.value = withSequence(
        withTiming(-8, { duration: 60 }),
        withTiming(8,  { duration: 60 }),
        withTiming(-6, { duration: 60 }),
        withTiming(6,  { duration: 60 }),
        withTiming(-3, { duration: 60 }),
        withTiming(0,  { duration: 60 })
      );
      errorOpacity.value = withTiming(1, { duration: Duration.normal });
    } else {
      errorOpacity.value = withTiming(0, { duration: Duration.fast });
    }
  }, [error]);

  const handleFocus = useCallback(
    (e: any) => {
      setIsFocused(true);
      light();
      focusProgress.value = withTiming(1, { duration: Duration.normal });
      labelProgress.value = withSpring(1, Springs.default);
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: any) => {
      setIsFocused(false);
      focusProgress.value = withTiming(0, { duration: Duration.normal });
      if (!hasValue) {
        labelProgress.value = withSpring(0, Springs.default);
      }
      onBlur?.(e);
    },
    [hasValue, onBlur]
  );

  const borderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      focusProgress.value,
      [0, 1],
      [
        error ? Colors.danger : Colors.inputBorder,
        error ? Colors.danger : Colors.primary,
      ]
    );
    return {
      borderColor,
      borderWidth: interpolate(
        focusProgress.value,
        [0, 1],
        [1, 1.5],
        Extrapolation.CLAMP
      ),
    };
  });

  const floatLabelStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      labelProgress.value,
      [0, 1],
      [0, -28],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      labelProgress.value,
      [0, 1],
      [1, 0.78],
      Extrapolation.CLAMP
    );
    const color = interpolateColor(
      focusProgress.value,
      [0, 1],
      [
        error
          ? Colors.danger
          : hasValue
          ? Colors.textSecondary
          : Colors.inputPlaceholder,
        error ? Colors.danger : Colors.primary,
      ]
    );
    return {
      transform: [{ translateY }, { scale }],
      color,
    };
  });

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  const errorStyle = useAnimatedStyle(() => ({
    opacity: errorOpacity.value,
    transform: [{
      translateY: interpolate(
        errorOpacity.value,
        [0, 1],
        [-4, 0],
        Extrapolation.CLAMP
      ),
    }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    shadowColor: Colors.primary,
    shadowOpacity: interpolate(
      focusProgress.value,
      [0, 1],
      [0, 0.25],
      Extrapolation.CLAMP
    ),
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: focusProgress.value * 4,
  }));

  return (
    <Animated.View style={[shakeStyle, containerStyle]}>
      <Animated.View style={[styles.container, borderStyle, glowStyle]}>

        {leftIcon && (
          <Pressable
            onPress={onLeftIconPress}
            disabled={!onLeftIconPress}
            style={styles.leftIcon}
          >
            <AppIcon
              name={leftIcon}
              size={20}
              color={
                isFocused ? Colors.primary :
                error      ? Colors.danger  :
                             Colors.textSecondary
              }
            />
          </Pressable>
        )}

        <View style={[
          styles.inputWrapper,
          leftIcon && { paddingStart: Spacing[2] },
        ]}>
          <Animated.Text
            style={[styles.floatLabel, floatLabelStyle]}
            pointerEvents="none"
          >
            {label}{required && (
              <Text style={{ color: Colors.danger }}> *</Text>
            )}
          </Animated.Text>

          <RNTextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={isFocused ? (placeholder || '') : ''}
            placeholderTextColor={Colors.inputPlaceholder}
            style={[
              styles.input,
              { paddingTop: hasValue || isFocused ? Spacing[4] : 0 },
            ]}
            editable={!disabled}
            maxLength={maxLength}
            textAlign="right"
            writingDirection="rtl"
            {...rest}
          />
        </View>

        <View style={styles.rightIcons}>
          {success && !error && (
            <AppIcon name="checkCircle" size={18} color={Colors.success} />
          )}
          {error && (
            <AppIcon name="error" size={18} color={Colors.danger} />
          )}
          {rightIcon && !error && !success && (
            <Pressable
              onPress={onRightIconPress}
              disabled={!onRightIconPress}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <AppIcon name={rightIcon} size={20} color={Colors.textSecondary} />
            </Pressable>
          )}
        </View>
      </Animated.View>

      <View style={styles.bottomRow}>
        <Animated.View style={[errorStyle, { flex: 1 }]}>
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : hint ? (
            <Text style={styles.hintText}>{hint}</Text>
          ) : null}
        </Animated.View>

        {characterCount && maxLength && (
          <Text style={[
            styles.charCount,
            value.length >= maxLength && { color: Colors.danger },
          ]}>
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
    </Animated.View>
  );
});

TextInputComponent.displayName = 'TextInputComponent';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.input,
    borderWidth: 1,
    minHeight: 56,
    paddingHorizontal: Spacing[4],
    overflow: 'hidden',
  },
  leftIcon: {
    marginEnd: Spacing[2],
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 56,
    paddingVertical: Spacing[2],
  },
  floatLabel: {
    ...Typography.bodyMedium,
    position: 'absolute',
    top: '50%',
    marginTop: -10,
    start: 0,
  },
  input: {
    ...Typography.bodyLarge,
    color: Colors.textPrimary,
    padding: 0,
    paddingTop: Spacing[4],
    height: 52,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    marginStart: Spacing[2],
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing[1],
    paddingHorizontal: Spacing[1],
    minHeight: 20,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.danger,
  },
  hintText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  charCount: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
