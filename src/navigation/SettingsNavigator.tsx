import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsMainScreen from '@screens/settings/SettingsMainScreen';
import ProfileScreen from '@screens/settings/ProfileScreen';
import EditProfileScreen from '@screens/settings/EditProfileScreen';
import SensorSettingsScreen from '@screens/settings/SensorSettingsScreen';
import NotificationSettingsScreen from '@screens/settings/NotificationSettingsScreen';
import PrivacyScreen from '@screens/settings/PrivacyScreen';
import HelpScreen from '@screens/settings/HelpScreen';
import PlansScreen from '@screens/subscriptions/PlansScreen';

import type { SettingsStackParamList } from './types';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={SettingsMainScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="SensorSettings" component={SensorSettingsScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
    </Stack.Navigator>
  );
}
