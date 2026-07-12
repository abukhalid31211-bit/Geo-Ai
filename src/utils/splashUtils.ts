import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@constants/app.constants';

export const SplashUtils = {
  /** Returns true if the user has already completed onboarding. */
  hasSeenOnboarding: async (): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_DONE);
      return value === 'true';
    } catch {
      return false;
    }
  },

  /** Persists the onboarding-complete flag. */
  markOnboardingDone: async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_DONE, 'true');
    } catch {
      /* swallow — non-critical */
    }
  },

  /** Returns true if a non-empty auth token is stored. */
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      return token !== null && token.length > 0;
    } catch {
      return false;
    }
  },

  /** Returns the raw stored user JSON string, or null. */
  getStoredUser: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_USER);
    } catch {
      return null;
    }
  },
} as const;
