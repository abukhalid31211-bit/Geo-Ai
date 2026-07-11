import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@theme';

export function RadargramCanvas() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.surfacePrimary },
});
