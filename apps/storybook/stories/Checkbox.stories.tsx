import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Checkbox } from '../src/components/ui/checkbox';

const meta = {
  title: 'ShadcnUI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A control that allows the user to toggle between checked and not checked.',
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
