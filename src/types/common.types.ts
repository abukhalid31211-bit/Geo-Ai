export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
  altitude?: number;
}

export interface DateRange {
  from: Date;
  to: Date;
}
