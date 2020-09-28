import { useMutation } from "@apollo/client";
import { useToast } from "components/Toast/useToast";
import { PerformActivity } from "models/Action/Action.mutations";
import { useGetTodaysActions } from "models/Action/useGetTodaysActions";
import { useGetActivities } from "../graphql/useGetActivities";

export const useActivityListUILogic = () => {
  const { activities, loading } = useGetActivities();

  const { refetch: refetchTodaysActions } = useGetTodaysActions();

  const { showToast } = useToast();
  const [performActivity] = useMutation(PerformActivity, {
    onCompleted: () => {
      refetchTodaysActions();
      showToast("Performed activity", 3000);
    },
  });

  const addActivity = (activityId: string) => () => {
    performActivity({
      variables: {
        activityId: parseInt(`${activityId}`),
      },
    });
  };

  return { activities, loading, addActivity };
};