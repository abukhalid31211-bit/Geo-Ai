import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Radius } from '@theme';

interface SkeletonBlockProps {
  width?:        number | string;
  height?:       number;
  borderRadius?: number;
  style?:        ViewStyle;
}

function SkeletonBlock({
  width        = '100%',
  height       = 16,
  borderRadius = Radius.xs,
  style,
}: SkeletonBlockProps) {
  const shimmer               = useSharedValue(-1);
  const { width: screenW }    = useWindowDimensions();

  useEffect(() => {
    shimmer.value = withRepeat(
      withSequence(
        withTiming(1,  { duration: 1200 }),
        withTiming(-1, { duration: 0 })
      ),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{
      translateX: interpolate(
        shimmer.value,
        [-1, 1],
        [-screenW, screenW],
        Extrapolation.CLAMP
      ),
    }],
  }));

  return (
    <View style={[
      styles.block,
      { width: width as any, height, borderRadius, overflow: 'hidden' },
      style,
    ]}>
      <Animated.View style={[StyleSheet.absoluteFill, shimmerStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255,255,255,0.06)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

interface SkeletonLoaderProps {
  type:      'card' | 'list' | 'profile' | 'project' | 'chart' | 'custom';
  count?:    number;
  style?:    ViewStyle;
  children?: React.ReactNode;
}

export function SkeletonLoader({
  type,
  count    = 1,
  style,
  children,
}: SkeletonLoaderProps) {
  if (type === 'custom') {
    return <View style={style}>{children}</View>;
  }

  const items = Array.from({ length: count });

  return (
    <View style={[styles.container, style]}>
      {items.map((_, index) => {
        switch (type) {
          case 'card':
            return (
              <View key={index} style={styles.cardSkeleton}>
                <View style={styles.cardHeader}>
                  <SkeletonBlock width={40} height={40} borderRadius={10} />
                  <View style={{ flex: 1, gap: Spacing[1.5] }}>
                    <SkeletonBlock width="60%" height={14} />
                    <SkeletonBlock width="40%" height={11} />
                  </View>
                </View>
                <SkeletonBlock height={12} />
                <SkeletonBlock width="80%" height={12} />
                <SkeletonBlock width={100} height={8} />
              </View>
            );

          case 'list':
            return (
              <View key={index} style={styles.listSkeleton}>
                <SkeletonBlock width={44} height={44} borderRadius={22} />
                <View style={{ flex: 1, gap: Spacing[1.5] }}>
                  <SkeletonBlock width="70%" height={14} />
                  <SkeletonBlock width="50%" height={11} />
                </View>
                <SkeletonBlock width={20} height={20} />
              </View>
            );

          case 'profile':
            return (
              <View key={index} style={styles.profileSkeleton}>
                <SkeletonBlock width={80} height={80} borderRadius={40}
                  style={{ alignSelf: 'center' }} />
                <SkeletonBlock width="50%" height={20} style={{ alignSelf: 'center' }} />
                <SkeletonBlock width="35%" height={14} style={{ alignSelf: 'center' }} />
                <View style={styles.statsRow}>
                  {[0, 1, 2].map(i => (
                    <View key={i} style={styles.statItem}>
                      <SkeletonBlock width={40} height={20} />
                      <SkeletonBlock width={60} height={11} />
                    </View>
                  ))}
                </View>
              </View>
            );

          case 'project':
            return (
              <View key={index} style={styles.projectSkeleton}>
                <View style={styles.projectHeader}>
                  <SkeletonBlock width={40} height={40} borderRadius={10} />
                  <View style={{ flex: 1, gap: Spacing[1.5] }}>
                    <SkeletonBlock width="65%" height={14} />
                    <SkeletonBlock width="45%" height={11} />
                  </View>
                  <SkeletonBlock width={60} height={22} borderRadius={11} />
                </View>
                <SkeletonBlock height={6} borderRadius={3} />
                <View style={styles.projectFooter}>
                  <SkeletonBlock width="30%" height={11} />
                  <SkeletonBlock width="25%" height={11} />
                </View>
              </View>
            );

          case 'chart':
            return (
              <View key={index} style={styles.chartSkeleton}>
                <View style={styles.chartBars}>
                  {[60, 80, 45, 90, 70, 55, 85].map((h, i) => (
                    <SkeletonBlock
                      key={i}
                      width={28}
                      height={h}
                      borderRadius={6}
                      style={{ alignSelf: 'flex-end' }}
                    />
                  ))}
                </View>
              </View>
            );

          default:
            return null;
        }
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing[3],
  },
  block: {
    backgroundColor: Colors.surfaceElevated,
  },
  cardSkeleton: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius:    Radius.cardMd,
    padding:         Spacing[4],
    gap:             Spacing[3],
    borderWidth:     1,
    borderColor:     Colors.borderSubtle,
  },
  cardHeader: {
    flexDirection: 'row',
    gap:           Spacing[3],
    alignItems:    'center',
  },
  listSkeleton: {
    flexDirection:   'row',
    alignItems:      'center',
    gap:             Spacing[3],
    padding:         Spacing[3],
    backgroundColor: Colors.surfaceSecondary,
    borderRadius:    Radius.cardMd,
    borderWidth:     1,
    borderColor:     Colors.borderSubtle,
  },
  profileSkeleton: {
    gap:     Spacing[3],
    padding: Spacing[4],
  },
  statsRow: {
    flexDirection:  'row',
    justifyContent: 'space-around',
    marginTop:      Spacing[2],
  },
  statItem: {
    alignItems: 'center',
    gap:        Spacing[1],
  },
  projectSkeleton: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius:    Radius.cardMd,
    padding:         Spacing[4],
    gap:             Spacing[3],
    borderWidth:     1,
    borderColor:     Colors.borderSubtle,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Spacing[3],
  },
  projectFooter: {
    flexDirection:  'row',
    justifyContent: 'space-between',
  },
  chartSkeleton: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius:    Radius.cardMd,
    padding:         Spacing[4],
    height:          160,
    justifyContent:  'flex-end',
  },
  chartBars: {
    flexDirection:  'row',
    alignItems:     'flex-end',
    gap:            Spacing[2],
    justifyContent: 'space-between',
  },
});
