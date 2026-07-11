import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Colors,
  Typography,
  Spacing,
  Gradients,
} from '@theme';

type ProgressVariant = 'default' | 'gradient' | 'striped' | 'indeterminate';

interface ProgressBarProps {
  progress?:    number;        // 0 to 1
  variant?:     ProgressVariant;
  height?:      number;
  label?:       string;
  showPercent?: boolean;
  color?:       string;
  trackColor?:  string;
  style?:       ViewStyle;
  animated?:    boolean;
}

export function ProgressBar({
  progress    = 0,
  variant     = 'gradient',
  height      = 6,
  label,
  showPercent = false,
  color       = Colors.primary,
  trackColor  = Colors.surfaceElevated,
  style,
  animated    = true,
}: ProgressBarProps) {
  const { width: screenW } = useWindowDimensions();
  const animProgress       = useSharedValue(0);
  const indeterminateX     = useSharedValue(-1);

  useEffect(() => {
    if (variant !== 'indeterminate') return;

    const runAnim = () => {
      indeterminateX.value = -1;
      indeterminateX.value = withTiming(2, {
        duration: 1400,
        easing:   Easing.inOut(Easing.ease),
      });
    };

    runAnim();
    const interval = setInterval(runAnim, 1600);
    return () => clearInterval(interval);
  }, [variant]);

  useEffect(() => {
    animProgress.value = withTiming(
      Math.max(0, Math.min(1, progress)),
      { duration: animated ? 600 : 0 }
    );
  }, [progress, animated]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${animProgress.value * 100}%`,
  }));

  const indetermStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indeterminateX.value * (screenW * 0.4) }],
  }));

  const percent = Math.round(progress * 100);

  return (
    <View style={[styles.container, style]}>
      {(label || showPercent) && (
        <View style={styles.labelRow}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showPercent && (
            <Text style={[styles.percent, { color }]}>{percent}%</Text>
          )}
        </View>
      )}

      <View style={[
        styles.track,
        { height, backgroundColor: trackColor, borderRadius: height / 2 },
      ]}>
        {variant === 'indeterminate' ? (
          <Animated.View style={[
            styles.indetermBar,
            indetermStyle,
            { height, borderRadius: height / 2 },
          ]}>
            <LinearGradient
              colors={Gradients.goldPrimary.colors as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        ) : (
          <Animated.View style={[
            styles.fill,
            fillStyle,
            { height, borderRadius: height / 2, overflow: 'hidden' },
          ]}>
            {variant === 'gradient' ? (
              <LinearGradient
                colors={Gradients.goldPrimary.colors as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            ) : (
              <View style={[StyleSheet.absoluteFill, { backgroundColor: color }]} />
            )}
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing[1.5],
  },
  labelRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  percent: {
    ...Typography.labelSmall,
    fontWeight: '700',
  },
  track: {
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    top:      0,
    bottom:   0,
    start:    0,
  },
  indetermBar: {
    width:    '40%',
    position: 'absolute',
    top:      0,
    bottom:   0,
    overflow: 'hidden',
  },
});
