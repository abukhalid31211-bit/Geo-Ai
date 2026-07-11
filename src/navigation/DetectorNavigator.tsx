import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DetectorMainScreen from '@screens/detector/DetectorMainScreen';
import DetectorResultsScreen from '@screens/detector/DetectorResultsScreen';
import DetectorHistoryScreen from '@screens/detector/DetectorHistoryScreen';

import type { DetectorStackParamList } from './types';

const Stack = createNativeStackNavigator<DetectorStackParamList>();

export default function DetectorNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DetectorMain" component={DetectorMainScreen} />
      <Stack.Screen name="DetectorResults" component={DetectorResultsScreen} />
      <Stack.Screen name="DetectorHistory" component={DetectorHistoryScreen} />
    </Stack.Navigator>
  );
}
