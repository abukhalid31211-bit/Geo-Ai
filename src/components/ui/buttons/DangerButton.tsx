import React, { useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Springs,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';
import { AppIcon, AppIconName } from '../icons/AppIcon';

interface DangerButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: AppIconName;
  fullWidth?: boolean;
  outlined?: boolean;
  style?: ViewStyle;
}

export function DangerButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  outlined = false,
  style,
}: DangerButtonProps) {
  const { error: errorHaptic } = useHaptics();
  const scale = useSharedValue(1);
  const isDisabled = disabled || loading;

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, Springs.snappy);
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, Springs.snappy);
  }, []);

  const handlePress = useCallback(() => {
    if (isDisabled) return;
    errorHaptic();
    onPress();
  }, [isDisabled, onPress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: isDisabled ? 0.45 : 1,
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
        <View style={[
          styles.button,
          outlined ? styles.outlined : styles.solid,
          isDisabled && styles.disabled,
        ]}>
          {loading ? (
            <ActivityIndicator
              size={16}
              color={outlined ? Colors.danger : Colors.textPrimary}
            />
          ) : (
            <>
              {icon && (
                <AppIcon
                  name={icon}
                  size={18}
                  color={outlined ? Colors.danger : Colors.textPrimary}
                />
              )}
              <Text style={[
                Typography.buttonMedium,
                { color: outlined ? Colors.danger : Colors.textPrimary },
              ]}>
                {label}
              </Text>
            </>
          )}
        </View>
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
    height: 48,
    paddingHorizontal: Spacing[5],
    borderRadius: Radius.buttonLg,
  },
  solid: {
    backgroundColor: Colors.danger,
  },
  outlined: {
    backgroundColor: Colors.dangerBg,
    borderWidth: 1.5,
    borderColor: Colors.danger,
  },
  disabled: {
    opacity: 0.45,
  },
});
