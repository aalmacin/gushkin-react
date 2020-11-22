import React from "react";
import { Meta, Story } from '@storybook/react/types-6-0';
import ActivityNav from './ActivityNav';
import { createMemoryHistory } from 'history';
import FundBar, { FundBarProps } from "./FundBar";

const history = createMemoryHistory();

export default {
  title: "pages/main/activities/Fund Bar",
  component: ActivityNav,
  argTypes: {
    activities: { control: { disable: true } },
    addActivity: { action: 'Add Activity' }
  }
} as Meta;

export const Default: Story<FundBarProps> = ({ currentFunds, todaysFundChanges }) => <FundBar currentFunds={currentFunds} todaysFundChanges={todaysFundChanges} />;
Default.args = {
  currentFunds: 1000,
  todaysFundChanges: 10
};