import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '../src/hooks/useFrameworkReady';
import RootNavigator from '@navigation/RootNavigator';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <RootNavigator />
      <StatusBar style="light" backgroundColor="#0A0E1A" />
    </>
  );
}
