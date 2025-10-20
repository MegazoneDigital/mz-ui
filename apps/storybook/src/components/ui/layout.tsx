import { cn } from '@/lib/utils';
import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container = ({ className, children, size = 'xl', ...props }: ContainerProps) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)} {...props}>
      {children}
    </div>
  );
};

Container.displayName = 'Container';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Section = ({ className, children, spacing = 'md', ...props }: SectionProps) => {
  const spacingClasses = {
    sm: 'py-6',
    md: 'py-8 sm:py-12',
    lg: 'py-12 sm:py-16',
    xl: 'py-16 sm:py-20',
  };

  return (
    <section className={cn(spacingClasses[spacing], className)} {...props}>
      {children}
    </section>
  );
};

Section.displayName = 'Section';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

export const Grid = ({ className, children, cols = 1, gap = 'md', responsive = false, ...props }: GridProps) => {
  const colsClasses = responsive ? `grid-cols-1 md:grid-cols-2 lg:grid-cols-${cols}` : `grid-cols-${cols}`;

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  };

  return (
    <div className={cn('grid', colsClasses, gapClasses[gap], className)} {...props}>
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';

interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
}

export const Flex = ({ className, children, direction = 'row', align = 'start', justify = 'start', gap = 'md', wrap = false, ...props }: FlexProps) => {
  const directionClass = direction === 'col' ? 'flex-col' : 'flex-row';
  const alignClass = `items-${align}`;
  const justifyClass = `justify-${justify}`;
  const gapClass = gap === 'sm' ? 'gap-2' : gap === 'md' ? 'gap-4' : gap === 'lg' ? 'gap-6' : 'gap-8';
  const wrapClass = wrap ? 'flex-wrap' : '';

  return (
    <div className={cn('flex', directionClass, alignClass, justifyClass, gapClass, wrapClass, className)} {...props}>
      {children}
    </div>
  );
};

Flex.displayName = 'Flex';
