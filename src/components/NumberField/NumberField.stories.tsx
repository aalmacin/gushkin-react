import React from "react";
import NumberField, { NumberFieldProps } from "./NumberField";
import { Meta, Story } from "@storybook/react/types-6-0";

export default {
  title: "components/NumberField",
  component: NumberField,
  decorators: []
} as Meta;

const Template: Story<NumberFieldProps> = ({ label }) =>
  <NumberField
    label={label}
  />;

export const NormalText = Template.bind({});
NormalText.args = {
  label: "Hello World"
};
