import React from 'react';
import styled from 'styled-components';
import { BellIcon, ChatIcon, DropDownIcon } from '../Icons';
import { ThemeColors, themeFont } from '../../themes';

export type NavigationBarProps = {
  navText: string;
};

const StyledContainer = styled.div(() => ({
  position: 'relative' as const,
  display: 'flex',
  backgroundColor: ThemeColors.bgNavBarPrimary,
  width: '100%',
  height: 36,
}));

const StyledNavTextContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 60px',

  span: {
    ...themeFont.h1,
    color: ThemeColors.secondary90,
  },
}));

const StyledActionContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
  width: '100%',
  padding: '0 60px',
}));

const StyledNotificationAction = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  height: 26,
  width: 'fit-content',
  backgroundColor: ThemeColors.secondary8,
  borderRadius: 6,
  padding: '0 8px',
  margin: '0 4px',

  span: {
    color: ThemeColors.main,
    margin: '0 0 0 4px',
  },
}));

const StyledChatAction = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  height: 26,
  width: 'fit-content',
  backgroundColor: ThemeColors.secondary8,
  borderRadius: 6,
  padding: '0 8px',
  margin: '0 4px',
}));

const StyledProfileAction = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  height: 26,
  width: 'fit-content',
  backgroundColor: ThemeColors.secondary8,
  borderRadius: 6,
  padding: '0 8px',
  margin: '0 4px',

  span: {
    ...themeFont.h1,
    color: ThemeColors.text02,
  },
}));

export const NavigationBar: React.FC<
  Partial<NavigationBarProps>
> = ({ navText }) => {
  return (
    <StyledContainer>
      <StyledNavTextContainer>
        <span>{navText}</span>
      </StyledNavTextContainer>
      <StyledActionContainer>
        <StyledNotificationAction>
          <BellIcon />
          <span>2</span>
        </StyledNotificationAction>
        <StyledChatAction>
          <ChatIcon fill={ThemeColors.text02} />
        </StyledChatAction>
        <StyledProfileAction>
          <span>Дарья Цукали</span>
          <DropDownIcon fill={ThemeColors.text02} />
        </StyledProfileAction>
      </StyledActionContainer>
    </StyledContainer>
  );
};
