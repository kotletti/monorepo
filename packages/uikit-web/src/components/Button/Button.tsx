import React from 'react';
import styled from 'styled-components';
import { ThemeColors, themeFont } from '../../themes';

export type ButtonProps = {
  variant: 'primary' | 'secondary';
};

type BackIconProps = {
  width: string;
  height: string;
  fill: string;
};

type StyledContainerProps = {
  width: string;
  height: string;
  display: 'flex' | 'block';
  justifyContent: 'center' | 'left' | 'right' | 'none';
  alignItems: 'center' | 'left' | 'right' | 'none';
};

type ButtonSize = {
  [k in ButtonProps['variant']]: {
    height: string;
    width: string;
  };
};

const buttonSize: ButtonSize = {
  primary: {
    height: '40px',
    width: '358px',
  },
  secondary: {
    height: '38px',
    width: '70px',
  },
};

const StyledContainer = styled.div(
  ({
    height = '40px',
    width = '358px',
    display,
    alignItems,
    justifyContent,
  }: Partial<StyledContainerProps>) => ({
    position: 'relative' as const,
    display,
    alignItems,
    justifyContent,
    width,
    height,
  })
);

const StyledPrimaryButton = styled.button(() => ({
  height: '100%',
  width: '100%',
  borderRadius: '6px',
  backgroundColor: ThemeColors.backgroundPrimary,
  border: '1px solid #3C842F',
  color: '#3C842F',
  ...themeFont.footnote,

  ':hover': {
    opacity: 0.7,
  },
}));

const StyledSecondaryButton = styled.button(() => ({
  position: 'relative' as const,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 0,
  background: 'none',
  color: '#3C842F',
  ...themeFont.footnote,

  ':hover': {
    opacity: 0.7,
  },
}));

const StyledIconContainer = styled.div(() => ({
  position: 'absolute' as const,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  zIndex: 1,
}));

const BackIcon: React.FC<Partial<BackIconProps>> = ({
  width = '8',
  height = '14',
  fill = '#3C842F',
}) => (
  <StyledIconContainer>
    <svg
      width={width}
      height={height}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7C0 7.27621 0.101861 7.51296 0.321254 7.71815L6.41724 13.7317C6.58962 13.9053 6.80901 14 7.06758 14C7.58472 14 8 13.5896 8 13.0609C8 12.8005 7.8903 12.5716 7.71792 12.3901L2.22527 7L7.71792 1.60992C7.8903 1.42841 8 1.19166 8 0.939121C8 0.410372 7.58472 0 7.06758 0C6.80901 0 6.58962 0.0947012 6.41724 0.26832L0.321254 6.27396C0.101861 6.48703 0 6.72379 0 7Z"
        fill={fill}
      />
    </svg>
  </StyledIconContainer>
);

export const Button: React.FC<Partial<ButtonProps>> = ({
  children,
  variant = 'primary',
}) => {
  return (
    <StyledContainer
      width={buttonSize[variant].width}
      height={buttonSize[variant].height}
    >
      {variant === 'primary' && (
        <StyledPrimaryButton>
          {children}
        </StyledPrimaryButton>
      )}
      {variant === 'secondary' && (
        <StyledContainer
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={buttonSize[variant].width}
          height={buttonSize[variant].height}
        >
          <StyledIconContainer>
            <BackIcon />
          </StyledIconContainer>
          <StyledSecondaryButton>
            {children}
          </StyledSecondaryButton>
        </StyledContainer>
      )}
    </StyledContainer>
  );
};
