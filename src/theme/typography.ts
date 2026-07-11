import { Platform } from 'react-native';

export const typography = {
  fontFamily: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  heading: {
    xxl: { fontSize: 32, fontWeight: '700' as const, lineHeight: 40 },
    xl: { fontSize: 28, fontWeight: '700' as const, lineHeight: 36 },
    lg: { fontSize: 24, fontWeight: '600' as const, lineHeight: 32 },
    md: { fontSize: 20, fontWeight: '600' as const, lineHeight: 28 },
    sm: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  },
  body: {
    lg: { fontSize: 18, fontWeight: '400' as const, lineHeight: 27 },
    md: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
    sm: { fontSize: 14, fontWeight: '400' as const, lineHeight: 21 },
    xs: { fontSize: 12, fontWeight: '400' as const, lineHeight: 18 },
  },
  caption: {
    md: { fontSize: 12, fontWeight: '500' as const, lineHeight: 18 },
    sm: { fontSize: 10, fontWeight: '500' as const, lineHeight: 15 },
  },
  label: {
    md: { fontSize: 14, fontWeight: '500' as const, lineHeight: 21 },
    sm: { fontSize: 12, fontWeight: '500' as const, lineHeight: 18 },
  },
} as const;
