import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Colors, Duration } from '@theme';

// Base options for all screens
export const screenOptions: NativeStackNavigationOptions = {
  headerShown:             false,
  contentStyle:            { backgroundColor: Colors.bgPrimary },
  animation:               'fade_from_bottom',
  animationDuration:       Duration.normal,
  gestureEnabled:          true,
  gestureDirection:        'horizontal',
  fullScreenGestureEnabled: true,
};

// Slide from right (on RTL devices this becomes slide from left)
export const slideFromRightOptions: NativeStackNavigationOptions = {
  ...screenOptions,
  animation:         'slide_from_right',
  animationDuration: Duration.normal,
};

// Slide from bottom (modal feel)
export const slideFromBottomOptions: NativeStackNavigationOptions = {
  ...screenOptions,
  animation:         'slide_from_bottom',
  animationDuration: Duration.slow,
  presentation:      'modal',
};

// Fade transition
export const fadeOptions: NativeStackNavigationOptions = {
  ...screenOptions,
  animation:         'fade',
  animationDuration: Duration.slow,
};

// No animation
export const noAnimationOptions: NativeStackNavigationOptions = {
  ...screenOptions,
  animation: 'none',
};
