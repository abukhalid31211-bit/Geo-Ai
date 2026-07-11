import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@theme';

interface ErrorStateProps {
  title?: string;
  message?: string;
}

export function ErrorState({ title = '', message = '' }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing[8] },
  title: { ...Typography.titleMedium, color: Colors.textPrimary, marginBottom: Spacing[3] },
  message: { ...Typography.bodyMedium, color: Colors.textSecondary, textAlign: 'center' },
});
