import React, { useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {
  Colors,
  Typography,
  Spacing,
  Springs,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';

interface RadioOption {
  key:       string;
  label:     string;
  subtitle?: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options:   RadioOption[];
  value:     string | null;
  onSelect:  (key: string) => void;
  label?:    string;
  layout?:   'vertical' | 'horizontal';
  style?:    ViewStyle;
}

function RadioButton({
  option,
  isSelected,
  onSelect,
}: {
  option:     RadioOption;
  isSelected: boolean;
  onSelect:   (key: string) => void;
}) {
  const { light } = useHaptics();
  const scale    = useSharedValue(1);
  const dotScale = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    dotScale.value = withSpring(isSelected ? 1 : 0, Springs.bouncy);
  }, [isSelected]);

  const handlePress = useCallback(() => {
    if (option.disabled || isSelected) return;
    light();
    scale.value = withSpring(0.9, Springs.snappy, () => {
      scale.value = withSpring(1, Springs.bouncy);
    });
    onSelect(option.key);
  }, [isSelected, option]);

  const outerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    borderColor: isSelected
      ? (option.disabled ? Colors.textDisabled : Colors.primary)
      : Colors.borderDefault,
  }));

  const dotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: dotScale.value }],
    opacity: dotScale.value,
  }));

  return (
    <Pressable
      onPress={handlePress}
      disabled={option.disabled}
      style={[
        styles.radioRow,
        option.disabled && { opacity: 0.5 },
      ]}
    >
      <Animated.View style={[styles.outerCircle, outerStyle]}>
        <Animated.View style={[
          styles.innerDot,
          dotStyle,
          isSelected && { backgroundColor: Colors.primary },
        ]} />
      </Animated.View>

      <View style={styles.radioLabels}>
        <Text style={[
          styles.radioLabel,
          option.disabled && { color: Colors.textDisabled },
        ]}>
          {option.label}
        </Text>
        {option.subtitle && (
          <Text style={styles.radioSubtitle}>{option.subtitle}</Text>
        )}
      </View>
    </Pressable>
  );
}

export function RadioGroup({
  options,
  value,
  onSelect,
  label,
  layout = 'vertical',
  style,
}: RadioGroupProps) {
  return (
    <View style={style}>
      {label && (
        <Text style={styles.groupLabel}>{label}</Text>
      )}

      <View style={[
        styles.group,
        layout === 'horizontal' && styles.horizontal,
      ]}>
        {options.map((option) => (
          <RadioButton
            key={option.key}
            option={option}
            isSelected={value === option.key}
            onSelect={onSelect}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  groupLabel: {
    ...Typography.labelMedium,
    color: Colors.textSecondary,
    marginBottom: Spacing[3],
  },
  group: {
    gap: Spacing[3],
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  outerCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  innerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioLabels: {
    flex: 1,
    gap: 2,
  },
  radioLabel: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },
  radioSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
