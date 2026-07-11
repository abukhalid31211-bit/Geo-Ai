import React, { useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
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

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  icon?: AppIconName;
  onRemove?: () => void;
  style?: ViewStyle;
  color?: string;
}

export function FilterChip({
  label,
  isSelected,
  onPress,
  icon,
  onRemove,
  style,
  color = Colors.primary,
}: FilterChipProps) {
  const { light } = useHaptics();
  const scale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, Springs.snappy);
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, Springs.bouncy);
  }, []);

  const handlePress = useCallback(() => {
    light();
    onPress();
  }, [onPress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={[
          styles.chip,
          isSelected && {
            backgroundColor: `${color}22`,
            borderColor: color,
          },
          !isSelected && styles.unselected,
        ]}>
          {icon && (
            <AppIcon
              name={icon}
              size={14}
              color={isSelected ? color : Colors.textSecondary}
            />
          )}

          <Text style={[
            Typography.labelMedium,
            {
              color: isSelected ? color : Colors.textSecondary,
            },
          ]}>
            {label}
          </Text>

          {isSelected && onRemove && (
            <Pressable
              onPress={onRemove}
              hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
            >
              <AppIcon
                name="close"
                size={12}
                color={color}
              />
            </Pressable>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[1],
    paddingVertical: Spacing[1.5],
    paddingHorizontal: Spacing[3],
    borderRadius: Radius.chip,
    borderWidth: 1,
  },
  unselected: {
    backgroundColor: Colors.surfaceSecondary,
    borderColor: Colors.borderDefault,
  },
});
