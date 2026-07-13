import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, BorderRadius, Typography } from '@theme';

interface AvatarProps {
  /** Initials or short text shown when no `source` image is provided. */
  label?: string;
  /** Optional profile image URI — takes priority over `label`. */
  source?: string;
  /** Circle diameter in dp. Default 40 (legacy pill layout kicks in only when unset AND no size given). */
  size?: number;
  borderColor?: string;
  borderWidth?: number;
  backgroundColor?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export function Avatar({
  label = '',
  source,
  size,
  borderColor,
  borderWidth,
  backgroundColor,
  onPress,
  style,
}: AvatarProps) {
  // Legacy behavior: no `size` → small rounded label pill (original API).
  if (size === undefined) {
    return (
      <View style={[styles.pill, style]}>
        <Text style={styles.pillText}>{label}</Text>
      </View>
    );
  }

  const circleStyle: ViewStyle = {
    width:           size,
    height:          size,
    borderRadius:    size / 2,
    backgroundColor: backgroundColor ?? Colors.primaryGlowDim,
    borderWidth:     borderWidth ?? (borderColor ? 1.5 : 0),
    borderColor:     borderColor ?? 'transparent',
    alignItems:      'center',
    justifyContent:  'center',
    overflow:        'hidden',
  };

  const content = source ? (
    <Image source={{ uri: source }} style={{ width: size, height: size }} />
  ) : (
    <Text style={[styles.initials, { fontSize: size * 0.4 }]}>{label}</Text>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [circleStyle, pressed && { opacity: 0.75 }, style]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[circleStyle, style]}>{content}</View>;
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor:   Colors.surfaceElevated,
    borderRadius:      BorderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical:   4,
  },
  pillText: { ...Typography.caption, color: Colors.textPrimary },
  initials: {
    ...Typography.labelMedium,
    color:      Colors.primary,
    fontWeight: '700',
  },
});
