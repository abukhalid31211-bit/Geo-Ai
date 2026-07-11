import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { borderRadius } from '@theme/borderRadius';
import { spacing } from '@theme/spacing';

export function ReportViewer() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
});
