import React, { useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
  Springs,
  Duration,
} from '@theme';
import { useHaptics }          from '@hooks/useHaptics';
import { AppIcon, AppIconName } from '../icons/AppIcon';
import { PrimaryButton }        from '../buttons/PrimaryButton';
import { DangerButton }         from '../buttons/DangerButton';
import { GhostButton }          from '../buttons/GhostButton';

type DialogType   = 'info' | 'success' | 'warning' | 'danger' | 'confirm';
type DialogAction = 'primary' | 'danger' | 'ghost';

interface DialogButton {
  label:    string;
  onPress:  () => void;
  type?:    DialogAction;
  loading?: boolean;
}

interface AlertDialogProps {
  visible:           boolean;
  onDismiss:         () => void;
  title:             string;
  message:           string;
  type?:             DialogType;
  icon?:             AppIconName;
  primaryButton?:    DialogButton;
  secondaryButton?:  DialogButton;
  dismissOnOverlay?: boolean;
}

const TYPE_CONFIG: Record<DialogType, {
  icon:  AppIconName;
  color: string;
  bg:    string;
}> = {
  info:    { icon: 'info',        color: Colors.info,    bg: Colors.infoBg         },
  success: { icon: 'checkCircle', color: Colors.success, bg: Colors.successBg      },
  warning: { icon: 'warning',     color: Colors.warning, bg: Colors.warningBg      },
  danger:  { icon: 'error',       color: Colors.danger,  bg: Colors.dangerBg       },
  confirm: { icon: 'info',        color: Colors.primary, bg: Colors.primaryGlowDim },
};

export function AlertDialog({
  visible,
  onDismiss,
  title,
  message,
  type             = 'confirm',
  icon,
  primaryButton,
  secondaryButton,
  dismissOnOverlay = true,
}: AlertDialogProps) {
  const { width }              = useWindowDimensions();
  const { warning: warnHaptic } = useHaptics();
  const config                 = TYPE_CONFIG[type];
  const iconName               = icon || config.icon;

  const scale   = useSharedValue(0.85);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      warnHaptic();
      scale.value   = withSpring(1, Springs.bouncy);
      opacity.value = withTiming(1, { duration: Duration.normal });
    } else {
      scale.value   = withTiming(0.85, { duration: Duration.normal });
      opacity.value = withTiming(0,    { duration: Duration.normal });
    }
  }, [visible]);

  const overlayStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const dialogStyle  = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity:   opacity.value,
  }));

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <Animated.View style={[styles.overlay, overlayStyle]}>
        <TouchableWithoutFeedback
          onPress={dismissOnOverlay ? onDismiss : undefined}
        >
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>

        <Animated.View style={[
          styles.dialog,
          { width: Math.min(width - 48, 320) },
          dialogStyle,
        ]}>
          <View style={[
            styles.iconBadge,
            { backgroundColor: config.bg, borderColor: config.color },
          ]}>
            <AppIcon name={iconName} size={28} color={config.color} />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttons}>
            {primaryButton && (
              primaryButton.type === 'danger' ? (
                <DangerButton
                  label={primaryButton.label}
                  onPress={primaryButton.onPress}
                  loading={primaryButton.loading}
                  fullWidth
                />
              ) : (
                <PrimaryButton
                  label={primaryButton.label}
                  onPress={primaryButton.onPress}
                  loading={primaryButton.loading}
                  size="md"
                />
              )
            )}

            {secondaryButton && (
              <GhostButton
                label={secondaryButton.label}
                onPress={secondaryButton.onPress}
                size="md"
              />
            )}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex:            1,
    backgroundColor: Colors.overlay,
    alignItems:      'center',
    justifyContent:  'center',
    padding:         Spacing[6],
  },
  dialog: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius:    Radius.modal,
    padding:         Spacing[6],
    alignItems:      'center',
    gap:             Spacing[3],
    borderWidth:     1,
    borderColor:     Colors.borderDefault,
    ...Shadows.xl,
  },
  iconBadge: {
    width:          72,
    height:         72,
    borderRadius:   36,
    alignItems:     'center',
    justifyContent: 'center',
    borderWidth:    1,
    marginBottom:   Spacing[1],
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
