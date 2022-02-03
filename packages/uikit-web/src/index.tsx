import React from 'react';

export type ButtonProps = {
  message: string;
};

export const Button: React.FC<ButtonProps> = ({
  message,
}: ButtonProps) => (
  <div>
    <button>{message}</button>
  </div>
);
