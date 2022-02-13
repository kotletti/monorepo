import React from 'react';
import { observer } from 'mobx-react-lite';
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
import { useStore } from 'src/store';
import { ApiStateList } from 'src/services';

type StyledSpanContainerProps = {
  color: ThemeColors;
  margin: string;
  padding: string;
};

type ValidateArgs = {
  email: string;
  password: string;
};

const validate = ({
  email,
  password,
}: Partial<ValidateArgs>) => {
  const errors: Partial<ValidateArgs> = {};

  if (!password) {
    errors.password = 'Пароль не указан.';
  } else if (password.length < 8) {
    errors.password =
      'Пароль должен быть длиннее 8ми символов.';
  }

  if (!email) {
    errors.email = 'Почта не указана.';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
  ) {
    errors.email = 'Не валидная почта.';
  }

  return errors;
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

const StyledIsLoading = styled.div(() => ({
  display: 'flex',
  width: 512,
  height: 512,
  borderRadius: 12,
  backgroundColor: ThemeColors.main,

  h1: {
    textAlign: 'center' as const,
    color: ThemeColors.text01,
  },
}));

const StyledErrorContainer = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column' as const,
  width: '100%',
  height: '100%',
  margin: '20px 0',
  padding: 5,
  backgroundColor: ThemeColors.main,
  borderRadius: 12,
}));

const StyledErrorSpan = styled.span(() => ({
  margin: '5px 0',
  color: ThemeColors.error,
}));

const SignInForm: React.FC = observer(() => {
  const {
    auth: { state, signInEmail },
  } = useStore();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: ({ email, password }) => {
      signInEmail(email, password);
    },
  });

  const hasEmailError = !!(
    formik.touched.email && formik.errors.email
  );

  const hasPasswordError = !!(
    formik.touched.password && formik.errors.password
  );

  if (state === ApiStateList.pending) {
    return (
      <StyledIsLoading>
        <h1>Loading ....</h1>
      </StyledIsLoading>
    );
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="off"
    >
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
      <StyledSpanContainer
        color={ThemeColors.main}
        padding="0 5px"
        margin="10px 0"
      >
        <span>Забыли пароль или не можете войти?</span>
      </StyledSpanContainer>
      <StyledButtonContainer>
        <StyledButtonContainerSecondary>
          <Link to="/">
            <Button variant="secondary">Назад</Button>
          </Link>
        </StyledButtonContainerSecondary>
        <StyledButtonContainerPrimary>
          <Button type="submit">Войти</Button>
        </StyledButtonContainerPrimary>
      </StyledButtonContainer>
    </form>
  );
});

export const SignInPage: React.FC = observer(() => {
  const {
    auth: { errors, token },
  } = useStore();

  console.log({ token });

  return (
    <StyledContainer>
      <StyledContentContainer>
        <StyledSpanContainer
          color={ThemeColors.text01}
          padding="0 5px"
        >
          <span>Вход в учетную запись</span>
        </StyledSpanContainer>
        <SignInForm />
        {errors && errors.length && (
          <StyledErrorContainer>
            {errors.map((i, index) => (
              <StyledErrorSpan key={index}>
                {i}
              </StyledErrorSpan>
            ))}
          </StyledErrorContainer>
        )}
      </StyledContentContainer>
    </StyledContainer>
  );
});
