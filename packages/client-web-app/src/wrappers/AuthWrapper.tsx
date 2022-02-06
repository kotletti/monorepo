import React from 'react';
import { useGlobalStore } from 'src/providers';
import { AuthPage } from 'src/pages';

export type AuthWrapperProps = {
  withAuth: boolean;
};

export const AuthWrapper: React.FC<
  Partial<AuthWrapperProps>
> = ({ children, withAuth = true }) => {
  const {
    state: {
      auth: { signIn },
    },
  } = useGlobalStore();

  if (withAuth && signIn.status === 'success') {
    return <div>{children}</div>;
  }

  if (!withAuth && signIn.status === 'pending') {
    return <div>{children}</div>;
  }

  return (
    <div>
      <AuthPage />
    </div>
  );
};
