import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import InputFieldWrapper, { InputFieldWrapperProps } from './InputFieldWrapper';

export default {
  title: "components/Input Field Wrapper",
  component: InputFieldWrapper,
  decorators: []
} as Meta;

const Template: Story<InputFieldWrapperProps> = ({ label }) => <InputFieldWrapper id="testing" label={label}>
  <input id="testing" />
</InputFieldWrapper>;

export const Default = Template.bind({});
Default.args = {
  label: 'Hello'
};