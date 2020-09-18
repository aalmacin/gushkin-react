import React from "react";
import classes from "./ActivityList.module.scss";
import { Activity } from "models/Activity/Activity.types";
import Loading from "complib/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useGetTodaysActions } from "models/Action/useGetTodaysActions";
import { useGetCurrentFunds } from "models/Funds/useGetCurrentFunds";
import { useToast } from "complib/Toast/useToast";
import { useMutation } from "@apollo/client";
import { PerformActivity } from "models/Action/Action.mutations";
import { useGetActivities } from "models/Activity/useGetActivities";

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
      {activities.map((activity: Activity) => (
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
