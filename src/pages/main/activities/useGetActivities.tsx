import { gql, useQuery } from '@apollo/client';
import { GetActivitiesResponse } from './graphql/Activity.local';

export const GET_ACTIVITIES = gql`
  query getActivities {
    activities {
      id
      description
      positive
      fundAmt
      fundAmtDisplay @client
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

export const useGetActivities = () => {
  const { data, ...rest } = useQuery<GetActivitiesResponse>(GET_ACTIVITIES);
  const activities = data?.activities || [];
  return { activities, data, ...rest };
};