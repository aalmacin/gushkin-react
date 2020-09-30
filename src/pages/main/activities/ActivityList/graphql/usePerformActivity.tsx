import { gql, MutationHookOptions, useMutation } from "@apollo/client";
import { Activity } from "graphql/types";

const PERFORM_ACTIVITY = gql`
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

interface PerformActivityResponse {
  id: string;
  actionTimestamp: string;
  activity: Activity;
}

export const usePerformActivity = (options?: MutationHookOptions) => {
  const [performActivity] = useMutation<PerformActivityResponse>(PERFORM_ACTIVITY, options);

  return { performActivity };
};