import React from "react";
import Button, { ButtonProps, BUTTON_TYPES } from "./Button";
import { Meta, Story } from '@storybook/react/types-6-0';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';


export default {
  title: "components/Button",
  component: Button,
  decorators: [],
  args: { type: 'button' },
  argTypes: {
    icon: {
      control: '-'
    },
    isSquare: {
      control: 'boolean'
    },
    kind: {
      control: {
        type: 'radio', options: BUTTON_TYPES
      }
    },
    type: {
      control: {
        type: 'radio', options: ['button', 'reset', 'submit']
      }
    }
  }
} as Meta;

const Template: Story<ButtonProps & { text?: string; }> = ({ isSquare, kind, icon, text }) => <Button aria-label="button" isSquare={isSquare} kind={kind} icon={icon}>{text}</Button>;

export const TextOnly = Template.bind({});
TextOnly.args = {
  isSquare: false,
  kind: 'Primary',
  text: "Hello World"
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...TextOnly.args,
  icon: faCoffee
};

export const WithIconSquare = Template.bind({});
WithIconSquare.args = {
  kind: 'Red',
  isSquare: true,
  icon: faMinus
};