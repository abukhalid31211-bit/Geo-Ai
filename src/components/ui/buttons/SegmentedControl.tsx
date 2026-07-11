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
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Springs,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';

interface Segment {
  key: string;
  label: string;
}

interface SegmentedControlProps {
  segments: Segment[];
  selectedKey: string;
  onSelect: (key: string) => void;
  style?: ViewStyle;
}

export function SegmentedControl({
  segments,
  selectedKey,
  onSelect,
  style,
}: SegmentedControlProps) {
  const { light } = useHaptics();
  const selectedIndex = segments.findIndex(s => s.key === selectedKey);
  const segmentWidth = useSharedValue(0);
  const translateX = useSharedValue(0);

  const handlePress = useCallback((key: string, index: number) => {
    light();
    onSelect(key);
    translateX.value = withSpring(
      index * segmentWidth.value,
      Springs.default
    );
  }, [segmentWidth]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: segmentWidth.value,
  }));

  return (
    <View
      style={[styles.container, style]}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width / segments.length;
        segmentWidth.value = w;
        translateX.value = selectedIndex * w;
      }}
    >
      {/* Sliding thumb */}
      <Animated.View style={[styles.thumb, thumbStyle]} />

      {/* Segments */}
      {segments.map((segment, index) => {
        const isActive = segment.key === selectedKey;
        return (
          <Pressable
            key={segment.key}
            onPress={() => handlePress(segment.key, index)}
            style={styles.segment}
          >
            <Text style={[
              Typography.labelMedium,
              { color: isActive ? Colors.textInverse : Colors.textSecondary },
            ]}>
              {segment.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radius.buttonLg,
    padding: 3,
    position: 'relative',
    height: 40,
  },
  thumb: {
    position: 'absolute',
    top: 3,
    bottom: 3,
    left: 3,
    backgroundColor: Colors.primary,
    borderRadius: Radius.buttonMd,
    zIndex: 0,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
