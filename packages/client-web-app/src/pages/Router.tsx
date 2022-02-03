import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { App } from 'src/components';
import { NotFound, SignIn, SignUp } from 'src/pages';

export const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
