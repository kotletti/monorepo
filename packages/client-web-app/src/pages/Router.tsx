import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import {
  NotFoundPage,
  SignInPage,
  SignUpPage,
  ProfilePage,
} from 'src/pages';
import { RootState } from 'src/store';
import { AuthWrapper } from 'src/wrappers';

export const Router: React.FC = () => {
  const token = useSelector(
    (state: RootState) => state.auth.token
  );

  const myUser = useSelector(
    (state: RootState) => state.user.my
  );

  const isAuth = Boolean(token && myUser);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthWrapper withAuth={true}>
            <ProfilePage />
          </AuthWrapper>
        }
      />
      <Route
        path="/sign-in"
        element={
          isAuth ? <Navigate to="/" /> : <SignInPage />
        }
      />
      <Route
        path="/sign-up"
        element={
          isAuth ? <Navigate to="/" /> : <SignUpPage />
        }
      />
      <Route
        path="/profile"
        element={
          <AuthWrapper withAuth={true}>
            <ProfilePage />
          </AuthWrapper>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
