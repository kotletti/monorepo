import React from 'react';
import {
  ComponentStory,
  ComponentMeta,
} from '@storybook/react';
import { EyeIcon } from './EyeIcon';
import { ThemeColors } from '../../themes';
import styled from 'styled-components';

export default {
  title: 'Icons/EyeIcon',
  component: EyeIcon,
  argTypes: {
    width: { type: 'string', defaultValue: '26px' },
    height: { type: 'string', defaultValue: '26px' },
    fill: {
      type: 'string',
      defaultValue: ThemeColors.main,
    },
  },
} as ComponentMeta<typeof EyeIcon>;

const StyledContainer = styled.div(() => ({
  position: 'relative' as const,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 128,
  height: 128,
  background: ThemeColors.backgroundPrimary,
  backgroundColor: ThemeColors.backgroundPrimary,
  borderRadius: 6,
  borderStyle: 'dashed',
  borderWidth: 1,
  borderColor: ThemeColors.main,
}));

export const Primary: ComponentStory<typeof EyeIcon> = ({
  width,
  height,
  fill,
}) => {
  return (
    <StyledContainer>
      <EyeIcon width={width} height={height} fill={fill} />
    </StyledContainer>
  );
};
