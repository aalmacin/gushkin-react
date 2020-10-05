import { render, screen } from '@testing-library/react';
import React from 'react';
import Button from '.';
import { ButtonType } from './Button';

const click = jest.fn();

describe('Button', () => {
  test('renders', () => {
    render(<Button type={ButtonType.primary} onClick={click}>
      Hello Friend
    </Button>);

    const btn = screen.getByText('Hello Friend');
    btn.click();

    expect(click.mock.calls.length).toBe(1);
  });
});