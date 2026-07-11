import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';

export function useHaptics() {
  const light = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {}
  }, []);

  const medium = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
  }, []);

  const heavy = useCallback(async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch {}
  }, []);

  const success = useCallback(async () => {
    try {
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    } catch {}
  }, []);

  const warning = useCallback(async () => {
    try {
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Warning
      );
    } catch {}
  }, []);

  const error = useCallback(async () => {
    try {
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Error
      );
    } catch {}
  }, []);

  // Pattern vibration (for detector proximity)
  const detectorPulse = useCallback(async (
    intensity: 'low' | 'medium' | 'high'
  ) => {
    try {
      const style = {
        low:    Haptics.ImpactFeedbackStyle.Light,
        medium: Haptics.ImpactFeedbackStyle.Medium,
        high:   Haptics.ImpactFeedbackStyle.Heavy,
      }[intensity];
      await Haptics.impactAsync(style);
    } catch {}
  }, []);

  return {
    light,
    medium,
    heavy,
    success,
    warning,
    error,
    detectorPulse,
  };
}
