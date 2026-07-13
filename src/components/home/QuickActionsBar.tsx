import React from 'react';
import { StyleSheet } from 'react-native';
import { Spacing } from '@theme';
import { Row } from '@components/ui/layout/Row';
import { SectionHeader } from '@components/ui/layout/SectionHeader';
import { QuickActionItem } from './QuickActionItem';
import type { AppIconName } from '@components/ui/icons/AppIcon';

export interface QuickAction {
  key:     string;
  icon:    AppIconName;
  label:   string;
  onPress: () => void;
  isGold?: boolean;
}

interface QuickActionsBarProps {
  actions: QuickAction[];
}

export function QuickActionsBar({ actions }: QuickActionsBarProps) {
  return (
    <>
      <SectionHeader title="الوصول السريع" />
      <Row justify="space-between" style={styles.row}>
        {actions.map((action) => (
          <QuickActionItem
            key={action.key}
            icon={action.icon}
            label={action.label}
            onPress={action.onPress}
            isGold={action.isGold}
          />
        ))}
      </Row>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: Spacing[1],
  },
});
