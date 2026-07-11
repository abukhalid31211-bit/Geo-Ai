import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, Shadows } from '@theme';

interface StatsCardProps {
  children?: React.ReactNode;
}

export function StatsCard({ children }: StatsCardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfacePrimary,
    borderRadius: BorderRadius.lg,
    padding: Spacing[4],
    ...Shadows.md,
  },
});
