import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@theme';

// Icon libraries used
type IconLibrary = 'material' | 'ion' | 'feather';

// All app icon names mapped
export type AppIconName =
  // Navigation
  | 'home'
  | 'projects'
  | 'detector'
  | 'threed'
  | 'settings'
  // Actions
  | 'add'
  | 'edit'
  | 'delete'
  | 'close'
  | 'back'
  | 'forward'
  | 'search'
  | 'filter'
  | 'sort'
  | 'share'
  | 'download'
  | 'upload'
  | 'refresh'
  | 'save'
  | 'copy'
  // Survey
  | 'map'
  | 'location'
  | 'gps'
  | 'layers'
  | 'contour'
  | 'radar'
  | 'heatmap'
  // Files
  | 'file'
  | 'fileCsv'
  | 'fileGpr'
  | 'folder'
  | 'pdf'
  // Status
  | 'check'
  | 'checkCircle'
  | 'warning'
  | 'error'
  | 'info'
  | 'lock'
  | 'unlock'
  // UI
  | 'bell'
  | 'bellOff'
  | 'user'
  | 'users'
  | 'chevronRight'
  | 'chevronLeft'
  | 'chevronDown'
  | 'chevronUp'
  | 'dots'
  | 'eye'
  | 'eyeOff'
  | 'star'
  | 'crown'
  // Detector specific
  | 'gold'
  | 'void'
  | 'water'
  | 'pipe'
  | 'metal'
  | 'depth'
  | 'target'
  | 'scan'
  | 'wave'
  // 3D
  | 'cube'
  | 'sphere'
  | 'rotate'
  | 'zoomIn'
  | 'zoomOut'
  | 'transparency'
  // Reports
  | 'report'
  | 'chart'
  | 'analytics'
  // Payment
  | 'card'
  | 'payment'
  | 'subscription';

type IconMap = {
  [key in AppIconName]: {
    lib: IconLibrary;
    name: string;
  };
};

const ICON_MAP: IconMap = {
  // Navigation
  home:         { lib: 'ion',      name: 'home-outline' },
  projects:     { lib: 'ion',      name: 'folder-outline' },
  detector:     { lib: 'material', name: 'radar' },
  threed:       { lib: 'material', name: 'cube-outline' },
  settings:     { lib: 'ion',      name: 'settings-outline' },
  // Actions
  add:          { lib: 'ion',      name: 'add' },
  edit:         { lib: 'feather',  name: 'edit-2' },
  delete:       { lib: 'feather',  name: 'trash-2' },
  close:        { lib: 'ion',      name: 'close' },
  back:         { lib: 'ion',      name: 'arrow-back' },
  forward:      { lib: 'ion',      name: 'arrow-forward' },
  search:       { lib: 'feather',  name: 'search' },
  filter:       { lib: 'feather',  name: 'sliders' },
  sort:         { lib: 'material', name: 'sort' },
  share:        { lib: 'feather',  name: 'share-2' },
  download:     { lib: 'feather',  name: 'download' },
  upload:       { lib: 'feather',  name: 'upload' },
  refresh:      { lib: 'feather',  name: 'refresh-cw' },
  save:         { lib: 'feather',  name: 'save' },
  copy:         { lib: 'feather',  name: 'copy' },
  // Survey
  map:          { lib: 'feather',  name: 'map' },
  location:     { lib: 'ion',      name: 'location-outline' },
  gps:          { lib: 'material', name: 'crosshairs-gps' },
  layers:       { lib: 'feather',  name: 'layers' },
  contour:      { lib: 'material', name: 'map-outline' },
  radar:        { lib: 'material', name: 'radar' },
  heatmap:      { lib: 'material', name: 'fire' },
  // Files
  file:         { lib: 'feather',  name: 'file' },
  fileCsv:      { lib: 'material', name: 'file-delimited-outline' },
  fileGpr:      { lib: 'material', name: 'waveform' },
  folder:       { lib: 'feather',  name: 'folder' },
  pdf:          { lib: 'material', name: 'file-pdf-box' },
  // Status
  check:        { lib: 'feather',  name: 'check' },
  checkCircle:  { lib: 'feather',  name: 'check-circle' },
  warning:      { lib: 'feather',  name: 'alert-triangle' },
  error:        { lib: 'feather',  name: 'alert-circle' },
  info:         { lib: 'feather',  name: 'info' },
  lock:         { lib: 'feather',  name: 'lock' },
  unlock:       { lib: 'feather',  name: 'unlock' },
  // UI
  bell:         { lib: 'feather',  name: 'bell' },
  bellOff:      { lib: 'feather',  name: 'bell-off' },
  user:         { lib: 'feather',  name: 'user' },
  users:        { lib: 'feather',  name: 'users' },
  chevronRight: { lib: 'feather',  name: 'chevron-right' },
  chevronLeft:  { lib: 'feather',  name: 'chevron-left' },
  chevronDown:  { lib: 'feather',  name: 'chevron-down' },
  chevronUp:    { lib: 'feather',  name: 'chevron-up' },
  dots:         { lib: 'feather',  name: 'more-vertical' },
  eye:          { lib: 'feather',  name: 'eye' },
  eyeOff:       { lib: 'feather',  name: 'eye-off' },
  star:         { lib: 'feather',  name: 'star' },
  crown:        { lib: 'material', name: 'crown-outline' },
  // Detector
  gold:         { lib: 'material', name: 'gold' },
  void:         { lib: 'material', name: 'cube-off-outline' },
  water:        { lib: 'material', name: 'water-outline' },
  pipe:         { lib: 'material', name: 'pipe' },
  metal:        { lib: 'material', name: 'cog-outline' },
  depth:        { lib: 'material', name: 'arrow-collapse-down' },
  target:       { lib: 'material', name: 'crosshairs' },
  scan:         { lib: 'material', name: 'line-scan' },
  wave:         { lib: 'material', name: 'sine-wave' },
  // 3D
  cube:         { lib: 'material', name: 'cube-outline' },
  sphere:       { lib: 'material', name: 'circle-outline' },
  rotate:       { lib: 'material', name: 'rotate-3d-variant' },
  zoomIn:       { lib: 'feather',  name: 'zoom-in' },
  zoomOut:      { lib: 'feather',  name: 'zoom-out' },
  transparency: { lib: 'material', name: 'opacity' },
  // Reports
  report:       { lib: 'feather',  name: 'file-text' },
  chart:        { lib: 'feather',  name: 'bar-chart-2' },
  analytics:    { lib: 'material', name: 'chart-line' },
  // Payment
  card:         { lib: 'feather',  name: 'credit-card' },
  payment:      { lib: 'material', name: 'cash-multiple' },
  subscription: { lib: 'material', name: 'star-circle-outline' },
};

interface AppIconProps {
  name: AppIconName;
  size?: number;
  color?: string;
}

export function AppIcon({
  name,
  size = 24,
  color = Colors.textPrimary,
}: AppIconProps) {
  const { lib, name: iconName } = ICON_MAP[name];

  if (lib === 'material') {
    return (
      <MaterialCommunityIcons
        name={iconName as any}
        size={size}
        color={color}
      />
    );
  }

  if (lib === 'ion') {
    return (
      <Ionicons
        name={iconName as any}
        size={size}
        color={color}
      />
    );
  }

  return (
    <Feather
      name={iconName as any}
      size={size}
      color={color}
    />
  );
}
