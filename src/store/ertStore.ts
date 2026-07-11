import { create } from 'zustand';
import type { ERTData } from '@apptypes/ert.types';

interface ERTState {
  data: ERTData | null;
  isLoading: boolean;
  error: string | null;
  setData: (data: ERTData) => void;
  clearData: () => void;
  clearError: () => void;
}

export const useERTStore = create<ERTState>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  setData: (data: ERTData) => set({ data }),
  clearData: () => set({ data: null }),
  clearError: () => set({ error: null }),
}));
