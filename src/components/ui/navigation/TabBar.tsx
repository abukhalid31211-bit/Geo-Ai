import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';
import { spacing } from '@theme/spacing';

interface TabBarProps {
  title?: string;
  onPress?: () => void;
}

export function TabBar({ title = '', onPress }: TabBarProps) {
  return (
    <View style={styles.container}>
      {onPress ? (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.back}>{'\u2190'}</Text>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: spacing.md },
  title: { ...typography.heading.sm, color: colors.text },
  back: { ...typography.heading.md, color: colors.gold, marginRight: spacing.md },
});
