import React from 'react';
import styled from 'styled-components';
import {
  Button,
  ThemeColors,
  themeFont,
} from '@kotletti/uikit-web';

const StyledContainer = styled.div(() => ({
  height: '100vh',
  backgroundColor: ThemeColors.backgroundPrimary,

  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'center',
  alignItems: 'center',

  p: {
    ...themeFont.footnote,
    color: ThemeColors.text01,
  },

  span: {
    ...themeFont.footnote,
    color: ThemeColors.main,
  },
}));

const StyledButtonContainer = styled.div(() => ({
  margin: '14px',
}));

export const SignIn: React.FC = () => {
  return (
    <StyledContainer>
      <StyledButtonContainer>
        <Button> Войти </Button>
      </StyledButtonContainer>
      <StyledButtonContainer>
        <Button> Зарегистрироваться </Button>
      </StyledButtonContainer>

      <p>Регистрируясь вы соглашаетесь с следующими</p>
      <span>условия использования</span>
    </StyledContainer>
  );
};
