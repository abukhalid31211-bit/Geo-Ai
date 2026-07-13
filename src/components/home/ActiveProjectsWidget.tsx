import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Spacing } from '@theme';
import { SectionHeader } from '@components/ui/layout/SectionHeader';
import { EmptyState } from '@components/ui/states/EmptyState';
import { AppIcon } from '@components/ui/icons/AppIcon';
import { Colors } from '@theme';
import { ProjectMiniCard } from './ProjectMiniCard';
import type { Project } from '@apptypes/project.types';

interface ActiveProjectsWidgetProps {
  projects:      Project[];
  onPressProject: (project: Project) => void;
  onSeeAll:       () => void;
  onCreate:       () => void;
}

export function ActiveProjectsWidget({
  projects,
  onPressProject,
  onSeeAll,
  onCreate,
}: ActiveProjectsWidgetProps) {
  return (
    <>
      <SectionHeader
        title="المشاريع النشطة"
        icon={<AppIcon name="projects" size={18} color={Colors.primary} />}
        action={projects.length > 0 ? { label: 'عرض الكل', onPress: onSeeAll } : undefined}
      />

      {projects.length === 0 ? (
        <EmptyState
          variant="projects"
          compact
          action={{ label: 'إنشاء مشروع', onPress: onCreate }}
        />
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {projects.map((project) => (
            <ProjectMiniCard key={project.id} project={project} onPress={onPressProject} />
          ))}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    gap:               Spacing[3],
    paddingHorizontal: Spacing[1],
  },
});
