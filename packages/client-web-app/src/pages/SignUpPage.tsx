import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import {
  Button,
  EyeIcon,
  Input,
  ThemeColors,
  themeFont,
} from '@kotletti/uikit-web';
import { Link } from 'src/components';
import { observer } from 'mobx-react';
import { useStore } from 'src/store';
import { ApiStateList } from 'src/services';
import { flowResult } from 'mobx';

const { AUTH_API_HOST } = process.env;

if (!AUTH_API_HOST) {
  throw new Error('AUTH_API_HOST is undefined.');
}

type SignUpValidate = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const validate = ({
  firstName,
  lastName,
  email,
  password,
  repeatPassword,
}: SignUpValidate) => {
  const errors: Partial<SignUpValidate> = {};

  if (!email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
  ) {
    errors.email = 'Invalid email address';
  }

  if (!password) {
    errors.password = 'Required';
  } else if (password.length < 8) {
    errors.password = 'Must be 8 characters or more';
  }

  if (!repeatPassword) {
    errors.repeatPassword = 'Required';
  } else if (repeatPassword.length < 8) {
    errors.repeatPassword = 'Must be 8 characters or more';
  }

  if (password !== repeatPassword) {
    errors.password = 'Passwords not compared';
    errors.repeatPassword = 'Password not compared';
  }

  if (!firstName) {
    errors.firstName = 'Required name';
  }

  if (!lastName) {
    errors.lastName = 'Required last name';
  }

  return errors;
};

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
  flexDirection: 'column' as const,
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

const StyledErrorValue = styled.div(() => ({
  display: 'flex',

  span: {
    ...themeFont.footnote,
    color: ThemeColors.error,
  },
}));

const SignUpForm: React.FC = observer(() => {
  const { auth, user } = useStore();

  const isLoading =
    user.state === ApiStateList.success &&
    auth.state === ApiStateList.success;

  console.log({ auth });

  const formik = useFormik({
    initialValues: {
      firstName: 'Andrey',
      lastName: 'Dudnik',
      email: 'andrey@mail.ru',
      password: 'Andrey123',
      repeatPassword: 'Andrey123',
    },
    validate,
    onSubmit: async ({
      firstName,
      lastName,
      email,
      password,
      repeatPassword: _repeatPassword,
    }: SignUpValidate) => {
      console.log('client');
    },
  });

  const hasFirstNameError = !!(
    formik.touched.firstName && formik.errors.firstName
  );

  const hasLastNameError = !!(
    formik.touched.lastName && formik.errors.lastName
  );

  const hasEmailError = !!(
    formik.touched.email && formik.errors.email
  );

  const hasPasswordError = !!(
    formik.touched.password && formik.errors.password
  );

  const hasRepeatPasswordError = !!(
    formik.touched.repeatPassword &&
    formik.errors.repeatPassword
  );

  if (isLoading) {
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    );
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="off"
    >
      <StyledInputContainer>
        {hasFirstNameError && (
          <StyledErrorValue>
            <span>{formik.errors.firstName}</span>
          </StyledErrorValue>
        )}
        <Input
          id="firstName"
          label="Имя"
          type="text"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </StyledInputContainer>
      <StyledInputContainer>
        {hasLastNameError && (
          <StyledErrorValue>
            <span>{formik.errors.lastName}</span>
          </StyledErrorValue>
        )}
        <Input
          id="lastName"
          label="Фамилия"
          type="text"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </StyledInputContainer>
      <StyledInputContainer>
        {hasEmailError && (
          <StyledErrorValue>
            <span>{formik.errors.email}</span>
          </StyledErrorValue>
        )}
        <Input
          id="email"
          label="Email"
          type="text"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </StyledInputContainer>
      <StyledInputContainer>
        {hasPasswordError && (
          <StyledErrorValue>
            <span>{formik.errors.password}</span>
          </StyledErrorValue>
        )}
        <Input
          id="password"
          label="Пароль"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          icon={EyeIcon}
        />
      </StyledInputContainer>
      <StyledInputContainer>
        {hasRepeatPasswordError && (
          <StyledErrorValue>
            <span>{formik.errors.repeatPassword}</span>
          </StyledErrorValue>
        )}
        <Input
          id="repeatPassword"
          label="Повторите пароль"
          type="password"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
          <Button type="submit">Далее</Button>
        </StyledButtonContainerPrimary>
      </StyledButtonContainer>
    </form>
  );
});

export const SignUpPage: React.FC = () => {
  return (
    <StyledContainer>
      <StyledContentContainer>
        <StyledSpanContainer
          color={ThemeColors.text01}
          padding="0 5px"
        >
          <span>Создайте учетную запись</span>
        </StyledSpanContainer>
        <SignUpForm />
      </StyledContentContainer>
    </StyledContainer>
  );
};
