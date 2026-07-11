import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  isDarkMode: boolean;
  isRTL: boolean;
  language: 'ar' | 'en';
  units: 'metric' | 'imperial';
  hapticsEnabled: boolean;
  audioEnabled: boolean;
  notificationsEnabled: boolean;
  setDarkMode: (val: boolean) => void;
  setLanguage: (lang: 'ar' | 'en') => void;
  setUnits: (units: 'metric' | 'imperial') => void;
  setHaptics: (val: boolean) => void;
  setAudio: (val: boolean) => void;
  setNotifications: (val: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      isDarkMode: true,
      isRTL: true,
      language: 'ar',
      units: 'metric',
      hapticsEnabled: true,
      audioEnabled: true,
      notificationsEnabled: true,
      setDarkMode: (val: boolean) => set({ isDarkMode: val }),
      setLanguage: (lang: 'ar' | 'en') => set({ language: lang, isRTL: lang === 'ar' }),
      setUnits: (units: 'metric' | 'imperial') => set({ units }),
      setHaptics: (val: boolean) => set({ hapticsEnabled: val }),
      setAudio: (val: boolean) => set({ audioEnabled: val }),
      setNotifications: (val: boolean) => set({ notificationsEnabled: val }),
    }),
    {
      name: '@samgold/settings_store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
