import { gql } from "@apollo/client"

const GetWishes = gql`
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

export function getWishes() {
  console.log('Get Wishes', GetWishes)
}