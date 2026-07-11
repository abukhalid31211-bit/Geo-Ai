import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SurveyModuleScreen from '@screens/survey/SurveyModuleScreen';
import TopoMapScreen from '@screens/survey/topographic/TopoMapScreen';
import TopoImportScreen from '@screens/survey/topographic/TopoImportScreen';
import TopoContourScreen from '@screens/survey/topographic/TopoContourScreen';
import TopoExportScreen from '@screens/survey/topographic/TopoExportScreen';
import GPRImportScreen from '@screens/survey/gpr/GPRImportScreen';
import GPRRadargramScreen from '@screens/survey/gpr/GPRRadargramScreen';
import GPRProcessingScreen from '@screens/survey/gpr/GPRProcessingScreen';
import ERTInputScreen from '@screens/survey/ert/ERTInputScreen';
import ERTHeatmapScreen from '@screens/survey/ert/ERTHeatmapScreen';
import ERTAnomalyScreen from '@screens/survey/ert/ERTAnomalyScreen';

import type { SurveyStackParamList } from './types';

const Stack = createNativeStackNavigator<SurveyStackParamList>();

export default function SurveyNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SurveyModule" component={SurveyModuleScreen} />
      <Stack.Screen name="TopoMap" component={TopoMapScreen} />
      <Stack.Screen name="TopoImport" component={TopoImportScreen} />
      <Stack.Screen name="TopoContour" component={TopoContourScreen} />
      <Stack.Screen name="TopoExport" component={TopoExportScreen} />
      <Stack.Screen name="GPRImport" component={GPRImportScreen} />
      <Stack.Screen name="GPRRadargram" component={GPRRadargramScreen} />
      <Stack.Screen name="GPRProcessing" component={GPRProcessingScreen} />
      <Stack.Screen name="ERTInput" component={ERTInputScreen} />
      <Stack.Screen name="ERTHeatmap" component={ERTHeatmapScreen} />
      <Stack.Screen name="ERTAnomaly" component={ERTAnomalyScreen} />
    </Stack.Navigator>
  );
}
