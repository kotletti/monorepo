import React from 'react';
import {
  ComponentStory,
  ComponentMeta,
} from '@storybook/react';
import { NavigationBar as NavigationBarComponent } from './NavigationBar';

export default {
  title: 'Base/Navigation',
  component: NavigationBarComponent,
  argTypes: {
    navText: {
      type: 'string',
      defaultValue: 'Вакансии',
    },
  },
} as ComponentMeta<typeof NavigationBarComponent>;

export const NavigationBar: ComponentStory<
  typeof NavigationBarComponent
> = ({ navText }) => (
  <NavigationBarComponent navText={navText} />
);
