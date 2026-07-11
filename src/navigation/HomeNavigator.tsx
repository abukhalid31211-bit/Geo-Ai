import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from './types';
import { screenOptions, slideFromRightOptions } from './screenOptions';

import HomeScreen          from '@screens/home/HomeScreen';
import NotificationsScreen from '@screens/home/NotificationsScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeMain"      component={HomeScreen}          />
      <Stack.Screen name="Notifications" component={NotificationsScreen}
        options={slideFromRightOptions} />
    </Stack.Navigator>
  );
}
