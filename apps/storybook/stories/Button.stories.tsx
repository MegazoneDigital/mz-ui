import type { Meta, StoryObj } from '@storybook/react';
import { ArrowUpIcon, DownloadIcon, HeartIcon, MailIcon, PlusSquareIcon, StarIcon } from 'lucide-react';
import { CustomDocsPage } from '../src/components/CustomDocsPage';
import { Button } from '../src/components/ui/button';

const meta = {
  title: 'ShadcnUI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      page: () => (
        <CustomDocsPage
          componentName="Button"
          description="다양한 변형과 크기를 지원하는 완전한 기능의 버튼 컴포넌트입니다. 로딩 상태, 다양한 스타일링 옵션, 접근성을 포함합니다."
          installationDeps={['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge']}
          implementationCode={`import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

function Button({ className, variant, size, asChild = false, isLoading = false, children, disabled, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} disabled={isLoading || disabled} {...props}>
      {isLoading && (
        <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };`}
        />
      ),
      description: {
        component: `다양한 변형과 크기를 지원하는 완전한 기능의 버튼 컴포넌트입니다. 로딩 상태, 다양한 스타일링 옵션, 접근성을 포함합니다.

## 컴포넌트 구현

Button 컴포넌트는 Radix UI Slot과 CVA(Class Variance Authority)를 사용하여 구현되었습니다:

### 주요 컴포넌트
- \`Button\` - 메인 버튼 컴포넌트
- \`buttonVariants\` - CVA를 사용한 스타일 변형 관리
- \`ButtonProps\` - TypeScript 인터페이스

### 주요 기능
- **다양한 변형**: default, destructive, outline, secondary, ghost, link
- **크기 옵션**: sm, default, lg, icon 크기 지원
- **로딩 상태**: \`isLoading\` prop으로 스피너 표시
- **접근성**: 완전한 키보드 내비게이션 및 스크린 리더 지원
- **asChild**: Radix UI Slot을 통한 다형성 지원
- **완전한 타입 안전성**: TypeScript로 작성된 타입 안전한 API
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Change the default rendered element for the one passed as a child',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the button',
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'Show loading spinner',
    },
  },
  args: {
    onClick: () => console.log('Button clicked!'),
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
  parameters: {
    docs: {
      disable: true, // 일반 리스트에는 표시 안 함
    },
  },
};

// 히든 스토리들 - 커스텀 페이지에 통합됨
export const InstallationGuide: Story = {
  args: { children: 'Button' },
  render: () => <div />,
  parameters: {
    docs: { disable: true },
  },
};

export const ButtonImplementation: Story = {
  args: { children: 'Button' },
  render: () => <div />,
  parameters: {
    docs: { disable: true },
  },
};

export const UtilsImplementation: Story = {
  args: { children: 'Button' },
  render: () => <div />,
  parameters: {
    docs: { disable: true },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Icon: Story = {
  args: {
    variant: 'outline',
    size: 'icon',
    children: <PlusSquareIcon />,
  },
};

// With icons
export const WithIconLeft: Story = {
  args: {
    children: (
      <>
        <DownloadIcon className="mr-2 h-4 w-4" />
        Download
      </>
    ),
  },
};

export const WithIconRight: Story = {
  args: {
    variant: 'outline',
    children: (
      <>
        Send Email
        <MailIcon className="ml-2 h-4 w-4" />
      </>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// Loading states
export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
};

export const LoadingSecondary: Story = {
  args: {
    variant: 'secondary',
    isLoading: true,
    children: 'Processing...',
  },
};

export const LoadingOutline: Story = {
  args: {
    variant: 'outline',
    isLoading: true,
    children: 'Uploading',
  },
};

export const LoadingDisabled: Story = {
  args: {
    isLoading: true,
    disabled: true,
    children: 'Loading Disabled',
  },
};

// Showcase examples
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants displayed together.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <StarIcon />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes displayed together.',
      },
    },
  },
};

export const InteractiveExample: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-6 p-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Primary Actions</h3>
        <div className="flex gap-2">
          <Button>
            <PlusSquareIcon className="mr-2 h-4 w-4" />
            Create New
          </Button>
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Secondary Actions</h3>
        <div className="flex gap-2">
          <Button variant="secondary">Save Draft</Button>
          <Button variant="ghost">Cancel</Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Destructive Actions</h3>
        <div className="flex gap-2">
          <Button variant="destructive">Delete</Button>
          <Button variant="outline">Reset</Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Icon Buttons</h3>
        <div className="flex gap-2">
          <Button size="icon" variant="outline">
            <HeartIcon />
          </Button>
          <Button size="icon" variant="ghost">
            <StarIcon />
          </Button>
          <Button size="icon">
            <PlusSquareIcon />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Loading States</h3>
        <div className="flex gap-2">
          <Button isLoading>Loading...</Button>
          <Button variant="secondary" isLoading>
            Processing...
          </Button>
          <Button variant="outline" isLoading>
            Uploading
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive examples showing real-world usage scenarios.',
      },
    },
  },
};
