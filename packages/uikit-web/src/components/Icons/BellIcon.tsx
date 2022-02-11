import React from 'react';
import styled from 'styled-components';
import { ThemeColors } from '../../themes';

export type BellIconProps = {
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

export const BellIcon: React.FC<Partial<BellIconProps>> = ({
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
        d="M8.03802 15.9998C8.51706 15.987 8.97676 15.7793 9.33582 15.4134C9.69487 15.0474 9.93014 14.5467 10 14H6C6.07184 14.5616 6.31812 15.074 6.69301 15.4419C7.06789 15.8097 7.54587 16.008 8.03802 15.9998Z"
        fill={fill}
      />
      <path
        d="M15 11.8401L14.8403 11.7167C14.3871 11.3632 13.9905 10.9579 13.6611 10.5116C13.3013 9.89565 13.0857 9.22302 13.0268 8.53316V6.50129C13.0249 6.25448 12.9311 5.62365 12.883 5.38046C12.5703 4.55912 12.4577 4.28945 11.9448 3.73779C11.432 3.18612 11.2504 3.09511 10.3813 2.64267L10.1376 2.47866C9.64708 2.26733 9.12008 2.12835 8.57785 2.06735V1.5491C8.57785 1.40347 8.51178 1.2638 8.39416 1.16083C8.27654 1.05785 8.11701 1 7.95067 1C7.78433 1 7.62481 1.05785 7.50719 1.16083C7.38957 1.2638 7.32349 1.40347 7.32349 1.5491V2.08792C6.1094 2.23786 4.99826 2.7673 4.1952 3.57848C3.39215 4.38966 2.95142 5.42782 2.95436 6.50129V8.53316C2.89552 9.22302 2.6799 9.89565 2.32013 10.5116C1.99639 10.9568 1.60613 11.3621 1.15973 11.7167L1 11.8401V13H15V11.8401Z"
        fill={fill}
      />
    </svg>
  </StyledContainer>
);
