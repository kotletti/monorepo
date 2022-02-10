import React from 'react';
import {
  Link as RouterLink,
  LinkProps,
} from 'react-router-dom';

export const Link: React.FC<LinkProps> = ({
  children,
  to,
  ...args
}) => (
  <RouterLink
    to={to}
    style={{ textDecoration: 'none' }}
    {...args}
  >
    {children}
  </RouterLink>
);
