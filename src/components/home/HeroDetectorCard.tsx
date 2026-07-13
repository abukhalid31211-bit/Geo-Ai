import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '@theme';
import { HeroCard } from '@components/ui/cards/HeroCard';
import { PrimaryButton } from '@components/ui/buttons/PrimaryButton';
import { DataLabel } from '@components/ui/data/DataLabel';
import { Row } from '@components/ui/layout/Row';
import { MiniHeatmap } from './MiniHeatmap';
import { TARGET_TYPE_LABELS } from '@constants/app.constants';
import type { TargetType } from '@apptypes/detector.types';

interface LastScanSummary {
  depth:      number;
  confidence: number;
  targetType: TargetType;
}

interface HeroDetectorCardProps {
  lastScan:  LastScanSummary | null;
  locked:    boolean;
  onStart:   () => void;
  onUpgrade: () => void;
}

export function HeroDetectorCard({ lastScan, locked, onStart, onUpgrade }: HeroDetectorCardProps) {
  return (
    <HeroCard
      title="الكاشف الذكي"
      subtitle={locked ? 'متاح للمشتركين الاحترافيين' : 'كشف فوري بالذكاء الاصطناعي'}
      icon="radar"
      badge={locked ? 'PRO' : undefined}
      glowing
    >
      <MiniHeatmap />

      {lastScan ? (
        <Row justify="space-between" style={styles.dataRow}>
          <DataLabel label="آخر عمق" value={lastScan.depth} unit="م" accent />
          <DataLabel label="نسبة الثقة" value={`${lastScan.confidence}`} unit="%" />
          <DataLabel label="النوع" value={TARGET_TYPE_LABELS[lastScan.targetType]} size="sm" />
        </Row>
      ) : (
        <Text style={styles.emptyText}>لم يتم إجراء أي فحص بعد</Text>
      )}

      <PrimaryButton
        label={locked ? 'الترقية للاحترافي' : 'بدء فحص جديد'}
        onPress={locked ? onUpgrade : onStart}
        icon={locked ? 'crown' : 'scan'}
        size="md"
        style={styles.button}
      />
    </HeroCard>
  );
}

const styles = StyleSheet.create({
  dataRow: {
    marginTop: Spacing[4],
  },
  emptyText: {
    ...Typography.bodySmall,
    color:     Colors.textSecondary,
    marginTop: Spacing[4],
    textAlign: 'center',
  },
  button: {
    marginTop: Spacing[4],
  },
});
