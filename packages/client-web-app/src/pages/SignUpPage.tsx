import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  EyeIcon,
  Input,
  ThemeColors,
  themeFont,
} from '@kotletti/uikit-web';
import { Link } from 'src/components';

type StyledSpanContainerProps = {
  color: ThemeColors;
  margin: string;
  padding: string;
};

const StyledContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column' as const,
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: ThemeColors.backgroundPrimary,
}));

const StyledContentContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column' as const,
  width: 360,
}));

const StyledSpanContainer = styled.div(
  ({
    color = ThemeColors.text01,
    padding,
    margin,
  }: Partial<StyledSpanContainerProps>) => ({
    display: 'flex',
    justifyContent: 'start',
    width: '100%',
    padding,
    margin,

    span: {
      ...themeFont.footnote,
      color,
    },
  })
);

const StyledInputContainer = styled.div(() => ({
  display: 'flex',
  margin: 5,
}));

const StyledButtonContainer = styled.div(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '10px 0',
}));

const StyledButtonContainerPrimary = styled.div(() => ({
  display: 'flex',
  height: '100%',
  width: 95,
}));

const StyledButtonContainerSecondary = styled.div(() => ({
  display: 'flex',
  height: '100%',
  width: 75,
}));

export const SignUpPage: React.FC = () => {
  const [firstNameValue, setFirstNameValue] =
    useState<string>('');

  const [lastNameValue, setLastNameValue] =
    useState<string>('');

  const [emailValue, setEmailValue] = useState<string>('');

  const [passwordValue, setPasswordValue] =
    useState<string>('');

  const [repeatPasswordValue, setRepeatPasswordValue] =
    useState<string>('');

  const handleChangeFirstNameValue = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFirstNameValue(target.value);

  const handleChangeLastNameValue = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) =>
    setLastNameValue(target.value);

  const handleChangeEmailValue = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) =>
    setEmailValue(target.value);

  const handleChangePasswordValue = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordValue(target.value);

  const handleChangeRepeatPasswordValue = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) =>
    setRepeatPasswordValue(target.value);

  return (
    <StyledContainer>
      <StyledContentContainer>
        <StyledSpanContainer
          color={ThemeColors.text01}
          padding="0 5px"
        >
          <span>Создайте учетную запись</span>
        </StyledSpanContainer>
        <StyledInputContainer>
          <Input
            label="Имя"
            type="text"
            value={firstNameValue}
            onChange={handleChangeFirstNameValue}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <Input
            label="Фамилия"
            type="text"
            value={lastNameValue}
            onChange={handleChangeLastNameValue}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <Input
            label="Email"
            type="text"
            value={emailValue}
            onChange={handleChangeEmailValue}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <Input
            label="Пароль"
            type="password"
            value={passwordValue}
            onChange={handleChangePasswordValue}
            icon={EyeIcon}
          />
        </StyledInputContainer>
        <StyledInputContainer>
          <Input
            label="Повторите пароль"
            type="password"
            value={repeatPasswordValue}
            onChange={handleChangeRepeatPasswordValue}
            icon={EyeIcon}
          />
        </StyledInputContainer>
        <StyledSpanContainer
          color={ThemeColors.main}
          padding="0 5px"
          margin="10px 0"
        >
          <span>Уже зарегистрированы?</span>
        </StyledSpanContainer>
        <StyledButtonContainer>
          <StyledButtonContainerSecondary>
            <Link to="/">
              <Button variant="secondary">Назад</Button>
            </Link>
          </StyledButtonContainerSecondary>
          <StyledButtonContainerPrimary>
            <Button>Далее</Button>
          </StyledButtonContainerPrimary>
        </StyledButtonContainer>
      </StyledContentContainer>
    </StyledContainer>
  );
};
