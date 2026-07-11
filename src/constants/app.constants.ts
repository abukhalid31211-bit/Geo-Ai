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

// Target types for display
export const TARGET_TYPE_LABELS = {
  gold:    'ذهب',
  void:    'فراغ صناعي',
  water:   'مياه جوفية',
  pipe:    'أنابيب',
  metal:   'معدن',
  unknown: 'غير محدد',
} as const;

export const TARGET_TYPE_ICONS = {
  gold:    '🥇',
  void:    '🕳️',
  water:   '💧',
  pipe:    '🔧',
  metal:   '⚙️',
  unknown: '❓',
} as const;

// Project type labels
export const PROJECT_TYPE_LABELS = {
  gpr:          'رادار أرضي GPR',
  ert:          'مقاومة كهربائية ERT',
  topographic:  'مسح طبوغرافي',
  combined:     'مسح مدمج',
} as const;

// Project status labels
export const PROJECT_STATUS_LABELS = {
  active:    'نشط',
  completed: 'مكتمل',
  archived:  'مؤرشف',
} as const;

// Subscription plan labels
export const PLAN_LABELS = {
  free:       'المجاني',
  pro:        'الاحترافي',
  enterprise: 'المؤسسي',
} as const;
