import { useCallback } from 'react';
import { useAuthStore } from '@store/authStore';

export function useAuth() {
  const store = useAuthStore();

  const login = useCallback(
    (email: string, password: string) => store.login(email, password),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const logout = useCallback(
    () => store.logout(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const loginWithGoogle = useCallback(
    () => store.loginWithGoogle(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    user:            store.user,
    token:           store.token,
    isAuthenticated: store.isAuthenticated,
    isLoading:       store.isLoading,
    error:           store.error,
    login,
    loginWithGoogle,
    logout,
    register:        store.register,
    updateUser:      store.updateUser,
    clearError:      store.clearError,
    setLoading:      store.setLoading,
  };
}
