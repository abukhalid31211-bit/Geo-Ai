import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
  Springs,
  Gradients,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';
import { AppIcon, AppIconName } from '../icons/AppIcon';

type FABSize = 'sm' | 'md' | 'lg';
type FABVariant = 'round' | 'extended';

interface FABButtonProps {
  icon: AppIconName;
  onPress: () => void;
  label?: string;
  size?: FABSize;
  variant?: FABVariant;
  position?: {
    bottom?: number;
    right?: number;
    left?: number;
  };
  style?: ViewStyle;
  color?: 'gold' | 'surface';
}

const SIZE_CONFIG = {
  sm: { size: 40,  iconSize: 20 },
  md: { size: 52,  iconSize: 24 },
  lg: { size: 64,  iconSize: 28 },
} as const;

export function FABButton({
  icon,
  onPress,
  label,
  size = 'lg',
  variant = 'round',
  position = { bottom: 24, right: 20 },
  style,
  color = 'gold',
}: FABButtonProps) {
  const { medium } = useHaptics();
  const scale = useSharedValue(1);
  const config = SIZE_CONFIG[size];

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.92, Springs.snappy);
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, Springs.bouncy);
  }, []);

  const handlePress = useCallback(() => {
    medium();
    onPress();
  }, [onPress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isExtended = variant === 'extended' && label;

  return (
    <Animated.View style={[
      styles.wrapper,
      position && {
        position: 'absolute',
        bottom: position.bottom,
        right: position.right,
        left: position.left,
      },
      animatedStyle,
      style,
    ]}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {color === 'gold' ? (
          <LinearGradient
            colors={Gradients.goldPrimary.colors as any}
            start={Gradients.goldPrimary.start}
            end={Gradients.goldPrimary.end}
            style={[
              styles.fab,
              isExtended ? styles.extended : {
                width: config.size,
                height: config.size,
                borderRadius: config.size / 2,
              },
              Shadows.goldLg as any,
            ]}
          >
            <AppIcon
              name={icon}
              size={config.iconSize}
              color={Colors.textInverse}
            />
            {isExtended && (
              <Text style={[
                Typography.buttonMedium,
                { color: Colors.textInverse, marginRight: Spacing[2] },
              ]}>
                {label}
              </Text>
            )}
          </LinearGradient>
        ) : (
          <View style={[
            styles.fab,
            styles.surfaceFab,
            isExtended ? styles.extended : {
              width: config.size,
              height: config.size,
              borderRadius: config.size / 2,
            },
            Shadows.goldMd as any,
          ]}>
            <AppIcon
              name={icon}
              size={config.iconSize}
              color={Colors.primary}
            />
            {isExtended && (
              <Text style={[
                Typography.buttonMedium,
                { color: Colors.primary, marginRight: Spacing[2] },
              ]}>
                {label}
              </Text>
            )}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 100,
  },
  fab: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing[2],
  },
  extended: {
    height: 52,
    paddingHorizontal: Spacing[5],
    borderRadius: Radius.buttonRound,
  },
  surfaceFab: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.borderGold,
  },
});
