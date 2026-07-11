import React, { useCallback, PropsWithChildren } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Colors,
  Spacing,
  Radius,
  Shadows,
  Springs,
  Duration,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';

type CardLevel = 0 | 1 | 2 | 3;
type CardVariant = 'default' | 'gold' | 'success' | 'danger' | 'info';

interface BaseCardProps extends PropsWithChildren {
  level?:        CardLevel;
  variant?:      CardVariant;
  onPress?:      () => void;
  onLongPress?:  () => void;
  style?:        ViewStyle;
  contentStyle?: ViewStyle;
  padding?:      boolean;
  gradient?:     boolean;
  animated?:     boolean;
  disabled?:     boolean;
  fullWidth?:    boolean;
}

const LEVEL_STYLES: Record<CardLevel, ViewStyle> = {
  0: {
    backgroundColor: Colors.surfacePrimary,
    borderRadius:    Radius.cardSm,
  },
  1: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius:    Radius.cardMd,
    borderWidth:     1,
    borderColor:     Colors.borderSubtle,
    ...Shadows.sm,
  },
  2: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius:    Radius.cardLg,
    borderWidth:     1,
    borderColor:     Colors.borderDefault,
    ...Shadows.md,
  },
  3: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius:    Radius.cardLg,
    borderWidth:     1,
    borderColor:     Colors.borderGold,
    ...Shadows.goldMd,
  },
};

const VARIANT_STYLES: Record<CardVariant, ViewStyle> = {
  default: {},
  gold: {
    borderColor:     Colors.primary,
    backgroundColor: 'rgba(245, 166, 35, 0.05)',
  },
  success: {
    borderColor:     Colors.success,
    backgroundColor: Colors.successBg,
  },
  danger: {
    borderColor:     Colors.danger,
    backgroundColor: Colors.dangerBg,
  },
  info: {
    borderColor:     Colors.info,
    backgroundColor: Colors.infoBg,
  },
};

export function BaseCard({
  children,
  level      = 1,
  variant    = 'default',
  onPress,
  onLongPress,
  style,
  contentStyle,
  padding    = true,
  gradient   = false,
  animated   = false,
  disabled   = false,
  fullWidth  = false,
}: BaseCardProps) {
  const { light } = useHaptics();
  const scale      = useSharedValue(1);
  const elevation  = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    if (!onPress) return;
    scale.value     = withSpring(0.98, Springs.snappy);
    elevation.value = withTiming(1, { duration: Duration.fast });
  }, [onPress]);

  const handlePressOut = useCallback(() => {
    if (!onPress) return;
    scale.value     = withSpring(1, Springs.default);
    elevation.value = withTiming(0, { duration: Duration.normal });
  }, [onPress]);

  const handlePress = useCallback(() => {
    if (disabled) return;
    light();
    onPress?.();
  }, [disabled, onPress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: onPress ? scale.value : 1 }],
  }));

  const cardStyle: ViewStyle[] = [
    LEVEL_STYLES[level],
    variant !== 'default' ? VARIANT_STYLES[variant] : {},
    padding ? { padding: Spacing[4] } : {},
    fullWidth ? { width: '100%' } : {},
    disabled ? { opacity: 0.6 } : {},
  ];

  const content = (
    <View style={[contentStyle]}>
      {children}
    </View>
  );

  const cardView = gradient ? (
    <LinearGradient
      colors={['rgba(28,35,51,1)', 'rgba(17,24,39,1)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[cardStyle, style]}
    >
      {content}
    </LinearGradient>
  ) : (
    <View style={[cardStyle, style]}>
      {content}
    </View>
  );

  if (onPress || onLongPress) {
    return (
      <Animated.View style={animated ? animatedStyle : undefined}>
        <Pressable
          onPress={handlePress}
          onLongPress={onLongPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          style={{ borderRadius: LEVEL_STYLES[level].borderRadius }}
        >
          {cardView}
        </Pressable>
      </Animated.View>
    );
  }

  return animated ? (
    <Animated.View style={animatedStyle}>
      {cardView}
    </Animated.View>
  ) : cardView;
}
