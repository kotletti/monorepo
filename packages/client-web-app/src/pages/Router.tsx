import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  NotFoundPage,
  SignInPage,
  SignUpPage,
  ProfilePage,
} from 'src/pages';
import { AuthWrapper } from 'src/wrappers';

export const Router: React.FC = () => {
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
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
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
