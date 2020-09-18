import { gql } from "@apollo/client";

export const CreateActivity = gql`
  mutation CreateActivity($description: String!, $fundAmt: Int!, $positive: Boolean!) {
    createActivity(input: {
      description: $description
      fundAmt: $fundAmt
      positive: $positive
    }) {
          id
          description
          positive
          fundAmt
    }
  }
`;