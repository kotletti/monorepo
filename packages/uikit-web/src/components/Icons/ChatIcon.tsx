import React from 'react';
import styled from 'styled-components';
import { ThemeColors } from '../../themes';

export type ChatIconProps = {
  width: string;
  height: string;
  fill: ThemeColors;
};

type StyledContainerProps = {
  width: string;
  height: string;
};

const StyledContainer = styled.div(
  ({ width, height }: Partial<StyledContainerProps>) => ({
    position: 'relative' as const,
    width,
    height,
  })
);

export const ChatIcon: React.FC<Partial<ChatIconProps>> = ({
  width = '18px',
  height = '18px',
  fill = ThemeColors.main,
}) => (
  <StyledContainer width={width} height={height}>
    <svg
      width={width}
      height={height}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 2H3C1.89375 2 1 2.89375 1 4V12C1 13.1063 1.89375 14 3 14H7L5.66563 18L11.6656 14H15C16.1063 14 17 13.1063 17 12V4C17 2.89375 16.1063 2 15 2Z"
        fill={fill}
      />
    </svg>
  </StyledContainer>
);
