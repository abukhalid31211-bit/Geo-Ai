import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing } from '@theme';
import {
  TextInput,
  PasswordInput,
  SearchInput,
  TextArea,
  SelectInput,
  OTPInput,
  SliderInput,
  ToggleSwitch,
  CheckboxInput,
  RadioGroup,
} from './index';

export default function InputShowcase() {
  const [text, setText]               = useState('');
  const [password, setPassword]       = useState('');
  const [search, setSearch]           = useState('');
  const [description, setDescription] = useState('');
  const [selected, setSelected]       = useState<string | null>(null);
  const [otp, setOtp]                 = useState('');
  const [sliderVal, setSliderVal]     = useState(50);
  const [toggled, setToggled]         = useState(false);
  const [checked, setChecked]         = useState(false);
  const [radio, setRadio]             = useState<string | null>(null);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bgPrimary }}>
      <ScrollView contentContainerStyle={{
        padding: Spacing[4],
        gap: Spacing[6],
      }}>

        <Text style={[Typography.displaySmall, {
          color: Colors.primary, textAlign: 'center',
        }]}>
          مكونات الإدخال
        </Text>

        {/* Text Input */}
        <View style={{ gap: Spacing[3] }}>
          <Text style={[Typography.titleSmall, { color: Colors.textPrimary }]}>
            حقل النص
          </Text>
          <TextInput
            label="اسم المشروع"
            value={text}
            onChangeText={setText}
            leftIcon="folder"
            required
          />
          <TextInput
            label="مع خطأ"
            value=""
            onChangeText={() => {}}
            error="هذا الحقل مطلوب"
            leftIcon="file"
          />
          <TextInput
            label="ناجح"
            value="مدخل صحيح"
            onChangeText={() => {}}
            success
            leftIcon="checkCircle"
          />
        </View>

        {/* Password */}
        <View style={{ gap: Spacing[3] }}>
          <Text style={[Typography.titleSmall, { color: Colors.textPrimary }]}>
            كلمة المرور
          </Text>
          <PasswordInput
            label="كلمة المرور"
            value={password}
            onChangeText={setPassword}
            showStrengthBar
          />
        </View>

        {/* Search */}
        <View style={{ gap: Spacing[3] }}>
          <Text style={[Typography.titleSmall, { color: Colors.textPrimary }]}>
            بحث
          </Text>
          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder="ابحث في المشاريع..."
            showCancelButton
          />
        </View>

        {/* TextArea */}
        <View style={{ gap: Spacing[3] }}>
          <Text style={[Typography.titleSmall, { color: Colors.textPrimary }]}>
            منطقة النص
          </Text>
          <TextArea
            label="وصف المشروع"
            value={description}
            onChangeText={setDescription}
            maxLength={300}
            minLines={3}
          />
        </View>

        {/* Select */}
        <View style={{ gap: Spacing[3] }}>
          <Text style={[Typography.titleSmall, { color: Colors.textPrimary }]}>
            قائمة الاختيار
          </Text>
          <SelectInput
            label="نوع المشروع"
            value={selected}
            onSelect={(opt) => setSelected(opt.key)}
            options={[
              { key: 'gpr',  label: 'رادار أرضي GPR',
                subtitle: 'الكشف عن الأهداف تحت الأرض' },
              { key: 'ert',  label: 'مقاومة كهربائية ERT',
                subtitle: 'قياس المقاومة الكهربائية للتربة' },
              { key: 'topo', label: 'مسح طبوغرافي',
                subtitle: 'رسم خرائط الارتفاعات' },
              { key: 'comb', label: 'مسح مدمج',
                subtitle: 'دمج جميع أنواع المسح' },
            ]}
            placeholder="اختر نوع المشروع"
          />
        </View>

        {/* OTP */}
        <View style={{ gap: Spacing[3] }}>
          <Text style={[Typography.titleSmall, { color: Colors.textPrimary }]}>
            رمز التحقق
          </Text>
          <OTPInput
            value={otp}
            onChangeText={setOtp}
            onComplete={(code) => console.log('OTP:', code)}
            length={6}
          />
        </View>

        {/* Slider */}
        <View style={{ gap: Spacing[3] }}>
          <Text style={[Typography.titleSmall, { color: Colors.textPrimary }]}>
            شريط التمرير
          </Text>
          <SliderInput
            label="حساسية الكاشف"
            value={sliderVal}
            min={0}
            max={100}
            step={5}
            onChange={setSliderVal}
            unit="%"
          />
        </View>

        {/* Toggle */}
        <View style={{ gap: Spacing[3] }}>
          <Text style={[Typography.titleSmall, { color: Colors.textPrimary }]}>
            مفتاح التبديل
          </Text>
          <ToggleSwitch
            value={toggled}
            onToggle={setToggled}
            label="التنبيهات الصوتية"
            subtitle="تشغيل صوت عند الاكتشاف"
          />
          <ToggleSwitch
            value={true}
            onToggle={() => {}}
            label="الاهتزاز"
            subtitle="اهتزاز الجهاز عند الاقتراب"
            disabled
          />
        </View>

        {/* Checkbox */}
        <View style={{ gap: Spacing[3] }}>
          <Text style={[Typography.titleSmall, { color: Colors.textPrimary }]}>
            خانة الاختيار
          </Text>
          <CheckboxInput
            checked={checked}
            onToggle={setChecked}
            label="أوافق على شروط الاستخدام"
            subtitle="اقرأ الشروط قبل الموافقة"
          />
        </View>

        {/* Radio */}
        <View style={{ gap: Spacing[3] }}>
          <Text style={[Typography.titleSmall, { color: Colors.textPrimary }]}>
            اختيار واحد
          </Text>
          <RadioGroup
            label="وحدات القياس"
            value={radio}
            onSelect={setRadio}
            options={[
              { key: 'metric',   label: 'متري',       subtitle: 'متر، كيلومتر' },
              { key: 'imperial', label: 'إمبراطوري',  subtitle: 'قدم، ميل' },
            ]}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
