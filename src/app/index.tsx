import { I18nManager } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

SplashScreen.preventAutoHideAsync();

export { default } from '@navigation/RootNavigator';
