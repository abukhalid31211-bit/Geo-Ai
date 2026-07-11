export type TargetType =
  | 'gold'
  | 'void'
  | 'water'
  | 'pipe'
  | 'metal'
  | 'unknown';

export interface DetectionTarget {
  id: string;
  x: number;
  y: number;
  depth: number;
  type: TargetType;
  confidence: {
    gold: number;
    void: number;
    water: number;
    pipe: number;
    metal: number;
  };
  dominantType: TargetType;
  dominantConfidence: number;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  detectedAt: string;
  projectId?: string;
}

export interface ScanResult {
  id: string;
  projectId?: string;
  targets: DetectionTarget[];
  scannedAt: string;
  fileSource?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  duration: number;
}
