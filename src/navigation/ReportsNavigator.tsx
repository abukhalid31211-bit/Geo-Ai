import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ReportsListScreen from '@screens/reports/ReportsListScreen';
import ReportTemplatesScreen from '@screens/reports/ReportTemplatesScreen';
import ReportViewerScreen from '@screens/reports/ReportViewerScreen';
import ReportExportScreen from '@screens/reports/ReportExportScreen';

import type { ReportsStackParamList } from './types';

const Stack = createNativeStackNavigator<ReportsStackParamList>();

export default function ReportsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReportsList" component={ReportsListScreen} />
      <Stack.Screen name="ReportTemplates" component={ReportTemplatesScreen} />
      <Stack.Screen name="ReportViewer" component={ReportViewerScreen} />
      <Stack.Screen name="ReportExport" component={ReportExportScreen} />
    </Stack.Navigator>
  );
}
