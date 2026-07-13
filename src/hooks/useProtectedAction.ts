import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from './useAuth';
import type { RootStackParamList } from '@navigation/types';

type ProtectedNavProp = NativeStackNavigationProp<RootStackParamList>;

interface ProtectedActionOptions {
  /** Feature flag required to run the action (checked via `canAccess`). */
  feature?: string;
  /** Human label used in the paywall context, e.g. "العرض ثلاثي الأبعاد". */
  featureLabel?: string;
}

/**
 * Wraps an action so it only runs when the user is both authenticated
 * and allowed to access the given feature — redirecting to Login or the
 * Paywall as needed instead of running the action.
 */
export function useProtectedAction() {
  const navigation = useNavigation<ProtectedNavProp>();
  const { isAuthenticated, canAccess } = useAuth();

  const run = useCallback((
    action: () => void,
    options: ProtectedActionOptions = {},
  ) => {
    if (!isAuthenticated) {
      navigation.navigate('Auth', { screen: 'Login' });
      return;
    }

    if (options.feature && !canAccess(options.feature)) {
      navigation.navigate('Paywall', { feature: options.feature });
      return;
    }

    action();
  }, [isAuthenticated, canAccess, navigation]);

  return { run };
}
