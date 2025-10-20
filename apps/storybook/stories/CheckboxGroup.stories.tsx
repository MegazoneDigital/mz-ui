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
        component: 'A flexible and extensible checkbox group component that renders multiple checkboxes from data.',
      },
    },
  },
  argTypes: {
    options: {
      description: 'Array of checkbox options to render',
    },
    value: {
      control: { type: 'object' },
      description: 'Controlled value array',
    },
    defaultValue: {
      control: { type: 'object' },
      description: 'Default selected values',
    },
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation',
    },
    columns: {
      control: { type: 'number' },
      description: 'Number of columns for grid layout',
    },
    title: {
      control: { type: 'text' },
      description: 'Group title',
    },
    description: {
      control: { type: 'text' },
      description: 'Group description',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Mark as required field',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable all checkboxes',
    },
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic example
export const Default: Story = {
  args: {
    title: 'Notification Preferences',
    description: 'Choose how you want to be notified',
    options: [
      { id: 'email', label: 'Email notifications', value: 'email' },
      { id: 'sms', label: 'SMS notifications', value: 'sms' },
      { id: 'push', label: 'Push notifications', value: 'push' },
      { id: 'marketing', label: 'Marketing emails', value: 'marketing' },
    ],
    defaultValue: ['email'],
  },
};

// Horizontal layout
export const Horizontal: Story = {
  args: {
    title: 'Programming Languages',
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

// Grid layout with columns
export const GridLayout: Story = {
  args: {
    title: 'Features to Enable',
    columns: 2,
    options: [
      { id: 'dark-mode', label: 'Dark Mode', value: 'dark-mode' },
      { id: 'auto-save', label: 'Auto Save', value: 'auto-save' },
      { id: 'analytics', label: 'Analytics', value: 'analytics' },
      { id: 'backups', label: 'Auto Backups', value: 'backups' },
      { id: 'sync', label: 'Cloud Sync', value: 'sync' },
      { id: 'offline', label: 'Offline Mode', value: 'offline' },
    ],
  },
};

// With icons and descriptions
export const WithIconsAndDescriptions: Story = {
  args: {
    title: 'Account Settings',
    description: 'Configure your account preferences',
    required: true,
    options: [
      {
        id: 'profile',
        label: 'Profile visibility',
        value: 'profile',
        description: 'Make your profile visible to other users',
        icon: <UserIcon className="h-4 w-4" />,
      },
      {
        id: 'notifications',
        label: 'Email notifications',
        value: 'notifications',
        description: 'Receive updates via email',
        icon: <MailIcon className="h-4 w-4" />,
      },
      {
        id: 'alerts',
        label: 'Push alerts',
        value: 'alerts',
        description: 'Get instant push notifications',
        icon: <BellIcon className="h-4 w-4" />,
      },
      {
        id: 'security',
        label: 'Two-factor authentication',
        value: 'security',
        description: 'Enable 2FA for added security',
        icon: <LockIcon className="h-4 w-4" />,
      },
    ],
    defaultValue: ['profile', 'notifications'],
  },
};

// With disabled options
export const WithDisabledOptions: Story = {
  args: {
    title: 'Subscription Features',
    description: 'Some features require a premium subscription',
    options: [
      { id: 'basic', label: 'Basic features', value: 'basic' },
      { id: 'advanced', label: 'Advanced analytics', value: 'advanced', disabled: true },
      { id: 'premium', label: 'Premium support', value: 'premium', disabled: true },
      { id: 'enterprise', label: 'Enterprise features', value: 'enterprise', disabled: true },
    ],
    defaultValue: ['basic'],
  },
};

// Completely disabled group
export const DisabledGroup: Story = {
  args: {
    title: 'Disabled Features',
    description: 'This entire group is disabled',
    disabled: true,
    options: [
      { id: 'feature1', label: 'Feature 1', value: 'feature1' },
      { id: 'feature2', label: 'Feature 2', value: 'feature2' },
      { id: 'feature3', label: 'Feature 3', value: 'feature3' },
    ],
    defaultValue: ['feature1'],
  },
};

// Controlled example - 컴포넌트를 render 함수 밖으로 분리
const ControlledExample = ({ options }: { options: any[] }) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>(['cloud', 'security']);

  return (
    <div className="space-y-6">
      <CheckboxGroup
        title="Controlled CheckboxGroup"
        description="This group is controlled by external state"
        value={selectedItems}
        onValueChange={setSelectedItems}
        options={options}
      />

      <div className="bg-muted space-y-2 rounded-lg p-4">
        <p className="text-sm font-medium">Selected items:</p>
        <p className="text-muted-foreground text-sm">{selectedItems.length > 0 ? selectedItems.join(', ') : 'None selected'}</p>
        <div className="mt-3 flex gap-2">
          <button className="bg-primary text-primary-foreground rounded px-3 py-1 text-xs" onClick={() => setSelectedItems(['cloud', 'security'])}>
            Select All
          </button>
          <button className="bg-secondary text-secondary-foreground rounded px-3 py-1 text-xs" onClick={() => setSelectedItems([])}>
            Clear All
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
        label: 'Cloud Storage',
        value: 'cloud',
        description: 'Store files in the cloud',
        icon: <CloudIcon className="h-4 w-4" />,
      },
      {
        id: 'security',
        label: 'Enhanced Security',
        value: 'security',
        description: 'Advanced security features',
        icon: <ShieldIcon className="h-4 w-4" />,
      },
    ],
  },
  render: ({ options }) => <ControlledExample options={options} />,
};
