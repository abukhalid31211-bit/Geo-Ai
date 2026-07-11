import { useEffect, useState, useCallback } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export function useFontLoader() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState<Error | null>(null);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        // Cairo font files — graceful fallback to system fonts if missing
        'Cairo-Regular':  require('@assets/fonts/Cairo-Regular.ttf'),
        'Cairo-Medium':   require('@assets/fonts/Cairo-Medium.ttf'),
        'Cairo-SemiBold': require('@assets/fonts/Cairo-SemiBold.ttf'),
        'Cairo-Bold':     require('@assets/fonts/Cairo-Bold.ttf'),
        // Monospace for data
        'SpaceMono-Regular': require('@assets/fonts/SpaceMono-Regular.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      // Custom fonts failed — use system fonts (app still works)
      console.warn('Custom fonts failed to load, using system fonts:', error);
      setFontsLoaded(true);
    }
  };

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  return { fontsLoaded, fontError, onLayoutRootView };
}
