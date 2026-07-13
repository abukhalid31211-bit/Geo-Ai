import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing } from '@theme';
import { AppHeader } from '@components/ui/layout/AppHeader';
import { EmptyState } from '@components/ui/states/EmptyState';
import { NotificationItem, type HomeNotification } from '@components/home';
import { useNotificationsStore } from '@store/notificationsStore';
import type { HomeStackParamList } from '@navigation/types';

type NavProp = NativeStackNavigationProp<HomeStackParamList, 'Notifications'>;

export default function NotificationsScreen() {
  const navigation    = useNavigation<NavProp>();
  const notifications = useNotificationsStore(s => s.notifications) as HomeNotification[];
  const markAsRead     = useNotificationsStore(s => s.markAsRead);
  const markAllAsRead  = useNotificationsStore(s => s.markAllAsRead);

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handlePressItem = useCallback((notification: HomeNotification) => {
    if (!notification.read) markAsRead(notification.id);
  }, [markAsRead]);

  const renderItem: ListRenderItem<HomeNotification> = useCallback(({ item }) => (
    <View style={styles.itemWrap}>
      <NotificationItem notification={item} onPress={handlePressItem} />
    </View>
  ), [handlePressItem]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <AppHeader
        title="الإشعارات"
        leftAction="back"
        onBackPress={handleBack}
        rightActions={notifications.length > 0 ? [
          { icon: 'checkCircle', onPress: markAllAsRead },
        ] : []}
      />

      {notifications.length === 0 ? (
        <EmptyState variant="notifications" />
      ) : (
        <FlashList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex:            1,
    backgroundColor: Colors.bgPrimary,
  },
  list: {
    paddingHorizontal: Spacing[4],
    paddingTop:        Spacing[2],
    paddingBottom:     Spacing[8],
  },
  itemWrap: {
    marginBottom: Spacing[2],
  },
});
