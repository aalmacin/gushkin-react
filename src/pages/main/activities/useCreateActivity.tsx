import { gql, useMutation } from "@apollo/client";
import { GetActivitiesResponse } from "pages/main/activities/graphql/Activity.local";
import { GET_ACTIVITIES } from "./useGetActivities";

export const CREATE_ACTIVITY = gql`
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

type HookProps = { onCompleted: Function; };

export default ({ onCompleted }: HookProps) => {
  const [createActivity] = useMutation(CREATE_ACTIVITY, {
    onCompleted: () => onCompleted,
    update: (cache, response) => {
      if (!response.data) {
        return;
      }
      const currentData = cache.readQuery<GetActivitiesResponse>({ query: GET_ACTIVITIES });
      const updated = currentData ? [...currentData.activities, response.data.createActivity] : [response.data.createActivity];
      cache.writeQuery({ query: GET_ACTIVITIES, data: { activities: updated } });
    }
  });
  return { createActivity };
};