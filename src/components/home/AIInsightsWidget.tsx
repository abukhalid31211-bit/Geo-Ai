import React from 'react';
import { StyleSheet } from 'react-native';
import { Spacing } from '@theme';
import { SectionHeader } from '@components/ui/layout/SectionHeader';
import { InfoCard } from '@components/ui/cards/InfoCard';
import { EmptyState } from '@components/ui/states/EmptyState';
import { AppIcon } from '@components/ui/icons/AppIcon';
import { Colors } from '@theme';

interface AIInsightsWidgetProps {
  insightText: string | null;
}

export function AIInsightsWidget({ insightText }: AIInsightsWidgetProps) {
  return (
    <>
      <SectionHeader
        title="رؤى الذكاء الاصطناعي"
        icon={<AppIcon name="analytics" size={18} color={Colors.primary} />}
      />
      {insightText ? (
        <InfoCard
          message={insightText}
          title="ملاحظة تحليلية"
          variant="gold"
          icon="star"
          style={styles.card}
        />
      ) : (
        <EmptyState
          variant="custom"
          icon="analytics"
          title="لا توجد رؤى بعد"
          message="أجرِ فحصاً باستخدام الكاشف الذكي لعرض تحليلات الذكاء الاصطناعي هنا"
          compact
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: Spacing[1],
  },
});
