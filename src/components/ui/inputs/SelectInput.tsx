import React, {
  useState,
  useCallback,
} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Duration,
  Springs,
} from '@theme';
import { useHaptics } from '@hooks/useHaptics';
import { AppIcon } from '../icons/AppIcon';

export interface SelectOption {
  key:       string;
  label:     string;
  subtitle?: string;
  icon?:     string;
}

interface SelectInputProps {
  label:          string;
  value:          string | null;
  options:        SelectOption[];
  onSelect:       (option: SelectOption) => void;
  placeholder?:   string;
  error?:         string;
  hint?:          string;
  disabled?:      boolean;
  required?:      boolean;
  containerStyle?: ViewStyle;
}

export function SelectInput({
  label,
  value,
  options,
  onSelect,
  placeholder = 'اختر...',
  error,
  hint,
  disabled = false,
  required = false,
  containerStyle,
}: SelectInputProps) {
  const { light } = useHaptics();
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(o => o.key === value) ?? null;

  const chevronRotate = useSharedValue(0);
  const focusProgress = useSharedValue(0);

  const openDropdown = useCallback(() => {
    if (disabled) return;
    light();
    setIsOpen(true);
    chevronRotate.value = withSpring(180, Springs.default);
    focusProgress.value = withTiming(1, { duration: Duration.normal });
  }, [disabled]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    chevronRotate.value = withSpring(0, Springs.default);
    focusProgress.value = withTiming(0, { duration: Duration.normal });
  }, []);

  const handleSelect = useCallback((option: SelectOption) => {
    light();
    onSelect(option);
    closeDropdown();
  }, [onSelect, closeDropdown]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${chevronRotate.value}deg` }],
  }));

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(
      error
        ? Colors.danger
        : isOpen
        ? Colors.primary
        : Colors.inputBorder,
      { duration: Duration.normal }
    ),
    borderWidth: withTiming(isOpen ? 1.5 : 1, { duration: Duration.fast }),
  }));

  const glowStyle = useAnimatedStyle(() => ({
    shadowColor: Colors.primary,
    shadowOpacity: interpolate(
      focusProgress.value,
      [0, 1],
      [0, 0.2],
      Extrapolation.CLAMP
    ),
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: focusProgress.value * 3,
  }));

  return (
    <View style={containerStyle}>
      <Pressable onPress={openDropdown} disabled={disabled}>
        <Animated.View style={[
          styles.trigger,
          borderStyle,
          glowStyle,
          disabled && { opacity: 0.5 },
        ]}>
          <View style={styles.triggerContent}>
            <Text style={[
              styles.triggerLabel,
              { color: selectedOption ? Colors.textSecondary : Colors.inputPlaceholder },
              (isOpen && !selectedOption) && { color: Colors.primary },
            ]}>
              {label}{required && (
                <Text style={{ color: Colors.danger }}> *</Text>
              )}
            </Text>

            {selectedOption ? (
              <Text style={styles.selectedText} numberOfLines={1}>
                {selectedOption.label}
              </Text>
            ) : (
              <Text style={styles.placeholderText}>
                {isOpen ? '' : placeholder}
              </Text>
            )}
          </View>

          <Animated.View style={chevronStyle}>
            <AppIcon
              name="chevronDown"
              size={20}
              color={isOpen ? Colors.primary : Colors.textSecondary}
            />
          </Animated.View>
        </Animated.View>
      </Pressable>

      {(error || hint) && (
        <Text style={[
          styles.bottomText,
          error ? styles.errorText : styles.hintText,
        ]}>
          {error || hint}
        </Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.optionsContainer}>
                <View style={styles.optionsHeader}>
                  <Text style={styles.optionsTitle}>{label}</Text>
                  <Pressable onPress={closeDropdown}>
                    <AppIcon name="close" size={20} color={Colors.textSecondary} />
                  </Pressable>
                </View>

                <ScrollView
                  style={styles.optionsList}
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                >
                  {options.map((option, index) => {
                    const isSelected = option.key === value;
                    return (
                      <Pressable
                        key={option.key}
                        onPress={() => handleSelect(option)}
                        style={({ pressed }) => [
                          styles.optionItem,
                          isSelected && styles.optionItemSelected,
                          pressed && styles.optionItemPressed,
                          index < options.length - 1 && styles.optionBorder,
                        ]}
                      >
                        <View style={styles.optionLeft}>
                          <Text style={[
                            styles.optionLabel,
                            isSelected && { color: Colors.primary },
                          ]}>
                            {option.label}
                          </Text>
                          {option.subtitle && (
                            <Text style={styles.optionSubtitle}>
                              {option.subtitle}
                            </Text>
                          )}
                        </View>

                        {isSelected && (
                          <AppIcon name="check" size={18} color={Colors.primary} />
                        )}
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderRadius: Radius.input,
    borderWidth: 1,
    height: 56,
    paddingHorizontal: Spacing[4],
    gap: Spacing[2],
  },
  triggerContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 2,
  },
  triggerLabel: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  selectedText: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },
  placeholderText: {
    ...Typography.bodyMedium,
    color: Colors.inputPlaceholder,
  },
  bottomText: {
    ...Typography.caption,
    marginTop: Spacing[1],
    paddingHorizontal: Spacing[1],
  },
  errorText: { color: Colors.danger },
  hintText:  { color: Colors.textSecondary },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  optionsContainer: {
    backgroundColor: Colors.surfaceElevated,
    borderTopStartRadius: Radius.modal,
    borderTopEndRadius: Radius.modal,
    maxHeight: '70%',
    overflow: 'hidden',
  },
  optionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  optionsTitle: {
    ...Typography.titleSmall,
    color: Colors.textPrimary,
  },
  optionsList: {
    maxHeight: 400,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[4],
  },
  optionItemSelected: {
    backgroundColor: Colors.primaryGlowDim,
  },
  optionItemPressed: {
    backgroundColor: Colors.surfaceSecondary,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  optionLeft: {
    flex: 1,
    gap: 2,
  },
  optionLabel: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },
  optionSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
