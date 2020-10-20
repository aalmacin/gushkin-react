import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import InputField, { InputFieldProps } from './InputField';

export default {
  title: "components/Input Field",
  component: InputField,
  decorators: []
} as Meta;

const Template: Story<InputFieldProps> = ({ label }) => <InputField id="testing" label={label}>
  <input id="testing" />
</InputField>;

export const Default = Template.bind({});
Default.args = {
  label: 'Hello'
};