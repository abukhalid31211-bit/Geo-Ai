export interface DataPoint {
  x: number;
  y: number;
  value: number;
}

export function idwInterpolation(
  points: DataPoint[],
  gridSize: number,
  power: number = 2
): number[][] {
  // Inverse Distance Weighting interpolation
  const grid: number[][] = [];
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
}
