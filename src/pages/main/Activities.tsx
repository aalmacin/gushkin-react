import classes from "./Activities.module.scss";
import React from "react";
import Loading from "components/Loading";
import ActivityList from "./activities/ActivityListContainer";
import FundBar from "./activities/FundBarContainer";
import { useGetActivities } from "./activities/useGetActivities";
import ActivityNav from "./activities/ActivityNav";

function Activities() {
  const { loading: activitiesLoading } = useGetActivities();

  // TODO: Add real pull
  const isActivitiesLoaded = true;

  if (activitiesLoading) {
    return <Loading />;
  }

  return (
    <div className={classes.ActivityPage}>
      <FundBar />
      <div className={classes.ActivityBody}>
        <ActivityNav />
        {isActivitiesLoaded ? <ActivityList /> : <Loading isLoading />}
      </div>
    </div>
  );
}

export default Activities;
