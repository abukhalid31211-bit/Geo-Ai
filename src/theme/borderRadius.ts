export const BorderRadius = {
  none:   0,
  xs:     4,
  sm:     8,
  md:     12,
  lg:     16,
  xl:     20,
  '2xl':  24,
  '3xl':  32,
  full:   9999,
} as const;

// Semantic tokens
export const Radius = {
  // Buttons
  buttonLg:     BorderRadius.md,    // 12
  buttonMd:     BorderRadius.sm,    // 8
  buttonSm:     BorderRadius.xs,    // 4
  buttonRound:  BorderRadius.full,
  // Cards
  cardSm:       BorderRadius.sm,    // 8
  cardMd:       BorderRadius.md,    // 12
  cardLg:       BorderRadius.lg,    // 16
  cardXl:       BorderRadius['2xl'],// 24
  // Inputs
  input:        BorderRadius.sm,    // 8
  inputRound:   BorderRadius['2xl'],// 24
  // Chips & Badges
  chip:         BorderRadius.full,
  badge:        BorderRadius.full,
  tag:          BorderRadius.xs,    // 4
  // Modal & Sheets
  modal:        BorderRadius['2xl'],// 24
  sheet:        BorderRadius['2xl'],// 24 (top corners only)
  // Misc
  avatar:       BorderRadius.full,
  image:        BorderRadius.md,    // 12
  tooltip:      BorderRadius.xs,    // 4
} as const;

export type RadiusKey = keyof typeof Radius;
