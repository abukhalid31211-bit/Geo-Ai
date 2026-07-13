import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Colors,
  Typography,
  Spacing,
  Radius,
  Gradients,
} from '@theme';
import { useAuth } from '@hooks/useAuth';
import { useHaptics } from '@hooks/useHaptics';
import { BottomSheetModal } from '@components/ui/feedback';
import { PrimaryButton } from '@components/ui/buttons/PrimaryButton';
import { GhostButton } from '@components/ui/buttons/GhostButton';
import { AppIcon, AppIconName } from '@components/ui/icons/AppIcon';

interface PaywallModalProps {
  visible:  boolean;
  onDismiss: () => void;
  /** The feature key that triggered the paywall, if any (for context copy). */
  feature?: string;
}

const PRO_FEATURES: { icon: AppIconName; label: string }[] = [
  { icon: 'radar',      label: 'رادار أرضي GPR متقدم مع تحليل ذكي' },
  { icon: 'heatmap',    label: 'خرائط مقاومة كهربائية ERT كاملة' },
  { icon: 'target',     label: 'الكاشف الذكي للمعادن والفراغات' },
  { icon: 'cube',       label: 'العرض ثلاثي الأبعاد التفاعلي' },
  { icon: 'pdf',        label: 'تصدير تقارير PDF احترافية' },
  { icon: 'folder',     label: 'حتى 20 مشروعًا نشطًا' },
];

/**
 * Full-height bottom sheet paywall. Rendered both as a standalone modal
 * (from `useFeatureGate` / `useProtectedAction`) and wrapped by
 * `PaywallScreen` when reached via the `Paywall` root route.
 */
export function PaywallModal({ visible, onDismiss, feature }: PaywallModalProps) {
  const { upgradeSubscription, isProOrAbove } = useAuth();
  const { success } = useHaptics();
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgrade = useCallback(async () => {
    setIsUpgrading(true);
    // Simulated purchase flow — wire up real billing (RevenueCat/Stripe) later.
    await new Promise<void>(resolve => setTimeout(resolve, 1200));
    upgradeSubscription('pro');
    setIsUpgrading(false);
    success();
    onDismiss();
  }, [upgradeSubscription, success, onDismiss]);

  return (
    <BottomSheetModal
      visible={visible}
      onDismiss={onDismiss}
      height="full"
      scrollable
      showHandle
      showClose
      title="الترقية إلى الباقة الاحترافية"
    >
      <LinearGradient
        colors={Gradients.heroCard.colors as any}
        style={styles.hero}
      >
        <View style={styles.crownBadge}>
          <AppIcon name="crown" size={28} color={Colors.primary} />
        </View>
        <Text style={styles.heroTitle}>افتح كل إمكانيات SAMGOLD</Text>
        {feature ? (
          <Text style={styles.heroSub}>
            هذه الميزة متاحة حصريًا للمشتركين في الباقة الاحترافية
          </Text>
        ) : (
          <Text style={styles.heroSub}>
            ارتقِ بمسوحاتك الجيوفيزيائية إلى المستوى الاحترافي
          </Text>
        )}
      </LinearGradient>

      <View style={styles.featureList}>
        {PRO_FEATURES.map((item) => (
          <View key={item.label} style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <AppIcon name={item.icon} size={18} color={Colors.primary} />
            </View>
            <Text style={styles.featureLabel}>{item.label}</Text>
            <AppIcon name="checkCircle" size={18} color={Colors.success} />
          </View>
        ))}
      </View>

      <View style={styles.priceCard}>
        <Text style={styles.priceValue}>29$</Text>
        <Text style={styles.pricePeriod}>شهريًا · إلغاء في أي وقت</Text>
      </View>

      {isProOrAbove ? (
        <View style={styles.alreadyProBadge}>
          <AppIcon name="checkCircle" size={16} color={Colors.success} />
          <Text style={styles.alreadyProText}>أنت مشترك بالفعل في الباقة الاحترافية</Text>
        </View>
      ) : (
        <PrimaryButton
          label="الترقية الآن"
          onPress={handleUpgrade}
          loading={isUpgrading}
          icon="crown"
          iconPosition="left"
          style={styles.upgradeButton}
        />
      )}

      <GhostButton
        label="لاحقًا"
        onPress={onDismiss}
        style={styles.laterButton}
      />
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: Radius.cardLg,
    padding:      Spacing[5],
    alignItems:   'center',
    gap:          Spacing[2],
    marginBottom: Spacing[4],
  },
  crownBadge: {
    width:            56,
    height:           56,
    borderRadius:     28,
    backgroundColor:  Colors.primaryGlowDim,
    borderWidth:      1,
    borderColor:      Colors.borderGold,
    alignItems:       'center',
    justifyContent:   'center',
    marginBottom:     Spacing[1],
  },
  heroTitle: {
    ...Typography.titleLarge,
    color:      Colors.textPrimary,
    textAlign:  'center',
  },
  heroSub: {
    ...Typography.bodySmall,
    color:     Colors.textSecondary,
    textAlign: 'center',
  },
  featureList: {
    gap:          Spacing[2],
    marginBottom: Spacing[4],
  },
  featureRow: {
    flexDirection:     'row',
    alignItems:        'center',
    gap:               Spacing[3],
    padding:           Spacing[3],
    borderRadius:      Radius.cardMd,
    backgroundColor:   Colors.surfaceSecondary,
  },
  featureIcon: {
    width:            32,
    height:           32,
    borderRadius:     10,
    backgroundColor:  Colors.primaryGlowDim,
    alignItems:       'center',
    justifyContent:   'center',
  },
  featureLabel: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    flex:  1,
  },
  priceCard: {
    alignItems:     'center',
    padding:        Spacing[4],
    borderRadius:   Radius.cardMd,
    borderWidth:    1,
    borderColor:    Colors.borderGold,
    backgroundColor: Colors.primaryGlowDim,
    marginBottom:   Spacing[4],
  },
  priceValue: {
    ...Typography.displaySmall,
    color:      Colors.primary,
    fontWeight: '800',
  },
  pricePeriod: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  alreadyProBadge: {
    flexDirection:     'row',
    alignItems:        'center',
    justifyContent:    'center',
    gap:               Spacing[2],
    padding:           Spacing[3],
    borderRadius:      Radius.cardMd,
    backgroundColor:   Colors.successBg,
    marginBottom:      Spacing[3],
  },
  alreadyProText: {
    ...Typography.labelMedium,
    color: Colors.success,
  },
  upgradeButton: {
    marginBottom: Spacing[2],
  },
  laterButton: {
    alignSelf: 'center',
  },
});
