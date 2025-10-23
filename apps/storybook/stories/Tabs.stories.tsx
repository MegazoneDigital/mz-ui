import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CustomDocsPage } from '../src/components/CustomDocsPage';
import { Tabs, TabsContent, TabsList, TabsTrigger, TabsTriggerPills } from '../src/components/ui/tabs';

const tabsImplementationCode = `import { cn } from '@/lib/utils';
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

      const activeTabElement = tabsListRef.current.querySelector(\`[data-tab-value="\${activeTab}"]\`) as HTMLButtonElement;

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
            transform: \`translateX(\${indicatorStyle.left}px)\`,
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
      aria-controls={\`tabpanel-\${value}\`}
      id={\`tab-\${value}\`}
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
      id={\`tabpanel-\${value}\`}
      aria-labelledby={\`tab-\${value}\`}
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
      aria-controls={\`tabpanel-\${value}\`}
      id={\`tab-\${value}\`}
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
};`;

const meta: Meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `한 번에 하나씩 표시되는 계층화된 콘텐츠 섹션(탭 패널) 세트입니다. 부드러운 애니메이션과 함께 밑줄 및 Pills 변형을 포함합니다.

## 주요 기능
- **애니메이션 인디케이터**: 활성 탭을 따라가는 부드러운 밑줄 애니메이션
- **키보드 내비게이션**: 키보드 내비게이션을 통한 완전한 접근성 지원  
- **제어형/비제어형**: 제어형(value prop 사용)과 비제어형 상태 모두 지원
- **다양한 변형**: 밑줄(기본값) 및 Pills 스타일링 옵션
- **커스텀 브랜드 색상**: #271fe0으로 커스터마이징된 활성 탭 색상
- **ResizeObserver**: 창 크기 조정 시 인디케이터 위치 자동 조정`,
      },
      page: () => (
        <CustomDocsPage
          componentName="Tabs"
          description="한 번에 하나씩 표시되는 계층화된 콘텐츠 섹션(탭 패널) 세트입니다."
          installationDeps={['@radix-ui/react-tabs', 'class-variance-authority', 'clsx', 'tailwind-merge']}
          implementationCode={tabsImplementationCode}
        />
      ),
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

// 4. 예시들
// Tab data for reusable rendering
const underlineTabsData = [
  {
    value: 'tab1',
    label: '계정',
    title: '계정',
    content: '계정 개요 내용이 여기에 표시됩니다.',
    disabled: false,
  },
  {
    value: 'tab2',
    label: '비밀번호',
    title: '비밀번호',
    content: '비밀번호 설정을 변경하거나 업데이트하세요.',
    disabled: false,
  },
  {
    value: 'tab3',
    label: '설정',
    title: '설정',
    content: '애플리케이션 설정을 여기서 조정하세요.',
    disabled: false,
  },
  {
    value: 'tab4',
    label: '비활성화',
    title: '비활성화',
    content: '이 탭은 비활성화되었습니다.',
    disabled: true,
  },
];

// 기본 밑줄 탭
export const UnderlineTabs: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-2xl p-6">
      <h3 className="mb-4 text-lg font-semibold">Default Underline Tabs</h3>
      <Tabs defaultValue="tab1" className="w-full">
        <TabsList>
          {underlineTabsData.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value} disabled={tab.disabled}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {underlineTabsData.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">{tab.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{tab.content}</p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '호버 효과와 부드러운 애니메이션이 있는 기본 밑줄 스타일 탭입니다.',
      },
      source: {
        language: 'tsx',
        code: `const tabsData = [
  { value: 'tab1', label: '계정', title: '계정', content: '계정 개요 내용이 여기에 표시됩니다.' },
  { value: 'tab2', label: '비밀번호', title: '비밀번호', content: '비밀번호 설정을 변경하거나 업데이트하세요.' },
  { value: 'tab3', label: '설정', title: '설정', content: '애플리케이션 설정을 여기서 조정하세요.' },
  { value: 'tab4', label: '비활성화', title: '비활성화', content: '이 탭은 비활성화되었습니다.', disabled: true },
];

<Tabs defaultValue="tab1" className="w-full">
  <TabsList>
    {tabsData.map((tab) => (
      <TabsTrigger key={tab.value} value={tab.value} disabled={tab.disabled}>
        {tab.label}
      </TabsTrigger>
    ))}
  </TabsList>
  {tabsData.map((tab) => (
    <TabsContent key={tab.value} value={tab.value}>
      <div className="rounded-lg border p-4">
        <h4 className="mb-2 font-medium">{tab.title}</h4>
        <p className="text-gray-600 dark:text-gray-400">{tab.content}</p>
      </div>
    </TabsContent>
  ))}
</Tabs>`,
      },
    },
  },
};

