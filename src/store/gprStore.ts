import { create } from 'zustand';
import type { GPRData, GPRFilters } from '@apptypes/gpr.types';

interface GPRState {
  data: GPRData | null;
  filters: GPRFilters;
  isLoading: boolean;
  error: string | null;
  setData: (data: GPRData) => void;
  setFilters: (filters: Partial<GPRFilters>) => void;
  clearData: () => void;
  clearError: () => void;
}

export const useGPRStore = create<GPRState>((set) => ({
  data: null,
  filters: {
    backgroundRemoval: false,
    gainControl: 1.0,
    bandpassMin: 0,
    bandpassMax: 0,
    sensitivity: 1.0,
  },
  isLoading: false,
  error: null,
  setData: (data: GPRData) => set({ data }),
  setFilters: (filters: Partial<GPRFilters>) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  clearData: () => set({ data: null }),
  clearError: () => set({ error: null }),
}));
