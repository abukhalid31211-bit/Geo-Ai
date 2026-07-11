import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList }  from './types';
import { CustomTabBar }      from '@components/ui/navigation/CustomTabBar';

import HomeNavigator      from './HomeNavigator';
import ProjectsNavigator  from './ProjectsNavigator';
import DetectorNavigator  from './DetectorNavigator';
import ThreeDNavigator    from './ThreeDNavigator';
import SettingsNavigator  from './SettingsNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        lazy:        true,
      }}
      initialRouteName="HomeTab"
    >
      <Tab.Screen name="HomeTab"     component={HomeNavigator}     />
      <Tab.Screen name="ProjectsTab" component={ProjectsNavigator} />
      <Tab.Screen name="DetectorTab" component={DetectorNavigator} />
      <Tab.Screen name="ThreeDTab"   component={ThreeDNavigator}   />
      <Tab.Screen name="SettingsTab" component={SettingsNavigator} />
    </Tab.Navigator>
  );
}
