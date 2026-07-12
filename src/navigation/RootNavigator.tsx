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
import { useAuthStore }               from '@store/authStore';
import { linkingConfig }              from './linkingConfig';
import { RootStackParamList }         from './types';
import { PlaceholderScreen }          from './PlaceholderScreen';

import AuthNavigator   from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

// ── Inner navigator — reads auth state reactively ─────────────
function AppNavigator() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ animationTypeForReplace: 'pop' }}
        />
      ) : (
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{ animationTypeForReplace: 'push' }}
        />
      )}

      {/* Global modal screens */}
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
  );
}

// ── Root — providers + NavigationContainer ────────────────────
export default function RootNavigator() {
  const { fontsLoaded, onLayoutRootView } = useFontLoader();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.bgPrimary }} />
    );
  }

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
            <AppNavigator />
          </NavigationContainer>
        </SnackbarProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
