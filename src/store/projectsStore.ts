import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Project } from '@apptypes/project.types';

interface ProjectsState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
  clearError: () => void;
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: [],
      isLoading: false,
      error: null,
      addProject: (project: Project) => {
        set((state) => ({ projects: [...state.projects, project] }));
      },
      updateProject: (id: string, updates: Partial<Project>) => {
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },
      deleteProject: (id: string) => {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        }));
      },
      getProject: (id: string) => get().projects.find((p) => p.id === id),
      clearError: () => set({ error: null }),
    }),
    {
      name: '@samgold/projects_store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
