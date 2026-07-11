import { ViewStyle, TextStyle } from 'react-native';
import {
  Colors,
  Spacing,
  Radius,
  Typography,
  Shadows,
  GlowEffects,
} from '@theme';

// ── Common style mixins ───────────────────────────────────────
export const StyleMixins = {
  // Card styles
  card: {
    level0: {
      backgroundColor: Colors.surfacePrimary,
      borderRadius: Radius.cardMd,
      padding: Spacing[4],
    } as ViewStyle,

    level1: {
      backgroundColor: Colors.surfaceSecondary,
      borderRadius: Radius.cardMd,
      padding: Spacing[4],
      ...Shadows.sm,
    } as ViewStyle,

    level2: {
      backgroundColor: Colors.surfaceElevated,
      borderRadius: Radius.cardLg,
      padding: Spacing[4],
      borderWidth: 1,
      borderColor: Colors.borderDefault,
      ...Shadows.md,
    } as ViewStyle,

    level3: {
      backgroundColor: Colors.surfaceElevated,
      borderRadius: Radius.cardLg,
      padding: Spacing[4],
      borderWidth: 1,
      borderColor: Colors.borderGold,
      ...Shadows.goldMd,
    } as ViewStyle,
  },

  // Row with space-between
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,

  // Center content
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,

  // Full width
  fullWidth: {
    width: '100%',
  } as ViewStyle,

  // Fill parent
  flex1: {
    flex: 1,
  } as ViewStyle,

  // Screen container
  screen: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  } as ViewStyle,

  // Section padding
  section: {
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[5],
  } as ViewStyle,

  // Absolute fill
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  } as ViewStyle,

  // Input container
  inputContainer: {
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.input,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    paddingHorizontal: Spacing[4],
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,

  // Divider
  divider: {
    height: 1,
    backgroundColor: Colors.borderDefault,
    marginVertical: Spacing[3],
  } as ViewStyle,

  // Gold border highlight
  goldBorder: {
    borderWidth: 1,
    borderColor: Colors.borderGold,
  } as ViewStyle,

  // Hidden (but keeps space)
  invisible: {
    opacity: 0,
  } as ViewStyle,
} as const;

// ── Text style helpers ────────────────────────────────────────
export const TextStyles = {
  primary: {
    color: Colors.textPrimary,
  } as TextStyle,

  secondary: {
    color: Colors.textSecondary,
  } as TextStyle,

  accent: {
    color: Colors.primary,
  } as TextStyle,

  disabled: {
    color: Colors.textDisabled,
  } as TextStyle,

  success: {
    color: Colors.success,
  } as TextStyle,

  danger: {
    color: Colors.danger,
  } as TextStyle,

  warning: {
    color: Colors.warning,
  } as TextStyle,

  info: {
    color: Colors.info,
  } as TextStyle,

  center: {
    textAlign: 'center' as const,
  } as TextStyle,

  right: {
    textAlign: 'right' as const,
  } as TextStyle,

  left: {
    textAlign: 'left' as const,
  } as TextStyle,
} as const;

// Suppress unused import warnings — these are re-exported for consumers
export { Typography, GlowEffects };
