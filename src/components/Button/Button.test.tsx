import { render } from '@testing-library/react';
import React from 'react';
import Button from '.';

const click = jest.fn();

describe('Button', () => {
  test('renders', () => {
    const { getByText } = render(<Button kind="Primary" onClick={click}>
      Hello Friend
    </Button>);

    const btn = getByText('Hello Friend');
    btn.click();

    expect(click).toHaveBeenCalledTimes(1);
  });
});