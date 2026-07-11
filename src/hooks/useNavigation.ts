import { useNavigation as useRNNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type RootNavProp = NativeStackNavigationProp<RootStackParamList>;

export function useAppNavigation() {
  const navigation = useRNNavigation<RootNavProp>();

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  const openPaywall = useCallback((feature: string) => {
    navigation.navigate('Paywall', { feature });
  }, [navigation]);

  return {
    navigation,
    goBack,
    openPaywall,
  };
}
