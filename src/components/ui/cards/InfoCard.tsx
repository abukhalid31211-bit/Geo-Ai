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
} from '@theme';
import { AppIcon, AppIconName } from '../icons/AppIcon';

type InfoCardVariant = 'info' | 'success' | 'warning' | 'danger' | 'gold';

interface InfoCardProps {
  message:    string;
  title?:     string;
  variant?:   InfoCardVariant;
  icon?:      AppIconName;
  style?:     ViewStyle;
  onDismiss?: () => void;
}

const VARIANT_CONFIG: Record<InfoCardVariant, {
  bg:     string;
  border: string;
  icon:   AppIconName;
  color:  string;
}> = {
  info: {
    bg:     Colors.infoBg,
    border: Colors.info,
    icon:   'info',
    color:  Colors.info,
  },
  success: {
    bg:     Colors.successBg,
    border: Colors.success,
    icon:   'checkCircle',
    color:  Colors.success,
  },
  warning: {
    bg:     Colors.warningBg,
    border: Colors.warning,
    icon:   'warning',
    color:  Colors.warning,
  },
  danger: {
    bg:     Colors.dangerBg,
    border: Colors.danger,
    icon:   'error',
    color:  Colors.danger,
  },
  gold: {
    bg:     Colors.primaryGlowDim,
    border: Colors.primary,
    icon:   'star',
    color:  Colors.primary,
  },
};

export function InfoCard({
  message,
  title,
  variant   = 'info',
  icon,
  style,
  onDismiss,
}: InfoCardProps) {
  const config   = VARIANT_CONFIG[variant];
  const iconName = icon || config.icon;

  return (
    <View style={[
      styles.container,
      {
        backgroundColor:  config.bg,
        borderColor:      config.border,
        borderStartWidth: 3,
      },
      style,
    ]}>
      <View style={styles.iconWrap}>
        <AppIcon name={iconName} size={18} color={config.color} />
      </View>

      <View style={styles.content}>
        {title && (
          <Text style={[styles.title, { color: config.color }]}>
            {title}
          </Text>
        )}
        <Text style={styles.message}>{message}</Text>
      </View>

      {onDismiss && (
        <AppIcon name="close" size={16} color={Colors.textSecondary} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:    'flex-start',
    gap:           Spacing[3],
    padding:       Spacing[3],
    borderRadius:  Radius.cardSm,
    borderWidth:   1,
  },
  iconWrap: {
    marginTop:  1,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap:  Spacing[0.5],
  },
  title: {
    ...Typography.labelMedium,
  },
  message: {
    ...Typography.bodySmall,
    color:      Colors.textSecondary,
    lineHeight: 20,
  },
});
