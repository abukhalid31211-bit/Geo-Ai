export type ProjectType = 'gpr' | 'ert' | 'topographic' | 'combined';

export type ProjectStatus = 'active' | 'completed' | 'archived';

export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: 'viewer' | 'editor' | 'admin';
}

export interface ProjectFile {
  id: string;
  name: string;
  type: 'csv' | 'txt' | 'dxf' | 'dzt' | 'rd3' | 'other';
  size: number;
  uploadedAt: string;
  path: string;
  processed: boolean;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  type: ProjectType;
  status: ProjectStatus;
  progress: number;
  location?: {
    latitude: number;
    longitude: number;
    name?: string;
  };
  coordinateSystem: 'WGS84' | 'UTM';
  units: 'metric' | 'imperial';
  resolution: number;
  members: ProjectMember[];
  files: ProjectFile[];
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
}
