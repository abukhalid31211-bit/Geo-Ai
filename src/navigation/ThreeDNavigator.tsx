import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ThreeDViewerScreen from '@screens/threed/ThreeDViewerScreen';
import ThreeDExportScreen from '@screens/threed/ThreeDExportScreen';

import type { ThreeDStackParamList } from './types';

const Stack = createNativeStackNavigator<ThreeDStackParamList>();

export default function ThreeDNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ThreeDViewer" component={ThreeDViewerScreen} />
      <Stack.Screen name="ThreeDExport" component={ThreeDExportScreen} />
    </Stack.Navigator>
  );
}
