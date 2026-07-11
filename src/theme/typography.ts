import { Platform } from 'react-native';

// Font families
export const FontFamily = {
  // Arabic/Display
  regular:    Platform.select({
                android: 'Cairo-Regular',
                default: 'System'
              }),
  medium:     Platform.select({
                android: 'Cairo-Medium',
                default: 'System'
              }),
  semiBold:   Platform.select({
                android: 'Cairo-SemiBold',
                default: 'System'
              }),
  bold:       Platform.select({
                android: 'Cairo-Bold',
                default: 'System'
              }),
  // Monospace (for data values)
  mono:       Platform.select({
                android: 'SpaceMono-Regular',
                default: 'Courier New'
              }),
  monoBold:   Platform.select({
                android: 'SpaceMono-Bold',
                default: 'Courier New'
              }),
} as const;

// Font sizes
export const FontSize = {
  xs:     11,
  sm:     12,
  base:   14,
  md:     16,
  lg:     18,
  xl:     20,
  '2xl':  22,
  '3xl':  26,
  '4xl':  32,
  '5xl':  40,
} as const;

// Line heights
export const LineHeight = {
  tight:    1.2,
  snug:     1.35,
  normal:   1.5,
  relaxed:  1.65,
  loose:    2.0,
} as const;

// Font weights (as strings for RN)
export const FontWeight = {
  regular:  '400' as const,
  medium:   '500' as const,
  semiBold: '600' as const,
  bold:     '700' as const,
  extraBold:'800' as const,
} as const;

// Letter spacing
export const LetterSpacing = {
  tight:    -0.5,
  normal:   0,
  wide:     0.5,
  wider:    1,
  widest:   2,
} as const;

// Type Scale — semantic tokens
export const Typography = {
  // Display
  displayLarge: {
    fontSize:     FontSize['4xl'],
    fontWeight:   FontWeight.bold,
    lineHeight:   FontSize['4xl'] * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
  },
  displayMedium: {
    fontSize:     FontSize['3xl'],
    fontWeight:   FontWeight.semiBold,
    lineHeight:   FontSize['3xl'] * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
  },
  displaySmall: {
    fontSize:     FontSize['2xl'],
    fontWeight:   FontWeight.semiBold,
    lineHeight:   FontSize['2xl'] * LineHeight.snug,
    letterSpacing: LetterSpacing.normal,
  },
  // Titles
  titleLarge: {
    fontSize:     FontSize.xl,
    fontWeight:   FontWeight.semiBold,
    lineHeight:   FontSize.xl * LineHeight.snug,
    letterSpacing: LetterSpacing.normal,
  },
  titleMedium: {
    fontSize:     FontSize.lg,
    fontWeight:   FontWeight.medium,
    lineHeight:   FontSize.lg * LineHeight.snug,
    letterSpacing: LetterSpacing.normal,
  },
  titleSmall: {
    fontSize:     FontSize.md,
    fontWeight:   FontWeight.medium,
    lineHeight:   FontSize.md * LineHeight.snug,
    letterSpacing: LetterSpacing.normal,
  },
  // Body
  bodyLarge: {
    fontSize:     FontSize.md,
    fontWeight:   FontWeight.regular,
    lineHeight:   FontSize.md * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },
  bodyMedium: {
    fontSize:     FontSize.base,
    fontWeight:   FontWeight.regular,
    lineHeight:   FontSize.base * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },
  bodySmall: {
    fontSize:     FontSize.sm,
    fontWeight:   FontWeight.regular,
    lineHeight:   FontSize.sm * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },
  // Labels
  labelLarge: {
    fontSize:     FontSize.base,
    fontWeight:   FontWeight.medium,
    lineHeight:   FontSize.base * LineHeight.snug,
    letterSpacing: LetterSpacing.wide,
  },
  labelMedium: {
    fontSize:     FontSize.sm,
    fontWeight:   FontWeight.medium,
    lineHeight:   FontSize.sm * LineHeight.snug,
    letterSpacing: LetterSpacing.wide,
  },
  labelSmall: {
    fontSize:     FontSize.xs,
    fontWeight:   FontWeight.medium,
    lineHeight:   FontSize.xs * LineHeight.snug,
    letterSpacing: LetterSpacing.wider,
  },
  // Caption
  caption: {
    fontSize:     FontSize.xs,
    fontWeight:   FontWeight.regular,
    lineHeight:   FontSize.xs * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },
  // Mono — Data values
  dataLarge: {
    fontSize:     FontSize.lg,
    fontWeight:   FontWeight.bold,
    lineHeight:   FontSize.lg * LineHeight.snug,
    letterSpacing: LetterSpacing.normal,
    fontVariant:  ['tabular-nums'] as const,
  },
  dataMedium: {
    fontSize:     FontSize.base,
    fontWeight:   FontWeight.medium,
    lineHeight:   FontSize.base * LineHeight.snug,
    letterSpacing: LetterSpacing.normal,
    fontVariant:  ['tabular-nums'] as const,
  },
  dataSmall: {
    fontSize:     FontSize.sm,
    fontWeight:   FontWeight.regular,
    lineHeight:   FontSize.sm * LineHeight.snug,
    letterSpacing: LetterSpacing.normal,
    fontVariant:  ['tabular-nums'] as const,
  },
  // Button labels
  buttonLarge: {
    fontSize:     FontSize.md,
    fontWeight:   FontWeight.semiBold,
    lineHeight:   FontSize.md * LineHeight.snug,
    letterSpacing: LetterSpacing.wide,
  },
  buttonMedium: {
    fontSize:     FontSize.base,
    fontWeight:   FontWeight.semiBold,
    lineHeight:   FontSize.base * LineHeight.snug,
    letterSpacing: LetterSpacing.wide,
  },
  buttonSmall: {
    fontSize:     FontSize.sm,
    fontWeight:   FontWeight.semiBold,
    lineHeight:   FontSize.sm * LineHeight.snug,
    letterSpacing: LetterSpacing.wide,
  },
} as const;

export type TypographyKey = keyof typeof Typography;
