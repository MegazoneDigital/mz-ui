import { cn } from '@/lib/utils';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

// Tab Context
interface TabContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
  registerTab: (value: string, element: HTMLButtonElement) => void;
  tabsListRef: React.RefObject<HTMLDivElement | null>;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab components must be used within a Tabs component');
  }
  return context;
};

// Tabs Root Component
interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const Tabs = ({ defaultValue, value, onValueChange, children, className, orientation = 'horizontal' }: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value ?? internalValue;
  const tabsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
  const tabsListRef = useRef<HTMLDivElement>(null);

  const registerTab = (tabValue: string, element: HTMLButtonElement) => {
    tabsRef.current.set(tabValue, element);
  };

  const setActiveTab = (newValue: string) => {
    if (!value) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, registerTab, tabsListRef }}>
      <div className={cn('w-full', orientation === 'vertical' && 'flex', className)}>{children}</div>
    </TabContext.Provider>
  );
};

// TabsList Component
interface TabsListProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'pills' | 'underline';
}

export const TabsList = ({ children, className, variant = 'underline' }: TabsListProps) => {
  const { activeTab, tabsListRef } = useTabContext();
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      if (!tabsListRef.current) return;

      const activeTabElement = tabsListRef.current.querySelector(`[data-tab-value="${activeTab}"]`) as HTMLButtonElement;

      if (activeTabElement) {
        const listRect = tabsListRef.current.getBoundingClientRect();
        const tabRect = activeTabElement.getBoundingClientRect();

        setIndicatorStyle({
          width: tabRect.width,
          left: tabRect.left - listRect.left,
        });
      }
    };

    updateIndicator();

    // ResizeObserver를 사용하여 크기 변경 감지
    const resizeObserver = new ResizeObserver(updateIndicator);
    if (tabsListRef.current) {
      resizeObserver.observe(tabsListRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [activeTab, tabsListRef]);

  const baseClasses = 'inline-flex items-center justify-start relative';

  const variantClasses = {
    default: 'rounded-lg bg-gray-100 dark:bg-gray-800 p-1',
    pills: 'space-x-1',
    underline: 'border-b border-gray-200 dark:border-gray-700',
  };

  return (
    <div ref={tabsListRef} className={cn(baseClasses, variantClasses[variant], className)} role="tablist">
      {children}

      {/* Animated underline indicator for underline variant */}
      {variant === 'underline' && (
        <div
          className="absolute bottom-0 h-0.5 transition-all duration-300 ease-in-out"
          style={{
            width: indicatorStyle.width,
            transform: `translateX(${indicatorStyle.left}px)`,
            backgroundColor: '#271fe0',
          }}
        />
      )}
    </div>
  );
};

// TabsTrigger Component
interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const TabsTrigger = ({ value, children, className, disabled = false }: TabsTriggerProps) => {
  const { activeTab, setActiveTab } = useTabContext();
  const isActive = activeTab === value;

  const handleClick = () => {
    if (!disabled) {
      setActiveTab(value);
    }
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      data-tab-value={value}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        // Base styles
        'relative inline-flex items-center justify-center whitespace-nowrap',
        'px-4 py-2 text-sm font-medium transition-all duration-200',
        'focus-visible:ring-2 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',

        // Default variant (MUI-like underline style)
        'border-b-2 border-transparent',
        'hover:text-gray-900 dark:hover:text-gray-100',

        // Active state
        isActive && ['dark:text-gray-100'],

        // Inactive state
        !isActive && ['text-gray-600 dark:text-gray-400', 'hover:border-gray-300 dark:hover:border-gray-600'],

        className
      )}
      style={{
        color: isActive ? '#271fe0' : undefined,
        ...(!isActive && {
          '&:focus-visible': {
            outline: '2px solid #271fe0',
            outlineOffset: '2px',
          },
        }),
      }}
    >
      {children}
    </button>
  );
};

// TabsContent Component
interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContent = ({ value, children, className }: TabsContentProps) => {
  const { activeTab } = useTabContext();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      className={cn('mt-4 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none', 'animate-in fade-in-50 duration-200', className)}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

// Pills variant trigger (for alternative styling)
export const TabsTriggerPills = ({ value, children, className, disabled = false }: TabsTriggerProps) => {
  const { activeTab, setActiveTab } = useTabContext();
  const isActive = activeTab === value;

  const handleClick = () => {
    if (!disabled) {
      setActiveTab(value);
    }
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md whitespace-nowrap',
        'px-3 py-1.5 text-sm font-medium transition-all duration-200',
        'focus-visible:ring-2 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',

        // Active state
        isActive && ['bg-white shadow-sm', 'dark:bg-gray-950'],

        // Inactive state
        !isActive && ['text-gray-600 hover:text-gray-900', 'dark:text-gray-400 dark:hover:text-gray-50', 'hover:bg-gray-100 dark:hover:bg-gray-800'],

        className
      )}
      style={{
        color: isActive ? '#271fe0' : undefined,
        ...(isActive && {
          '--tw-ring-color': '#271fe0',
        }),
      }}
    >
      {children}
    </button>
  );
};

const TabsComponents = {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsTriggerPills,
};

export default TabsComponents;
