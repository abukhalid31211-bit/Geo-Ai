import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  Colors,
  Typography,
  Spacing,
} from '@theme';
import { AppIcon, AppIconName } from '../icons/AppIcon';
import { BottomSheetModal }     from './BottomSheetModal';
import { PrimaryButton }        from '../buttons/PrimaryButton';
import { DangerButton }         from '../buttons/DangerButton';
import { GhostButton }          from '../buttons/GhostButton';

interface ConfirmSheetProps {
  visible:       boolean;
  onDismiss:     () => void;
  onConfirm:     () => void;
  title:         string;
  message:       string;
  confirmLabel?: string;
  cancelLabel?:  string;
  type?:         'default' | 'danger';
  icon?:         AppIconName;
  loading?:      boolean;
}

export function ConfirmSheet({
  visible,
  onDismiss,
  onConfirm,
  title,
  message,
  confirmLabel = 'تأكيد',
  cancelLabel  = 'إلغاء',
  type         = 'default',
  icon,
  loading      = false,
}: ConfirmSheetProps) {
  return (
    <BottomSheetModal
      visible={visible}
      onDismiss={onDismiss}
      height="auto"
    >
      <View style={styles.container}>
        {icon && (
          <View style={[
            styles.iconWrap,
            type === 'danger' && styles.iconDanger,
          ]}>
            <AppIcon
              name={icon}
              size={32}
              color={type === 'danger' ? Colors.danger : Colors.primary}
            />
          </View>
        )}

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.buttons}>
          {type === 'danger' ? (
            <DangerButton
              label={confirmLabel}
              onPress={onConfirm}
              loading={loading}
              fullWidth
            />
          ) : (
            <PrimaryButton
              label={confirmLabel}
              onPress={onConfirm}
              loading={loading}
            />
          )}

          <GhostButton label={cancelLabel} onPress={onDismiss} size="lg" />
        </View>
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:    Spacing[5],
    gap:        Spacing[4],
    alignItems: 'center',
  },
  iconWrap: {
    width:           72,
    height:          72,
    borderRadius:    36,
    backgroundColor: Colors.primaryGlowDim,
    borderWidth:     1,
    borderColor:     Colors.borderGold,
    alignItems:      'center',
    justifyContent:  'center',
  },
  iconDanger: {
    backgroundColor: Colors.dangerBg,
    borderColor:     Colors.danger,
  },
  title: {
    ...Typography.titleLarge,
    color:     Colors.textPrimary,
    textAlign: 'center',
  },
  message: {
    ...Typography.bodyMedium,
    color:      Colors.textSecondary,
    textAlign:  'center',
    lineHeight: 22,
  },
  buttons: {
    width:     '100%',
    gap:       Spacing[2],
    marginTop: Spacing[2],
  },
});
