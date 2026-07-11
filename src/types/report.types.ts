export type ReportTemplate =
  | 'professional'
  | 'simplified'
  | 'academic'
  | 'client';

export interface Report {
  id: string;
  projectId: string;
  projectName: string;
  template: ReportTemplate;
  title: string;
  createdAt: string;
  filePath?: string;
  sections: ReportSection[];
}

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  images?: string[];
}
