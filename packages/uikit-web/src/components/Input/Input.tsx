import React from 'react';
import styled from 'styled-components';
import { ThemeColors } from '../../themes';

export type InputProps = {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'password';
  icon: React.ComponentType;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
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
  backgroundColor: 'transparent',
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
  id,
  label = '',
  value = '',
  type = 'text',
  icon: Icon,
  onChange = () => void 0,
  onBlur = () => void 0,
}) => {
  return (
    <StyledContainer>
      {label && (
        <StyledLabelContainer>
          <StyledLabel>{label}</StyledLabel>
        </StyledLabelContainer>
      )}
      <StyledInput
        {...(id && { id })}
        value={value}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
      />
      {Icon && (
        <StyledIconContainer>
          <Icon />
        </StyledIconContainer>
      )}
    </StyledContainer>
  );
};
