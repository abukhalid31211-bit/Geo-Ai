import { Easing } from 'react-native-reanimated';

export const Duration = {
  instant:  50,
  fast:     150,
  normal:   250,
  slow:     350,
  slower:   500,
  slowest:  800,
  long:     1000,
} as const;

export const AnimationPresets = {
  // Screen transitions
  screenFade: {
    duration: Duration.normal,
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  },
  screenSlide: {
    duration: Duration.slow,
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  },
  // Element animations
  cardAppear: {
    duration: Duration.slow,
    easing: Easing.out(Easing.back(1.2)),
  },
  fadeIn: {
    duration: Duration.normal,
    easing: Easing.out(Easing.ease),
  },
  scaleIn: {
    duration: Duration.normal,
    easing: Easing.out(Easing.back(1.5)),
  },
  // Bottom sheet
  sheetUp: {
    duration: Duration.slow,
    easing: Easing.bezier(0.2, 0, 0, 1),
  },
  sheetDown: {
    duration: Duration.normal,
    easing: Easing.bezier(0.4, 0, 1, 1),
  },
  // Button press
  buttonPress: {
    duration: Duration.fast,
    easing: Easing.out(Easing.ease),
  },
  // Detector pulse
  detectorPulse: {
    duration: Duration.long,
    easing: Easing.inOut(Easing.sin),
  },
  // Loading spin
  spin: {
    duration: 1200,
    easing: Easing.linear,
  },
  // Ripple
  ripple: {
    duration: Duration.slower,
    easing: Easing.out(Easing.ease),
  },
} as const;

// Reanimated spring configs
export const Springs = {
  default: {
    damping: 20,
    stiffness: 300,
    mass: 1,
  },
  bouncy: {
    damping: 10,
    stiffness: 400,
    mass: 0.8,
  },
  gentle: {
    damping: 30,
    stiffness: 200,
    mass: 1.2,
  },
  snappy: {
    damping: 25,
    stiffness: 500,
    mass: 0.7,
  },
} as const;

// Haptic feedback map
export const HapticFeedback = {
  light:    'light',
  medium:   'medium',
  heavy:    'heavy',
  success:  'notificationSuccess',
  warning:  'notificationWarning',
  error:    'notificationError',
} as const;
