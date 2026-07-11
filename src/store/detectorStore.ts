import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ScanResult } from '@apptypes/detector.types';

interface DetectorState {
  currentScan: ScanResult | null;
  scanHistory: ScanResult[];
  isScanning: boolean;
  error: string | null;
  setCurrentScan: (scan: ScanResult) => void;
  addToHistory: (scan: ScanResult) => void;
  clearHistory: () => void;
  setScanning: (scanning: boolean) => void;
  clearError: () => void;
}

export const useDetectorStore = create<DetectorState>()(
  persist(
    (set) => ({
      currentScan: null,
      scanHistory: [],
      isScanning: false,
      error: null,
      setCurrentScan: (scan: ScanResult) => set({ currentScan: scan }),
      addToHistory: (scan: ScanResult) =>
        set((state) => ({
          scanHistory: [scan, ...state.scanHistory].slice(0, 100),
        })),
      clearHistory: () => set({ scanHistory: [] }),
      setScanning: (scanning: boolean) => set({ isScanning: scanning }),
      clearError: () => set({ error: null }),
    }),
    {
      name: '@samgold/detector',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
