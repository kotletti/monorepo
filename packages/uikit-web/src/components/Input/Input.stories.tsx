import React, { useState } from 'react';
import {
  ComponentStory,
  ComponentMeta,
} from '@storybook/react';
import { Input } from './Input';
import { EyeIcon } from '../Icons';

export default {
  title: 'Base/Input',
  component: Input,
  argTypes: {
    label: {
      type: 'string',
      defaultValue: 'Name',
    },
    value: {
      type: 'string',
      defaultValue: 'Andrey',
    },
  },
} as ComponentMeta<typeof Input>;

export const Primary: ComponentStory<typeof Input> = ({
  label,
  value,
  type,
}) => {
  const [content, setContent] = useState<string>(
    value || ''
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setContent(e.target.value);

  return (
    <Input
      label={label}
      value={content}
      type={type}
      onChange={handleChange}
    />
  );
};

export const Secondary: ComponentStory<typeof Input> = ({
  label,
  value,
  type,
}) => {
  const [content, setContent] = useState<string>(
    value || ''
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setContent(e.target.value);

  return (
    <Input
      label={label}
      value={value}
      type={type}
      onChange={handleChange}
      icon={EyeIcon}
    />
  );
};
