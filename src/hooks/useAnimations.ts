import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
  interpolate,
  Extrapolation,
  runOnJS,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';
import { useCallback, useEffect } from 'react';
import { Duration, Springs, AnimationPresets } from '@theme';

// ── Fade Animation ───────────────────────────────────────────
export function useFadeAnimation(initialValue = 0) {
  const opacity = useSharedValue(initialValue);

  const fadeIn = useCallback((delay = 0) => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: Duration.normal })
    );
  }, []);

  const fadeOut = useCallback((callback?: () => void) => {
    opacity.value = withTiming(
      0,
      { duration: Duration.normal },
      (finished) => {
        if (finished && callback) runOnJS(callback)();
      }
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return { opacity, fadeIn, fadeOut, animatedStyle };
}

// ── Scale Animation ──────────────────────────────────────────
export function useScaleAnimation(initialValue = 1) {
  const scale = useSharedValue(initialValue);

  const scaleTo = useCallback((
    value: number,
    config?: { spring?: boolean }
  ) => {
    if (config?.spring) {
      scale.value = withSpring(value, Springs.bouncy);
    } else {
      scale.value = withTiming(value, AnimationPresets.scaleIn);
    }
  }, []);

  const pressIn = useCallback(() => {
    scale.value = withTiming(0.96, { duration: Duration.fast });
  }, []);

  const pressOut = useCallback(() => {
    scale.value = withSpring(1, Springs.snappy);
  }, []);

  const popIn = useCallback((delay = 0) => {
    scale.value = 0;
    scale.value = withDelay(
      delay,
      withSpring(1, Springs.bouncy)
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return { scale, scaleTo, pressIn, pressOut, popIn, animatedStyle };
}

// ── Slide Animation ──────────────────────────────────────────
export function useSlideAnimation(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance = 30
) {
  const translateY = useSharedValue(
    direction === 'up' ? distance : direction === 'down' ? -distance : 0
  );
  const translateX = useSharedValue(
    direction === 'left' ? distance : direction === 'right' ? -distance : 0
  );
  const opacity = useSharedValue(0);

  const slideIn = useCallback((delay = 0) => {
    translateY.value = withDelay(
      delay,
      withSpring(0, Springs.default)
    );
    translateX.value = withDelay(
      delay,
      withSpring(0, Springs.default)
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: Duration.normal })
    );
  }, []);

  const slideOut = useCallback((callback?: () => void) => {
    const targetY = direction === 'up' ? distance
      : direction === 'down' ? -distance : 0;
    const targetX = direction === 'left' ? distance
      : direction === 'right' ? -distance : 0;

    translateY.value = withTiming(targetY, AnimationPresets.fadeIn);
    translateX.value = withTiming(targetX, AnimationPresets.fadeIn);
    opacity.value = withTiming(
      0,
      { duration: Duration.normal },
      (finished) => {
        if (finished && callback) runOnJS(callback)();
      }
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
    opacity: opacity.value,
  }));

  return { slideIn, slideOut, animatedStyle };
}

// ── Pulse Animation (for Detector) ──────────────────────────
export function usePulseAnimation(
  minScale = 0.95,
  maxScale = 1.05,
  duration = 1000
) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.7);

  const start = useCallback(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(maxScale, { duration }),
        withTiming(minScale, { duration })
      ),
      -1,
      true
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration }),
        withTiming(0.7, { duration })
      ),
      -1,
      true
    );
  }, []);

  const stop = useCallback(() => {
    cancelAnimation(scale);
    cancelAnimation(opacity);
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return { start, stop, animatedStyle };
}

// ── Spin Animation (for Loading) ─────────────────────────────
export function useSpinAnimation(durationMs = 1200) {
  const rotation = useSharedValue(0);

  const start = useCallback(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: durationMs,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const stop = useCallback(() => {
    cancelAnimation(rotation);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{
      rotate: `${rotation.value}deg`,
    }],
  }));

  useEffect(() => {
    start();
    return stop;
  }, []);

  return { start, stop, animatedStyle };
}

// ── Progress Animation ────────────────────────────────────────
export function useProgressAnimation(initialProgress = 0) {
  const progress = useSharedValue(initialProgress);

  const animateTo = useCallback((value: number, duration = 600) => {
    progress.value = withTiming(value, { duration });
  }, []);

  const getAnimatedWidthStyle = useCallback(
    (containerWidth: number) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useAnimatedStyle(() => ({
        width: interpolate(
          progress.value,
          [0, 1],
          [0, containerWidth],
          Extrapolation.CLAMP
        ),
      })),
    []
  );

  return { progress, animateTo, getAnimatedWidthStyle };
}

// ── Ripple Animation ──────────────────────────────────────────
export function useRippleAnimation() {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const trigger = useCallback(() => {
    scale.value = 0;
    opacity.value = 0.4;

    scale.value = withTiming(2, {
      duration: Duration.slower,
    });
    opacity.value = withTiming(0, {
      duration: Duration.slower,
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return { trigger, animatedStyle };
}

// ── Shake Animation (for errors) ─────────────────────────────
export function useShakeAnimation() {
  const translateX = useSharedValue(0);

  const shake = useCallback(() => {
    translateX.value = withSequence(
      withTiming(-8, { duration: 60 }),
      withTiming(8, { duration: 60 }),
      withTiming(-6, { duration: 60 }),
      withTiming(6, { duration: 60 }),
      withTiming(-4, { duration: 60 }),
      withTiming(0, { duration: 60 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return { shake, animatedStyle };
}

// ── Radar Scan Animation (for Detector screen) ───────────────
export function useRadarScanAnimation() {
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  const start = useCallback(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2500,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const stop = useCallback(() => {
    cancelAnimation(rotation);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    start();
    return stop;
  }, []);

  return { start, stop, animatedStyle };
}

// ── Number Count-up Animation ────────────────────────────────
export function useCountUpAnimation(target: number, duration = 1000) {
  const value = useSharedValue(0);

  const start = useCallback(() => {
    value.value = withTiming(target, { duration });
  }, [target, duration]);

  useEffect(() => {
    start();
  }, [target]);

  return { value, start };
}
