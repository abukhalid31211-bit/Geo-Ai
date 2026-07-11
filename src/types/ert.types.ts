export interface ERTMeasurement {
  id: string;
  x: number;
  y: number;
  z?: number;
  resistivity: number;
  uncertainty?: number;
}

export interface ERTData {
  measurements: ERTMeasurement[];
  gridData?: number[][];
  colorRange: { min: number; max: number };
}
