import React, {
  useState,
  useCallback,
  forwardRef,
} from 'react';
import {
  View,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  Pressable,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
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
import { AppIcon } from '../icons/AppIcon';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onClear?: () => void;
  onSubmit?: (text: string) => void;
  showCancelButton?: boolean;
  onCancel?: () => void;
  containerStyle?: ViewStyle;
  autoFocus?: boolean;
}

export const SearchInput = forwardRef<RNTextInput, SearchInputProps>(
({
  value,
  onChangeText,
  placeholder = 'بحث...',
  onFocus,
  onBlur,
  onClear,
  onSubmit,
  showCancelButton = false,
  onCancel,
  containerStyle,
  autoFocus = false,
}, ref) => {
  const { light } = useHaptics();
  const [isFocused, setIsFocused] = useState(false);
  const focusProgress = useSharedValue(0);
  const cancelWidth   = useSharedValue(0);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    light();
    focusProgress.value = withTiming(1, { duration: Duration.normal });
    if (showCancelButton) {
      cancelWidth.value = withSpring(72, Springs.default);
    }
    onFocus?.();
  }, [showCancelButton, onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    focusProgress.value = withTiming(0, { duration: Duration.normal });
    onBlur?.();
  }, [onBlur]);

  const handleCancel = useCallback(() => {
    light();
    onChangeText('');
    cancelWidth.value = withSpring(0, Springs.default);
    onCancel?.();
  }, [onCancel]);

  const handleClear = useCallback(() => {
    light();
    onChangeText('');
    onClear?.();
  }, [onClear]);

  const containerAnimStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      isFocused ? Colors.primary : Colors.borderDefault,
      { duration: Duration.normal }
    ),
    borderWidth: withTiming(isFocused ? 1.5 : 1, { duration: Duration.fast }),
    shadowColor: Colors.primary,
    shadowOpacity: interpolate(
      focusProgress.value,
      [0, 1],
      [0, 0.2],
      Extrapolation.CLAMP
    ),
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: focusProgress.value * 3,
  }));

  const cancelStyle = useAnimatedStyle(() => ({
    width: cancelWidth.value,
    opacity: interpolate(
      cancelWidth.value,
      [0, 72],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Animated.View style={[styles.container, containerAnimStyle]}>
        <AppIcon
          name="search"
          size={18}
          color={isFocused ? Colors.primary : Colors.textSecondary}
        />

        <RNTextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={() => onSubmit?.(value)}
          placeholder={placeholder}
          placeholderTextColor={Colors.inputPlaceholder}
          style={styles.input}
          returnKeyType="search"
          autoFocus={autoFocus}
          autoCapitalize="none"
          autoCorrect={false}
          textAlign="right"
        />

        {value.length > 0 && (
          <Pressable
            onPress={handleClear}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <View style={styles.clearButton}>
              <AppIcon name="close" size={12} color={Colors.bgPrimary} />
            </View>
          </Pressable>
        )}
      </Animated.View>

      {showCancelButton && (
        <Animated.View style={[styles.cancelWrapper, cancelStyle]}>
          <Pressable onPress={handleCancel}>
            <Text style={styles.cancelText}>إلغاء</Text>
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
});

SearchInput.displayName = 'SearchInput';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.inputRound,
    borderWidth: 1,
    height: 44,
    paddingHorizontal: Spacing[3],
    gap: Spacing[2],
  },
  input: {
    flex: 1,
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    padding: 0,
    height: '100%',
  },
  clearButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelWrapper: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    ...Typography.labelMedium,
    color: Colors.primary,
  },
});
