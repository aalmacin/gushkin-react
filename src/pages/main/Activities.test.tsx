import { render, waitFor } from '@testing-library/react';
import React from 'react';
import Activities from './Activities';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { GET_ACTIONS } from 'graphql/action/useGetActions';
import { GET_ACTIVITIES } from './activities/useGetActivities';
import { GET_CURRENT_FUNDS } from './activities/useGetCurrentFunds';

const mocks: MockedResponse[] = [
  {
    request: { query: GET_ACTIVITIES },
    result: {
      data: {
        activities: [
          {
            id: "1",
            description: "Cocoa",
            positive: true,
            fundAmt: 20000000,
            fundAmtDisplay: "20.00",
            actions: []
          }
        ]
      }
    }
  },
  {
    request: {
      query: GET_ACTIONS, variables: {
        input: { today: true }
      }
    },
    result: {
      data: []
    }
  },
  {
    request: {
      query: GET_CURRENT_FUNDS
    },
    result: {

    }
  }
];

describe('Activities', () => {
  const history = createMemoryHistory();
  test('renders', async () => {
    const { getByText, queryByText, getByTestId } = render(
      <Router history={history}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Activities />
        </MockedProvider>
      </Router>
    );
    await waitFor(() => {
      expect(getByText('Create Activity')).toBeInTheDocument();
      expect(getByText('Cocoa')).toBeInTheDocument();
      expect(getByText("($20.00)")).toBeInTheDocument();
      expect(queryByText(/20000000/)).not.toBeInTheDocument();
      expect(getByTestId('positive')).toBeInTheDocument();
    });
  });
});