import React, { useCallback } from 'react';
import {
  Pressable,
  ViewStyle,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Duration } from '@theme';

interface RippleEffectProps {
  onPress?: () => void;
  onLongPress?: () => void;
  rippleColor?: string;
  style?: ViewStyle;
  children: React.ReactNode;
  disabled?: boolean;
}

export function RippleEffect({
  onPress,
  onLongPress,
  rippleColor = Colors.primaryGlow,
  style,
  children,
  disabled = false,
}: RippleEffectProps) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const handlePress = useCallback(() => {
    scale.value = 0;
    opacity.value = 0.5;
    scale.value = withTiming(2.5, { duration: Duration.slower });
    opacity.value = withTiming(0, { duration: Duration.slower });

    onPress?.();
  }, [onPress]);

  const rippleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={onLongPress}
      disabled={disabled}
      style={[styles.container, style]}
    >
      <View style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[
            styles.ripple,
            { backgroundColor: rippleColor },
            rippleStyle,
          ]}
        />
      </View>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  ripple: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 100,
    height: 100,
    marginLeft: -50,
    marginTop: -50,
    borderRadius: 50,
  },
});
