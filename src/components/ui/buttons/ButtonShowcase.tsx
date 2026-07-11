import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '@theme';
import {
  PrimaryButton,
  SecondaryButton,
  GhostButton,
  DangerButton,
  FABButton,
  IconButton,
  TabButton,
  SegmentedControl,
  FilterChip,
} from './index';

export default function ButtonShowcase() {
  const [activeTab, setActiveTab]         = useState('all');
  const [activeSegment, setActiveSegment] = useState('monthly');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (key: string) => {
    setActiveFilters(prev =>
      prev.includes(key)
        ? prev.filter(f => f !== key)
        : [...prev, key]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgPrimary }}>
      <ScrollView contentContainerStyle={{ padding: Spacing[4], gap: Spacing[6] }}>

        {/* Section: Primary Buttons */}
        <View style={styles.section}>
          <Text style={[Typography.titleMedium, { color: Colors.textPrimary }]}>
            الأزرار الرئيسية
          </Text>
          <PrimaryButton
            label="ابدأ فحصاً جديداً"
            onPress={() => {}}
            icon="scan"
          />
          <PrimaryButton
            label="تحميل"
            onPress={() => {}}
            size="md"
            variant="solid"
          />
          <PrimaryButton
            label="تعطيل"
            onPress={() => {}}
            disabled
          />
          <PrimaryButton
            label="جارٍ التحميل"
            onPress={() => {}}
            loading
          />
        </View>

        {/* Section: Secondary Buttons */}
        <View style={styles.section}>
          <Text style={[Typography.titleMedium, { color: Colors.textPrimary }]}>
            الأزرار الثانوية
          </Text>
          <SecondaryButton
            label="عرض التفاصيل"
            onPress={() => {}}
            icon="chevronLeft"
          />
          <SecondaryButton
            label="تصدير"
            onPress={() => {}}
            icon="download"
            color={Colors.info}
          />
        </View>

        {/* Section: Ghost Buttons */}
        <View style={styles.section}>
          <Text style={[Typography.titleMedium, { color: Colors.textPrimary }]}>
            أزرار الشفافية
          </Text>
          <GhostButton
            label="نسيت كلمة المرور؟"
            onPress={() => {}}
            underline
          />
          <GhostButton
            label="عرض الكل"
            onPress={() => {}}
            icon="chevronLeft"
          />
        </View>

        {/* Section: Danger Buttons */}
        <View style={styles.section}>
          <Text style={[Typography.titleMedium, { color: Colors.textPrimary }]}>
            أزرار الخطر
          </Text>
          <DangerButton
            label="حذف المشروع"
            onPress={() => {}}
            icon="delete"
          />
          <DangerButton
            label="إلغاء الاشتراك"
            onPress={() => {}}
            outlined
          />
        </View>

        {/* Section: Icon Buttons */}
        <View style={styles.section}>
          <Text style={[Typography.titleMedium, { color: Colors.textPrimary }]}>
            أزرار الأيقونات
          </Text>
          <View style={{ flexDirection: 'row', gap: Spacing[3] }}>
            <IconButton icon="bell"     onPress={() => {}} badge={3} />
            <IconButton icon="settings" onPress={() => {}} variant="surface" />
            <IconButton icon="search"   onPress={() => {}} variant="outline" />
            <IconButton icon="add"      onPress={() => {}} variant="filled" />
          </View>
        </View>

        {/* Section: Tab Buttons */}
        <View style={styles.section}>
          <Text style={[Typography.titleMedium, { color: Colors.textPrimary }]}>
            التبويبات
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {['all', 'gpr', 'ert', 'topo'].map((tab, i) => (
              <TabButton
                key={tab}
                label={['الكل', 'GPR', 'ERT', 'طبوغرافيا'][i]}
                isActive={activeTab === tab}
                onPress={() => setActiveTab(tab)}
              />
            ))}
          </View>
        </View>

        {/* Section: Segmented Control */}
        <View style={styles.section}>
          <Text style={[Typography.titleMedium, { color: Colors.textPrimary }]}>
            التحكم المقسم
          </Text>
          <SegmentedControl
            segments={[
              { key: 'monthly', label: 'شهري' },
              { key: 'yearly',  label: 'سنوي' },
            ]}
            selectedKey={activeSegment}
            onSelect={setActiveSegment}
          />
        </View>

        {/* Section: Filter Chips */}
        <View style={styles.section}>
          <Text style={[Typography.titleMedium, { color: Colors.textPrimary }]}>
            شرائح الفلاتر
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[2] }}>
            {[
              { key: 'gpr',    label: 'رادار GPR' },
              { key: 'ert',    label: 'مقاومة ERT' },
              { key: 'topo',   label: 'طبوغرافيا' },
              { key: 'active', label: 'نشط' },
            ].map(filter => (
              <FilterChip
                key={filter.key}
                label={filter.label}
                isSelected={activeFilters.includes(filter.key)}
                onPress={() => toggleFilter(filter.key)}
                onRemove={() => toggleFilter(filter.key)}
              />
            ))}
          </View>
        </View>

        {/* FAB spacer */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* FAB */}
      <FABButton
        icon="add"
        onPress={() => {}}
        label="مشروع جديد"
        variant="extended"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing[3],
  },
});
