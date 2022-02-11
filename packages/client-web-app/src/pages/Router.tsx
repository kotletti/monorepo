import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { App } from 'src/components';
import {
  NotFoundPage,
  SignInPage,
  SignUpPage,
  ProfilePage,
} from 'src/pages';
import { AuthWrapper } from 'src/wrappers/AuthWrapper';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthWrapper withAuth={false}>
            <App />
          </AuthWrapper>
        }
      />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
