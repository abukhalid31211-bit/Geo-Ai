import { create } from 'zustand';

interface ThreeDState {
  modelPath: string | null;
  layerOpacity: Record<string, number>;
  isLoading: boolean;
  error: string | null;
  setModelPath: (path: string) => void;
  setLayerOpacity: (layer: string, opacity: number) => void;
  clearModel: () => void;
  clearError: () => void;
}

export const useThreeDStore = create<ThreeDState>((set) => ({
  modelPath: null,
  layerOpacity: {},
  isLoading: false,
  error: null,
  setModelPath: (path: string) => set({ modelPath: path }),
  setLayerOpacity: (layer: string, opacity: number) =>
    set((state) => ({
      layerOpacity: { ...state.layerOpacity, [layer]: opacity },
    })),
  clearModel: () => set({ modelPath: null, layerOpacity: {} }),
  clearError: () => set({ error: null }),
}));
