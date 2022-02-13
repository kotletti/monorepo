import React from 'react';
import { AuthPage } from 'src/pages';
import { ApiStateList } from 'src/services';
import { useStore } from 'src/store';

export type AuthWrapperProps = {
  withAuth: boolean;
};

export const AuthWrapper: React.FC<
  Partial<AuthWrapperProps>
> = ({ children, withAuth = true }) => {
  const {
    auth: { token },
  } = useStore();

  if (withAuth && token) {
    return <div>{children}</div>;
  }

  if (!withAuth && token) {
    return <div>{children}</div>;
  }

  return (
    <div>
      <AuthPage />
    </div>
  );
};
