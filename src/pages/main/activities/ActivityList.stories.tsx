import React from "react";
import { Meta, Story } from '@storybook/react/types-6-0';
import ActivityNav from './ActivityNav';
import { createMemoryHistory } from 'history';
import { Router } from "react-router-dom";
import { MockedProvider } from '@apollo/client/testing';
import ActivityList, { ActivityListProps } from "./ActivityList";
import faker from 'faker';
import { displayNormalMoney } from 'functions/utils.functions';
import { ActivityItem } from "./graphql/Activity.local";

const history = createMemoryHistory();

export default {
  title: "pages/main/activities/Activity List",
  component: ActivityNav,
  argTypes: {
    activities: { control: { disable: true } },
    addActivity: { action: 'Add Activity' }
  }
} as Meta;

export const Default: Story<ActivityListProps> = ({ activities, addActivity }) => <ActivityList activities={activities} addActivity={addActivity} />;
Default.args = {
  activities: [...Array(10)].map(() => {
    const fundAmt = faker.random.number({ min: 1000000, max: 9999999 });
    return ({
      id: faker.random.uuid(),
      description: faker.random.words(5),
      fundAmt: fundAmt,
      fundAmtDisplay: displayNormalMoney(fundAmt),
      positive: faker.random.boolean(),
      actions: []
    });
  }),
};