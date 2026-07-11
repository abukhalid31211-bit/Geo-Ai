// Base unit = 4dp
const BASE = 4;

export const Spacing = {
  0:    0,
  0.5:  BASE * 0.5,   // 2
  1:    BASE * 1,     // 4
  1.5:  BASE * 1.5,   // 6
  2:    BASE * 2,     // 8
  2.5:  BASE * 2.5,   // 10
  3:    BASE * 3,     // 12
  3.5:  BASE * 3.5,   // 14
  4:    BASE * 4,     // 16
  5:    BASE * 5,     // 20
  6:    BASE * 6,     // 24
  7:    BASE * 7,     // 28
  8:    BASE * 8,     // 32
  9:    BASE * 9,     // 36
  10:   BASE * 10,    // 40
  11:   BASE * 11,    // 44
  12:   BASE * 12,    // 48
  14:   BASE * 14,    // 56
  16:   BASE * 16,    // 64
  20:   BASE * 20,    // 80
  24:   BASE * 24,    // 96
  28:   BASE * 28,    // 112
  32:   BASE * 32,    // 128
  36:   BASE * 36,    // 144
  40:   BASE * 40,    // 160
  48:   BASE * 48,    // 192
  56:   BASE * 56,    // 224
  64:   BASE * 64,    // 256
} as const;

// Named semantic spacing
export const Layout = {
  // Screen padding
  screenPaddingH:   Spacing[4],    // 16
  screenPaddingV:   Spacing[5],    // 20
  screenPaddingTop: Spacing[3],    // 12
  // Card
  cardPaddingH:     Spacing[4],    // 16
  cardPaddingV:     Spacing[4],    // 16
  cardGap:          Spacing[3],    // 12
  // Component heights
  buttonHeight:     Spacing[14],   // 56
  buttonHeightMd:   Spacing[10],   // 40
  buttonHeightSm:   Spacing[8],    // 32
  inputHeight:      Spacing[14],   // 56
  inputHeightMd:    Spacing[12],   // 48
  listItemHeight:   Spacing[16],   // 64
  listItemHeightSm: Spacing[12],   // 48
  headerHeight:     Spacing[14],   // 56
  tabBarHeight:     Spacing[16],   // 64
  fabSize:          Spacing[14],   // 56
  fabSizeSm:        Spacing[10],   // 40
  iconSize:         Spacing[6],    // 24
  iconSizeSm:       Spacing[5],    // 20
  iconSizeLg:       Spacing[8],    // 32
  iconSizeXl:       Spacing[10],   // 40
  avatarSm:         Spacing[8],    // 32
  avatarMd:         Spacing[10],   // 40
  avatarLg:         Spacing[16],   // 64
  avatarXl:         Spacing[20],   // 80
  // Section spacing
  sectionGap:       Spacing[6],    // 24
  itemGap:          Spacing[3],    // 12
  tightGap:         Spacing[2],    // 8
} as const;

export type SpacingKey = keyof typeof Spacing;
