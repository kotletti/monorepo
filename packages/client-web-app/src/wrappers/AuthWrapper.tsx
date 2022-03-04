import React from 'react';
import { useSelector } from 'react-redux';
import { AuthPage } from 'src/pages';
import { RootState } from 'src/store';

export type AuthWrapperProps = {
  withAuth: boolean;
};

export const AuthWrapper: React.FC<
  Partial<AuthWrapperProps>
> = ({ children, withAuth = true }) => {
  const token = useSelector(
    (state: RootState) => state.auth.token
  );

  if (withAuth && token) {
    return <>{children}</>;
  }

  if (!withAuth && token) {
    return <>{children}</>;
  }

  return (
    <>
      <AuthPage />
    </>
  );
};
