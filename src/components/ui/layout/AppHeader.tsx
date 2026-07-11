import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Colors, Typography, Spacing, Layout } from '@theme';
import { AppIcon, AppIconName } from '../icons/AppIcon';

interface HeaderAction {
  icon: AppIconName;
  onPress: () => void;
  badge?: number;
  color?: string;
}

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  leftAction?: HeaderAction | 'back';
  rightActions?: HeaderAction[];
  transparent?: boolean;
  blur?: boolean;
  onBackPress?: () => void;
}

export function AppHeader({
  title,
  subtitle,
  leftAction,
  rightActions = [],
  transparent = false,
  blur = false,
  onBackPress,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  const headerContent = (
    <View style={[
      styles.container,
      { paddingTop: insets.top || Spacing[3] },
      transparent && styles.transparent,
    ]}>

      {/* Left Action */}
      <View style={styles.leftContainer}>
        {leftAction === 'back' ? (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <AppIcon
              name="chevronLeft"
              size={24}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
        ) : leftAction ? (
          <TouchableOpacity
            onPress={leftAction.onPress}
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <AppIcon
              name={leftAction.icon}
              size={24}
              color={leftAction.color || Colors.textPrimary}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.logoMark}>
            <Text style={styles.logoText}>S</Text>
          </View>
        )}
      </View>

      {/* Center — Title */}
      <View style={styles.centerContainer}>
        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>

      {/* Right Actions */}
      <View style={styles.rightContainer}>
        {rightActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={action.onPress}
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <AppIcon
              name={action.icon}
              size={22}
              color={action.color || Colors.textPrimary}
            />
            {action.badge !== undefined && action.badge > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {action.badge > 9 ? '9+' : action.badge}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (blur) {
    return (
      <BlurView
        intensity={80}
        style={styles.blurWrapper}
        tint="dark"
      >
        {headerContent}
      </BlurView>
    );
  }

  return headerContent;
}

const styles = StyleSheet.create({
  blurWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[3],
    paddingBottom: Spacing[3],
    backgroundColor: Colors.bgPrimary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
    minHeight: Layout.headerHeight,
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  leftContainer: {
    width: 44,
    alignItems: 'flex-start',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing[2],
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[1],
    minWidth: 44,
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  title: {
    ...Typography.titleMedium,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  logoMark: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    ...Typography.titleSmall,
    color: Colors.textInverse,
    fontWeight: '800',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
});
