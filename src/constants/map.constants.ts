export const DEFAULT_MAP_CENTER = {
  latitude: 24.7136,
  longitude: 46.6753,
};

export const DEFAULT_MAP_ZOOM = 10;
export const MIN_MAP_ZOOM = 0;
export const MAX_MAP_ZOOM = 20;

export const MAP_STYLES = {
  dark: 'mapbox://styles/mapbox/dark-v11',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  streets: 'mapbox://styles/mapbox/streets-v12',
} as const;

export const CONTOUR_COLORS = [
  '#F5A623',
  '#FF8F00',
  '#FF6F00',
  '#E65100',
  '#BF360C',
] as const;
