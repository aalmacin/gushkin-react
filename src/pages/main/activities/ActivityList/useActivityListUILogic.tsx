import { useToast } from "components/Toast/useToast";
import { useGetActivities } from "../graphql/useGetActivities";
import { usePerformActivity } from './graphql/usePerformActivity';

export const useActivityListUILogic = () => {
  const { activities, loading } = useGetActivities();

  const { performActivity } = usePerformActivity({
    onCompleted: () => {
      showToast("Performed activity", 3000);
    },
  });
  const { showToast } = useToast();

  const addActivity = (activityId: string) => () => {
    performActivity({
      variables: {
        activityId: parseInt(`${activityId}`),
      },
    });
  };

  return { activities, loading, addActivity };
};