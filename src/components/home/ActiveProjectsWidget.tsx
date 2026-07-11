import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@theme';

export function ActiveProjectsWidget() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfacePrimary,
    borderRadius: BorderRadius.lg,
    padding: Spacing[4],
  },
});
