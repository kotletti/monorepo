import React from 'react';
import {
  ComponentStory,
  ComponentMeta,
} from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'Base/Button',
  component: Button,
  argTypes: {
    children: {
      type: 'string',
      defaultValue: 'Submit',
    },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    type: {
      options: ['button', 'submit'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = ({
  variant,
  type,
  children,
}) => (
  <Button variant={variant} type={type}>
    {children}
  </Button>
);
