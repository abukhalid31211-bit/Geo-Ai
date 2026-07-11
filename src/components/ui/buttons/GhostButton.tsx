import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';
import { borderRadius } from '@theme/borderRadius';

interface GhostButtonProps {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
}

export function GhostButton({ title = '', onPress, disabled }: GhostButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.gold,
    borderRadius: borderRadius.md,
    paddingHorizontal: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...typography.body.md,
    color: colors.background,
    fontWeight: '600',
  },
});
