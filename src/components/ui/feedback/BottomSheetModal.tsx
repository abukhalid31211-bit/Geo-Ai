import React, {
  useCallback,
  useEffect,
  PropsWithChildren,
} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Springs,
  Duration,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';
import { AppIcon }    from '../icons/AppIcon';

interface BottomSheetModalProps extends PropsWithChildren {
  visible:      boolean;
  onDismiss:    () => void;
  title?:       string;
  subtitle?:    string;
  height?:      'auto' | 'half' | 'full' | number;
  scrollable?:  boolean;
  showHandle?:  boolean;
  showClose?:   boolean;
  headerRight?: React.ReactNode;
}

export function BottomSheetModal({
  children,
  visible,
  onDismiss,
  title,
  subtitle,
  height     = 'auto',
  scrollable = false,
  showHandle = true,
  showClose  = true,
  headerRight,
}: BottomSheetModalProps) {
  const { height: screenH } = useWindowDimensions();
  const insets              = useSafeAreaInsets();
  const { light }           = useHaptics();

  const translateY = useSharedValue(screenH);
  const opacity    = useSharedValue(0);

  const sheetHeight =
    height === 'half'                 ? screenH * 0.55 :
    height === 'full'                 ? screenH * 0.92 :
    typeof height === 'number'        ? height         : undefined;

  const show = useCallback(() => {
    light();
    opacity.value    = withTiming(1, { duration: Duration.normal });
    translateY.value = withSpring(0, Springs.default);
  }, []);

  const hide = useCallback((cb?: () => void) => {
    opacity.value    = withTiming(0, { duration: Duration.normal });
    translateY.value = withTiming(screenH, { duration: Duration.normal }, (done) => {
      if (done && cb) runOnJS(cb)();
    });
  }, [screenH]);

  useEffect(() => {
    if (visible) show();
    else hide();
  }, [visible]);

  const handleDismiss = useCallback(() => {
    hide(onDismiss);
  }, [onDismiss, hide]);

  const overlayStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const sheetStyle   = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null;

  const ContentWrapper = scrollable ? ScrollView : View;
  const contentProps   = scrollable
    ? { showsVerticalScrollIndicator: false, bounces: true }
    : {};

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleDismiss}
      statusBarTranslucent
    >
      <View style={styles.root}>
        <TouchableWithoutFeedback onPress={handleDismiss}>
          <Animated.View style={[styles.overlay, overlayStyle]} />
        </TouchableWithoutFeedback>

        <Animated.View style={[
          styles.sheet,
          sheetHeight ? { height: sheetHeight } : {},
          { paddingBottom: insets.bottom + Spacing[4] },
          sheetStyle,
        ]}>
          {showHandle && <View style={styles.handle} />}

          {(title || showClose) && (
            <View style={styles.header}>
              <View style={{ flex: 1 }}>
                {title && <Text style={styles.title}>{title}</Text>}
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
              </View>

              {headerRight}

              {showClose && (
                <Pressable
                  onPress={handleDismiss}
                  style={styles.closeBtn}
                  hitSlop={8}
                >
                  <AppIcon name="close" size={20} color={Colors.textSecondary} />
                </Pressable>
              )}
            </View>
          )}

          <ContentWrapper style={styles.content} {...(contentProps as any)}>
            {children}
          </ContentWrapper>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex:           1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
  sheet: {
    backgroundColor:      Colors.surfaceElevated,
    borderTopStartRadius: Radius.sheet,
    borderTopEndRadius:   Radius.sheet,
    borderTopWidth:       1,
    borderStartWidth:     1,
    borderEndWidth:       1,
    borderColor:          Colors.borderDefault,
    overflow:             'hidden',
  },
  handle: {
    width:           40,
    height:          4,
    borderRadius:    2,
    backgroundColor: Colors.borderDefault,
    alignSelf:       'center',
    marginTop:       Spacing[3],
    marginBottom:    Spacing[2],
  },
  header: {
    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: Spacing[4],
    paddingVertical:   Spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
    gap:               Spacing[2],
  },
  title: {
    ...Typography.titleSmall,
    color: Colors.textPrimary,
  },
  subtitle: {
    ...Typography.caption,
    color:     Colors.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    width:           32,
    height:          32,
    borderRadius:    16,
    backgroundColor: Colors.surfaceSecondary,
    alignItems:      'center',
    justifyContent:  'center',
  },
  content: {
    flex: 1,
  },
});
