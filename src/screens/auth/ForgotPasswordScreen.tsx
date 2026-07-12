import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors, Spacing } from '@theme';
import { AppHeader } from '@components/ui/layout/AppHeader';
import { InfoCard }  from '@components/ui/cards/InfoCard';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="استعادة كلمة المرور"
        leftAction="back"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <InfoCard
          variant="info"
          title="قريباً"
          message="ستُبنى هذه الشاشة في البرومبت #11 بشكل كامل"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: Colors.bgPrimary,
  },
  content: {
    flex:           1,
    padding:        Spacing[5],
    justifyContent: 'center',
  },
});
