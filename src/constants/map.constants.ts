// Mapbox configuration
export const MAP_CONFIG = {
  // Replace with your actual Mapbox public token
  MAPBOX_TOKEN: 'YOUR_MAPBOX_PUBLIC_TOKEN',

  // Default camera settings
  DEFAULT_CENTER: [46.7219, 24.6877] as [number, number], // Riyadh
  DEFAULT_ZOOM: 12,
  MIN_ZOOM: 1,
  MAX_ZOOM: 22,

  // Map styles
  STYLES: {
    satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
    dark:      'mapbox://styles/mapbox/dark-v11',
    outdoors:  'mapbox://styles/mapbox/outdoors-v12',
    streets:   'mapbox://styles/mapbox/streets-v12',
  },

  // Layer IDs
  LAYERS: {
    contour:      'samgold-contour-layer',
    heatmap:      'samgold-heatmap-layer',
    points:       'samgold-points-layer',
    targets:      'samgold-targets-layer',
    userLocation: 'samgold-user-location',
  },
} as const;
