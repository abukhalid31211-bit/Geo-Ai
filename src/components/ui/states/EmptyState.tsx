import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';
import { spacing } from '@theme/spacing';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({ title = '', message = '' }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xxxl },
  title: { ...typography.heading.md, color: colors.text, marginBottom: spacing.md },
  message: { ...typography.body.md, color: colors.textSecondary, textAlign: 'center' },
});
