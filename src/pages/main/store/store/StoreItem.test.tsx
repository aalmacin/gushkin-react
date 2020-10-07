import StoreItem from "./StoreItem";
import { StoreItem as StoreItemType } from 'pages/main/store/graphql/Store.types';
import { Priority } from 'graphql/types';
import { Status } from 'graphql/types';
import React from "react";
import { render } from "@testing-library/react";

const addToCart = jest.fn();
const removeFromCart = jest.fn();
const wish: StoreItemType = {
  id: '1',
  description: "Hello",
  isInCart: false,
  price: 3434343,
  priceDisplay: '34.34',
  priority: Priority.High,
  status: Status.NotBought
};

describe('StoreItem', () => {
  test('renders', () => {
    const { getByText, getByRole } = render(<StoreItem wish={wish} addToCart={addToCart} removeFromCart={removeFromCart} />);

    getByText(wish.description);
    const wishItem = getByRole("button");
    wishItem.click();

    expect(addToCart.mock.calls.length).toBe(1);
    expect(removeFromCart.mock.calls.length).toBe(0);
    addToCart.mockClear();
    removeFromCart.mockClear();
  });

  test('renders', () => {
    const wishInCart = {
      ...wish,
      isInCart: true
    };
    const { getByRole } = render(<StoreItem wish={wishInCart} addToCart={addToCart} removeFromCart={removeFromCart} />);

    const wishItem = getByRole("button");
    wishItem.click();

    expect(addToCart.mock.calls.length).toBe(0);
    expect(removeFromCart.mock.calls.length).toBe(1);
    addToCart.mockClear();
    removeFromCart.mockClear();
  });
});