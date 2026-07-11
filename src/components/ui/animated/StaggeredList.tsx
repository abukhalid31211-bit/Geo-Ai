import React, { PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';
import { AnimatedView } from './AnimatedView';

interface StaggeredListProps extends PropsWithChildren {
  staggerDelay?: number;
  animation?: 'fadeIn' | 'slideUp';
  style?: ViewStyle;
}

export function StaggeredList({
  children,
  staggerDelay = 80,
  animation = 'slideUp',
  style,
}: StaggeredListProps) {
  const items = React.Children.toArray(children);

  return (
    <>
      {items.map((child, index) => (
        <AnimatedView
          key={index}
          animation={animation}
          delay={index * staggerDelay}
          style={style}
        >
          {child}
        </AnimatedView>
      ))}
    </>
  );
}
