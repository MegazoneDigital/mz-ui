'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="grid place-content-center text-current transition-none">
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

// 체크박스 그룹을 위한 타입 정의
interface CheckboxOption {
  id: string;
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  orientation?: 'horizontal' | 'vertical';
  columns?: number;
  title?: string;
  description?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

function CheckboxGroup({
  options,
  value,
  defaultValue = [],
  onValueChange,
  orientation = 'vertical',
  columns,
  title,
  description,
  required = false,
  className,
  disabled = false,
}: CheckboxGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
  const currentValue = value ?? internalValue;

  const handleValueChange = (optionValue: string, checked: boolean) => {
    const newValue = checked ? [...currentValue, optionValue] : currentValue.filter(v => v !== optionValue);

    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const gridClass = columns ? `grid grid-cols-${columns} gap-4` : orientation === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-3';

  return (
    <div className={cn('space-y-3', className)}>
      {title && (
        <div className="space-y-1">
          <h3 className="text-sm leading-none font-medium">
            {title}
            {required && <span className="text-destructive ml-1">*</span>}
          </h3>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
      )}

      <div className={gridClass}>
        {options.map(option => {
          const isChecked = currentValue.includes(option.value);
          const isDisabled = disabled || option.disabled;

          return (
            <div key={option.id} className="flex items-start space-x-2">
              <Checkbox
                id={option.id}
                checked={isChecked}
                disabled={isDisabled}
                onCheckedChange={checked => handleValueChange(option.value, checked as boolean)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={option.id}
                  className={cn(
                    'flex items-center gap-2 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                    isDisabled && 'cursor-not-allowed opacity-70'
                  )}
                >
                  {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                  {option.label}
                </label>
                {option.description && <p className="text-muted-foreground text-xs">{option.description}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Checkbox, CheckboxGroup };
export type { CheckboxGroupProps, CheckboxOption };
