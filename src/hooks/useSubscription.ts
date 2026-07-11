import { useSubscriptionStore } from '@store/subscriptionStore';

export function useSubscription() {
  const { subscription, isLoading, error, setSubscription, cancelSubscription, clearError } =
    useSubscriptionStore();

  return {
    subscription,
    isLoading,
    error,
    setSubscription,
    cancelSubscription,
    clearError,
  };
}
