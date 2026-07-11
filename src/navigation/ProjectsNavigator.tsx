import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProjectsListScreen from '@screens/projects/ProjectsListScreen';
import CreateProjectScreen from '@screens/projects/CreateProjectScreen';
import ProjectDetailScreen from '@screens/projects/ProjectDetailScreen';
import SurveyModuleScreen from '@screens/survey/SurveyModuleScreen';
import ReportsListScreen from '@screens/reports/ReportsListScreen';

import type { ProjectsStackParamList } from './types';

const Stack = createNativeStackNavigator<ProjectsStackParamList>();

export default function ProjectsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProjectsList" component={ProjectsListScreen} />
      <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
      <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
    </Stack.Navigator>
  );
}
