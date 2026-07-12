import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@constants/app.constants';
import type { User } from '@apptypes/user.types';

interface AuthState {
  // State
  user:            User | null;
  token:           string | null;
  isAuthenticated: boolean;
  isLoading:       boolean;
  error:           string | null;

  // Actions
  login:           (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout:          () => Promise<void>;
  register:        (name: string, email: string, password: string) => Promise<void>;
  updateUser:      (updates: Partial<User>) => void;
  clearError:      () => void;
  setLoading:      (loading: boolean) => void;
}

// Demo login — accepts any valid email + password (min 6 chars)
// In production: replace with real API call
async function mockLoginAPI(
  email: string,
  _password: string,
): Promise<{ user: User; token: string }> {
  // Simulate network delay
  await new Promise<void>(resolve => setTimeout(resolve, 1200));

  // Simulate occasional network error (2% chance)
  if (Math.random() < 0.02) {
    throw new Error('خطأ في الاتصال بالشبكة، يرجى المحاولة مجدداً');
  }

  const username = email.split('@')[0] ?? 'مستخدم';
  const user: User = {
    id:           `user_${Date.now()}`,
    name:         username.charAt(0).toUpperCase() + username.slice(1),
    email,
    subscription: 'free',
    createdAt:    new Date().toISOString(),
  };

  const token = `samgold_token_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2)}`;

  return { user, token };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user:            null,
      token:           null,
      isAuthenticated: false,
      isLoading:       false,
      error:           null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await mockLoginAPI(email, password);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading:       false,
            error:           null,
          });
          return true;
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : 'حدث خطأ غير متوقع';
          set({ isLoading: false, error: message });
          return false;
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          await new Promise<void>(resolve => setTimeout(resolve, 1500));
          const user: User = {
            id:           `google_user_${Date.now()}`,
            name:         'مستخدم Google',
            email:        'user@gmail.com',
            subscription: 'free',
            createdAt:    new Date().toISOString(),
          };
          const token = `google_token_${Date.now()}`;
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading:       false,
          });
          return true;
        } catch {
          set({ isLoading: false, error: 'فشل تسجيل الدخول عبر Google' });
          return false;
        }
      },

      logout: async () => {
        set({
          user:            null,
          token:           null,
          isAuthenticated: false,
          error:           null,
        });
      },

      register: async (_name, _email, _password) => {
        // Will be implemented in Prompt #11
        set({ isLoading: true, error: null });
        await new Promise<void>(resolve => setTimeout(resolve, 1000));
        set({ isLoading: false });
      },

      updateUser: (updates) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...updates } });
      },

      clearError: () => set({ error: null }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name:    STORAGE_KEYS.AUTH_USER,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user:            state.user,
        token:           state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
