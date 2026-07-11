export const APP_NAME = 'SAMGOLD';
export const APP_VERSION = '1.0.0';

export const STORAGE_KEYS = {
  AUTH_USER: '@samgold/auth_user',
  AUTH_TOKEN: '@samgold/auth_token',
  PROJECTS: '@samgold/projects',
  SETTINGS: '@samgold/settings',
  SUBSCRIPTION: '@samgold/subscription',
  SCAN_HISTORY: '@samgold/scan_history',
  ONBOARDING_DONE: '@samgold/onboarding_done',
} as const;

export const SUBSCRIPTION_FEATURES = {
  free: [
    'basic_gpr',
    'topographic_basic',
    'projects_3_max',
    'reports_basic',
  ],
  pro: [
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
  enterprise: [
    'all_features',
    'api_access',
    'team_10_max',
    'priority_support',
    'custom_reports',
  ],
} as const;

export const SUPPORTED_FILE_TYPES = {
  gpr: ['dzt', 'rd3'],
  topographic: ['csv', 'txt', 'dxf'],
  ert: ['csv', 'txt'],
} as const;
