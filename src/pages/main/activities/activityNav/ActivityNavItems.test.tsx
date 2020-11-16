import { screen, render, waitFor } from "@testing-library/react";
import React from "react";
import ActivityNavItems from './ActivityNavItems';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';


const history = createMemoryHistory();

const MockedActivityNavItems = () => <Router history={history}><ActivityNavItems /></Router>;

describe('ActivityNavItems', () => {
  test('correct nav items', () => {
    expect.assertions(3);
    const { getByText } = render(<MockedActivityNavItems />);

    const homeLink = getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();

    const todaysActivitiesLink = getByText(/Todays Activities/i);
    expect(todaysActivitiesLink).toBeInTheDocument();

    const StreaksLink = getByText(/Streaks/i);
    expect(StreaksLink).toBeInTheDocument();
  });
});