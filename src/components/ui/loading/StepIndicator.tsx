import React from 'react';
import {
  View,
  Text,
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
import { AppIcon } from '../icons/AppIcon';

type StepStatus = 'completed' | 'active' | 'pending';

interface Step {
  label:     string;
  subtitle?: string;
}

interface StepIndicatorProps {
  steps:        Step[];
  currentStep:  number;
  style?:       ViewStyle;
  orientation?: 'horizontal' | 'vertical';
}

function StepDot({ status, number }: { status: StepStatus; number: number }) {
  const scale = useSharedValue(status === 'active' ? 1 : 0.85);

  React.useEffect(() => {
    scale.value = withSpring(
      status === 'active' ? 1.1 : 0.9,
      Springs.bouncy
    );
  }, [status]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const bgColor =
    status === 'completed' ? Colors.success :
    status === 'active'    ? Colors.primary :
    Colors.surfaceElevated;

  const borderColor =
    status === 'completed' ? Colors.success :
    status === 'active'    ? Colors.primary :
    Colors.borderDefault;

  return (
    <Animated.View style={[styles.dot, { backgroundColor: bgColor, borderColor }, animStyle]}>
      {status === 'completed' ? (
        <AppIcon name="check" size={14} color={Colors.textPrimary} />
      ) : (
        <Text style={[
          styles.dotNumber,
          { color: status === 'pending' ? Colors.textDisabled : Colors.textPrimary },
        ]}>
          {number}
        </Text>
      )}
    </Animated.View>
  );
}

export function StepIndicator({
  steps,
  currentStep,
  style,
  orientation = 'horizontal',
}: StepIndicatorProps) {
  const getStatus = (index: number): StepStatus => {
    if (index < currentStep)   return 'completed';
    if (index === currentStep) return 'active';
    return 'pending';
  };

  if (orientation === 'vertical') {
    return (
      <View style={[styles.verticalContainer, style]}>
        {steps.map((step, index) => {
          const status = getStatus(index);
          const isLast = index === steps.length - 1;
          return (
            <View key={index} style={styles.verticalStep}>
              <View style={styles.verticalDotCol}>
                <StepDot status={status} number={index + 1} />
                {!isLast && (
                  <View style={[
                    styles.verticalLine,
                    { backgroundColor: index < currentStep ? Colors.success : Colors.borderDefault },
                  ]} />
                )}
              </View>
              <View style={styles.verticalLabels}>
                <Text style={[
                  styles.stepLabel,
                  { color: status === 'pending' ? Colors.textDisabled : Colors.textPrimary },
                ]}>
                  {step.label}
                </Text>
                {step.subtitle && (
                  <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View style={[styles.horizontalContainer, style]}>
      {steps.map((step, index) => {
        const status = getStatus(index);
        const isLast = index === steps.length - 1;
        return (
          <View key={index} style={styles.horizontalStep}>
            <StepDot status={status} number={index + 1} />
            {!isLast && (
              <View style={[
                styles.connector,
                { backgroundColor: index < currentStep ? Colors.success : Colors.borderDefault },
              ]} />
            )}
            <Text style={[
              styles.stepLabelH,
              { color: status === 'pending' ? Colors.textDisabled : Colors.textPrimary },
            ]} numberOfLines={1}>
              {step.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    alignItems:    'flex-start',
  },
  horizontalStep: {
    flex:      1,
    alignItems: 'center',
    position:   'relative',
  },
  connector: {
    position:     'absolute',
    top:          16,
    start:        '50%',
    end:          '-50%',
    height:       2,
    borderRadius: 1,
  },
  stepLabelH: {
    ...Typography.labelSmall,
    marginTop: Spacing[1.5],
    textAlign: 'center',
  },
  verticalContainer: {
    gap: 0,
  },
  verticalStep: {
    flexDirection: 'row',
    gap:           Spacing[3],
  },
  verticalDotCol: {
    alignItems: 'center',
    width:      32,
  },
  verticalLine: {
    width:          2,
    flex:           1,
    minHeight:      Spacing[6],
    borderRadius:   1,
    marginVertical: Spacing[1],
  },
  verticalLabels: {
    flex:          1,
    paddingBottom: Spacing[5],
    paddingTop:    Spacing[1],
  },
  dot: {
    width:          32,
    height:         32,
    borderRadius:   16,
    borderWidth:    2,
    alignItems:     'center',
    justifyContent: 'center',
  },
  dotNumber: {
    ...Typography.labelSmall,
    fontWeight: '700',
  },
  stepLabel: {
    ...Typography.bodyMedium,
    fontWeight: '500',
  },
  stepSubtitle: {
    ...Typography.caption,
    color:     Colors.textSecondary,
    marginTop: 2,
  },
});
