export const Gradients = {
  // Background gradients
  bgMain: {
    colors: ['#0A0E1A', '#111827'] as string[],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  bgSurface: {
    colors: ['#111827', '#1C2333'] as string[],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  // Gold gradient (for buttons, accents)
  goldPrimary: {
    colors: ['#FFD27A', '#F5A623', '#C47D0E'] as string[],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  goldHorizontal: {
    colors: ['#F5A623', '#C47D0E'] as string[],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  // Hero card gradient
  heroCard: {
    colors: ['#1C2333', '#111827', '#0A0E1A'] as string[],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  // Detector screen gradient
  detectorBg: {
    colors: ['#0A0E1A', '#050810'] as string[],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  // Status gradients
  successGrad: {
    colors: ['rgba(34,197,94,0.2)', 'rgba(34,197,94,0)'] as string[],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  dangerGrad: {
    colors: ['rgba(239,68,68,0.2)', 'rgba(239,68,68,0)'] as string[],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  // Fade out bottom (for lists)
  fadeBottom: {
    colors: ['rgba(10,14,26,0)', '#0A0E1A'] as string[],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  fadeTop: {
    colors: ['#0A0E1A', 'rgba(10,14,26,0)'] as string[],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  // 3D Scene gradient
  sceneGrad: {
    colors: ['#050810', '#0A0E1A'] as string[],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  // Heatmap gradient (for legend)
  heatmapLegend: {
    colors: [
      '#1E3A5F',
      '#2471A3',
      '#7B2D8B',
      '#FF6B35',
      '#FFE500',
    ] as string[],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
} as const;
