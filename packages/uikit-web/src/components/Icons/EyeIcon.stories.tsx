import React from 'react';
import {
  ComponentStory,
  ComponentMeta,
} from '@storybook/react';
import { EyeIcon } from './EyeIcon';

export default {
  title: 'Icons/EyeIcon',
  component: EyeIcon,
  argTypes: {
    width: { type: 'string', defaultValue: '26' },
    height: { type: 'string', defaultValue: '26' },
    fill: { type: 'string', defaultValue: 'red' },
  },
} as ComponentMeta<typeof EyeIcon>;

export const Primary: ComponentStory<typeof EyeIcon> = ({
  width,
  height,
  fill,
}) => {
  return (
    <EyeIcon width={width} height={height} fill={fill} />
  );
};
