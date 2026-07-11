import { Platform } from 'react-native';

const createShadow = (
  elevation: number,
  color: string = '#000',
  opacity: number = 0.3
) => Platform.select({
  android: { elevation },
  ios: {
    shadowColor: color,
    shadowOffset: { width: 0, height: elevation * 0.5 },
    shadowOpacity: opacity,
    shadowRadius: elevation * 0.8,
  },
  default: { elevation },
});

export const Shadows = {
  none: {},
  sm: createShadow(2),
  md: createShadow(4),
  lg: createShadow(8),
  xl: createShadow(16),
  // Gold glow shadows
  goldSm: {
    ...createShadow(4, '#F5A623', 0.25),
  },
  goldMd: {
    ...createShadow(8, '#F5A623', 0.35),
  },
  goldLg: {
    ...createShadow(16, '#F5A623', 0.4),
  },
  // Colored shadows for status
  success: {
    ...createShadow(6, '#22C55E', 0.3),
  },
  danger: {
    ...createShadow(6, '#EF4444', 0.3),
  },
  info: {
    ...createShadow(6, '#06B6D4', 0.3),
  },
} as const;

// Glow effect (used as border/background overlay)
export const GlowEffects = {
  goldBorder: {
    borderWidth: 1,
    borderColor: 'rgba(245, 166, 35, 0.4)',
  },
  goldBorderStrong: {
    borderWidth: 1.5,
    borderColor: 'rgba(245, 166, 35, 0.7)',
  },
  cyanBorder: {
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.4)',
  },
  purpleBorder: {
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
} as const;
