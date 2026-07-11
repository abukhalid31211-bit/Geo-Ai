export type SurveyMethod = 'topographic' | 'gpr' | 'ert';

export interface SurveyConfig {
  method: SurveyMethod;
  projectId: string;
  resolution: number;
  frequency?: number;
  velocity?: number;
  timeWindow?: number;
}

export interface SurveyResult {
  id: string;
  projectId: string;
  method: SurveyMethod;
  config: SurveyConfig;
  createdAt: string;
  dataPoints: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}
