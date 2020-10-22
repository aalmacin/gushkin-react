import React from "react";
import { Meta } from '@storybook/react/types-6-0';
import CreateActivity from './CreateActivity';


export default {
  title: "pages/main/activities/Create Activity",
  component: CreateActivity,
} as Meta;

export const Default = () => <CreateActivity />;