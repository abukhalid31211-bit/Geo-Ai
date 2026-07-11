import React, { useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Springs,
  Duration,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';
import { AppIcon, AppIconName } from '../icons/AppIcon';

type ButtonSize = 'sm' | 'md' | 'lg';

interface SecondaryButtonProps {
  label: string;
  onPress: () => void;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: AppIconName;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  color?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

const SIZE_CONFIG = {
  sm: {
    height:       36,
    paddingH:     Spacing[4],
    borderRadius: Radius.buttonMd,
    textStyle:    Typography.buttonSmall,
    iconSize:     16,
    borderWidth:  1,
    loaderSize:   14,
  },
  md: {
    height:       48,
    paddingH:     Spacing[5],
    borderRadius: Radius.buttonLg,
    textStyle:    Typography.buttonMedium,
    iconSize:     18,
    borderWidth:  1.5,
    loaderSize:   16,
  },
  lg: {
    height:       56,
    paddingH:     Spacing[6],
    borderRadius: Radius.buttonLg,
    textStyle:    Typography.buttonLarge,
    iconSize:     20,
    borderWidth:  1.5,
    loaderSize:   18,
  },
} as const;

export function SecondaryButton({
  label,
  onPress,
  size = 'lg',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'right',
  fullWidth = true,
  color = Colors.primary,
  style,
  labelStyle,
}: SecondaryButtonProps) {
  const { light } = useHaptics();
  const scale = useSharedValue(1);
  const bgOpacity = useSharedValue(0);
  const config = SIZE_CONFIG[size];
  const isDisabled = disabled || loading;

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.97, Springs.snappy);
    bgOpacity.value = withTiming(1, { duration: Duration.fast });
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, Springs.snappy);
    bgOpacity.value = withTiming(0, { duration: Duration.fast });
  }, []);

  const handlePress = useCallback(() => {
    if (isDisabled) return;
    light();
    onPress();
  }, [isDisabled, onPress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: isDisabled ? 0.45 : 1,
  }));

  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(245, 166, 35, ${bgOpacity.value * 0.1})`,
  }));

  return (
    <Animated.View style={[
      animatedStyle,
      fullWidth && { width: '100%' },
      style,
    ]}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
      >
        <Animated.View style={[
          styles.button,
          bgStyle,
          {
            height: config.height,
            paddingHorizontal: config.paddingH,
            borderRadius: config.borderRadius,
            borderWidth: config.borderWidth,
            borderColor: isDisabled ? Colors.textDisabled : color,
          },
        ]}>
          {loading ? (
            <ActivityIndicator size={config.loaderSize} color={color} />
          ) : (
            <>
              {icon && iconPosition === 'left' && (
                <AppIcon
                  name={icon}
                  size={config.iconSize}
                  color={isDisabled ? Colors.textDisabled : color}
                />
              )}

              <Text style={[
                config.textStyle,
                { color: isDisabled ? Colors.textDisabled : color },
                labelStyle,
              ]}>
                {label}
              </Text>

              {icon && iconPosition === 'right' && (
                <AppIcon
                  name={icon}
                  size={config.iconSize}
                  color={isDisabled ? Colors.textDisabled : color}
                />
              )}
            </>
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
    overflow: 'hidden',
  },
});
