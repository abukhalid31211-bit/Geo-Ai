import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@constants/app.constants';
import type { User, SubscriptionPlan } from '@apptypes/user.types';
import { PLAN_FEATURES } from '@apptypes/user.types';

// Session token lives for 30 days before it must be refreshed / re-logged-in.
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

interface AuthState {
  // State
  user:            User | null;
  token:           string | null;
  isAuthenticated: boolean;
  isLoading:       boolean;
  /** True until the persisted session has been checked once on cold start. */
  isInitializing:  boolean;
  error:           string | null;
  /** Epoch ms — when `token` stops being valid. */
  sessionExpiresAt: number | null;

  // Actions
  initialize:        () => Promise<void>;
  login:              (email: string, password: string) => Promise<boolean>;
  loginWithGoogle:    () => Promise<boolean>;
  register:           (name: string, email: string, password: string) => Promise<boolean>;
  logout:             () => Promise<void>;
  updateUser:         (updates: Partial<User>) => void;
  upgradeSubscription: (plan: SubscriptionPlan) => void;
  refreshSession:     () => void;
  canAccess:          (feature: string) => boolean;
  getMaxProjects:     () => number;
  clearError:         () => void;
  setLoading:         (loading: boolean) => void;
}

// ── Mock backend (demo only — replace with real API calls) ──────
async function mockLoginAPI(
  email: string,
  _password: string,
): Promise<{ user: User; token: string }> {
  await new Promise<void>(resolve => setTimeout(resolve, 1200));

  // Simulate an occasional network error (2% chance)
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

  const token = `samgold_token_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  return { user, token };
}

async function mockRegisterAPI(
  name: string,
  email: string,
  _password: string,
): Promise<{ user: User; token: string }> {
  await new Promise<void>(resolve => setTimeout(resolve, 1400));

  const user: User = {
    id:           `user_${Date.now()}`,
    name,
    email,
    subscription: 'free',
    createdAt:    new Date().toISOString(),
  };

  const token = `samgold_token_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  return { user, token };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user:             null,
      token:            null,
      isAuthenticated:  false,
      isLoading:        false,
      isInitializing:   true,
      error:            null,
      sessionExpiresAt: null,

      // ── Cold-start check — validates the rehydrated session ──────
      initialize: async () => {
        try {
          const { token, sessionExpiresAt } = get();

          if (token && sessionExpiresAt && Date.now() > sessionExpiresAt) {
            // Session expired while the app was closed — force re-login
            set({
              user:             null,
              token:            null,
              isAuthenticated:  false,
              sessionExpiresAt: null,
            });
          }
        } catch {
          // Corrupt storage — fail safe by resetting to a logged-out state
          set({
            user:             null,
            token:            null,
            isAuthenticated:  false,
            sessionExpiresAt: null,
          });
        } finally {
          set({ isInitializing: false });
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await mockLoginAPI(email, password);
          set({
            user,
            token,
            isAuthenticated:  true,
            isLoading:        false,
            error:            null,
            sessionExpiresAt: Date.now() + SESSION_DURATION_MS,
          });
          return true;
        } catch (err) {
          const message = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
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
            isAuthenticated:  true,
            isLoading:        false,
            sessionExpiresAt: Date.now() + SESSION_DURATION_MS,
          });
          return true;
        } catch {
          set({ isLoading: false, error: 'فشل تسجيل الدخول عبر Google' });
          return false;
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const { user, token } = await mockRegisterAPI(name, email, password);
          set({
            user,
            token,
            isAuthenticated:  true,
            isLoading:        false,
            error:            null,
            sessionExpiresAt: Date.now() + SESSION_DURATION_MS,
          });
          return true;
        } catch (err) {
          const message = err instanceof Error ? err.message : 'تعذّر إنشاء الحساب';
          set({ isLoading: false, error: message });
          return false;
        }
      },

      logout: async () => {
        set({
          user:             null,
          token:            null,
          isAuthenticated:  false,
          error:            null,
          sessionExpiresAt: null,
        });
      },

      updateUser: (updates) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...updates } });
      },

      upgradeSubscription: (plan) => {
        const current = get().user;
        if (!current) return;
        const expiresAt =
          plan === 'free'
            ? undefined
            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        set({
          user: {
            ...current,
            subscription:          plan,
            subscriptionExpiresAt: expiresAt,
          },
        });
      },

      refreshSession: () => {
        const { token } = get();
        if (!token) return;
        set({ sessionExpiresAt: Date.now() + SESSION_DURATION_MS });
      },

      canAccess: (feature) => {
        const plan = get().user?.subscription ?? 'free';
        const set_ = PLAN_FEATURES[plan]?.features ?? [];
        return set_.includes('all_features') || set_.includes(feature);
      },

      getMaxProjects: () => {
        const plan = get().user?.subscription ?? 'free';
        return PLAN_FEATURES[plan]?.maxProjects ?? 0;
      },

      clearError: () => set({ error: null }),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name:    STORAGE_KEYS.AUTH_USER,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user:             state.user,
        token:            state.token,
        isAuthenticated:  state.isAuthenticated,
        sessionExpiresAt: state.sessionExpiresAt,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          // Corrupt persisted blob — reset to a clean logged-out state
          state?.logout?.();
        }
        // Kick off the post-rehydration validity check either way
        void state?.initialize?.();
      },
    },
  ),
);
