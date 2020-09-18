import { gql } from "@apollo/client";

export const GetWishes = gql`
  query GetWishes {
    wishes {
      id
      description
      price
      priceDisplay @client
      source
      priority
      status
      isInCart @client
    }
  }
`;