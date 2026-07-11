import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
} from '@theme';
import { AppIcon, AppIconName } from '../icons/AppIcon';

interface StatsCardProps {
  label:        string;
  value:        number | string;
  unit?:        string;
  icon?:        AppIconName;
  iconColor?:   string;
  trend?:       { value: number; positive: boolean };
  animateValue?: boolean;
  style?:       ViewStyle;
}

export function StatsCard({
  label,
  value,
  unit,
  icon,
  iconColor    = Colors.primary,
  trend,
  style,
}: StatsCardProps) {
  const displayValue =
    typeof value === 'number' ? value.toLocaleString('ar') : value;

  return (
    <View style={[styles.container, style]}>
      {icon && (
        <View style={[styles.iconWrap, { backgroundColor: `${iconColor}15` }]}>
          <AppIcon name={icon} size={20} color={iconColor} />
        </View>
      )}

      <View style={styles.valueRow}>
        <Text style={styles.value}>{displayValue}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>

      <Text style={styles.label}>{label}</Text>

      {trend && (
        <View style={styles.trendRow}>
          <AppIcon
            name={trend.positive ? 'chevronUp' : 'chevronDown'}
            size={12}
            color={trend.positive ? Colors.success : Colors.danger}
          />
          <Text style={[
            styles.trendText,
            { color: trend.positive ? Colors.success : Colors.danger },
          ]}>
            {trend.value}%
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius:    Radius.cardMd,
    padding:         Spacing[4],
    borderWidth:     1,
    borderColor:     Colors.borderSubtle,
    gap:             Spacing[1],
    ...Shadows.sm,
  },
  iconWrap: {
    width:          40,
    height:         40,
    borderRadius:   10,
    alignItems:     'center',
    justifyContent: 'center',
    marginBottom:   Spacing[1],
  },
  valueRow: {
    flexDirection: 'row',
    alignItems:    'flex-end',
    gap:           Spacing[1],
  },
  value: {
    ...Typography.displaySmall,
    color:      Colors.textPrimary,
    lineHeight: 32,
  },
  unit: {
    ...Typography.bodyMedium,
    color:        Colors.textSecondary,
    marginBottom: 4,
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           2,
    marginTop:     Spacing[0.5],
  },
  trendText: {
    ...Typography.caption,
    fontWeight: '600',
  },
});
