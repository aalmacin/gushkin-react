import { gql } from "@apollo/react-hooks"

export const GetWishes = gql`
  query GetWishes {
    wishes {
      id
      description
      price
      source
      priority
      status
    }
  }
`