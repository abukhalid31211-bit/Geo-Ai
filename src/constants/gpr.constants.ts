export const GPR_CONFIG = {
  // Signal processing defaults
  DEFAULT_VELOCITY:       0.1,      // m/ns in soil
  DEFAULT_FREQUENCY:      400,      // MHz
  DEFAULT_TIME_WINDOW:    100,      // ns
  DEFAULT_GAIN:           0,        // dB
  DEFAULT_BANDPASS_MIN:   100,      // MHz
  DEFAULT_BANDPASS_MAX:   900,      // MHz
  DEFAULT_SENSITIVITY:    0.65,     // 65%

  // Hyperbola detection
  MIN_HYPERBOLA_WIDTH:    3,        // traces
  MIN_HYPERBOLA_DEPTH:    5,        // samples
  CONFIDENCE_THRESHOLD:   0.6,      // 60%

  // Display
  COLOR_PALETTE: [
    '#000033', '#000066', '#0000CC',
    '#0066CC', '#00CCCC', '#00CC66',
    '#CCCC00', '#CC6600', '#CC0000',
    '#FFFFFF',
  ],
  SAMPLES_PER_DISPLAY:    512,
  MAX_DISPLAY_TRACES:     1000,
} as const;
