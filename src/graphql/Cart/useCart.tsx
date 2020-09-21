import { gql, useQuery } from '@apollo/client';
import { StoreItem } from 'pages/main/store/graphql/Store.types';

export interface GetCartItemsResponse {
  cart: StoreItem[];
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