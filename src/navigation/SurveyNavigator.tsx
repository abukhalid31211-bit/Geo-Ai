import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SurveyStackParamList }        from './types';
import { screenOptions, slideFromRightOptions, fadeOptions } from './screenOptions';

import SurveyModuleScreen  from '@screens/survey/SurveyModuleScreen';
// Topographic
import TopoMapScreen       from '@screens/survey/topographic/TopoMapScreen';
import TopoImportScreen    from '@screens/survey/topographic/TopoImportScreen';
import TopoContourScreen   from '@screens/survey/topographic/TopoContourScreen';
import TopoExportScreen    from '@screens/survey/topographic/TopoExportScreen';
// GPR
import GPRImportScreen     from '@screens/survey/gpr/GPRImportScreen';
import GPRRadargramScreen  from '@screens/survey/gpr/GPRRadargramScreen';
import GPRProcessingScreen from '@screens/survey/gpr/GPRProcessingScreen';
// ERT
import ERTInputScreen      from '@screens/survey/ert/ERTInputScreen';
import ERTHeatmapScreen    from '@screens/survey/ert/ERTHeatmapScreen';
import ERTAnomalyScreen    from '@screens/survey/ert/ERTAnomalyScreen';

const Stack = createNativeStackNavigator<SurveyStackParamList>();

export default function SurveyNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="SurveyModule"     component={SurveyModuleScreen}  />
      <Stack.Screen name="TopoMap"          component={TopoMapScreen}        options={fadeOptions}           />
      <Stack.Screen name="TopoImport"       component={TopoImportScreen}     options={slideFromRightOptions} />
      <Stack.Screen name="TopoContour"      component={TopoContourScreen}    options={slideFromRightOptions} />
      <Stack.Screen name="TopoExport"       component={TopoExportScreen}     options={slideFromRightOptions} />
      {/* TopoLayerManager — reuses TopoMapScreen until dedicated screen is built */}
      <Stack.Screen name="TopoLayerManager" component={TopoMapScreen}        options={slideFromRightOptions} />
      <Stack.Screen name="GPRImport"        component={GPRImportScreen}      options={slideFromRightOptions} />
      <Stack.Screen name="GPRRadargram"     component={GPRRadargramScreen}   options={fadeOptions}           />
      <Stack.Screen name="GPRProcessing"    component={GPRProcessingScreen}  options={slideFromRightOptions} />
      <Stack.Screen name="ERTInput"         component={ERTInputScreen}       options={slideFromRightOptions} />
      <Stack.Screen name="ERTHeatmap"       component={ERTHeatmapScreen}     options={fadeOptions}           />
      <Stack.Screen name="ERTAnomaly"       component={ERTAnomalyScreen}     options={slideFromRightOptions} />
    </Stack.Navigator>
  );
}
