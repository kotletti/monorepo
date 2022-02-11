import React from 'react';
import styled from 'styled-components';
import { ThemeColors } from '../../themes';

export enum ContainerDisplay {
  block = 'block',
  inline = 'inline',
  flex = 'flex',
  none = 'none',
}

export enum ContainerPosition {
  relative = 'relative',
  absolute = 'absolute',
  fixed = 'fixed',
  sticked = 'sticked',
  static = 'static',
}

export enum ContainerJustifyContent {
  center = 'center',
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
}

export enum ContainerJustifyAlign {
  center = 'center',
  flexStart = 'flex-start',
  flexEnd = 'flex-end',
}

export enum ContainerFlexDirection {
  column = 'column',
  row = 'row',
}

export enum ContainerFlexWrap {
  wrap = 'wrap',
  nowrap = 'nowrap',
}

export type Container = {
  display: 'block' | 'inline' | 'flex' | 'none';
  flexDirection: 'column' | 'row';
  flexWrap: 'wrap' | 'nowrap';
  position:
    | 'fixed'
    | 'absolute'
    | 'relative'
    | 'static'
    | 'sticky';
  justifyContent:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between';
  justifyItems: 'center' | 'flex-start' | 'flex-end';
  alignItems: 'center';
  order: number;
  zIndex: number;
  backgroundColor: ThemeColors;
  borderWidth: string;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'groovy';
  borderRadius: string;
  borderColor: ThemeColors;
  maxWidth: string;
  maxHeight: string;
  width: string;
  height: string;
  padding: string;
  margin: string;
  top: string;
  bottom: string;
  left: string;
  right: string;
  transform: string;
  boxShadow: string;
  userSelect: 'none' | 'auto' | 'text' | 'contain' | 'all';
};

type StyledContainerProps = Container & {
  children: React.ReactNode;
};

// @todo: Potencial make some errors.
const StyledContainer = styled.div(
  ({
    children,
    ...props
  }: Partial<StyledContainerProps>) => {
    // @todo: Temporary solution, need refactor.
    if (!children) {
      console.log();
    }

    return { ...props };
  }
);

// @todo: Try use destructure, late.
export const Container: React.FC<Partial<Container>> = ({
  children,
  ...props
}) => {
  return (
    <StyledContainer {...props}>{children}</StyledContainer>
  );
};
