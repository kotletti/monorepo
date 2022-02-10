import React from 'react';
import styled from 'styled-components';
import { ThemeColors } from '../../themes';

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
  alignItems: 'center',
  width: 355,
  height: 42,
  borderBottom: `1px solid ${ThemeColors.dividerPrimary}`,
}));

const StyledLabelContainer = styled.div(() => ({
  display: 'flex',
}));

const StyledInput = styled.input(() => ({
  display: 'flex',
  width: '100%',
  outline: 'none',
  border: 0,
  color: ThemeColors.secondary40,
  textAlign: 'center' as const,
  padding: '0 10px',
}));

const StyledLabel = styled.label(() => ({
  display: 'flex',
  color: ThemeColors.secondary80,
  fontFamily: 'Roboto Mono',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: 15,
  lineHeight: '120%',
}));

const StyledIconContainer = styled.div(() => ({
  display: 'flex',
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
