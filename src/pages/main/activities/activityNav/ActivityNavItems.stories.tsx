import React from "react";
import { Meta } from '@storybook/react/types-6-0';
import ActivityNavItems from './ActivityNavItems';
import { createMemoryHistory } from 'history';
import { Router } from "react-router-dom";

const history = createMemoryHistory();

export default {
  title: "pages/main/activities/Activity Nav Items",
  component: ActivityNavItems,
} as Meta;

export const Default = () => <Router history={history}><ActivityNavItems /></Router>;