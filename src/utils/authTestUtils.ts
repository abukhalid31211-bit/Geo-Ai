import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@constants/app.constants';
import { useAuthStore } from '@store/authStore';

/**
 * Manual test helpers for the auth layer — NOT imported anywhere in
 * production code. Use from a debug menu, a temporary button, or the
 * Metro/Expo console (`import { AuthTestUtils } from '@utils/authTestUtils'`)
 * to exercise edge cases that are hard to trigger by hand:
 *
 *   AuthTestUtils.expireSessionNow();   // force refreshSession/expiry flow
 *   AuthTestUtils.corruptStorage();     // force the corrupt-storage recovery path
 *   AuthTestUtils.dumpState();          // print the current persisted auth state
 */
export const AuthTestUtils = {
  /** Rewinds `sessionExpiresAt` into the past so the next `initialize()` logs the user out. */
  expireSessionNow: () => {
    useAuthStore.setState({ sessionExpiresAt: Date.now() - 1000 });
  },

  /** Extends the session by the full 30-day window again. */
  restoreSession: () => {
    useAuthStore.getState().refreshSession();
  },

  /** Writes garbage into the persisted auth key to test the corrupt-storage fallback. */
  corruptStorage: async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_USER, '{not-valid-json');
  },

  /** Clears the persisted auth key outright (simulates a fresh install). */
  wipeStorage: async () => {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  },

  /** Logs the current in-memory auth state to the console. */
  dumpState: () => {
    const state = useAuthStore.getState();
    console.log('[AuthTestUtils] current auth state:', {
      isAuthenticated:  state.isAuthenticated,
      isInitializing:   state.isInitializing,
      user:             state.user,
      sessionExpiresAt: state.sessionExpiresAt
        ? new Date(state.sessionExpiresAt).toISOString()
        : null,
    });
  },
} as const;
