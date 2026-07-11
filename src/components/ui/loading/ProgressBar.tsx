import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '@theme/colors';

interface ProgressBarProps {
  size?: number | 'small' | 'large';
}

export function ProgressBar({ size = 'large' }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.gold} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
});
