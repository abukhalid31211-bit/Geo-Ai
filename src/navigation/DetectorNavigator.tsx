import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetectorStackParamList }      from './types';
import { screenOptions, slideFromRightOptions, fadeOptions } from './screenOptions';

import DetectorMainScreen    from '@screens/detector/DetectorMainScreen';
import DetectorResultsScreen from '@screens/detector/DetectorResultsScreen';
import DetectorHistoryScreen from '@screens/detector/DetectorHistoryScreen';

const Stack = createNativeStackNavigator<DetectorStackParamList>();

export default function DetectorNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="DetectorMain"    component={DetectorMainScreen}    options={fadeOptions}           />
      <Stack.Screen name="DetectorResults" component={DetectorResultsScreen} options={slideFromRightOptions} />
      <Stack.Screen name="DetectorHistory" component={DetectorHistoryScreen} options={slideFromRightOptions} />
      {/* ScanDetail — reuses DetectorResultsScreen until dedicated screen is built */}
      <Stack.Screen name="ScanDetail"      component={DetectorResultsScreen} options={slideFromRightOptions} />
    </Stack.Navigator>
  );
}
