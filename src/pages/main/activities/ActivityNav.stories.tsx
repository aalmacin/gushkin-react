import React from "react";
import { Meta } from '@storybook/react/types-6-0';
import ActivityNav from './ActivityNav';
import { createMemoryHistory } from 'history';
import { Router } from "react-router-dom";
import { MockedProvider } from '@apollo/client/testing';

const history = createMemoryHistory();

export default {
  title: "pages/main/activities/Activity Nav",
  component: ActivityNav,
} as Meta;

export const Default = () => <MockedProvider><Router history={history}><ActivityNav /></Router></MockedProvider>;