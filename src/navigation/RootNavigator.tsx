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
import { RootStackParamList }         from './types';
import { linkingConfig }              from './linkingConfig';
import { PlaceholderScreen }          from './PlaceholderScreen';

import AuthNavigator   from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { fontsLoaded, onLayoutRootView } = useFontLoader();

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: Colors.bgPrimary }} />;
  }

  // NOTE: Will be replaced with real auth state in Prompt #21
  const isAuthenticated = false;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SnackbarProvider>
          <NavigationContainer
            linking={linkingConfig}
            onReady={onLayoutRootView}
            theme={{
              dark:   true,
              colors: {
                primary:      Colors.primary,
                background:   Colors.bgPrimary,
                card:         Colors.surfacePrimary,
                text:         Colors.textPrimary,
                border:       Colors.borderDefault,
                notification: Colors.danger,
              },
            }}
          >
            <StatusBar style="light" backgroundColor={Colors.bgPrimary} />

            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {!isAuthenticated ? (
                <Stack.Screen name="Auth" component={AuthNavigator} />
              ) : (
                <Stack.Screen name="Main" component={DrawerNavigator} />
              )}

              {/* Global Modal Screens */}
              <Stack.Screen
                name="Paywall"
                component={PlaceholderScreen}
                options={{
                  presentation: 'modal',
                  animation:    'slide_from_bottom',
                  headerShown:  false,
                }}
              />
              <Stack.Screen
                name="ImageViewer"
                component={PlaceholderScreen}
                options={{
                  presentation: 'fullScreenModal',
                  animation:    'fade',
                  headerShown:  false,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SnackbarProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
