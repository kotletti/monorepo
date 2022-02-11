import React from 'react';
import styled from 'styled-components';
import { ThemeColors } from '../../themes';

export type EditNoteProps = {
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

export const EditNoteIcon: React.FC<
  Partial<EditNoteProps>
> = ({
  width = '24px',
  height = '24px',
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
        d="M2.93359 8.5H13.9336V10.5H2.93359V8.5ZM2.93359 6.5H13.9336V4.5H2.93359V6.5ZM2.93359 14.5H9.93359V12.5H2.93359V14.5ZM17.9436 11.37L18.6536 10.66C19.0436 10.27 19.6736 10.27 20.0636 10.66L20.7736 11.37C21.1636 11.76 21.1636 12.39 20.7736 12.78L20.0636 13.49L17.9436 11.37ZM17.2336 12.08L11.9336 17.38V19.5H14.0536L19.3536 14.2L17.2336 12.08Z"
        fill={fill}
      />
    </svg>
  </StyledContainer>
);
