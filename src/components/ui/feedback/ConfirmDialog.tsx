import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '@theme';

interface ConfirmDialogProps {
  visible?: boolean;
  message?: string;
  onDismiss?: () => void;
}

export function ConfirmDialog({ visible = false, message = '', onDismiss }: ConfirmDialogProps) {
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
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.overlay },
  container: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: BorderRadius.lg,
    padding: Spacing[5],
    marginHorizontal: Spacing[8],
  },
  text: { ...Typography.bodyMedium, color: Colors.textPrimary },
});
