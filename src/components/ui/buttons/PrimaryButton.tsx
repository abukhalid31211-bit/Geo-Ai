import React, { useCallback } from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
  Springs,
  Duration,
  Gradients,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';
import { AppIcon, AppIconName } from '../icons/AppIcon';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'solid' | 'gradient';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  icon?: AppIconName;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

const SIZE_CONFIG = {
  sm: {
    height:       36,
    paddingH:     Spacing[4],
    borderRadius: Radius.buttonMd,
    labelStyle:   Typography.buttonSmall,
    iconSize:     16,
    loaderSize:   14,
  },
  md: {
    height:       48,
    paddingH:     Spacing[5],
    borderRadius: Radius.buttonLg,
    labelStyle:   Typography.buttonMedium,
    iconSize:     18,
    loaderSize:   16,
  },
  lg: {
    height:       56,
    paddingH:     Spacing[6],
    borderRadius: Radius.buttonLg,
    labelStyle:   Typography.buttonLarge,
    iconSize:     20,
    loaderSize:   18,
  },
} as const;

export function PrimaryButton({
  label,
  onPress,
  size = 'lg',
  variant = 'gradient',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'right',
  fullWidth = true,
  style,
  labelStyle,
}: PrimaryButtonProps) {
  const { medium } = useHaptics();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const config = SIZE_CONFIG[size];
  const isDisabled = disabled || loading;

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, Springs.snappy);
    opacity.value = withTiming(0.9, { duration: Duration.fast });
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, Springs.snappy);
    opacity.value = withTiming(1, { duration: Duration.fast });
  }, []);

  const handlePress = useCallback(() => {
    if (isDisabled) return;
    medium();
    onPress();
  }, [isDisabled, onPress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: isDisabled ? 0.45 : opacity.value,
  }));

  const buttonContent = (
    <View style={[
      styles.content,
      {
        height: config.height,
        paddingHorizontal: config.paddingH,
      },
    ]}>
      {loading ? (
        <ActivityIndicator
          size={config.loaderSize}
          color={Colors.textInverse}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <AppIcon
              name={icon}
              size={config.iconSize}
              color={Colors.textInverse}
            />
          )}

          <Text style={[
            config.labelStyle,
            styles.label,
            labelStyle,
          ]}>
            {label}
          </Text>

          {icon && iconPosition === 'right' && (
            <AppIcon
              name={icon}
              size={config.iconSize}
              color={Colors.textInverse}
            />
          )}
        </>
      )}
    </View>
  );

  return (
    <Animated.View style={[
      animatedStyle,
      fullWidth && styles.fullWidth,
      style,
    ]}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        style={{ borderRadius: config.borderRadius, overflow: 'hidden' }}
      >
        {variant === 'gradient' ? (
          <LinearGradient
            colors={Gradients.goldPrimary.colors as any}
            start={Gradients.goldPrimary.start}
            end={Gradients.goldPrimary.end}
            style={[
              styles.gradient,
              { borderRadius: config.borderRadius },
              Shadows.goldMd as any,
            ]}
          >
            {buttonContent}
          </LinearGradient>
        ) : (
          <View style={[
            styles.solid,
            {
              backgroundColor: isDisabled
                ? Colors.textDisabled
                : Colors.primary,
              borderRadius: config.borderRadius,
            },
          ]}>
            {buttonContent}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  gradient: {
    overflow: 'hidden',
  },
  solid: {
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
  },
  label: {
    color: Colors.textInverse,
    textAlign: 'center',
  },
});
