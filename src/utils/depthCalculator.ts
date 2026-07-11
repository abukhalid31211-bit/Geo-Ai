export function calculateDepth(
  timeTwoWay: number,
  velocity: number
): number {
  return (timeTwoWay * velocity) / 2;
}

export function estimateVelocity(dielectricConstant: number): number {
  return 0.3 / Math.sqrt(dielectricConstant);
}
