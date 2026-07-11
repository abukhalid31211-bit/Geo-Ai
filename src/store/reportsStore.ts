import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Report } from '@apptypes/report.types';

interface ReportsState {
  reports: Report[];
  isLoading: boolean;
  error: string | null;
  addReport: (report: Report) => void;
  deleteReport: (id: string) => void;
  getReport: (id: string) => Report | undefined;
  clearError: () => void;
}

export const useReportsStore = create<ReportsState>()(
  persist(
    (set, get) => ({
      reports: [],
      isLoading: false,
      error: null,
      addReport: (report: Report) =>
        set((state) => ({ reports: [...state.reports, report] })),
      deleteReport: (id: string) =>
        set((state) => ({ reports: state.reports.filter((r) => r.id !== id) })),
      getReport: (id: string) => get().reports.find((r) => r.id === id),
      clearError: () => set({ error: null }),
    }),
    {
      name: '@samgold/reports',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
