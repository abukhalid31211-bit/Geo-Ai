import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Subscription } from '@apptypes/subscription.types';

interface SubscriptionState {
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
  setSubscription: (sub: Subscription) => void;
  cancelSubscription: () => void;
  clearError: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      subscription: null,
      isLoading: false,
      error: null,
      setSubscription: (sub: Subscription) => set({ subscription: sub }),
      cancelSubscription: () =>
        set((state) => ({
          subscription: state.subscription
            ? { ...state.subscription, status: 'cancelled' }
            : null,
        })),
      clearError: () => set({ error: null }),
    }),
    {
      name: '@samgold/subscription_store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
