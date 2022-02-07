import React from 'react';
import styled from 'styled-components';

export type EyeIconProps = {
  width: string;
  height: string;
  fill: string;
};

type StyledContainerProps = {
  width: string;
  height: string;
  fill: string;
};

const StyledContainer = styled.div(
  ({ width, height, fill }: StyledContainerProps) => ({
    position: 'relative' as const,
    display: 'flex',

    svg: {
      position: 'absolute' as const,
      width,
      height,
      fill,
    },
  })
);

export const EyeIcon: React.FC<Partial<EyeIconProps>> = ({
  width = '26px',
  height = '26px',
  fill = 'red',
}) => {
  return (
    <StyledContainer
      width={width}
      height={height}
      fill={fill}
    >
      <svg fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13 8.48086C15.8425 8.48086 18.3775 10.0784 19.615 12.6059C19.1725 13.5209 18.55 14.3084 17.8075 14.9459L18.865 16.0034C19.9075 15.0809 20.7325 13.9259 21.25 12.6059C19.9525 9.31336 16.75 6.98086 13 6.98086C12.0475 6.98086 11.1325 7.13086 10.27 7.40836L11.5075 8.64586C11.995 8.54836 12.49 8.48086 13 8.48086ZM12.1975 9.33586L13.75 10.8884C14.1775 11.0759 14.5225 11.4209 14.71 11.8484L16.2625 13.4009C16.3225 13.1459 16.3675 12.8759 16.3675 12.5984C16.375 10.7384 14.86 9.23086 13 9.23086C12.7225 9.23086 12.46 9.26836 12.1975 9.33586ZM5.5075 6.88336L7.5175 8.89336C6.295 9.85336 5.3275 11.1284 4.75 12.6059C6.0475 15.8984 9.25 18.2309 13 18.2309C14.14 18.2309 15.235 18.0134 16.24 17.6159L18.805 20.1809L19.8625 19.1234L6.565 5.81836L5.5075 6.88336ZM11.1325 12.5084L13.09 14.4659C13.06 14.4734 13.03 14.4809 13 14.4809C11.965 14.4809 11.125 13.6409 11.125 12.6059C11.125 12.5684 11.1325 12.5459 11.1325 12.5084ZM8.5825 9.95836L9.895 11.2709C9.7225 11.6834 9.625 12.1334 9.625 12.6059C9.625 14.4659 11.14 15.9809 13 15.9809C13.4725 15.9809 13.9225 15.8834 14.3275 15.7109L15.0625 16.4459C14.4025 16.6259 13.7125 16.7309 13 16.7309C10.1575 16.7309 7.6225 15.1334 6.385 12.6059C6.91 11.5334 7.675 10.6484 8.5825 9.95836Z"
          fill={fill}
        />
      </svg>
    </StyledContainer>
  );
};