// 1. 설치 및 설정
export const InstallationGuide: Story = {
  render: () => (
    <div className="max-w-4xl space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">설치 및 설정</h3>

        <div className="space-y-3">
          <h4 className="font-medium">1. 필수 의존성 패키지 설치</h4>
          <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
            <p className="font-mono text-sm">npm install clsx tailwind-merge</p>
            <p className="mt-1 font-mono text-sm">또는</p>
            <p className="font-mono text-sm">pnpm add clsx tailwind-merge</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">2. 프로젝트에 추가하기</h4>
          <ul className="ml-4 space-y-1 text-sm">
            <li>• tabs.tsx 컴포넌트를 src/components/ui/ 폴더에 복사</li>
            <li>• utils.ts 파일을 src/lib/ 폴더에 복사</li>
            <li>• 프로젝트에 Tailwind CSS가 설정되어 있는지 확인</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs 컴포넌트 구현을 위한 의존성 패키지 및 설정 방법입니다.',
      },
      source: {
        language: 'tsx',
        code: `// 기본 사용법
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">탭 1</TabsTrigger>
    <TabsTrigger value="tab2">탭 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">콘텐츠 1</TabsContent>
  <TabsContent value="tab2">콘텐츠 2</TabsContent>
</Tabs>

// 제어형 사용법
const [activeTab, setActiveTab] = useState('tab1');
<Tabs value={activeTab} onValueChange={setActiveTab}>
  {/* ... */}
</Tabs>

// Pills 변형
import { TabsTriggerPills } from '@/components/ui/tabs';

<Tabs defaultValue="overview">
  <TabsList variant="pills">
    <TabsTriggerPills value="overview">개요</TabsTriggerPills>
    <TabsTriggerPills value="details">상세</TabsTriggerPills>
  </TabsList>
  {/* ... */}
</Tabs>`,
      },
    },
  },
};

// 2. 완전한 구현코드
export const TabsImplementation: Story = {
  render: () => <h3 className="mb-4 text-lg font-semibold">완전한 Tabs 구현 코드</h3>,
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `import { cn } from '@/lib/utils';
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

      const activeTabElement = tabsListRef.current.querySelector(\`[data-tab-value="\${activeTab}"]\`) as HTMLButtonElement;

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
            transform: \`translateX(\${indicatorStyle.left}px)\`,
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
      aria-controls={\`tabpanel-\${value}\`}
      id={\`tab-\${value}\`}
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
      id={\`tabpanel-\${value}\`}
      aria-labelledby={\`tab-\${value}\`}
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
      aria-controls={\`tabpanel-\${value}\`}
      id={\`tab-\${value}\`}
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

export default TabsComponents;`,
      },
    },
  },
};

