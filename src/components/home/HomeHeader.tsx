import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '@theme';
import { AppHeader } from '@components/ui/layout/AppHeader';
import { Avatar }    from '@components/ui/lists/Avatar';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'صباح الخير';
  if (hour < 17) return 'مساء الخير';
  return 'مساء الخير';
}

interface HomeHeaderProps {
  userName:        string;
  userAvatar?:     string;
  userInitials:    string;
  unreadCount:     number;
  onOpenDrawer:    () => void;
  onPressBell:     () => void;
  onPressAvatar:   () => void;
}

export function HomeHeader({
  userName,
  userAvatar,
  userInitials,
  unreadCount,
  onOpenDrawer,
  onPressBell,
  onPressAvatar,
}: HomeHeaderProps) {
  return (
    <AppHeader
      title="SAMGOLD"
      leftAction={{ icon: 'menu', onPress: onOpenDrawer }}
      rightActions={[
        { icon: 'bell', onPress: onPressBell, badge: unreadCount },
      ]}
      centerSlot={
        <View style={styles.centerBlock}>
          <Text style={styles.brand} numberOfLines={1}>SAMGOLD</Text>
          <Text style={styles.greeting} numberOfLines={1}>
            {getGreeting()}، {userName}
          </Text>
        </View>
      }
      rightSlot={
        <Avatar
          size={32}
          label={userInitials}
          source={userAvatar}
          borderColor={Colors.primary}
          borderWidth={1.5}
          backgroundColor={Colors.primaryGlowDim}
          onPress={onPressAvatar}
          style={styles.avatar}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  centerBlock: {
    alignItems: 'center',
  },
  brand: {
    ...Typography.titleLarge,
    color:         Colors.primary,
    fontWeight:    '800',
    letterSpacing: 4,
  },
  greeting: {
    ...Typography.caption,
    color:     Colors.textSecondary,
    marginTop: 2,
  },
  avatar: {
    marginStart: Spacing[1],
  },
});
