import React from "react";
import classes from "./ActivityList.module.scss";
import Loading from "components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useGetTodaysActions } from "models/Action/useGetTodaysActions";
import { useGetCurrentFunds } from "models/Funds/useGetCurrentFunds";
import { useToast } from "components/Toast/useToast";
import { useMutation } from "@apollo/client";
import { PerformActivity } from "models/Action/Action.mutations";
import { useGetActivities } from "../graphql/useGetActivities";

export default function ActivityList() {
  const { activities, loading } = useGetActivities();
  const isActivitiesActionLoading = false;

  const { refetch: refetchTodaysActions } = useGetTodaysActions();

  const { refetch: refetchCurrentFunds } = useGetCurrentFunds();
  const { showToast } = useToast();
  const [performActivity] = useMutation(PerformActivity, {
    onCompleted: () => {
      refetchTodaysActions();
      refetchCurrentFunds();
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


  if (loading) {
    return null;
  }

  return (
    <ul className={classes.ActivityList}>
      {activities.map((activity) => (
        <li key={activity.id} className={classes.Activity}>
          <div className={classes.Action}>
            {isActivitiesActionLoading ? (
              <Loading />
            ) : (
                <button
                  className={`${classes.PerformActivityButton} ${activity.positive
                    ? classes.PerformActivityButtonGreen
                    : classes.PerformActivityButtonRed
                    }`}
                  onClick={addActivity(activity.id)}
                >
                  <FontAwesomeIcon icon={activity.positive ? faPlus : faMinus} />
                </button>
              )}
            <span className={classes.ActivityText}>
              {activity.description}{" "}
              <span className={classes.ActivityAmt}>
                (${activity.fundAmt})
              </span>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
