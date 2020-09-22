import { gql, useQuery } from '@apollo/client';
import { Activity, Maybe } from 'graphql/types';
import { RemoveMaybe } from 'graphql/utils';

export const GET_ACTIVITIES = gql`
  query getActivities {
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

type ActivityItem = RemoveMaybe<Activity>;

type GetActivitiesResponse = {
  activities: ActivityItem[];
};

export const useGetActivities = () => {
  const { data, ...rest } = useQuery<GetActivitiesResponse>(GET_ACTIVITIES);
  const activities = data?.activities || [];
  return { activities, data, ...rest };
};