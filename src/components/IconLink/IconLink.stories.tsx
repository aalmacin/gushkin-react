import React from "react";
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';
import IconLink, { IconLinkProps } from "./IconLink";
import { Meta, Story } from "@storybook/react/types-6-0";


export default {
  title: "components/Icon Link",
  component: IconLink,
  decorators: []
} as Meta;

const Template: Story<IconLinkProps & { text: string; }> = ({ icon, isExternal, to, text }) => <IconLink to={to} icon={icon} isExternal={isExternal}>{text}</IconLink >;

export const Default = Template.bind({});
Default.args = {
  icon: faHandHoldingHeart,
  isExternal: true,
  to: '#',
  text: "Hello World"
};