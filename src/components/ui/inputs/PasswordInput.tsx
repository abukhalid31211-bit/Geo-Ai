import React, { useState, useCallback, forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Colors, Springs } from '@theme';
import { useHaptics } from '@hooks/useHaptics';
import {
  TextInputComponent,
  TextInputComponentProps,
} from './TextInput';

interface PasswordInputProps
  extends Omit<
    TextInputComponentProps,
    'rightIcon' | 'onRightIconPress' | 'secureTextEntry'
  > {
  containerStyle?: ViewStyle;
  showStrengthBar?: boolean;
}

function getPasswordStrength(password: string): {
  score:  0 | 1 | 2 | 3 | 4;
  label:  string;
  color:  string;
} {
  if (!password) return { score: 0, label: '', color: Colors.borderDefault };

  let score = 0;
  if (password.length >= 8)           score++;
  if (/[A-Z]/.test(password))         score++;
  if (/[0-9]/.test(password))         score++;
  if (/[^A-Za-z0-9]/.test(password))  score++;

  const levels: Array<{ score: 0 | 1 | 2 | 3 | 4; label: string; color: string }> = [
    { score: 0, label: '',          color: Colors.borderDefault },
    { score: 1, label: 'ضعيفة',     color: Colors.danger },
    { score: 2, label: 'مقبولة',    color: Colors.warning },
    { score: 3, label: 'جيدة',      color: Colors.info },
    { score: 4, label: 'قوية جداً', color: Colors.success },
  ];

  return levels[score];
}

export const PasswordInput = forwardRef<
  RNTextInput,
  PasswordInputProps
>(({
  value,
  showStrengthBar = false,
  containerStyle,
  ...props
}, ref) => {
  const { light } = useHaptics();
  const [isVisible, setIsVisible] = useState(false);
  const eyeScale = useSharedValue(1);

  const toggleVisibility = useCallback(() => {
    light();
    eyeScale.value = withSpring(0.7, Springs.snappy, () => {
      eyeScale.value = withSpring(1, Springs.bouncy);
    });
    setIsVisible(prev => !prev);
  }, []);

  const strength = showStrengthBar ? getPasswordStrength(value) : null;

  return (
    <>
      <TextInputComponent
        ref={ref}
        value={value}
        secureTextEntry={!isVisible}
        leftIcon="lock"
        rightIcon={isVisible ? 'eyeOff' : 'eye'}
        onRightIconPress={toggleVisibility}
        containerStyle={containerStyle}
        autoCapitalize="none"
        autoCorrect={false}
        {...props}
      />

      {showStrengthBar && value.length > 0 && strength && (
        <StrengthBar strength={strength} />
      )}
    </>
  );
});

PasswordInput.displayName = 'PasswordInput';

interface StrengthInfo {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  color: string;
}

function StrengthBar({ strength }: { strength: StrengthInfo }) {
  return (
    <Animated.View style={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginTop: 6,
      paddingHorizontal: 4,
    }}>
      {[1, 2, 3, 4].map((level) => (
        <Animated.View
          key={level}
          style={{
            flex: 1,
            height: 3,
            borderRadius: 2,
            backgroundColor:
              level <= strength.score
                ? strength.color
                : Colors.borderDefault,
          }}
        />
      ))}
      {strength.label ? (
        <Animated.Text style={{
          fontSize: 11,
          color: strength.color,
          fontWeight: '600',
          marginStart: 4,
          width: 60,
        }}>
          {strength.label}
        </Animated.Text>
      ) : null}
    </Animated.View>
  );
}
