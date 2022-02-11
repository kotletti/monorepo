import React from 'react';
import {
  ComponentStory,
  ComponentMeta,
} from '@storybook/react';
import styled from 'styled-components';
import { EditNoteIcon } from './EditNoteIcon';
import { ThemeColors } from '../../themes';

export default {
  title: 'Icons/EditNoteIcon',
  component: EditNoteIcon,
  argTypes: {
    width: { type: 'string', defaultValue: '16px' },
    height: { type: 'string', defaultValue: '16px' },
    fill: {
      type: 'string',
      defaultValue: ThemeColors.main,
    },
  },
} as ComponentMeta<typeof EditNoteIcon>;

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

export const Primary: ComponentStory<typeof EditNoteIcon> =
  ({ width, height, fill }) => {
    return (
      <StyledContainer>
        <EditNoteIcon
          width={width}
          height={height}
          fill={fill}
        />
      </StyledContainer>
    );
  };
