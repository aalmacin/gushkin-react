import React from "react";
import Button, { ButtonProps, ButtonType } from "./Button";
import { Meta, Story } from '@storybook/react/types-6-0';


export default {
  title: "Button",
  component: Button,
  decorators: []
} as Meta;

const Template: Story<ButtonProps & { text?: string; }> = ({ isSquare, type, icon, text }) => <Button isSquare={isSquare} type={type} icon={icon}>{text}</Button>;

export const Text = Template.bind({});
Text.args = {
  isSquare: false,
  type: ButtonType.primary,
  text: "Hello World"
};

export const WithIcon = Template.bind({});
