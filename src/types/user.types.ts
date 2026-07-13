export type SubscriptionPlan = 'free' | 'pro' | 'enterprise';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  organization?: string;
  createdAt: string;
  subscription: SubscriptionPlan;
  /** ISO date string — when the current paid plan expires. Absent for `free`. */
  subscriptionExpiresAt?: string;
  /** Whether the user opted in to biometric unlock on this device. */
  biometricEnabled?: boolean;
}

// ── Plan feature matrix ─────────────────────────────────────────
// Single source of truth for what each plan unlocks + its project cap.
// Feature flags mirror SUBSCRIPTION_FEATURES in `@constants/app.constants`.
export interface PlanFeatureSet {
  label:       string;
  maxProjects: number; // Infinity = unlimited
  features:    readonly string[];
}

export const PLAN_FEATURES: Record<SubscriptionPlan, PlanFeatureSet> = {
  free: {
    label:       'المجاني',
    maxProjects: 3,
    features: [
      'basic_gpr',
      'topographic_basic',
      'projects_3_max',
      'reports_basic',
    ],
  },
  pro: {
    label:       'الاحترافي',
    maxProjects: 20,
    features: [
      'basic_gpr',
      'advanced_gpr',
      'topographic_full',
      'ert_full',
      'smart_detector',
      'threed_viewer',
      'reports_pdf',
      'projects_20_max',
      'ai_analysis',
    ],
  },
  enterprise: {
    label:       'المؤسسي',
    maxProjects: Infinity,
    features: [
      'all_features',
      'api_access',
      'team_10_max',
      'priority_support',
      'custom_reports',
    ],
  },
} as const;
