const palette = {
  // ── Gold Scale ─────────────────────────────────────────────
  gold50:  '#FFFBEB',
  gold100: '#FEF3C7',
  gold200: '#FDE68A',
  gold300: '#FFD27A',
  gold400: '#FBBF24',
  gold500: '#F5A623',
  gold600: '#D97706',
  gold700: '#C47D0E',
  gold800: '#92400E',
  gold900: '#78350F',
  // ── Dark Scale ──────────────────────────────────────────────
  dark50:  '#F9FAFB',
  dark100: '#F3F4F6',
  dark200: '#E5E7EB',
  dark300: '#D1D5DB',
  dark400: '#9CA3AF',
  dark500: '#6B7280',
  dark600: '#4B5563',
  dark700: '#374151',
  dark800: '#232D3F',
  dark850: '#1C2333',
  dark900: '#111827',
  dark950: '#0A0E1A',
  // ── Semantic Colors ─────────────────────────────────────────
  successLight: '#86EFAC',
  success:      '#22C55E',
  successDark:  '#15803D',
  warningLight: '#FCD34D',
  warning:      '#F59E0B',
  warningDark:  '#B45309',
  dangerLight:  '#FCA5A5',
  danger:       '#EF4444',
  dangerDark:   '#B91C1C',
  infoLight:    '#67E8F9',
  info:         '#06B6D4',
  infoDark:     '#0E7490',
  // ── Heatmap Colors ──────────────────────────────────────────
  heatmap0: '#1E3A5F',
  heatmap1: '#1E4D6B',
  heatmap2: '#1A5276',
  heatmap3: '#2471A3',
  heatmap4: '#5B2C8D',
  heatmap5: '#7B2D8B',
  heatmap6: '#C0392B',
  heatmap7: '#E74C3C',
  heatmap8: '#FF6B35',
  heatmap9: '#FFE500',
  // ── Special Effects ─────────────────────────────────────────
  goldGlow:     'rgba(245, 166, 35, 0.3)',
  goldGlowDim:  'rgba(245, 166, 35, 0.1)',
  cyanGlow:     'rgba(6, 182, 212, 0.3)',
  purpleGlow:   'rgba(139, 92, 246, 0.3)',
  // ── Transparent ─────────────────────────────────────────────
  transparent:  'transparent',
  black:        '#000000',
  white:        '#FFFFFF',
  // ── Overlay ─────────────────────────────────────────────────
  overlay30:    'rgba(0, 0, 0, 0.3)',
  overlay50:    'rgba(0, 0, 0, 0.5)',
  overlay60:    'rgba(0, 0, 0, 0.6)',
  overlay80:    'rgba(0, 0, 0, 0.8)',
} as const;

// ── Semantic Token Map ───────────────────────────────────────
export const Colors = {
  // Backgrounds
  bgPrimary:          palette.dark950,
  bgSecondary:        palette.dark900,
  bgTertiary:         palette.dark850,
  // Surfaces (Cards, Sheets)
  surfacePrimary:     palette.dark900,
  surfaceSecondary:   palette.dark850,
  surfaceElevated:    palette.dark800,
  surfaceOverlay:     'rgba(35, 45, 63, 0.95)',
  // Brand
  primary:            palette.gold500,
  primaryDark:        palette.gold700,
  primaryLight:       palette.gold300,
  primaryGlow:        palette.goldGlow,
  primaryGlowDim:     palette.goldGlowDim,
  // Text
  textPrimary:        palette.dark50,
  textSecondary:      palette.dark400,
  textDisabled:       palette.dark600,
  textAccent:         palette.gold500,
  textInverse:        palette.dark950,
  // Borders
  borderDefault:      'rgba(75, 85, 99, 0.4)',
  borderFocus:        palette.gold500,
  borderSubtle:       'rgba(75, 85, 99, 0.2)',
  borderGold:         'rgba(245, 166, 35, 0.3)',
  // Status
  success:            palette.success,
  successLight:       palette.successLight,
  successBg:          'rgba(34, 197, 94, 0.1)',
  warning:            palette.warning,
  warningLight:       palette.warningLight,
  warningBg:          'rgba(245, 158, 11, 0.1)',
  danger:             palette.danger,
  dangerLight:        palette.dangerLight,
  dangerBg:           'rgba(239, 68, 68, 0.1)',
  info:               palette.info,
  infoLight:          palette.infoLight,
  infoBg:             'rgba(6, 182, 212, 0.1)',
  // Heatmap Gradient
  heatmapColors: [
    palette.heatmap0,
    palette.heatmap1,
    palette.heatmap2,
    palette.heatmap3,
    palette.heatmap4,
    palette.heatmap5,
    palette.heatmap6,
    palette.heatmap7,
    palette.heatmap8,
    palette.heatmap9,
  ],
  // Special
  overlay:            palette.overlay60,
  overlayLight:       palette.overlay30,
  overlayHeavy:       palette.overlay80,
  // Bottom Nav
  navBackground:      'rgba(17, 24, 39, 0.97)',
  navBorder:          'rgba(75, 85, 99, 0.3)',
  navActive:          palette.gold500,
  navInactive:        palette.dark400,
  // Input
  inputBg:            palette.dark850,
  inputBorder:        'rgba(75, 85, 99, 0.4)',
  inputBorderFocus:   palette.gold500,
  inputPlaceholder:   palette.dark500,
  // Tabs
  tabActive:          palette.gold500,
  tabInactive:        palette.dark400,
  tabIndicator:       palette.gold500,
  // Detector Special
  detectorBg:         palette.dark950,
  detectorGlow:       palette.goldGlow,
  detectorActive:     palette.gold500,
  radarLine:          'rgba(245, 166, 35, 0.6)',
  radarGrid:          'rgba(245, 166, 35, 0.08)',
  // 3D Scene
  sceneBg:            '#050810',
  gridLine:           'rgba(245, 166, 35, 0.15)',
  // Geology Layer Colors
  geoLayer1:          '#C2955A',  // Sand
  geoLayer2:          '#8B6914',  // Clay
  geoLayer3:          '#5D5D5D',  // Rock
  geoLayer4:          '#2E4057',  // Wet Clay
  geoLayer5:          '#1A3A5C',  // Aquifer
  geoVoid:            'rgba(139, 92, 246, 0.6)',  // Void/Cave
  geoMetal:           'rgba(245, 166, 35, 0.8)',  // Metal/Gold
  // Palette exposed
  palette,
} as const;

export type ColorKey = keyof typeof Colors;
