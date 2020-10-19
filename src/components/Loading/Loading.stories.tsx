import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";
import Loading, { LoadingProps } from "./Loading";

export default {
  title: "components/Loading",
  component: Loading,
  decorators: []
} as Meta;

const Template: Story<LoadingProps> = ({ isLoading }) => <Loading isLoading={isLoading} />;

export const Default = Template.bind({});
Default.args = {
  isLoading: true
};