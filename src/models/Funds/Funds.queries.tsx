import { gql } from "@apollo/react-hooks"

export const GetCurrentFunds = gql`
  query GetCurrentFunds {
    currentFunds
  }
`