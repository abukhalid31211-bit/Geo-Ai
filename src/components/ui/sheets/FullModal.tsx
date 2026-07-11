import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { colors } from '@theme/colors';
import { borderRadius } from '@theme/borderRadius';
import { spacing } from '@theme/spacing';

interface FullModalProps {
  visible?: boolean;
  onDismiss?: () => void;
  children?: React.ReactNode;
}

export function FullModal({ visible = false, onDismiss, children }: FullModalProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.container}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: colors.overlay },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.xl,
  },
});
