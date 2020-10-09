import { render } from '@testing-library/react';
import React from 'react';
import Activities from './Activities';
import { MockedProvider } from '@apollo/client/testing';

const mocks: any[] = [];

describe('Activities', () => {
  test('renders', () => {
    const { getByLabelText } = render(<MockedProvider mocks={mocks}>
      <Activities />
    </MockedProvider>);
    expect(getByLabelText('Hola')).toBeInTheDocument();
  });
});