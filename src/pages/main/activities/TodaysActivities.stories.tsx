import React from "react";
import { Meta } from '@storybook/react/types-6-0';
import TodaysActivities from './TodaysActivities';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GET_ACTIONS } from 'graphql/action/useGetActions';

const mocks: MockedResponse[] = [
  {
    request: { query: GET_ACTIONS, variables: { input: { today: true } } },
    result: {
      "data": { "actions": [{ "id": "27", "actionTimestamp": "2020-10-27T16:17:11Z", "activity": { "id": "1", "description": "Chess", "positive": true, "fundAmt": 20000000, "__typename": "Activity" }, "__typename": "Action" }] }
    }
  }
];

export default {
  title: "pages/main/activities/Todays Activities",
  component: TodaysActivities,
} as Meta;

export const Default = () => <MockedProvider mocks={mocks}><TodaysActivities /></MockedProvider>;