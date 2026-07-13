import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Radius, Gradients } from '@theme';

const GRID_ROWS = 4;
const GRID_COLS = 8;

/**
 * Lightweight decorative preview of a scan heatmap — a gradient grid with a
 * pulsing gold target marker at the center, used inside the home hero card.
 * Not a real data visualization (see the detector module's full heatmap for that).
 */
export function MiniHeatmap() {
  const pulse = useSharedValue(0.6);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1,   { duration: 900 }),
        withTiming(0.6, { duration: 900 }),
      ),
      -1,
      true,
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity:   pulse.value,
    transform: [{ scale: 0.85 + pulse.value * 0.3 }],
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Gradients.heatmapLegend.colors as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Grid overlay */}
      <View style={styles.grid}>
        {Array.from({ length: GRID_ROWS }).map((_, row) => (
          <View key={row} style={styles.row}>
            {Array.from({ length: GRID_COLS }).map((_, col) => (
              <View key={col} style={styles.cell} />
            ))}
          </View>
        ))}
      </View>

      {/* Target marker */}
      <View style={styles.markerWrap} pointerEvents="none">
        <Animated.View style={[styles.markerRing, pulseStyle]} />
        <View style={styles.markerCore} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:        '100%',
    height:       120,
    borderRadius: Radius.cardMd,
    overflow:     'hidden',
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding:        2,
  },
  row: {
    flex:           1,
    flexDirection:  'row',
    justifyContent: 'space-between',
  },
  cell: {
    flex:             1,
    borderWidth:      0.5,
    borderColor:      'rgba(255,255,255,0.08)',
  },
  markerWrap: {
    position:       'absolute',
    top:            0,
    left:           0,
    right:          0,
    bottom:         0,
    alignItems:     'center',
    justifyContent: 'center',
  },
  markerRing: {
    position:        'absolute',
    width:           36,
    height:          36,
    borderRadius:    18,
    borderWidth:     2,
    borderColor:     Colors.primary,
  },
  markerCore: {
    width:           10,
    height:          10,
    borderRadius:    5,
    backgroundColor: Colors.primary,
  },
});
