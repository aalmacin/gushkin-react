import { gql } from "@apollo/client";

export const GetCurrentFunds = gql`
  query GetCurrentFunds {
    currentFunds
  }
`;