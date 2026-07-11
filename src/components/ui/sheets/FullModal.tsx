import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@theme';

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
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: Colors.overlay },
  container: {
    backgroundColor: Colors.surfacePrimary,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing[5],
  },
});
