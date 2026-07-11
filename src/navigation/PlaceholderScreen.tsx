import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Typography, Spacing } from '@theme';
import { GhostButton } from '@components/ui/buttons';

/**
 * Generic placeholder used for screens that will be built in later prompts.
 * Replace screen-by-screen as the app grows.
 */
export function PlaceholderScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.emoji}>🚧</Text>
        <Text style={styles.title}>قيد التطوير</Text>
        <Text style={styles.sub}>ستُبنى هذه الشاشة في البرومبت التالي</Text>
        {navigation.canGoBack() && (
          <GhostButton
            label="رجوع"
            onPress={() => navigation.goBack()}
            icon="back"
            iconPosition="left"
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: Colors.bgPrimary,
  },
  center: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    gap:            Spacing[4],
    padding:        Spacing[6],
  },
  emoji: {
    fontSize: 48,
  },
  title: {
    ...Typography.titleLarge,
    color: Colors.textPrimary,
  },
  sub: {
    ...Typography.bodyMedium,
    color:     Colors.textSecondary,
    textAlign: 'center',
  },
});
