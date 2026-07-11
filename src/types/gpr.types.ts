export interface GPRFile {
  id: string;
  name: string;
  format: 'dzt' | 'rd3' | 'other';
  path: string;
  traces: number;
  samplesPerTrace: number;
  frequency: number;
  velocity: number;
  timeWindow: number;
}

export interface GPRTrace {
  index: number;
  samples: number[];
  distance: number;
}

export interface GPRData {
  file: GPRFile;
  traces: GPRTrace[];
  processedTraces?: GPRTrace[];
  hyperbolas: Hyperbola[];
  filters: GPRFilters;
}

export interface Hyperbola {
  id: string;
  apexTrace: number;
  apexSample: number;
  depth: number;
  velocity: number;
  confidence: number;
}

export interface GPRFilters {
  backgroundRemoval: boolean;
  gainControl: number;
  bandpassMin: number;
  bandpassMax: number;
  sensitivity: number;
}
