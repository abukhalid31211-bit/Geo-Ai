import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Colors, Typography, Spacing, Radius, BorderRadius, Shadows, Springs } from '@theme';
import { useHaptics } from '@hooks/useHaptics';
import { AppIcon, AppIconName } from '@components/ui/icons/AppIcon';

interface QuickActionItemProps {
  icon:     AppIconName;
  label:    string;
  onPress:  () => void;
  isGold?:  boolean;
}

export function QuickActionItem({ icon, label, onPress, isGold = false }: QuickActionItemProps) {
  const { light } = useHaptics();
  const scale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.92, Springs.snappy);
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, Springs.bouncy);
  }, []);

  const handlePress = useCallback(() => {
    light();
    onPress();
  }, [light, onPress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={[styles.circle, isGold && styles.circleGold]}>
          <AppIcon name={icon} size={24} color={isGold ? Colors.primary : Colors.textPrimary} />
        </View>
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap:        Spacing[1.5],
    width:      72,
  },
  circle: {
    width:           64,
    height:          64,
    borderRadius:    BorderRadius.full,
    backgroundColor: Colors.surfaceSecondary,
    borderWidth:     1,
    borderColor:     Colors.borderDefault,
    alignItems:      'center',
    justifyContent:  'center',
  },
  circleGold: {
    borderWidth:     1.5,
    borderColor:     Colors.primary,
    backgroundColor: Colors.primaryGlowDim,
    ...Shadows.goldSm,
  },
  label: {
    ...Typography.labelSmall,
    color:     Colors.textSecondary,
    textAlign: 'center',
  },
});
