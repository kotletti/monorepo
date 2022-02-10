import React from 'react';
import styled from 'styled-components';
import {
  Button,
  ThemeColors,
  themeFont,
} from '@kotletti/uikit-web';
import { Link } from 'src/components';

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

export const AuthPage: React.FC = () => {
  return (
    <StyledContainer>
      <StyledButtonContainer>
        <Link to="/sign-in">
          <Button>Войти</Button>
        </Link>
      </StyledButtonContainer>
      <StyledButtonContainer>
        <Link to="/sign-up">
          <Button>Зарегистрироваться</Button>
        </Link>
      </StyledButtonContainer>

      <p>Регистрируясь вы соглашаетесь с следующими</p>
      <span>условия использования</span>
    </StyledContainer>
  );
};
