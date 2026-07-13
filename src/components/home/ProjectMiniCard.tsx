import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@theme';
import { useHaptics } from '@hooks/useHaptics';
import { AppIcon, AppIconName } from '@components/ui/icons/AppIcon';
import { ProgressBar } from '@components/ui/loading/ProgressBar';
import { PROJECT_TYPE_LABELS } from '@constants/app.constants';
import type { Project, ProjectType } from '@apptypes/project.types';

const TYPE_ICON: Record<ProjectType, AppIconName> = {
  gpr:         'radar',
  ert:         'heatmap',
  topographic: 'map',
  combined:    'layers',
};

interface ProjectMiniCardProps {
  project: Project;
  onPress: (project: Project) => void;
}

export function ProjectMiniCard({ project, onPress }: ProjectMiniCardProps) {
  const { light } = useHaptics();

  const handlePress = useCallback(() => {
    light();
    onPress(project);
  }, [light, onPress, project]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.85 }]}
    >
      <View style={styles.iconWrap}>
        <AppIcon name={TYPE_ICON[project.type]} size={24} color={Colors.primary} />
      </View>

      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={2}>{project.name}</Text>
        <Text style={styles.type} numberOfLines={1}>
          {PROJECT_TYPE_LABELS[project.type]}
        </Text>
      </View>

      <ProgressBar
        progress={project.progress / 100}
        height={3}
        variant="gradient"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width:           120,
    height:          160,
    backgroundColor: Colors.surfaceSecondary,
    borderWidth:     1,
    borderColor:     Colors.borderDefault,
    borderRadius:    Radius.cardLg,
    padding:         Spacing[3],
    justifyContent:  'space-between',
  },
  iconWrap: {
    width:           36,
    height:          36,
    borderRadius:    10,
    backgroundColor: Colors.primaryGlowDim,
    alignItems:      'center',
    justifyContent:  'center',
  },
  body: {
    flex: 1,
    gap:  2,
    marginTop: Spacing[2],
  },
  name: {
    ...Typography.labelMedium,
    color: Colors.textPrimary,
  },
  type: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
