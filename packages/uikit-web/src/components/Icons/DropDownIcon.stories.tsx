import React from 'react';
import {
  ComponentStory,
  ComponentMeta,
} from '@storybook/react';
import { DropDownIcon } from './DropDownIcon';
import { ThemeColors } from '../../themes';
import styled from 'styled-components';

export default {
  title: 'Icons/DropDownIcon',
  component: DropDownIcon,
  argTypes: {
    width: { type: 'string', defaultValue: '16px' },
    height: { type: 'string', defaultValue: '16px' },
    fill: {
      type: 'string',
      defaultValue: ThemeColors.main,
    },
  },
} as ComponentMeta<typeof DropDownIcon>;

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

export const Primary: ComponentStory<typeof DropDownIcon> =
  ({ width, height, fill }) => {
    return (
      <StyledContainer>
        <DropDownIcon
          width={width}
          height={height}
          fill={fill}
        />
      </StyledContainer>
    );
  };
