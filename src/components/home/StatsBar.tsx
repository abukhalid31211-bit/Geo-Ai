import React from 'react';
import { StyleSheet } from 'react-native';
import { Spacing } from '@theme';
import { Row } from '@components/ui/layout/Row';
import { StatsCard } from '@components/ui/cards/StatsCard';

interface StatsBarProps {
  totalProjects: number;
  totalScans:    number;
  totalReports:  number;
}

export function StatsBar({ totalProjects, totalScans, totalReports }: StatsBarProps) {
  return (
    <Row style={styles.row} gap={Spacing[3]}>
      <StatsCard
        label="المشاريع"
        value={totalProjects}
        icon="projects"
        style={styles.card}
      />
      <StatsCard
        label="الفحوصات"
        value={totalScans}
        icon="radar"
        iconColor="#06B6D4"
        style={styles.card}
      />
      <StatsCard
        label="التقارير"
        value={totalReports}
        icon="report"
        iconColor="#22C55E"
        style={styles.card}
      />
    </Row>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'stretch',
  },
  card: {
    flex: 1,
  },
});
