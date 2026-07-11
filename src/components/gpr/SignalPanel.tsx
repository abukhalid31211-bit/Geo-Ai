import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';

export function SignalPanel() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
});
