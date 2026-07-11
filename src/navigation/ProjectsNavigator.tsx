import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProjectsStackParamList }      from './types';
import { screenOptions, slideFromRightOptions } from './screenOptions';

import ProjectsListScreen  from '@screens/projects/ProjectsListScreen';
import CreateProjectScreen from '@screens/projects/CreateProjectScreen';
import ProjectDetailScreen from '@screens/projects/ProjectDetailScreen';

const Stack = createNativeStackNavigator<ProjectsStackParamList>();

export default function ProjectsNavigator() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="ProjectsList"  component={ProjectsListScreen}  />
      <Stack.Screen name="CreateProject" component={CreateProjectScreen}
        options={slideFromRightOptions} />
      <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen}
        options={slideFromRightOptions} />
      {/* FileViewer — built in a later prompt */}
      <Stack.Screen name="FileViewer"    component={ProjectDetailScreen}
        options={slideFromRightOptions} />
    </Stack.Navigator>
  );
}
