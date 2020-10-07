import React from "react";
import ExpiredMessage, { ExpiredMessageProps } from "./ExpiredMessage";
import { BrowserRouter } from "react-router-dom";
import { Meta, Story } from "@storybook/react/types-6-0";


export default {
  title: "ExpiredMessage",
  component: ExpiredMessage,
  decorators: []
} as Meta;

const Template: Story<ExpiredMessageProps> = ({ isExpired }) => <BrowserRouter><ExpiredMessage isExpired={isExpired} /></BrowserRouter>;

export const Text = Template.bind({});
Text.args = {
  isExpired: true
};