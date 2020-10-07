import React from "react";
import Button, { ButtonProps, ButtonType } from "./Button";
import { Meta, Story } from '@storybook/react/types-6-0';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';


export default {
  title: "Button",
  component: Button,
  decorators: []
} as Meta;

const Template: Story<ButtonProps & { text?: string; }> = ({ isSquare, type, icon, text }) => <Button isSquare={isSquare} type={type} icon={icon}>{text}</Button>;

export const TextOnly = Template.bind({});
TextOnly.args = {
  isSquare: false,
  type: ButtonType.primary,
  text: "Hello World"
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...TextOnly.args,
  icon: faCoffee
};