import { useWindowDimensions } from 'react-native';
import {
  Theme,
  Colors,
  Typography,
  Spacing,
  Layout,
  Radius,
  Shadows,
  Gradients,
  Duration
} from '@theme';

interface ThemeHook {
  theme: typeof Theme;
  colors: typeof Colors;
  typography: typeof Typography;
  spacing: typeof Spacing;
  layout: typeof Layout;
  radius: typeof Radius;
  shadows: typeof Shadows;
  gradients: typeof Gradients;
  duration: typeof Duration;
  // Screen dimensions
  width: number;
  height: number;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  // Helpers
  wp: (percent: number) => number;
  hp: (percent: number) => number;
}

export function useTheme(): ThemeHook {
  const { width, height } = useWindowDimensions();
  const wp = (percent: number) => (width * percent) / 100;
  const hp = (percent: number) => (height * percent) / 100;

  return {
    theme: Theme,
    colors: Colors,
    typography: Typography,
    spacing: Spacing,
    layout: Layout,
    radius: Radius,
    shadows: Shadows,
    gradients: Gradients,
    duration: Duration,
    width,
    height,
    isSmallScreen:  width < 375,
    isMediumScreen: width >= 375 && width < 414,
    isLargeScreen:  width >= 414,
    wp,
    hp,
  };
}
