import { create } from 'zustand';
import type { SurveyConfig, SurveyResult } from '@apptypes/survey.types';

interface SurveyState {
  config: SurveyConfig | null;
  results: SurveyResult[];
  isLoading: boolean;
  error: string | null;
  setConfig: (config: SurveyConfig) => void;
  addResult: (result: SurveyResult) => void;
  clearResults: () => void;
  clearError: () => void;
}

export const useSurveyStore = create<SurveyState>((set) => ({
  config: null,
  results: [],
  isLoading: false,
  error: null,
  setConfig: (config: SurveyConfig) => set({ config }),
  addResult: (result: SurveyResult) =>
    set((state) => ({ results: [...state.results, result] })),
  clearResults: () => set({ results: [] }),
  clearError: () => set({ error: null }),
}));
