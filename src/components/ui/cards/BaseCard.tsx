import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { borderRadius } from '@theme/borderRadius';
import { spacing } from '@theme/spacing';
import { shadows } from '@theme/shadows';

interface BaseCardProps {
  children?: React.ReactNode;
}

export function BaseCard({ children }: BaseCardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
  },
});
