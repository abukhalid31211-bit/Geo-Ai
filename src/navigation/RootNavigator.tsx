import React from 'react';
import { View } from 'react-native';
import { NavigationContainer }        from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView }     from 'react-native-gesture-handler';
import { SafeAreaProvider }           from 'react-native-safe-area-context';
import { StatusBar }                  from 'expo-status-bar';
import { useFontLoader }              from '@hooks/useFontLoader';
import { Colors }                     from '@theme';
import { SnackbarProvider }           from '@components/ui/feedback';

import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { fontsLoaded, onLayoutRootView } = useFontLoader();

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: Colors.bgPrimary }} />;
  }

  // Will be replaced with real auth state in Prompt #21
  const isAuthenticated = false;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SnackbarProvider>
          <NavigationContainer onReady={onLayoutRootView}>
            <StatusBar style="light" backgroundColor={Colors.bgPrimary} />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {!isAuthenticated ? (
                <Stack.Screen name="Auth" component={AuthNavigator} />
              ) : (
                <Stack.Screen name="Main" component={MainNavigator} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SnackbarProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
