export { Colors }           from './colors';
export {
  Typography,
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing
}                           from './typography';
export {
  Spacing,
  Layout
}                           from './spacing';
export {
  BorderRadius,
  Radius
}                           from './borderRadius';
export {
  Shadows,
  GlowEffects
}                           from './shadows';
export {
  Duration,
  AnimationPresets,
  Springs,
  HapticFeedback
}                           from './animations';
export { Gradients }        from './gradients';

// Convenience re-export as Theme object
import { Colors }           from './colors';
import { Typography }       from './typography';
import { Spacing, Layout }  from './spacing';
import { Radius }           from './borderRadius';
import { Shadows }          from './shadows';
import { Duration }         from './animations';
import { Gradients }        from './gradients';

export const Theme = {
  colors:     Colors,
  typography: Typography,
  spacing:    Spacing,
  layout:     Layout,
  radius:     Radius,
  shadows:    Shadows,
  duration:   Duration,
  gradients:  Gradients,
} as const;

export type Theme = typeof Theme;
