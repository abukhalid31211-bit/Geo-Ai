import { useGPRStore } from '@store/gprStore';

export function useGPR() {
  const { data, filters, isLoading, error, setData, setFilters, clearData, clearError } =
    useGPRStore();

  return {
    data,
    filters,
    isLoading,
    error,
    setData,
    setFilters,
    clearData,
    clearError,
  };
}
