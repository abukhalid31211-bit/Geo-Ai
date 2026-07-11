export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  organization?: string;
  createdAt: string;
  subscription: SubscriptionPlan;
}

export type SubscriptionPlan = 'free' | 'pro' | 'enterprise';
