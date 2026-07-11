import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Pressable,
} from 'react-native';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
} from '@theme';
import { AppIcon, AppIconName } from '../icons/AppIcon';
import { Row }                  from '../layout/Row';

interface ListCardProps {
  title:          string;
  subtitle?:      string;
  leftIcon?:      AppIconName;
  leftIconColor?: string;
  leftContent?:   React.ReactNode;
  rightContent?:  React.ReactNode;
  showChevron?:   boolean;
  onPress?:       () => void;
  style?:         ViewStyle;
  disabled?:      boolean;
  variant?:       'default' | 'destructive';
}

export function ListCard({
  title,
  subtitle,
  leftIcon,
  leftIconColor = Colors.textSecondary,
  leftContent,
  rightContent,
  showChevron   = true,
  onPress,
  style,
  disabled      = false,
  variant       = 'default',
}: ListCardProps) {
  const titleColor =
    variant === 'destructive' ? Colors.danger : Colors.textPrimary;

  const content = (
    <Row
      align="center"
      justify="space-between"
      style={[styles.container, style]}
      gap={Spacing[3]}
    >
      <Row align="center" gap={Spacing[3]} flex={1}>
        {leftContent || (leftIcon && (
          <View style={styles.iconWrap}>
            <AppIcon name={leftIcon} size={20} color={leftIconColor} />
          </View>
        ))}

        <View style={{ flex: 1 }}>
          <Text
            style={[styles.title, { color: titleColor }]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          )}
        </View>
      </Row>

      <Row align="center" gap={Spacing[1]}>
        {rightContent}
        {showChevron && onPress && (
          <AppIcon name="chevronLeft" size={18} color={Colors.textDisabled} />
        )}
      </Row>
    </Row>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [pressed && { opacity: 0.7 }]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius:    Radius.cardMd,
    padding:         Spacing[4],
    borderWidth:     1,
    borderColor:     Colors.borderSubtle,
  },
  iconWrap: {
    width:           40,
    height:          40,
    borderRadius:    10,
    backgroundColor: Colors.surfaceElevated,
    alignItems:      'center',
    justifyContent:  'center',
    flexShrink:      0,
  },
  title: {
    ...Typography.bodyMedium,
    fontWeight: '500',
  },
  subtitle: {
    ...Typography.caption,
    color:     Colors.textSecondary,
    marginTop: 2,
  },
});
