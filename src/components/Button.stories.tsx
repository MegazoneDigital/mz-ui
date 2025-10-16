import type { Meta, StoryObj } from '@storybook/react-vite';
import { Download, Heart, Mail, Plus, Star } from 'lucide-react';

import { Button } from './Button';

const meta = {
  title: 'Example/Button',
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
    backgroundColor: {
      control: { type: 'color' },
      description: 'Custom background color for the button',
    },
    textColor: {
      control: { type: 'color' },
      description: 'Custom text color for the button',
    },
  },
  args: { onClick: () => console.log('Button clicked!') },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic button variants
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
};

// Button sizes
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

export const Icon: Story = {
  args: {
    variant: 'outline',
    size: 'icon',
    children: <Plus />,
  },
};

// Buttons with icons
export const WithIconLeft: Story = {
  args: {
    children: (
      <>
        <Download />
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
        <Mail />
      </>
    ),
  },
};

export const LoadingState: Story = {
  args: {
    disabled: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Star />
      </Button>
    </div>
  ),
};

// Interactive examples
export const InteractiveExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Primary Actions</h3>
        <div className="flex gap-2">
          <Button>
            <Plus />
            Create New
          </Button>
          <Button variant="outline">
            <Download />
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
            <Heart />
          </Button>
          <Button size="icon" variant="ghost">
            <Star />
          </Button>
          <Button size="icon">
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  ),
};

// Custom Colors Examples
export const CustomColors: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Custom Background Colors</h3>
        <div className="flex flex-wrap gap-3">
          <Button backgroundColor="#ef4444" textColor="white">
            Red Button
          </Button>
          <Button backgroundColor="#3b82f6" textColor="white">
            Blue Button
          </Button>
          <Button backgroundColor="#10b981" textColor="white">
            Green Button
          </Button>
          <Button backgroundColor="#f59e0b" textColor="white">
            Orange Button
          </Button>
          <Button backgroundColor="#8b5cf6" textColor="white">
            Purple Button
          </Button>
          <Button backgroundColor="#ec4899" textColor="white">
            Pink Button
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Gradient Backgrounds</h3>
        <div className="flex flex-wrap gap-3">
          <Button backgroundColor="linear-gradient(45deg, #ff6b6b, #ffd93d)" textColor="white">
            Gradient Button
          </Button>
          <Button backgroundColor="linear-gradient(135deg, #667eea, #764ba2)" textColor="white">
            Purple Gradient
          </Button>
          <Button backgroundColor="linear-gradient(90deg, #00d2ff, #3a7bd5)" textColor="white">
            Blue Gradient
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Dark & Light Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Button backgroundColor="#1f2937" textColor="white">
            Dark Gray
          </Button>
          <Button backgroundColor="#f9fafb" textColor="#1f2937">
            Light Gray
          </Button>
          <Button backgroundColor="#000000" textColor="white">
            Pure Black
          </Button>
          <Button backgroundColor="#ffffff" textColor="#000000" style={{ border: '1px solid #e5e7eb' }}>
            Pure White
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">With Icons</h3>
        <div className="flex flex-wrap gap-3">
          <Button backgroundColor="#dc2626" textColor="white">
            <Heart />
            Like
          </Button>
          <Button backgroundColor="#059669" textColor="white">
            <Download />
            Download
          </Button>
          <Button backgroundColor="#7c3aed" textColor="white">
            <Star />
            Favorite
          </Button>
          <Button backgroundColor="#ea580c" textColor="white">
            <Mail />
            Contact
          </Button>
        </div>
      </div>
    </div>
  ),
};

// Individual Custom Color Examples
export const RedButton: Story = {
  args: {
    backgroundColor: '#ef4444',
    textColor: 'white',
    children: 'Red Button',
  },
};

export const BlueGradient: Story = {
  args: {
    backgroundColor: 'linear-gradient(135deg, #667eea, #764ba2)',
    textColor: 'white',
    children: 'Gradient Button',
  },
};

export const CustomWithIcon: Story = {
  args: {
    backgroundColor: '#10b981',
    textColor: 'white',
    children: (
      <>
        <Plus />
        Add Item
      </>
    ),
  },
};
