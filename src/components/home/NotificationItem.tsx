import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, BorderRadius } from '@theme';
import { ListCard } from '@components/ui/cards/ListCard';
import { AppIcon, AppIconName } from '@components/ui/icons/AppIcon';

export type HomeNotificationType = 'scan' | 'project' | 'report' | 'system';

export interface HomeNotification {
  id:        string;
  title:     string;
  body:      string;
  type?:     HomeNotificationType;
  read:      boolean;
  createdAt: string;
}

const TYPE_ICON: Record<HomeNotificationType, AppIconName> = {
  scan:    'radar',
  project: 'folder',
  report:  'report',
  system:  'info',
};

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'الآن';
  if (minutes < 60) return `منذ ${minutes} د`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `منذ ${hours} س`;
  const days = Math.floor(hours / 24);
  return `منذ ${days} يوم`;
}

interface NotificationItemProps {
  notification: HomeNotification;
  onPress?:     (notification: HomeNotification) => void;
}

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  return (
    <ListCard
      title={notification.title}
      subtitle={`${notification.body} · ${timeAgo(notification.createdAt)}`}
      leftIcon={TYPE_ICON[notification.type ?? 'system']}
      leftIconColor={notification.read ? Colors.textSecondary : Colors.primary}
      onPress={onPress ? () => onPress(notification) : undefined}
      showChevron={false}
      rightContent={
        !notification.read ? <View style={styles.dot} /> : undefined
      }
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    width:           8,
    height:          8,
    borderRadius:    BorderRadius.full,
    backgroundColor: Colors.primary,
  },
});
