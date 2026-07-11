import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ar');

export const Formatters = {
  // Dates
  date: (date: string | Date) =>
    dayjs(date).format('D MMMM YYYY'),
  dateShort: (date: string | Date) =>
    dayjs(date).format('DD/MM/YYYY'),
  dateTime: (date: string | Date) =>
    dayjs(date).format('D MMMM YYYY · HH:mm'),
  timeAgo: (date: string | Date) =>
    dayjs(date).fromNow(),
  // Numbers
  decimal: (value: number, digits = 2) =>
    value.toFixed(digits),
  percentage: (value: number, digits = 1) =>
    `${value.toFixed(digits)}%`,
  depth: (meters: number) =>
    `${meters.toFixed(1)} م`,
  distance: (meters: number) =>
    meters >= 1000
      ? `${(meters / 1000).toFixed(2)} كم`
      : `${meters.toFixed(0)} م`,
  fileSize: (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  },
  frequency: (hz: number) =>
    hz >= 1000000
      ? `${(hz / 1000000).toFixed(0)} MHz`
      : `${hz} Hz`,
  resistivity: (value: number) =>
    `${value.toFixed(1)} Ω·m`,
  coordinates: (lat: number, lng: number) =>
    `${lat.toFixed(6)}°N ${lng.toFixed(6)}°E`,
  confidence: (value: number) =>
    `${Math.round(value * 100)}%`,
  duration: (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  },
  currency: (amount: number, currency = 'USD') =>
    new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency,
    }).format(amount),
} as const;
