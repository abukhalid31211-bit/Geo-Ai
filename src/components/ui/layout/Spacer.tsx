import React from 'react';
import { View } from 'react-native';
import { Spacing, SpacingKey } from '@theme';

interface SpacerProps {
  size?: SpacingKey;
  horizontal?: boolean;
  flex?: number;
}

export function Spacer({
  size = 4,
  horizontal = false,
  flex,
}: SpacerProps) {
  if (flex !== undefined) {
    return <View style={{ flex }} />;
  }

  const space = Spacing[size] ?? (size as number);

  return (
    <View style={
      horizontal
        ? { width: space }
        : { height: space }
    } />
  );
}
