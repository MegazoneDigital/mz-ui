import type { Meta, StoryObj } from '@storybook/react';
import { BellIcon, CloudIcon, LockIcon, MailIcon, ShieldIcon, UserIcon } from 'lucide-react';
import React from 'react';

import { CheckboxGroup } from '../src/components/ui/checkbox';

const meta = {
  title: 'ShadcnUI/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `데이터에서 여러 체크박스를 렌더링하는 유연하고 확장 가능한 체크박스 그룹 컴포넌트입니다.

## 컴포넌트 구현

CheckboxGroup 컴포넌트는 데이터 기반으로 체크박스들을 동적으로 렌더링합니다:

### 주요 컴포넌트
- \`Checkbox\` - Radix UI 기반의 개별 체크박스 컴포넌트
- \`CheckboxGroup\` - 여러 체크박스를 관리하는 그룹 컴포넌트

### 주요 기능
- **데이터 기반 렌더링**: 옵션 배열만 전달하면 자동으로 체크박스 생성
- **다양한 레이아웃**: 수직, 수평, 그리드 레이아웃 지원
- **아이콘 지원**: 각 체크박스에 아이콘 추가 가능
- **상태 관리**: 제어형/비제어형 상태 관리 모두 지원
- **접근성**: 완전한 키보드 내비게이션 및 스크린 리더 지원
- **유연한 스타일링**: Tailwind CSS 클래스를 통한 커스터마이징
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: '렌더링할 체크박스 옵션 배열',
    },
    value: {
      control: { type: 'object' },
      description: '제어형 값 배열',
    },
    defaultValue: {
      control: { type: 'object' },
      description: '기본 선택된 값들',
    },
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: '레이아웃 방향',
    },
    columns: {
      control: { type: 'number' },
      description: '그리드 레이아웃의 열 수',
    },
    title: {
      control: { type: 'text' },
      description: '그룹 제목',
    },
    description: {
      control: { type: 'text' },
      description: '그룹 설명',
    },
    required: {
      control: { type: 'boolean' },
      description: '필수 필드로 표시',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '모든 체크박스 비활성화',
    },
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. 완전한 구현코드
export const CheckboxImplementation: Story = {
  args: { options: [] },
  render: () => <h3 className="mb-4 text-lg font-semibold">완전한 CheckboxGroup 구현 코드</h3>,
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
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

  const gridClass = columns ? \`grid grid-cols-\${columns} gap-4\` : orientation === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-3';

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
export type { CheckboxGroupProps, CheckboxOption };`,
      },
    },
  },
};

// 2. 유틸리티 함수
export const UtilsImplementation: Story = {
  args: { options: [] },
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

// 3. 설치 및 설정
export const InstallationGuide: Story = {
  args: { options: [] },
  render: () => (
    <div className="max-w-4xl space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">설치 및 설정</h3>

        <div className="space-y-3">
          <h4 className="font-medium">1. 필수 의존성 패키지 설치</h4>
          <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
            <p className="font-mono text-sm">npm install @radix-ui/react-checkbox lucide-react clsx tailwind-merge</p>
            <p className="mt-1 font-mono text-sm">또는</p>
            <p className="font-mono text-sm">pnpm add @radix-ui/react-checkbox lucide-react clsx tailwind-merge</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">2. 프로젝트에 추가하기</h4>
          <ul className="ml-4 space-y-1 text-sm">
            <li>• checkbox.tsx 컴포넌트를 src/components/ui/ 폴더에 복사</li>
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
        story: 'CheckboxGroup 컴포넌트 구현을 위한 의존성 패키지 및 설정 방법입니다.',
      },
      source: {
        language: 'tsx',
        code: `// 기본 사용법
import { CheckboxGroup } from '@/components/ui/checkbox';

const options = [
  { id: 'email', label: '이메일 알림', value: 'email' },
  { id: 'sms', label: 'SMS 알림', value: 'sms' },
  { id: 'push', label: '푸시 알림', value: 'push' },
];

<CheckboxGroup
  title="알림 설정"
  options={options}
  defaultValue={['email']}
/>

// 제어형 사용법
const [selectedValues, setSelectedValues] = useState(['email']);
<CheckboxGroup
  title="알림 설정"
  options={options}
  value={selectedValues}
  onValueChange={setSelectedValues}
/>

// 그리드 레이아웃
<CheckboxGroup
  title="기능 선택"
  columns={2}
  options={options}
/>

// 아이콘과 설명 포함
const optionsWithIcons = [
  {
    id: 'profile',
    label: '프로필 공개',
    value: 'profile',
    description: '다른 사용자에게 프로필을 공개합니다',
    icon: <UserIcon className="h-4 w-4" />,
  },
];

<CheckboxGroup
  title="계정 설정"
  description="계정 기본 설정을 구성하세요"
  required
  options={optionsWithIcons}
/>`,
      },
    },
  },
};

// 4. 예시들
// 기본 예시
export const Default: Story = {
  args: {
    title: '알림 설정',
    description: '알림 받을 방법을 선택하세요',
    options: [
      { id: 'email', label: '이메일 알림', value: 'email' },
      { id: 'sms', label: 'SMS 알림', value: 'sms' },
      { id: 'push', label: '푸시 알림', value: 'push' },
      { id: 'marketing', label: '마케팅 이메일', value: 'marketing' },
    ],
    defaultValue: ['email'],
  },
};

