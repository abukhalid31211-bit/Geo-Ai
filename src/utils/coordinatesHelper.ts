export function wgs84ToUtm(lat: number, lon: number): { easting: number; northing: number } {
  // WGS84 to UTM conversion
  return { easting: 0, northing: 0 };
}

export function utmToWgs84(easting: number, northing: number, zone: number): { lat: number; lon: number } {
  return { lat: 0, lon: 0 };
}

export function calculateDistance(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
