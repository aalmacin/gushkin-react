import { render } from "@testing-library/react";
import { assert } from "console";
import React from "react";
import CreateActivity from './CreateActivity';


describe('CreateActivity', () => {
  test('button exist', () => {
    expect.assertions(1);
    const { getByText } = render(<CreateActivity />);
    const createActivityButton = getByText(/Create Activity/i);

    expect(createActivityButton).toBeInTheDocument();
  });

  test('renders form', () => {
    expect.assertions(1);
    const { getByText } = render(<CreateActivity />);
    const createActivityButton = getByText(/Create Activity/i);

    expect(createActivityButton).toBeInTheDocument();
  });
});