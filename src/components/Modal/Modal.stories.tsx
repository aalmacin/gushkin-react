import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import Modal from "./Modal";

export default {
  title: "components/Modal",
  component: Modal,
  decorators: []
} as Meta;

const Template: Story = ({ children }) => (
  <Modal>
    {children}
  </Modal>
);

export const Default = Template.bind({});
Default.args = {
  children: <p>Hello World</p>
};
