export const DETECTOR_CONFIG = {
  minConfidence: 0.3,
  maxDepth: 50,
  minDepth: 0.5,
  scanInterval: 100,
  smoothingWindow: 5,
} as const;

export const TARGET_COLORS = {
  gold: '#F5A623',
  void: '#42A5F5',
  water: '#26C6DA',
  pipe: '#EF5350',
  metal: '#9CA3AF',
  unknown: '#AB47BC',
} as const;

export const TARGET_LABELS_AR = {
  gold: 'ذهب',
  void: 'فراغ',
  water: 'ماء',
  pipe: 'أنبوب',
  metal: 'معدن',
  unknown: 'غير معروف',
} as const;
