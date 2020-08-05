import { gql } from "@apollo/react-hooks"

export const CreateWish = gql`
  mutation CreateWish($price: Int!, $description: String!, $priority: Priority!, $status: Status!, $source: String) {
    createWish(input: {
      price: $price
      description: $description
      priority: $priority
      status: $status
      source: $source
    }) {
      id
      description
      price
      source
      priority
      status
    }
  }
`

const UpdateWish = gql`
  mutation UpdateWish($id: Int!, $price: Int, $description: String, $priority: Priority, $status: Status, $source: String) {
    createWish(input: {
      id: $id
      price: $price
      description: $description
      priority: $priority
      status: $status
      source: $source
    }) {
      id
      description
      price
      source
      priority
      status
    }
  }
`

export function updateWish() {
  console.log("update Wish", UpdateWish)
}