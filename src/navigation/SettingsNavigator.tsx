import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsStackParamList }      from './types';
import { screenOptions, slideFromRightOptions } from './screenOptions';

import SettingsMainScreen         from '@screens/settings/SettingsMainScreen';
import ProfileScreen              from '@screens/settings/ProfileScreen';
import EditProfileScreen          from '@screens/settings/EditProfileScreen';
import SensorSettingsScreen       from '@screens/settings/SensorSettingsScreen';
import NotificationSettingsScreen from '@screens/settings/NotificationSettingsScreen';
import PrivacyScreen              from '@screens/settings/PrivacyScreen';
import HelpScreen                 from '@screens/settings/HelpScreen';
import PlansScreen                from '@screens/subscriptions/PlansScreen';
import PaymentScreen              from '@screens/subscriptions/PaymentScreen';
import BillingHistoryScreen       from '@screens/subscriptions/BillingHistoryScreen';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="SettingsMain"         component={SettingsMainScreen}         />
      <Stack.Screen name="Profile"              component={ProfileScreen}              options={slideFromRightOptions} />
      <Stack.Screen name="EditProfile"          component={EditProfileScreen}          options={slideFromRightOptions} />
      <Stack.Screen name="SensorSettings"       component={SensorSettingsScreen}       options={slideFromRightOptions} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} options={slideFromRightOptions} />
      <Stack.Screen name="Privacy"              component={PrivacyScreen}             options={slideFromRightOptions} />
      <Stack.Screen name="Help"                 component={HelpScreen}                options={slideFromRightOptions} />
      {/* About — reuses HelpScreen until dedicated screen is built */}
      <Stack.Screen name="About"                component={HelpScreen}                options={slideFromRightOptions} />
      <Stack.Screen name="Plans"                component={PlansScreen}               options={slideFromRightOptions} />
      <Stack.Screen name="Payment"              component={PaymentScreen}             options={slideFromRightOptions} />
      <Stack.Screen name="BillingHistory"       component={BillingHistoryScreen}      options={slideFromRightOptions} />
    </Stack.Navigator>
  );
}
