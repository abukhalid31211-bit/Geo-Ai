import React, { useCallback } from 'react';
import {
  Text,
  ViewStyle,
  TextStyle,
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
  Springs,
  Duration,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';
import { AppIcon, AppIconName } from '../icons/AppIcon';

type ButtonSize = 'sm' | 'md' | 'lg';

interface GhostButtonProps {
  label: string;
  onPress: () => void;
  size?: ButtonSize;
  disabled?: boolean;
  icon?: AppIconName;
  iconPosition?: 'left' | 'right';
  color?: string;
  underline?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

const SIZE_CONFIG = {
  sm: { textStyle: Typography.buttonSmall, iconSize: 14 },
  md: { textStyle: Typography.buttonMedium, iconSize: 16 },
  lg: { textStyle: Typography.buttonLarge, iconSize: 18 },
} as const;

export function GhostButton({
  label,
  onPress,
  size = 'md',
  disabled = false,
  icon,
  iconPosition = 'right',
  color = Colors.primary,
  underline = false,
  style,
  labelStyle,
}: GhostButtonProps) {
  const { light } = useHaptics();
  const opacity = useSharedValue(1);
  const config = SIZE_CONFIG[size];

  const handlePressIn = useCallback(() => {
    opacity.value = withTiming(0.6, { duration: Duration.fast });
  }, []);

  const handlePressOut = useCallback(() => {
    opacity.value = withSpring(1, Springs.snappy);
  }, []);

  const handlePress = useCallback(() => {
    if (disabled) return;
    light();
    onPress();
  }, [disabled, onPress]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: disabled ? 0.4 : opacity.value,
  }));

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: Spacing[1],
          paddingVertical: Spacing[1],
          paddingHorizontal: Spacing[2],
        },
        animatedStyle,
        style,
      ]}>
        {icon && iconPosition === 'left' && (
          <AppIcon name={icon} size={config.iconSize} color={color} />
        )}

        <Text style={[
          config.textStyle,
          {
            color: disabled ? Colors.textDisabled : color,
            textDecorationLine: underline ? 'underline' : 'none',
          },
          labelStyle,
        ]}>
          {label}
        </Text>

        {icon && iconPosition === 'right' && (
          <AppIcon name={icon} size={config.iconSize} color={color} />
        )}
      </Animated.View>
    </Pressable>
  );
}
