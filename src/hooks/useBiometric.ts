import { useCallback, useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

interface BiometricState {
  isAvailable: boolean; // device has the hardware
  isEnrolled:  boolean; // user has set up Face/Touch ID or a PIN
  isChecking:  boolean;
}

/**
 * Thin wrapper around `expo-local-authentication` used to gate sensitive
 * actions (e.g. unlocking the app, confirming a subscription upgrade)
 * behind the device's biometric/PIN prompt.
 */
export function useBiometric() {
  const [state, setState] = useState<BiometricState>({
    isAvailable: false,
    isEnrolled:  false,
    isChecking:  true,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [hasHardware, isEnrolled] = await Promise.all([
          LocalAuthentication.hasHardwareAsync(),
          LocalAuthentication.isEnrolledAsync(),
        ]);
        if (!cancelled) {
          setState({ isAvailable: hasHardware, isEnrolled, isChecking: false });
        }
      } catch {
        if (!cancelled) {
          setState({ isAvailable: false, isEnrolled: false, isChecking: false });
        }
      }
    })();

    return () => { cancelled = true; };
  }, []);

  const authenticate = useCallback(async (
    reason = 'قم بالمصادقة للمتابعة',
  ): Promise<boolean> => {
    if (!state.isAvailable || !state.isEnrolled) return false;

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage:          reason,
        cancelLabel:            'إلغاء',
        fallbackLabel:          'استخدام كلمة المرور',
        disableDeviceFallback:  false,
      });
      return result.success;
    } catch {
      return false;
    }
  }, [state.isAvailable, state.isEnrolled]);

  return {
    isAvailable: state.isAvailable,
    isEnrolled:  state.isEnrolled,
    isChecking:  state.isChecking,
    isSupported: state.isAvailable && state.isEnrolled,
    authenticate,
  };
}
