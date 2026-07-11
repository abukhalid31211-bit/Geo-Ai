import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@theme';

interface HeaderProps {
  title?: string;
  onPress?: () => void;
}

export function Header({ title = '', onPress }: HeaderProps) {
  return (
    <View style={styles.container}>
      {onPress ? (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.back}>{'←'}</Text>
        </TouchableOpacity>
      ) : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: Spacing[3] },
  title: { ...Typography.titleSmall, color: Colors.textPrimary },
  back: { ...Typography.titleMedium, color: Colors.primary, marginRight: Spacing[3] },
});
