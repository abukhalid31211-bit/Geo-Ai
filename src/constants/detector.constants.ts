export const DETECTOR_CONFIG = {
  // Proximity zones (meters from anomaly center)
  ZONES: {
    SILENT:   10,    // > 10m — no feedback
    DISTANT:   8,    // 8-10m — very subtle
    FAR:       5,    // 5-8m — gentle
    NEAR:      3,    // 3-5m — moderate
    CLOSE:     1,    // 1-3m — strong
    CENTER:  0.5,    // < 0.5m — maximum
  },

  // Haptic intervals per zone (ms)
  HAPTIC_INTERVALS: {
    SILENT:   0,
    DISTANT:  3000,
    FAR:      2000,
    NEAR:     1000,
    CLOSE:    400,
    CENTER:   150,
  },

  // Audio pitch per zone (0-1)
  AUDIO_PITCH: {
    SILENT:   0,
    DISTANT:  0.2,
    FAR:      0.4,
    NEAR:     0.6,
    CLOSE:    0.8,
    CENTER:   1.0,
  },

  // AI confidence thresholds
  CONFIDENCE: {
    LOW:       0.4,   // < 40% — questionable
    MEDIUM:    0.6,   // 40-60% — possible
    HIGH:      0.75,  // 60-75% — probable
    VERY_HIGH: 0.9,   // > 90% — very likely
  },

  // Depth calculation
  EM_VELOCITY_SOIL:    0.10,   // m/ns dry sand
  EM_VELOCITY_WET:     0.06,   // m/ns wet clay
  EM_VELOCITY_ROCK:    0.13,   // m/ns limestone

  // Heatmap grid
  GRID_SIZE:  50,  // 50x50 cells
  GRID_ALPHA: 0.8,
} as const;
