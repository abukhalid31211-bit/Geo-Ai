import React, { PropsWithChildren } from 'react';
import { View, ViewStyle } from 'react-native';

interface RowProps extends PropsWithChildren {
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  gap?: number;
  wrap?: boolean;
  style?: ViewStyle;
  flex?: number;
}

export function Row({
  children,
  align = 'center',
  justify = 'flex-start',
  gap = 0,
  wrap = false,
  style,
  flex,
}: RowProps) {
  return (
    <View style={[
      {
        flexDirection: 'row',
        alignItems: align,
        justifyContent: justify,
        gap,
        flexWrap: wrap ? 'wrap' : 'nowrap',
        flex,
      },
      style,
    ]}>
      {children}
    </View>
  );
}
