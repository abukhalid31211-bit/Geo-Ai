import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

interface NetworkStatus {
  isConnected: boolean;
  isWifi: boolean;
  isCellular: boolean;
  connectionType: string | null;
}

export function useNetworkStatus(): NetworkStatus {
  const [status, setStatus] = useState<NetworkStatus>({
    isConnected: true,
    isWifi: false,
    isCellular: false,
    connectionType: null,
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setStatus({
        isConnected: state.isConnected ?? true,
        isWifi: state.type === 'wifi',
        isCellular: state.type === 'cellular',
        connectionType: state.type,
      });
    });

    return () => unsubscribe();
  }, []);

  return status;
}
