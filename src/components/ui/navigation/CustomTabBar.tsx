import React, { useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { BlurView }            from 'expo-blur';
import { useSafeAreaInsets }   from 'react-native-safe-area-context';
import { LinearGradient }      from 'expo-linear-gradient';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Springs,
  Duration,
} from '@theme';
import { useHaptics }           from '@hooks/useHaptics';
import { AppIcon, AppIconName } from '../icons/AppIcon';

// ── Tab Configuration ──────────────────────────────────────
const TAB_CONFIG: Record<string, {
  icon:      AppIconName;
  label:     string;
  isCenter?: boolean;
}> = {
  HomeTab:     { icon: 'home',     label: 'الرئيسية'              },
  ProjectsTab: { icon: 'projects', label: 'المشاريع'              },
  DetectorTab: { icon: 'radar',    label: 'الكاشف', isCenter: true },
  ThreeDTab:   { icon: 'cube',     label: '3D'                    },
  SettingsTab: { icon: 'settings', label: 'الإعدادات'             },
};

// ── Single Tab Item ────────────────────────────────────────
function TabItem({
  route,
  isActive,
  onPress,
}: {
  route:    { name: string; key: string };
  isActive: boolean;
  onPress:  () => void;
}) {
  const { light }  = useHaptics();
  const config      = TAB_CONFIG[route.name];
  const isCenter    = config?.isCenter ?? false;

  const activeProgress = useSharedValue(isActive ? 1 : 0);
  const scale          = useSharedValue(1);

  React.useEffect(() => {
    activeProgress.value = withSpring(isActive ? 1 : 0, Springs.default);
  }, [isActive]);

  const handlePress = useCallback(() => {
    light();
    scale.value = withSpring(0.85, Springs.snappy, () => {
      scale.value = withSpring(1, Springs.bouncy);
    });
    onPress();
  }, [onPress]);

  const pillStyle = useAnimatedStyle(() => ({
    opacity:   withTiming(isActive && !isCenter ? 1 : 0, { duration: Duration.normal }),
    transform: [{ scaleX: withSpring(isActive ? 1 : 0.7, Springs.default) }],
  }));

  const iconScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const labelAnimStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      activeProgress.value,
      [0, 1],
      [Colors.navInactive, Colors.navActive]
    ),
  }));

  // ── Center (Detector) button ───────────────────────────
  if (isCenter) {
    return (
      <Pressable onPress={handlePress} style={styles.centerWrapper}>
        <Animated.View style={[styles.centerButton, iconScaleStyle]}>
          <LinearGradient
            colors={['#FFD27A', '#F5A623', '#C47D0E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.centerGradient}
          >
            <AppIcon name={config.icon} size={28} color={Colors.textInverse} />
          </LinearGradient>

          {isActive && (
            <View style={styles.centerRing} />
          )}
        </Animated.View>
        <Text style={styles.centerLabel}>{config.label}</Text>
      </Pressable>
    );
  }

  // ── Regular tab item ───────────────────────────────────
  return (
    <Pressable onPress={handlePress} style={styles.tabItem}>
      {/* Active pill background */}
      <Animated.View style={[styles.activePill, pillStyle]} />

      {/* Icon */}
      <Animated.View style={iconScaleStyle}>
        <AppIcon
          name={config.icon}
          size={22}
          color={isActive ? Colors.navActive : Colors.navInactive}
        />
      </Animated.View>

      {/* Label */}
      <Animated.Text style={[styles.tabLabel, labelAnimStyle]}>
        {config.label}
      </Animated.Text>
    </Pressable>
  );
}

// ── Main Custom Tab Bar ────────────────────────────────────
export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets     = useSafeAreaInsets();

  return (
    <View style={[styles.container, { height: 60 + insets.bottom }]}>
      {/* Background */}
      {Platform.OS === 'ios' ? (
        <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.androidBg]} />
      )}

      {/* Top border */}
      <View style={styles.topBorder} />

      {/* Tabs row */}
      <View style={[styles.tabsRow, { paddingBottom: insets.bottom }]}>
        {state.routes.map((route, index) => {
          const isActive = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type:              'tabPress',
              target:            route.key,
              canPreventDefault: true,
            });
            if (!isActive && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabItem
              key={route.key}
              route={route}
              isActive={isActive}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position:        'absolute',
    bottom:          0,
    left:            0,
    right:           0,
    backgroundColor: 'transparent',
    zIndex:          100,
  },
  androidBg: {
    backgroundColor: Colors.navBackground,
  },
  topBorder: {
    height:          1,
    backgroundColor: Colors.navBorder,
  },
  tabsRow: {
    flex:          1,
    flexDirection: 'row',
    alignItems:    'center',
  },
  tabItem: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    gap:            Spacing[0.5],
    paddingTop:     Spacing[1.5],
    position:       'relative',
    height:         60,
  },
  activePill: {
    position:        'absolute',
    top:             6,
    width:           48,
    height:          32,
    borderRadius:    16,
    backgroundColor: Colors.primaryGlowDim,
  },
  tabLabel: {
    fontSize:      10,
    fontWeight:    '500',
    letterSpacing: 0.3,
  },
  // ── Center button ────────────────────────────────────
  centerWrapper: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'flex-start',
    marginTop:      -20,
  },
  centerButton: {
    position:     'relative',
    width:        60,
    height:       60,
    borderRadius: 30,
    alignItems:   'center',
    justifyContent: 'center',
    shadowColor:   Colors.primary,
    shadowOpacity: 0.5,
    shadowRadius:  12,
    shadowOffset:  { width: 0, height: -2 },
    elevation:     8,
  },
  centerGradient: {
    width:          60,
    height:         60,
    borderRadius:   30,
    alignItems:     'center',
    justifyContent: 'center',
  },
  centerRing: {
    position:     'absolute',
    width:        72,
    height:       72,
    borderRadius: 36,
    borderWidth:  2,
    borderColor:  Colors.primary,
    top:          -6,
    left:         -6,
  },
  centerLabel: {
    fontSize:   10,
    fontWeight: '500',
    color:      Colors.navActive,
    marginTop:  Spacing[1],
  },
});
