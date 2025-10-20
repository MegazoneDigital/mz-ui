import type { Meta, StoryObj } from '@storybook/react';
import { ArrowUpIcon, DownloadIcon, HeartIcon, MailIcon, PlusSquareIcon, StarIcon } from 'lucide-react';
import { Button } from '../src/components/ui/button';

const meta = {
  title: 'ShadcnUI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Displays a button or a component that looks like a button.',
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
