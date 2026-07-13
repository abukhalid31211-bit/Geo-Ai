import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from './useAuth';
import { useSnackbar } from '@components/ui/feedback';
import type { RootStackParamList } from '@navigation/types';

type GateNavProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Gates a feature behind the user's subscription plan.
 * On denial, surfaces a snackbar with an "upgrade" action that opens the
 * paywall pre-scoped to the feature that was blocked.
 */
export function useFeatureGate() {
  const navigation      = useNavigation<GateNavProp>();
  const { canAccess }   = useAuth();
  const { show }        = useSnackbar();

  const gate = useCallback((feature: string, featureLabel?: string): boolean => {
    if (canAccess(feature)) return true;

    show({
      message: `${featureLabel ?? 'هذه الميزة'} متاحة فقط في الباقة الاحترافية`,
      type:    'warning',
      action: {
        label:   'الترقية',
        onPress: () => navigation.navigate('Paywall', { feature }),
      },
    });

    return false;
  }, [canAccess, navigation, show]);

  return { gate, canAccess };
}
