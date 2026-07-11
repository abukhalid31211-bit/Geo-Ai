import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';

interface ColumnProps extends PropsWithChildren {
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-evenly';
  gap?: number;
  style?: ViewStyle;
  flex?: number;
}

export function Column({
  children,
  align = 'stretch',
  justify = 'flex-start',
  gap = 0,
  style,
  flex,
}: ColumnProps) {
  return (
    <View style={[
      {
        flexDirection: 'column',
        alignItems: align,
        justifyContent: justify,
        gap,
        flex,
      },
      style,
    ]}>
      {children}
    </View>
  );
}
