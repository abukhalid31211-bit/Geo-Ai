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
  withTiming,
  interpolateColor,
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

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
  icon?: AppIconName;
  badge?: number;
  style?: ViewStyle;
}

export function TabButton({
  label,
  isActive,
  onPress,
  icon,
  badge,
  style,
}: TabButtonProps) {
  const { light } = useHaptics();
  const activeProgress = useSharedValue(isActive ? 1 : 0);

  React.useEffect(() => {
    activeProgress.value = withTiming(isActive ? 1 : 0, {
      duration: Duration.normal,
    });
  }, [isActive]);

  const handlePress = useCallback(() => {
    if (isActive) return;
    light();
    onPress();
  }, [isActive, onPress]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: withSpring(isActive ? 1 : 0, Springs.default) }],
    opacity: withTiming(isActive ? 1 : 0, { duration: Duration.normal }),
  }));

  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      activeProgress.value,
      [0, 1],
      [Colors.textSecondary, Colors.primary]
    ),
  }));

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, style]}
    >
      <View style={styles.content}>
        {icon && (
          <AppIcon
            name={icon}
            size={18}
            color={isActive ? Colors.primary : Colors.textSecondary}
          />
        )}

        <Animated.Text style={[
          Typography.labelLarge,
          labelStyle,
        ]}>
          {label}
        </Animated.Text>

        {badge !== undefined && badge > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {badge > 9 ? '9+' : badge}
            </Text>
          </View>
        )}
      </View>

      {/* Active Indicator */}
      <View style={styles.indicatorTrack}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: Spacing[2],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[1],
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[3],
  },
  indicatorTrack: {
    height: 2,
    width: '60%',
    borderRadius: 1,
    overflow: 'hidden',
  },
  indicator: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
  badge: {
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
});
