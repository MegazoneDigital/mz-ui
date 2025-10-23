import type { Meta, StoryObj } from '@storybook/react';
import { BellIcon, CloudIcon, LockIcon, MailIcon, ShieldIcon, UserIcon } from 'lucide-react';
import React from 'react';

import { CustomDocsPage } from '../src/components/CustomDocsPage';
import { CheckboxGroup } from '../src/components/ui/checkbox';
import { checkboxGroupDependencies, checkboxGroupImplementationCode } from '../src/constants/checkboxGroup';

const meta = {
  title: 'ShadcnUI/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'padded',
    docs: {
      page: () => (
        <CustomDocsPage
          componentName="CheckboxGroup"
          description="데이터에서 여러 체크박스를 렌더링하는 유연하고 확장 가능한 체크박스 그룹 컴포넌트입니다."
          installationDeps={checkboxGroupDependencies}
          implementationCode={checkboxGroupImplementationCode}
        />
      ),
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
