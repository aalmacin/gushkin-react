import React from "react";
import { ActivityItem } from "./graphql/Activity.local";
import ActivityListItem from "./activityList/ActivityListItem";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  ActivityList: {
    padding: 26,
    paddingTop: 32,

  },
  Activity: {
    listStyle: "none",
    "&:not(:first-child)": {
      marginTop: 32
    }
  }
});

type AddActivityFunc = (a: string) => () => void;

export type ActivityListProps = {
  activities: ActivityItem[];
  addActivity: AddActivityFunc;
};

const ActivityList: React.FC<ActivityListProps> = ({ activities, addActivity }) => {
  const classes = useStyles();
  return (
    <ul className={classes.ActivityList}>
      {activities.map((activity) => (
        <li key={activity.id} className={classes.Activity}>
          <ActivityListItem activity={activity} onActivityButtonClick={addActivity(activity.id)} />
        </li>
      ))}
    </ul>
  );
};

export default ActivityList;