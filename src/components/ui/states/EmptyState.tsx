import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {
  Colors,
  Typography,
  Spacing,
} from '@theme';
import { AppIcon, AppIconName } from '../icons/AppIcon';
import { PrimaryButton }        from '../buttons/PrimaryButton';
import { SecondaryButton }      from '../buttons/SecondaryButton';
import { AnimatedView }         from '../animated/AnimatedView';

type EmptyStateVariant =
  | 'projects'
  | 'files'
  | 'reports'
  | 'scans'
  | 'search'
  | 'notifications'
  | 'offline'
  | 'error'
  | 'custom';

interface EmptyStateProps {
  variant?:      EmptyStateVariant;
  title?:        string;
  message?:      string;
  icon?:         AppIconName;
  action?:       { label: string; onPress: () => void };
  secondAction?: { label: string; onPress: () => void };
  style?:        ViewStyle;
  compact?:      boolean;
}

const VARIANT_CONFIG: Record<
  EmptyStateVariant,
  { icon: AppIconName; title: string; message: string; color: string }
> = {
  projects: {
    icon:    'folder',
    title:   'لا توجد مشاريع',
    message: 'أنشئ مشروعك الأول لبدء المسح والتحليل',
    color:   Colors.primary,
  },
  files: {
    icon:    'file',
    title:   'لا توجد ملفات',
    message: 'ارفع ملفات البيانات لبدء التحليل',
    color:   Colors.info,
  },
  reports: {
    icon:    'report',
    title:   'لا توجد تقارير',
    message: 'أجرِ تحليلاً أولاً لإنشاء التقارير',
    color:   Colors.primary,
  },
  scans: {
    icon:    'radar',
    title:   'لا توجد فحوصات',
    message: 'ابدأ فحصاً جديداً باستخدام الكاشف الذكي',
    color:   Colors.primary,
  },
  search: {
    icon:    'search',
    title:   'لا توجد نتائج',
    message: 'جرّب كلمات بحث مختلفة',
    color:   Colors.textSecondary,
  },
  notifications: {
    icon:    'bell',
    title:   'لا توجد إشعارات',
    message: 'ستظهر هنا إشعاراتك الجديدة',
    color:   Colors.textSecondary,
  },
  offline: {
    icon:    'warning',
    title:   'لا يوجد اتصال',
    message: 'تحقق من اتصالك بالإنترنت وحاول مجدداً',
    color:   Colors.warning,
  },
  error: {
    icon:    'error',
    title:   'حدث خطأ',
    message: 'تعذّر تحميل البيانات، يرجى المحاولة مجدداً',
    color:   Colors.danger,
  },
  custom: {
    icon:    'info',
    title:   '',
    message: '',
    color:   Colors.textSecondary,
  },
};

export function EmptyState({
  variant   = 'custom',
  title,
  message,
  icon,
  action,
  secondAction,
  style,
  compact   = false,
}: EmptyStateProps) {
  const config   = VARIANT_CONFIG[variant];
  const iconName = icon    || config.icon;
  const titleTxt = title   || config.title;
  const msgTxt   = message || config.message;

  return (
    <AnimatedView
      animation="fadeIn"
      style={[styles.container, compact && styles.compact, style]}
    >
      <View style={[styles.iconRing, { borderColor: `${config.color}30` }]}>
        <View style={[styles.iconInner, { backgroundColor: `${config.color}15` }]}>
          <AppIcon
            name={iconName}
            size={compact ? 28 : 40}
            color={config.color}
          />
        </View>
      </View>

      <View style={styles.textGroup}>
        {titleTxt ? (
          <Text style={[styles.title, compact && { fontSize: 16 }]}>
            {titleTxt}
          </Text>
        ) : null}
        {msgTxt ? (
          <Text style={[styles.message, compact && { fontSize: 13 }]}>
            {msgTxt}
          </Text>
        ) : null}
      </View>

      {action && (
        <View style={styles.actions}>
          <PrimaryButton
            label={action.label}
            onPress={action.onPress}
            size="md"
            fullWidth={false}
          />
          {secondAction && (
            <SecondaryButton
              label={secondAction.label}
              onPress={secondAction.onPress}
              size="md"
              fullWidth={false}
            />
          )}
        </View>
      )}
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
    padding:        Spacing[8],
    gap:            Spacing[4],
  },
  compact: {
    padding: Spacing[4],
    gap:     Spacing[3],
  },
  iconRing: {
    width:          96,
    height:         96,
    borderRadius:   48,
    borderWidth:    1.5,
    alignItems:     'center',
    justifyContent: 'center',
  },
  iconInner: {
    width:          76,
    height:         76,
    borderRadius:   38,
    alignItems:     'center',
    justifyContent: 'center',
  },
  textGroup: {
    alignItems: 'center',
    gap:        Spacing[2],
  },
  title: {
    ...Typography.titleMedium,
    color:     Colors.textPrimary,
    textAlign: 'center',
  },
  message: {
    ...Typography.bodyMedium,
    color:      Colors.textSecondary,
    textAlign:  'center',
    lineHeight: 22,
  },
  actions: {
    flexDirection:  'row',
    gap:            Spacing[2],
    marginTop:      Spacing[2],
    flexWrap:       'wrap',
    justifyContent: 'center',
  },
});
