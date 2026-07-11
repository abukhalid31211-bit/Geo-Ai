import { useDetectorStore } from '@store/detectorStore';

export function useDetector() {
  const { currentScan, scanHistory, isScanning, error, setCurrentScan, addToHistory, clearHistory, setScanning, clearError } =
    useDetectorStore();

  return {
    currentScan,
    scanHistory,
    isScanning,
    error,
    setCurrentScan,
    addToHistory,
    clearHistory,
    setScanning,
    clearError,
  };
}
