import React from 'react';
import { render } from '@testing-library/react';
import Main from './Main';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({ path: '/' })
}));

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn().mockReturnValue({ isAuthenticated: true, isLoading: false })
}));

test('renders learn react link', () => {
  const history = createMemoryHistory();
  const { getByLabelText } = render(<Router history={history}><Main /></Router>);
  const loading = getByLabelText('Loading...');
  expect(loading).toBeInTheDocument();
});
