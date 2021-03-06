import React from "react";
import { Meta, Story } from '@storybook/react/types-6-0';
import ActivityNav from './ActivityNav';
import { createMemoryHistory } from 'history';
import Streaks, { StreaksProps } from "./Streaks";

const history = createMemoryHistory();

export default {
  title: "pages/main/activities/Streaks",
  component: ActivityNav,
  argTypes: {
    activities: { control: { disable: true } },
    addActivity: { action: 'Add Activity' }
  }
} as Meta;

export const Template: Story<StreaksProps> = ({ positive, activityStreaks }) => <Streaks positive={positive} activityStreaks={activityStreaks} />;

export const Default: Story<StreaksProps> = Template.bind({});
Default.args = {
  positive: true,
  activityStreaks: [
    {
      activityId: 1,
      count: 15,
      day: "Dec 12"
    }
  ]
};

export const Positive: Story<StreaksProps> = Template.bind({});
Default.args = {
  positive: true,
};

export const NotPositive: Story<StreaksProps> = Template.bind({});
Default.args = {
  positive: false,
};