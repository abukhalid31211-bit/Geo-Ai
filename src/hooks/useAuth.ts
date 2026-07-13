import { useCallback, useMemo } from 'react';
import { useAuthStore } from '@store/authStore';

export function useAuth() {
  const store = useAuthStore();

  const login = useCallback(
    (email: string, password: string) => store.login(email, password),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const loginWithGoogle = useCallback(
    () => store.loginWithGoogle(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const register = useCallback(
    (name: string, email: string, password: string) => store.register(name, email, password),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const logout = useCallback(
    () => store.logout(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const requiresPro = useCallback(
    (feature: string) => !store.canAccess(feature),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store.user?.subscription],
  );

  const plan = store.user?.subscription ?? 'free';

  const initials = useMemo(() => {
    const name = store.user?.name?.trim();
    if (!name) return '؟';
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
    return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
  }, [store.user?.name]);

  return {
    user:             store.user,
    token:            store.token,
    isAuthenticated:  store.isAuthenticated,
    isLoading:        store.isLoading,
    isInitializing:   store.isInitializing,
    error:            store.error,

    // Computed convenience fields
    isProOrAbove: plan === 'pro' || plan === 'enterprise',
    isEnterprise: plan === 'enterprise',
    isFree:       plan === 'free',
    displayName:  store.user?.name ?? 'ضيف',
    initials,
    requiresPro,

    // Actions
    initialize:          store.initialize,
    login,
    loginWithGoogle,
    register,
    logout,
    updateUser:          store.updateUser,
    upgradeSubscription: store.upgradeSubscription,
    refreshSession:      store.refreshSession,
    canAccess:           store.canAccess,
    getMaxProjects:      store.getMaxProjects,
    clearError:          store.clearError,
    setLoading:          store.setLoading,
  };
}
