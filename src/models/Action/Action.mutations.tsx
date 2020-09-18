import { gql } from "@apollo/client";

export const PerformActivity = gql`
  mutation PerformActivity($activityId: Int!) {
    performActivity(input: {activityId: $activityId}) {
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
`;