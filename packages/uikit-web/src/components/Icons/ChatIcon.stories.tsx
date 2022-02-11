import React from 'react';
import {
  ComponentStory,
  ComponentMeta,
} from '@storybook/react';
import { ChatIcon } from './ChatIcon';
import { ThemeColors } from '../../themes';
import styled from 'styled-components';

export default {
  title: 'Icons/ChatIcon',
  component: ChatIcon,
  argTypes: {
    width: { type: 'string', defaultValue: '18px' },
    height: { type: 'string', defaultValue: '18px' },
    fill: {
      type: 'string',
      defaultValue: ThemeColors.main,
    },
  },
} as ComponentMeta<typeof ChatIcon>;

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

export const Primary: ComponentStory<typeof ChatIcon> = ({
  width,
  height,
  fill,
}) => {
  return (
    <StyledContainer>
      <ChatIcon width={width} height={height} fill={fill} />
    </StyledContainer>
  );
};
