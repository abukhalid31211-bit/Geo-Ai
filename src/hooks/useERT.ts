import { useERTStore } from '@store/ertStore';

export function useERT() {
  const { data, isLoading, error, setData, clearData, clearError } = useERTStore();

  return {
    data,
    isLoading,
    error,
    setData,
    clearData,
    clearError,
  };
}
