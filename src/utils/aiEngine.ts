import type { DetectionTarget, TargetType } from '@apptypes/detector.types';

export function classifyTarget(
  signalData: number[],
  depth: number
): { type: TargetType; confidence: number } {
  // Rule-based AI classification engine
  return { type: 'unknown', confidence: 0 };
}

export function generateDetectionTargets(
  scanData: number[][]
): DetectionTarget[] {
  return [];
}
