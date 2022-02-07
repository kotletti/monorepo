import React from 'react';
import styled from 'styled-components';

export type InputProps = {
  label: string;
  value: string;
  type: 'text' | 'password';
  icon: React.ComponentType;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

const StyledContainer = styled.div(() => ({
  position: 'relative' as const,
  display: 'flex',
  width: 355,
  height: 42,

  input: {
    borderBottom: '1px solid #C4C4C4',
  },

  label: {
    borderBottom: '1px solid #C4C4C4',
  },

  ':focus': {
    input: {
      borderBottom: '1px solid #3C842F',
    },

    label: {
      borderBottom: '1px solid #3C842F',
    },
  },

  ':hover': {
    input: {
      borderBottom: '1px solid #3C842F',
    },

    label: {
      borderBottom: '1px solid #3C842F',
    },
  },

  ':active': {
    input: {
      borderBottom: '1px solid #3C842F',
    },

    label: {
      borderBottom: '1px solid #3C842F',
    },
  },
}));

const StyledLabelContainer = styled.div(() => ({
  display: 'flex',
  width: 'fit-content',
}));

const StyledInput = styled.input(() => ({
  display: 'flex',
  width: '100%',
  outline: 'none',
  border: 0,
  color: 'red',
  textAlign: 'center' as const,
  padding: '0 10px',
}));

const StyledLabel = styled.label(() => ({
  display: 'flex',
  alignItems: 'center',
  color: 'gray',
  bottom: 10,
  fontFamily: 'Roboto Mono',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 15,
  lineHeight: '120%',
}));

const StyledIconContainer = styled.div(() => ({
  position: 'absolute' as const,
  display: 'flex',
  right: 25,
  bottom: 30,
}));

export const Input: React.FC<Partial<InputProps>> = ({
  label = '',
  value = '',
  type = 'text',
  icon: Icon,
  onChange = () => void 0,
}) => {
  return (
    <StyledContainer>
      {label && (
        <StyledLabelContainer>
          <StyledLabel>{label}</StyledLabel>
        </StyledLabelContainer>
      )}
      <StyledInput
        value={value}
        type={type}
        onChange={onChange}
      />
      {Icon && (
        <StyledIconContainer>
          <Icon />
        </StyledIconContainer>
      )}
    </StyledContainer>
  );
};
