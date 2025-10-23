import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { CustomDocsPage } from '../src/components/CustomDocsPage';
import { Checkbox } from '../src/components/ui/checkbox';

const meta = {
  title: 'ShadcnUI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <CustomDocsPage
          componentName="Checkbox"
          description="사용자가 체크/체크 해제를 토글할 수 있는 컨트롤입니다. 개별 체크박스와 그룹 체크박스를 모두 지원합니다."
          installationDeps={['@radix-ui/react-checkbox', 'lucide-react', 'clsx', 'tailwind-merge']}
          implementationCode={`'use client';

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

export { Checkbox };`}
        />
      ),
      description: {
        component: `사용자가 체크/체크 해제를 토글할 수 있는 컨트롤입니다. 개별 체크박스와 그룹 체크박스를 모두 지원합니다.

## 컴포넌트 구현

Checkbox 컴포넌트는 Radix UI Checkbox를 기반으로 구현되었습니다:

### 주요 컴포넌트
- \`Checkbox\` - 개별 체크박스 컴포넌트
- \`CheckboxGroup\` - 여러 체크박스를 관리하는 그룹 컴포넌트
- \`CheckboxOption\` - 체크박스 옵션 타입 정의
- \`CheckboxGroupProps\` - 체크박스 그룹 속성 타입

### 주요 기능
- **개별 체크박스**: 단일 체크박스 컨트롤
- **그룹 체크박스**: 여러 옵션 중 다중 선택
- **제어형/비제어형**: controlled/uncontrolled 상태 관리
- **레이아웃 옵션**: 수직, 수평, 그리드 레이아웃
- **아이콘 지원**: 각 옵션에 커스텀 아이콘 추가
- **접근성**: 완전한 키보드 내비게이션 및 스크린 리더 지원
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'The controlled checked state of the checkbox',
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'The checked state when initially rendered',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'When true, prevents the user from interacting with the checkbox',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// 4. 예시들
export const Default: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label htmlFor="terms" className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Accept terms and conditions
      </label>
    </div>
  ),
};

// 히든 스토리들 - 커스텀 페이지에 통합됨
export const InstallationGuide: Story = {
  render: () => <div />,
  parameters: {
    docs: { disable: true },
  },
};

export const CheckboxImplementation: Story = {
  render: () => <div />,
  parameters: {
    docs: { disable: true },
  },
};

export const UtilsImplementation: Story = {
  render: () => <div />,
  parameters: {
    docs: { disable: true },
  },
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" defaultChecked />
      <label htmlFor="checked" className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Already checked
      </label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <label htmlFor="disabled" className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Disabled
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled checked />
        <label htmlFor="disabled-checked" className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Disabled and checked
        </label>
      </div>
    </div>
  ),
};

// Interactive example
const InteractiveCheckbox = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" checked={checked} onCheckedChange={value => setChecked(!!value)} />
        <label htmlFor="newsletter" className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Subscribe to newsletter
        </label>
      </div>
      <p className="text-muted-foreground text-sm">Status: {checked ? 'Subscribed ✓' : 'Not subscribed'}</p>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveCheckbox />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive checkbox with state management.',
      },
    },
  },
};

// Multiple checkboxes
const MultipleCheckboxes = () => {
  const [preferences, setPreferences] = React.useState({
    marketing: false,
    newsletter: true,
    updates: false,
  });

  const handleCheckboxChange = (key: keyof typeof preferences, checked: boolean | 'indeterminate') => {
    setPreferences(prev => ({ ...prev, [key]: checked === true }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Email Preferences</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="marketing" checked={preferences.marketing} onCheckedChange={checked => handleCheckboxChange('marketing', !!checked)} />
          <label htmlFor="marketing" className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Marketing emails
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="newsletter" checked={preferences.newsletter} onCheckedChange={checked => handleCheckboxChange('newsletter', !!checked)} />
          <label htmlFor="newsletter" className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Weekly newsletter
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="updates" checked={preferences.updates} onCheckedChange={checked => handleCheckboxChange('updates', !!checked)} />
          <label htmlFor="updates" className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Product updates
          </label>
        </div>
      </div>
      <div className="border-t pt-2">
        <p className="text-muted-foreground text-sm">
          Selected:{' '}
          {Object.entries(preferences)
            .filter(([, checked]) => checked)
            .map(([key]) => key)
            .join(', ') || 'None'}
        </p>
      </div>
    </div>
  );
};

export const MultipleExample: Story = {
  render: () => <MultipleCheckboxes />,
  parameters: {
    docs: {
      description: {
        story: 'Multiple checkboxes with individual state management.',
      },
    },
  },
};

// Form example
const FormExample = () => {
  const [formData, setFormData] = React.useState({
    terms: false,
    newsletter: false,
    privacy: false,
  });

  // const allChecked = Object.values(formData).every(Boolean);

  return (
    <div className="max-w-sm space-y-4">
      <h3 className="text-sm font-medium">Account Setup</h3>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={formData.terms} onCheckedChange={checked => setFormData(prev => ({ ...prev, terms: !!checked }))} />
          <label htmlFor="terms" className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I agree to the terms and conditions *
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="privacy" checked={formData.privacy} onCheckedChange={checked => setFormData(prev => ({ ...prev, privacy: !!checked }))} />
          <label htmlFor="privacy" className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            I agree to the privacy policy *
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="newsletter-form" checked={formData.newsletter} onCheckedChange={checked => setFormData(prev => ({ ...prev, newsletter: !!checked }))} />
          <label htmlFor="newsletter-form" className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Subscribe to newsletter (optional)
          </label>
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Required fields: {formData.terms && formData.privacy ? '✓' : '✗'}</span>
          <button className="bg-primary text-primary-foreground rounded px-3 py-1 text-xs disabled:opacity-50" disabled={!formData.terms || !formData.privacy}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export const FormValidation: Story = {
  render: () => <FormExample />,
  parameters: {
    docs: {
      description: {
        story: 'Form validation example with required and optional checkboxes.',
      },
    },
  },
};
