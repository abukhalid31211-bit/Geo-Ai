import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '@theme/colors';

interface SkeletonLoaderProps {
  size?: number | 'small' | 'large';
}

export function SkeletonLoader({ size = 'large' }: SkeletonLoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={colors.gold} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
});
