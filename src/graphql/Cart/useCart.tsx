import { gql, useQuery } from '@apollo/client';
import { Wish } from 'graphql/types';

export interface GetCartItemsResponse {
  cart: Wish[];
}

export const GET_CART_ITEMS = gql`
  query getCart {
    cart @client {
      id
      description
      price
    }
  }
`;

export default function useCartQuery() {
  const { data } = useQuery<GetCartItemsResponse>(GET_CART_ITEMS);
  const cartItems = data?.cart || [];

  return { cartItems };
}