import { getByLabelText, render, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import React from "react";
import CreateActivity from './CreateActivity';
import { MockedProvider } from '@apollo/client/testing';

const MockedCreateActivity = () => <MockedProvider>
  <CreateActivity />
</MockedProvider>;

describe('CreateActivity', () => {
  test('button exist', () => {
    expect.assertions(1);
    const { getByText } = render(<CreateActivity />);
    const createActivityButton = getByText(/Create Activity/i);

    expect(createActivityButton).toBeInTheDocument();
  });

  test('form shows on click', async () => {
    expect.assertions(8);
    const { getByText, queryByText } = render(<MockedCreateActivity />);
    expect(queryByText('Description')).not.toBeInTheDocument();
    expect(queryByText('Fund Amount')).not.toBeInTheDocument();
    expect(queryByText('Positive')).not.toBeInTheDocument();
    expect(queryByText('Submit')).not.toBeInTheDocument();

    const createActivityButton = getByText(/Create Activity/i);
    createActivityButton.click();

    const description = await waitFor(() => getByText('Description'));
    const fundAmt = await waitFor(() => getByText('Fund Amount'));
    const positive = await waitFor(() => getByText('Positive'));
    const submit = await waitFor(() => getByText('Submit'));
    expect(description).toBeInTheDocument();
    expect(fundAmt).toBeInTheDocument();
    expect(positive).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
  });

  test('form hides on close', async () => {
    // expect.assertions(8);
    const { getByText, getByLabelText, queryByText } = render(<MockedCreateActivity />);
    const createActivityButton = getByText(/Create Activity/i);
    createActivityButton.click();

    const description = await waitFor(() => getByText('Description'));
    const fundAmt = await waitFor(() => getByText('Fund Amount'));
    const positive = await waitFor(() => getByText('Positive'));
    const submit = await waitFor(() => getByText('Submit'));

    expect(description).toBeInTheDocument();
    expect(fundAmt).toBeInTheDocument();
    expect(positive).toBeInTheDocument();
    expect(submit).toBeInTheDocument();

    const closeModalBtn = getByLabelText(/Close Modal/);
    // await waitForElementToBeRemoved(() => queryByText('Fund Amount'));
    // await waitForElementToBeRemoved(() => queryByText('Positive'));
    // await waitForElementToBeRemoved(() => queryByText('Submit'));

    closeModalBtn.click();
    const descriptionRemoved = await waitForElementToBeRemoved(() => queryByText('Description'));
    expect(descriptionRemoved).not.toBeInTheDocument();

  });
});