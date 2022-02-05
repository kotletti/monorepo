import React from 'react';
import styled from 'styled-components';
import { ThemeColors, themeFont } from '../../themes';

const StyledContainer = styled.div(() => ({
  width: 358,
  height: 40,

  button: {
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
  },
}));

export const Button: React.FC = ({ children }) => {
  return (
    <StyledContainer>
      <button>{children}</button>
    </StyledContainer>
  );
};
