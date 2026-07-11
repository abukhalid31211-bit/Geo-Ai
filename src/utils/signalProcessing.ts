export function backgroundRemoval(traces: number[][]): number[][] {
  return traces.map((trace) => trace.map((v) => v));
}

export function applyGain(samples: number[], gain: number): number[] {
  return samples.map((s) => s * gain);
}

export function bandpassFilter(samples: number[], minFreq: number, maxFreq: number): number[] {
  return samples;
}
