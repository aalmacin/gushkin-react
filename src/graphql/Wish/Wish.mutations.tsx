import { gql } from "@apollo/client";

export const CREATE_WISH = gql`
  mutation createWish($price: Int!, $description: String!, $priority: Priority!, $status: Status!, $source: String) {
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
`;

export const UPDATE_WISH = gql`
  mutation updateWish($id: Int!, $price: Int, $description: String, $priority: Priority, $status: Status, $source: String) {
    updateWish(input: {
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
`;