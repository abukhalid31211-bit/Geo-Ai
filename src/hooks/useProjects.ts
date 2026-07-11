import { useProjectsStore } from '@store/projectsStore';

export function useProjects() {
  const { projects, isLoading, error, addProject, updateProject, deleteProject, getProject, clearError } =
    useProjectsStore();

  return {
    projects,
    isLoading,
    error,
    addProject,
    updateProject,
    deleteProject,
    getProject,
    clearError,
  };
}
