import React from 'react';
import { View, TextInput as RNTextInput, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '@theme';

interface TextAreaProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
}

export function TextArea({ label, value, onChangeText, placeholder }: TextAreaProps) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <RNTextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textDisabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: Spacing[3] },
  label: { ...Typography.labelSmall, color: Colors.textSecondary, marginBottom: Spacing[1] },
  input: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    borderWidth: 1,
    borderColor: Colors.borderDefault,
  },
});
