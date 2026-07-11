import { useAuthStore } from '@store/authStore';

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, error, login, register, logout, updateUser, clearError } =
    useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateUser,
    clearError,
  };
}