// 3. 유틸리티 함수
export const UtilsImplementation: Story = {
  render: () => <h3 className="mb-4 text-lg font-semibold">유틸리티 함수</h3>,
  parameters: {
    docs: {
      description: {
        story: 'clsx와 tailwind-merge를 사용하여 Tailwind CSS 클래스를 병합하는 유틸리티 함수입니다.',
      },
      source: {
        language: 'tsx',
        code: `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
      },
    },
  },
};

const pillsTabsData = [
  {
    value: 'overview',
    label: 'Overview',
    title: 'Overview Dashboard',
    content: 'Get a quick overview of your account activity and key metrics.',
  },
  {
    value: 'analytics',
    label: 'Analytics',
    title: 'Analytics',
    content: 'View detailed analytics and insights about your usage patterns.',
  },
  {
    value: 'reports',
    label: 'Reports',
    title: 'Reports',
    content: 'Generate and download comprehensive reports of your data.',
  },
  {
    value: 'notifications',
    label: 'Notifications',
    title: 'Notifications',
    content: 'Manage your notification preferences and settings.',
  },
];

// Pills Style Tabs
export const PillsTabs: Story = {
  render: () => (
    <div className="mx-auto w-full max-w-2xl p-6">
      <h3 className="mb-4 text-lg font-semibold">Pills Style Tabs</h3>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList variant="pills" className="grid w-full grid-cols-4 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
          {pillsTabsData.map(tab => (
            <TabsTriggerPills key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTriggerPills>
          ))}
        </TabsList>
        {pillsTabsData.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-medium">{tab.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{tab.content}</p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '둥근 배경 컨테이너가 있는 Pills 스타일 탭입니다. 대시보드 내비게이션에 완벽합니다.',
      },
      source: {
        language: 'tsx',
        code: `const pillsTabsData = [
  { value: 'overview', label: '개요', title: '개요 대시보드', content: '계정 활동과 주요 지표에 대한 빠른 개요를 확인하세요.' },
  { value: 'analytics', label: '분석', title: '분석', content: '사용 패턴에 대한 자세한 분석과 인사이트를 확인하세요.' },
  { value: 'reports', label: '보고서', title: '보고서', content: '데이터의 종합적인 보고서를 생성하고 다운로드하세요.' },
  { value: 'notifications', label: '알림', title: '알림', content: '알림 기본 설정과 설정을 관리하세요.' },
];

<Tabs defaultValue="overview" className="w-full">
  <TabsList variant="pills" className="grid w-full grid-cols-4 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
    {pillsTabsData.map((tab) => (
      <TabsTriggerPills key={tab.value} value={tab.value}>
        {tab.label}
      </TabsTriggerPills>
    ))}
  </TabsList>
  {pillsTabsData.map((tab) => (
    <TabsContent key={tab.value} value={tab.value}>
      <div className="rounded-lg border p-4">
        <h4 className="mb-2 font-medium">{tab.title}</h4>
        <p className="text-gray-600 dark:text-gray-400">{tab.content}</p>
      </div>
    </TabsContent>
  ))}
</Tabs>`,
      },
    },
  },
};

const controlledTabsData = [
  {
    value: 'profile',
    label: 'Profile',
    title: 'Profile Information',
    content: 'Update your profile information and photo.',
    hasActions: true,
  },
  {
    value: 'billing',
    label: 'Billing',
    title: 'Billing & Subscription',
    content: 'Manage your billing information and subscription plans.',
    hasActions: false,
  },
  {
    value: 'team',
    label: 'Team',
    title: 'Team Management',
    content: 'Invite team members and manage permissions.',
    hasActions: false,
  },
];

// Controlled Tabs Example - 컴포넌트를 render 함수 밖으로 분리
const ControlledTabsExample = () => {
  const [activeTab, setActiveTab] = React.useState('profile');

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <h3 className="mb-4 text-lg font-semibold">Controlled Tabs</h3>
      <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="profile" className="w-full">
        <TabsList className="justify-start">
          {controlledTabsData.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {controlledTabsData.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className={`rounded-lg border p-4 ${tab.hasActions ? 'space-y-2' : ''}`}>
              <h4 className={`font-medium ${tab.hasActions ? '' : 'mb-2'}`}>{tab.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{tab.content}</p>
              {tab.hasActions && (
                <div className="flex space-x-2 pt-2">
                  <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white">Save Changes</button>
                  <button className="rounded border px-3 py-1 text-sm">Cancel</button>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export const ControlledTabs: Story = {
  render: () => <ControlledTabsExample />,
  parameters: {
    docs: {
      description: {
        story: '외부 상태 관리를 사용하는 제어형 탭입니다. value와 onValueChange props를 사용하여 활성 탭을 제어합니다.',
      },
      source: {
        language: 'tsx',
        code: `const controlledTabsData = [
  { value: 'profile', label: '프로필', title: '프로필 정보', content: '프로필 정보와 사진을 업데이트하세요.', hasActions: true },
  { value: 'billing', label: '결제', title: '결제 및 구독', content: '결제 정보와 구독 플랜을 관리하세요.' },
  { value: 'team', label: '팀', title: '팀 관리', content: '팀 멤버를 초대하고 권한을 관리하세요.' },
];

const ControlledTabsExample = () => {
  const [activeTab, setActiveTab] = React.useState('profile');
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="profile" className="w-full">
      <TabsList className="justify-start">
        {controlledTabsData.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {controlledTabsData.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <div className={\`rounded-lg border p-4 \${tab.hasActions ? 'space-y-2' : ''}\`}>
            <h4 className={\`font-medium \${tab.hasActions ? '' : 'mb-2'}\`}>{tab.title}</h4>
            <p className="text-gray-600 dark:text-gray-400">{tab.content}</p>
            {tab.hasActions && (
              <div className="flex space-x-2 pt-2">
                <button className="rounded bg-blue-500 px-3 py-1 text-sm text-white">변경사항 저장</button>
                <button className="rounded border px-3 py-1 text-sm">취소</button>
              </div>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};`,
      },
    },
  },
};
