import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors, Typography, Spacing } from '@theme';
import { AppIcon } from '../icons/AppIcon';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  icon?: React.ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  action,
  icon,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {icon && (
          <View style={styles.iconWrapper}>
            {icon}
          </View>
        )}
        <View>
          <Text style={styles.title}>{title}</Text>
          {subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}
        </View>
      </View>

      {action && (
        <TouchableOpacity
          onPress={action.onPress}
          style={styles.action}
          activeOpacity={0.7}
        >
          <Text style={styles.actionText}>{action.label}</Text>
          <AppIcon
            name="chevronLeft"
            size={16}
            color={Colors.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    flex: 1,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primaryGlowDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.titleMedium,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  actionText: {
    ...Typography.labelMedium,
    color: Colors.primary,
  },
});
