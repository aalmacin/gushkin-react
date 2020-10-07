import React from "react";
import TextField, { TextFieldProps } from "./TextField";
import { Meta, Story } from "@storybook/react/types-6-0";

export default {
  title: "TextField",
  component: TextField,
  decorators: []
} as Meta;

const Template: Story<TextFieldProps> = ({ label }) => (
  <TextField
    label={label}
  />
);

export const Default = Template.bind({});
Default.args = {
  label: "Hello World"
};
