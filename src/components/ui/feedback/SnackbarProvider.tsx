import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  PropsWithChildren,
} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
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
import { useHaptics }  from '@hooks/useHaptics';
import { AppIcon }     from '../icons/AppIcon';

type SnackbarType = 'default' | 'success' | 'error' | 'warning' | 'info';

interface SnackbarOptions {
  message:   string;
  type?:     SnackbarType;
  duration?: number;
  action?:   { label: string; onPress: () => void };
}

interface SnackbarContextValue {
  show: (options: SnackbarOptions) => void;
  hide: () => void;
}

const SnackbarContext = createContext<SnackbarContextValue>({
  show: () => {},
  hide: () => {},
});

export function useSnackbar() {
  return useContext(SnackbarContext);
}

const TYPE_CONFIG: Record<SnackbarType, {
  bg:    string;
  color: string;
  icon:  string;
}> = {
  default: { bg: Colors.surfaceElevated, color: Colors.textPrimary,  icon: 'info'        },
  success: { bg: Colors.successBg,       color: Colors.success,       icon: 'checkCircle' },
  error:   { bg: Colors.dangerBg,        color: Colors.danger,        icon: 'error'       },
  warning: { bg: Colors.warningBg,       color: Colors.warning,       icon: 'warning'     },
  info:    { bg: Colors.infoBg,          color: Colors.info,          icon: 'info'        },
};

export function SnackbarProvider({ children }: PropsWithChildren) {
  const { width }  = useWindowDimensions();
  const insets     = useSafeAreaInsets();
  const { success: successHaptic, error: errorHaptic } = useHaptics();

  const [snack,   setSnack]   = useState<SnackbarOptions | null>(null);
  const [visible, setVisible] = useState(false);
  const timerRef              = useRef<ReturnType<typeof setTimeout>>();

  const translateY = useSharedValue(100);
  const opacity    = useSharedValue(0);

  const hide = useCallback(() => {
    translateY.value = withTiming(100, { duration: Duration.normal });
    opacity.value    = withTiming(0,   { duration: Duration.normal }, (done) => {
      if (done) runOnJS(setVisible)(false);
    });
  }, []);

  const show = useCallback((options: SnackbarOptions) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setSnack(options);
    setVisible(true);

    if (options.type === 'success') successHaptic();
    else if (options.type === 'error') errorHaptic();

    translateY.value = withSpring(0, Springs.default);
    opacity.value    = withTiming(1, { duration: Duration.normal });

    const dur = options.duration ?? 3000;
    timerRef.current = setTimeout(hide, dur);
  }, [hide]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity:   opacity.value,
  }));

  const config = snack ? TYPE_CONFIG[snack.type || 'default'] : null;

  return (
    <SnackbarContext.Provider value={{ show, hide }}>
      {children}

      {visible && snack && config && (
        <Animated.View style={[
          styles.snackbar,
          {
            bottom:          insets.bottom + Spacing[4] + 64,
            maxWidth:        width - Spacing[8],
            backgroundColor: config.bg,
            borderColor:     config.color,
          },
          animatedStyle,
        ]}>
          <AppIcon name={config.icon as any} size={18} color={config.color} />

          <Text style={[styles.message, { flex: 1 }]} numberOfLines={2}>
            {snack.message}
          </Text>

          {snack.action && (
            <Pressable onPress={() => {
              snack.action?.onPress();
              hide();
            }}>
              <Text style={[styles.actionText, { color: config.color }]}>
                {snack.action.label}
              </Text>
            </Pressable>
          )}

          <Pressable onPress={hide} hitSlop={8}>
            <AppIcon name="close" size={16} color={Colors.textSecondary} />
          </Pressable>
        </Animated.View>
      )}
    </SnackbarContext.Provider>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    position:          'absolute',
    alignSelf:         'center',
    flexDirection:     'row',
    alignItems:        'center',
    gap:               Spacing[2],
    paddingVertical:   Spacing[3],
    paddingHorizontal: Spacing[4],
    borderRadius:      Radius.cardMd,
    borderWidth:       1,
    zIndex:            9999,
    minWidth:          240,
    shadowColor:       '#000',
    shadowOpacity:     0.3,
    shadowRadius:      8,
    shadowOffset:      { width: 0, height: 4 },
    elevation:         8,
  },
  message: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
  },
  actionText: {
    ...Typography.labelMedium,
    fontWeight: '700',
  },
});
