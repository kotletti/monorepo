import React from 'react';
import styled from 'styled-components';
import { ThemeColors } from '../../themes';

export type DropDownProps = {
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

export const DropDownIcon: React.FC<
  Partial<DropDownProps>
> = ({
  width = '16px',
  height = '16px',
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.171 7.226C5.064 7.097 5 6.931 5 6.75C5 6.336 5.336 6 5.75 6H10.25C10.664 6 11 6.336 11 6.75C11 6.931 10.936 7.097 10.829 7.226L8.606 10.192C8.47 10.378 8.249 10.5 8 10.5C7.751 10.5 7.53 10.378 7.394 10.192L5.171 7.226Z"
        fill={fill}
      />
    </svg>
  </StyledContainer>
);
