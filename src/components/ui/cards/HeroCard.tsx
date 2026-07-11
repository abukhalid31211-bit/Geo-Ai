import React, { PropsWithChildren } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
  Gradients,
} from '@theme';
import { GoldGlow }           from '../animated/GoldGlow';
import { AppIcon, AppIconName } from '../icons/AppIcon';
import { Row }                from '../layout/Row';

interface HeroCardProps extends PropsWithChildren {
  title:          string;
  subtitle?:      string;
  icon?:          AppIconName;
  badge?:         string;
  badgeColor?:    string;
  rightContent?:  React.ReactNode;
  bottomContent?: React.ReactNode;
  glowing?:       boolean;
  style?:         ViewStyle;
}

export function HeroCard({
  children,
  title,
  subtitle,
  icon,
  badge,
  badgeColor   = Colors.primary,
  rightContent,
  bottomContent,
  glowing      = true,
  style,
}: HeroCardProps) {
  return (
    <GoldGlow active={glowing} intensity="low">
      <LinearGradient
        colors={Gradients.heroCard.colors as any}
        start={Gradients.heroCard.start}
        end={Gradients.heroCard.end}
        style={[styles.container, style]}
      >
        {/* Header Row */}
        <View style={styles.header}>
          <Row align="center" gap={Spacing[2]} flex={1}>
            {icon && (
              <View style={styles.iconWrap}>
                <AppIcon name={icon} size={20} color={Colors.primary} />
              </View>
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              {subtitle && (
                <Text style={styles.subtitle} numberOfLines={1}>
                  {subtitle}
                </Text>
              )}
            </View>
          </Row>

          {badge && (
            <View style={[
              styles.badge,
              { backgroundColor: `${badgeColor}22`, borderColor: badgeColor },
            ]}>
              <Text style={[styles.badgeText, { color: badgeColor }]}>
                {badge}
              </Text>
            </View>
          )}

          {rightContent}
        </View>

        {children && (
          <View style={styles.body}>{children}</View>
        )}

        {bottomContent && (
          <View style={styles.footer}>{bottomContent}</View>
        )}
      </LinearGradient>
    </GoldGlow>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.cardLg,
    borderWidth:  1,
    borderColor:  Colors.borderGold,
    overflow:     'hidden',
    padding:      Spacing[4],
    ...Shadows.goldSm,
  },
  header: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
    gap:            Spacing[2],
  },
  iconWrap: {
    width:           36,
    height:          36,
    borderRadius:    10,
    backgroundColor: Colors.primaryGlowDim,
    alignItems:      'center',
    justifyContent:  'center',
    borderWidth:     1,
    borderColor:     Colors.borderGold,
  },
  title: {
    ...Typography.titleSmall,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.caption,
    color:     Colors.textSecondary,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: Spacing[2],
    paddingVertical:   Spacing[0.5],
    borderRadius:      Radius.badge,
    borderWidth:       1,
  },
  badgeText: {
    ...Typography.labelSmall,
    fontWeight: '700',
  },
  body: {
    marginTop: Spacing[4],
  },
  footer: {
    marginTop:      Spacing[3],
    paddingTop:     Spacing[3],
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
  },
});
