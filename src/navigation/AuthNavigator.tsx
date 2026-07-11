import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList }          from './types';
import { noAnimationOptions, slideFromRightOptions } from './screenOptions';

import SplashScreen         from '@screens/auth/SplashScreen';
import OnboardingScreen     from '@screens/auth/OnboardingScreen';
import LoginScreen          from '@screens/auth/LoginScreen';
import RegisterScreen       from '@screens/auth/RegisterScreen';
import ForgotPasswordScreen from '@screens/auth/ForgotPasswordScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={noAnimationOptions}
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ animation: 'fade', animationDuration: 400, headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={slideFromRightOptions}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={slideFromRightOptions}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={slideFromRightOptions}
      />
    </Stack.Navigator>
  );
}
