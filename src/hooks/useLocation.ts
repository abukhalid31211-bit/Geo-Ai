import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import type { Coordinates } from '@apptypes/common.types';

export function useLocation() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('تم رفض إذن الوصول إلى الموقع');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        altitude: loc.coords.altitude ?? undefined,
      });
    })();
  }, []);

  return { location, errorMsg };
}
