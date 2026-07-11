export const GPR_DEFAULTS = {
  frequency: 400,
  velocity: 0.1,
  timeWindow: 100,
  samplesPerTrace: 512,
  dielectricConstant: 6,
} as const;

export const GPR_FILTERS = {
  backgroundRemoval: false,
  gainControl: 1.0,
  bandpassMin: 0,
  bandpassMax: 0,
  sensitivity: 1.0,
} as const;

export const GPR_FILE_EXTENSIONS = ['dzt', 'rd3'] as const;
