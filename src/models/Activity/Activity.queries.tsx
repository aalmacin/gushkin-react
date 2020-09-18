import { gql } from "@apollo/client";

export const GetActivities = gql`
  query GetActivities {
    activities {
      id
      description
      positive
      fundAmt
      actions {
        id
        actionTimestamp
        activity {
          id
          description
          positive
          fundAmt
        }
      }
    }
  }
`;