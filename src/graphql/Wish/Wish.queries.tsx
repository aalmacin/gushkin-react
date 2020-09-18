import { gql } from "@apollo/client";

export const GET_WISHES = gql`
  query getWishes {
    wishes {
      id
      description
      price
      source
      priority
      status
    }
  }
`;