import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Colors, Typography, Spacing } from '@theme';

interface DataLabelProps {
  label: string;
  value: string | number;
  unit?: string;
  accent?: boolean;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function DataLabel({
  label,
  value,
  unit,
  accent = false,
  size = 'md',
  style,
}: DataLabelProps) {
  const valueStyle = {
    sm: Typography.dataMedium,
    md: Typography.dataLarge,
    lg: { ...Typography.dataLarge, fontSize: 24 },
  }[size];

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={[
          valueStyle,
          { color: accent ? Colors.primary : Colors.textPrimary },
        ]}>
          {typeof value === 'number' ? value.toLocaleString('ar') : value}
        </Text>
        {unit && (
          <Text style={styles.unit}>{unit}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing[0.5],
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing[1],
  },
  unit: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
});
