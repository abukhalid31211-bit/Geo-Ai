import React, { useCallback } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation/types';
import { PaywallModal } from '@components/auth';

type PaywallRouteProp = RouteProp<RootStackParamList, 'Paywall'>;
type PaywallNavProp   = NativeStackNavigationProp<RootStackParamList, 'Paywall'>;

/**
 * Screen wrapper so `Paywall` can be pushed as a normal modal route
 * (e.g. from a deep link `samgold://paywall/threed_viewer`), reusing the
 * same `PaywallModal` UI shown inline by `useFeatureGate`.
 */
export default function PaywallScreen() {
  const navigation = useNavigation<PaywallNavProp>();
  const route       = useRoute<PaywallRouteProp>();

  const handleDismiss = useCallback(() => {
    if (navigation.canGoBack()) navigation.goBack();
  }, [navigation]);

  return (
    <PaywallModal
      visible={true}
      onDismiss={handleDismiss}
      feature={route.params?.feature}
    />
  );
}
