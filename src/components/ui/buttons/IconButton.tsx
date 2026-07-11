import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
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
  Spacing,
  Radius,
  Springs,
  Duration,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';
import { AppIcon, AppIconName } from '../icons/AppIcon';

type IconButtonSize = 'sm' | 'md' | 'lg';
type IconButtonVariant =
  | 'ghost'
  | 'surface'
  | 'outline'
  | 'filled';

interface IconButtonProps {
  icon: AppIconName;
  onPress: () => void;
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
  badge?: number;
  style?: ViewStyle;
  rounded?: boolean;
}

const SIZE_CONFIG = {
  sm: { container: 32, icon: 16 },
  md: { container: 40, icon: 20 },
  lg: { container: 48, icon: 24 },
} as const;

export function IconButton({
  icon,
  onPress,
  size = 'md',
  variant = 'ghost',
  color = Colors.textPrimary,
  backgroundColor,
  disabled = false,
  badge,
  style,
  rounded = false,
}: IconButtonProps) {
  const { light } = useHaptics();
  const scale = useSharedValue(1);
  const bgOpacity = useSharedValue(0);
  const config = SIZE_CONFIG[size];

  const borderRadius = rounded
    ? config.container / 2
    : Radius.cardSm;

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.88, Springs.snappy);
    bgOpacity.value = withTiming(1, { duration: Duration.fast });
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, Springs.bouncy);
    bgOpacity.value = withTiming(0, { duration: Duration.normal });
  }, []);

  const handlePress = useCallback(() => {
    if (disabled) return;
    light();
    onPress();
  }, [disabled, onPress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.4 : 1,
  }));

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'surface':
        return {
          backgroundColor: backgroundColor || Colors.surfaceSecondary,
          borderRadius,
        };
      case 'outline':
        return {
          borderWidth: 1,
          borderColor: color,
          borderRadius,
          backgroundColor: 'transparent',
        };
      case 'filled':
        return {
          backgroundColor: backgroundColor || Colors.primary,
          borderRadius,
        };
      default: // ghost
        return { borderRadius };
    }
  };

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        <View style={[
          {
            width: config.container,
            height: config.container,
            alignItems: 'center',
            justifyContent: 'center',
          },
          getVariantStyle(),
        ]}>
          <AppIcon
            name={icon}
            size={config.icon}
            color={variant === 'filled'
              ? Colors.textInverse
              : (disabled ? Colors.textDisabled : color)
            }
          />

          {/* Badge */}
          {badge !== undefined && badge > 0 && (
            <View style={styles.badge}>
              <Animated.Text style={styles.badgeText}>
                {badge > 9 ? '9+' : badge}
              </Animated.Text>
            </View>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: Colors.bgPrimary,
  },
  badgeText: {
    fontSize: 9,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
});
