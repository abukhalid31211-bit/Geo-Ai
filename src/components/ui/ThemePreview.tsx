import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@hooks/useTheme';

export default function ThemePreview() {
  const { colors, typography, spacing, radius, gradients } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
      <ScrollView contentContainerStyle={{ padding: spacing[4] }}>
        {/* Title */}
        <Text style={[typography.displayMedium, {
          color: colors.primary,
          marginBottom: spacing[6],
          textAlign: 'center',
        }]}>
          SAMGOLD Theme
        </Text>

        {/* Color Swatches */}
        <Text style={[typography.titleMedium, {
          color: colors.textPrimary,
          marginBottom: spacing[3],
        }]}>
          الألوان الرئيسية
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] }}>
          {[
            { color: colors.primary, label: 'Primary' },
            { color: colors.success, label: 'Success' },
            { color: colors.danger, label: 'Danger' },
            { color: colors.warning, label: 'Warning' },
            { color: colors.info, label: 'Info' },
          ].map(({ color, label }) => (
            <View key={label} style={{
              width: 60,
              height: 60,
              backgroundColor: color,
              borderRadius: radius.cardMd,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{
                fontSize: 8,
                color: colors.textInverse,
                fontWeight: '700',
              }}>
                {label}
              </Text>
            </View>
          ))}
        </View>

        {/* Gradient test */}
        <Text style={[typography.titleMedium, {
          color: colors.textPrimary,
          marginVertical: spacing[3],
        }]}>
          التدرجات
        </Text>
        <LinearGradient
          colors={gradients.goldPrimary.colors as [string, string, ...string[]]}
          start={gradients.goldPrimary.start}
          end={gradients.goldPrimary.end}
          style={{
            height: 48,
            borderRadius: radius.buttonLg,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={[typography.buttonLarge, {
            color: colors.textInverse,
          }]}>
            تدرج ذهبي
          </Text>
        </LinearGradient>

        {/* Typography test */}
        <Text style={[typography.titleMedium, {
          color: colors.textPrimary,
          marginVertical: spacing[3],
        }]}>
          الطباعة
        </Text>
        {[
          { style: typography.displayLarge, label: 'Display Large' },
          { style: typography.titleLarge, label: 'Title Large' },
          { style: typography.bodyLarge, label: 'Body Large - نص عربي' },
          { style: typography.labelMedium, label: 'Label Medium' },
          { style: typography.caption, label: 'Caption text' },
        ].map(({ style, label }) => (
          <Text key={label} style={[style, {
            color: colors.textPrimary,
            marginBottom: spacing[2],
          }]}>
            {label}
          </Text>
        ))}

        {/* Cards test */}
        <Text style={[typography.titleMedium, {
          color: colors.textPrimary,
          marginVertical: spacing[3],
        }]}>
          البطاقات
        </Text>
        {[
          colors.surfacePrimary,
          colors.surfaceSecondary,
          colors.surfaceElevated,
        ].map((bg, i) => (
          <View key={i} style={{
            backgroundColor: bg,
            borderRadius: radius.cardMd,
            padding: spacing[4],
            marginBottom: spacing[3],
            borderWidth: 1,
            borderColor: colors.borderDefault,
          }}>
            <Text style={[typography.titleSmall, {
              color: colors.textPrimary,
            }]}>
              بطاقة مستوى {i}
            </Text>
            <Text style={[typography.bodySmall, {
              color: colors.textSecondary,
              marginTop: spacing[1],
            }]}>
              Surface Level {i} — {bg}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
