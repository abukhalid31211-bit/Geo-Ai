import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import {
  Colors,
  Typography,
  Spacing,
} from '@theme';
import { Spinner } from './Spinner';

interface FullScreenLoaderProps {
  visible:      boolean;
  message?:     string;
  subMessage?:  string;
  blur?:        boolean;
}

export function FullScreenLoader({
  visible,
  message    = 'جارٍ المعالجة...',
  subMessage,
  blur       = true,
}: FullScreenLoaderProps) {
  const dotOpacity1 = useSharedValue(1);
  const dotOpacity2 = useSharedValue(0.3);
  const dotOpacity3 = useSharedValue(0.3);

  React.useEffect(() => {
    if (!visible) return;

    const animDot = (dot: Animated.SharedValue<number>, delay: number) => {
      setTimeout(() => {
        dot.value = withRepeat(
          withSequence(
            withTiming(1,   { duration: 400 }),
            withTiming(0.3, { duration: 400 })
          ),
          -1,
          false
        );
      }, delay);
    };

    animDot(dotOpacity1, 0);
    animDot(dotOpacity2, 200);
    animDot(dotOpacity3, 400);
  }, [visible]);

  const dot1Style = useAnimatedStyle(() => ({ opacity: dotOpacity1.value }));
  const dot2Style = useAnimatedStyle(() => ({ opacity: dotOpacity2.value }));
  const dot3Style = useAnimatedStyle(() => ({ opacity: dotOpacity3.value }));

  if (!visible) return null;

  const content = (
    <View style={styles.container}>
      <View style={styles.card}>
        <Spinner size="xl" variant="radar" />

        <View style={styles.textGroup}>
          <View style={styles.messageRow}>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.dots}>
              <Animated.Text style={[styles.dot, dot1Style]}>·</Animated.Text>
              <Animated.Text style={[styles.dot, dot2Style]}>·</Animated.Text>
              <Animated.Text style={[styles.dot, dot3Style]}>·</Animated.Text>
            </View>
          </View>

          {subMessage && (
            <Text style={styles.subMessage}>{subMessage}</Text>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      {blur ? (
        <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill}>
          {content}
        </BlurView>
      ) : (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.overlay }]}>
          {content}
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    padding:        Spacing[6],
  },
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius:    24,
    padding:         Spacing[8],
    alignItems:      'center',
    gap:             Spacing[5],
    borderWidth:     1,
    borderColor:     Colors.borderGold,
    minWidth:        200,
  },
  textGroup: {
    alignItems: 'center',
    gap:        Spacing[1],
  },
  messageRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           Spacing[1],
  },
  message: {
    ...Typography.titleSmall,
    color: Colors.textPrimary,
  },
  dots: {
    flexDirection: 'row',
    gap:           2,
  },
  dot: {
    fontSize:   20,
    color:      Colors.primary,
    lineHeight: 24,
  },
  subMessage: {
    ...Typography.caption,
    color:     Colors.textSecondary,
    textAlign: 'center',
  },
});
