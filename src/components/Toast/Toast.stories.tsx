import React from "react";
import Toast, { ToastProps } from "./Toast";
import { Meta, Story } from "@storybook/react/types-6-0";

export default {
  title: "components/Toast",
  component: Toast,
  decorators: []
} as Meta;

const Template: Story<ToastProps> = ({ showToast }) => (
  <Toast
    showToast={showToast}
  >
    <p>Hello there</p>
  </Toast>
);

export const Default = Template.bind({});
Default.args = {
  showToast: true
};
