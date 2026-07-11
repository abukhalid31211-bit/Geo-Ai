import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThreeDStackParamList }        from './types';
import { fadeOptions, slideFromRightOptions } from './screenOptions';

import ThreeDViewerScreen from '@screens/threed/ThreeDViewerScreen';
import ThreeDExportScreen from '@screens/threed/ThreeDExportScreen';

const Stack = createNativeStackNavigator<ThreeDStackParamList>();

export default function ThreeDNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ThreeDViewer" component={ThreeDViewerScreen} options={fadeOptions}           />
      <Stack.Screen name="ThreeDExport" component={ThreeDExportScreen} options={slideFromRightOptions} />
    </Stack.Navigator>
  );
}
