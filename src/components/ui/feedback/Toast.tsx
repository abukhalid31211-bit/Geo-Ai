import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';
import { borderRadius } from '@theme/borderRadius';
import { spacing } from '@theme/spacing';

interface ToastProps {
  visible?: boolean;
  message?: string;
  onDismiss?: () => void;
}

export function Toast({ visible = false, message = '', onDismiss }: ToastProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.text}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.overlay },
  container: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginHorizontal: spacing.xxxl,
  },
  text: { ...typography.body.md, color: colors.text },
});
