import React from "react";
import { Meta } from '@storybook/react/types-6-0';
import CreateActivity from './CreateActivity';
import { MockedProvider } from '@apollo/client/testing';


export default {
  title: "pages/main/activities/Create Activity",
  component: CreateActivity,
} as Meta;

export const Default = () => <MockedProvider><CreateActivity /></MockedProvider>;