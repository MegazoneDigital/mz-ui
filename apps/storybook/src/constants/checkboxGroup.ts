// CheckboxGroup Component Implementation Code
export const checkboxGroupImplementationCode = `'use client';

import { CheckIcon } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

// 기본 체크박스 옵션 타입
export interface CheckboxOption {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

// 체크박스 그룹 props 타입
export interface CheckboxGroupProps {
  options: CheckboxOption[];
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
  layout?: 'vertical' | 'horizontal' | 'grid';
  columns?: number;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

// 체크박스 그룹 컴포넌트
export function CheckboxGroup({
  options,
  value = [],
  onChange,
  className,
  layout = 'vertical',
  columns = 2,
  size = 'md',
  disabled = false,
}: CheckboxGroupProps) {
  const handleToggle = (optionId: string) => {
    if (disabled) return;
    
    const newValue = value.includes(optionId)
      ? value.filter(id => id !== optionId)
      : [...value, optionId];
    
    onChange(newValue);
  };

  const sizeClasses = {
    sm: 'text-sm gap-2',
    md: 'text-base gap-3',
    lg: 'text-lg gap-4',
  };

  const layoutClasses = {
    vertical: 'flex flex-col',
    horizontal: 'flex flex-wrap',
    grid: \`grid gap-4 grid-cols-\${columns}\`,
  };

  return (
    <div className={cn('space-y-2', layoutClasses[layout], sizeClasses[size], className)}>
      {options.map((option) => {
        const isChecked = value.includes(option.id);
        const isDisabled = disabled || option.disabled;

        return (
          <label
            key={option.id}
            className={cn(
              'relative flex items-start cursor-pointer select-none',
              isDisabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(option.id)}
                disabled={isDisabled}
                className="sr-only"
              />
              <div
                className={cn(
                  'h-4 w-4 rounded border-2 flex items-center justify-center transition-all',
                  isChecked
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500',
                  isDisabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {isChecked && <CheckIcon className="h-3 w-3" />}
              </div>
            </div>
            <div className="ml-3 flex-1">
              <div className="flex items-center gap-2">
                {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {option.label}
                </span>
              </div>
              {option.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {option.description}
                </p>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}`;

// CheckboxGroup Component Dependencies
export const checkboxGroupDependencies = ['lucide-react', 'clsx', 'tailwind-merge'];