// 수평 레이아웃
export const Horizontal: Story = {
  args: {
    title: '프로그래밍 언어',
    orientation: 'horizontal',
    options: [
      { id: 'js', label: 'JavaScript', value: 'javascript' },
      { id: 'ts', label: 'TypeScript', value: 'typescript' },
      { id: 'py', label: 'Python', value: 'python' },
      { id: 'go', label: 'Go', value: 'go' },
      { id: 'rust', label: 'Rust', value: 'rust' },
    ],
  },
};

// 그리드 레이아웃
export const GridLayout: Story = {
  args: {
    title: '활성화할 기능',
    columns: 2,
    options: [
      { id: 'dark-mode', label: '다크 모드', value: 'dark-mode' },
      { id: 'auto-save', label: '자동 저장', value: 'auto-save' },
      { id: 'analytics', label: '분석', value: 'analytics' },
      { id: 'backups', label: '자동 백업', value: 'backups' },
      { id: 'sync', label: '클라우드 동기화', value: 'sync' },
      { id: 'offline', label: '오프라인 모드', value: 'offline' },
    ],
  },
};

// 아이콘과 설명이 있는 예시
export const WithIconsAndDescriptions: Story = {
  args: {
    title: '계정 설정',
    description: '계정 기본 설정을 구성하세요',
    required: true,
    options: [
      {
        id: 'profile',
        label: '프로필 공개',
        value: 'profile',
        description: '다른 사용자에게 프로필을 공개합니다',
        icon: <UserIcon className="h-4 w-4" />,
      },
      {
        id: 'notifications',
        label: '이메일 알림',
        value: 'notifications',
        description: '이메일로 업데이트를 받습니다',
        icon: <MailIcon className="h-4 w-4" />,
      },
      {
        id: 'alerts',
        label: '푸시 알림',
        value: 'alerts',
        description: '즉시 푸시 알림을 받습니다',
        icon: <BellIcon className="h-4 w-4" />,
      },
      {
        id: 'security',
        label: '2단계 인증',
        value: 'security',
        description: '보안 강화를 위해 2FA를 활성화합니다',
        icon: <LockIcon className="h-4 w-4" />,
      },
    ],
    defaultValue: ['profile', 'notifications'],
  },
};

// 비활성화된 옵션이 있는 예시
export const WithDisabledOptions: Story = {
  args: {
    title: '구독 기능',
    description: '일부 기능은 프리미엄 구독이 필요합니다',
    options: [
      { id: 'basic', label: '기본 기능', value: 'basic' },
      { id: 'advanced', label: '고급 분석', value: 'advanced', disabled: true },
      { id: 'premium', label: '프리미엄 지원', value: 'premium', disabled: true },
      { id: 'enterprise', label: '엔터프라이즈 기능', value: 'enterprise', disabled: true },
    ],
    defaultValue: ['basic'],
  },
};

// 전체 비활성화된 그룹
export const DisabledGroup: Story = {
  args: {
    title: '비활성화된 기능',
    description: '이 전체 그룹이 비활성화되었습니다',
    disabled: true,
    options: [
      { id: 'feature1', label: '기능 1', value: 'feature1' },
      { id: 'feature2', label: '기능 2', value: 'feature2' },
      { id: 'feature3', label: '기능 3', value: 'feature3' },
    ],
    defaultValue: ['feature1'],
  },
};

interface CheckboxOption {
  id: string;
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

// Controlled example - 컴포넌트를 render 함수 밖으로 분리
const ControlledExample = ({ options }: { options: CheckboxOption[] }) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>(['cloud', 'security']);

  return (
    <div className="space-y-6">
      <CheckboxGroup
        title="제어형 체크박스 그룹"
        description="이 그룹은 외부 상태로 제어됩니다"
        value={selectedItems}
        onValueChange={setSelectedItems}
        options={options}
      />

      <div className="bg-muted space-y-2 rounded-lg p-4">
        <p className="text-sm font-medium">선택된 항목:</p>
        <p className="text-muted-foreground text-sm">{selectedItems.length > 0 ? selectedItems.join(', ') : '선택된 항목 없음'}</p>
        <div className="mt-3 flex gap-2">
          <button className="bg-primary text-primary-foreground rounded px-3 py-1 text-xs" onClick={() => setSelectedItems(['cloud', 'security'])}>
            모두 선택
          </button>
          <button className="bg-secondary text-secondary-foreground rounded px-3 py-1 text-xs" onClick={() => setSelectedItems([])}>
            모두 해제
          </button>
        </div>
      </div>
    </div>
  );
};

export const Controlled: Story = {
  args: {
    options: [
      {
        id: 'cloud',
        label: '클라우드 저장소',
        value: 'cloud',
        description: '클라우드에 파일을 저장합니다',
        icon: <CloudIcon className="h-4 w-4" />,
      },
      {
        id: 'security',
        label: '강화된 보안',
        value: 'security',
        description: '고급 보안 기능입니다',
        icon: <ShieldIcon className="h-4 w-4" />,
      },
    ],
  },
  render: ({ options }) => <ControlledExample options={options} />,
};
