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
      defaultValue: 'Some text',
    },
  },
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = ({
  children,
}) => <Button>{children}</Button>;
