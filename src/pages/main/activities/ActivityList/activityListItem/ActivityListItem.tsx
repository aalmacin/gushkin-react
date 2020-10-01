import React from "react";
import { ActivityItem } from "../../graphql/Activity.local";
import { createUseStyles } from 'react-jss';
import ActivityListButton from "../activityListButton";

const useStyles = createUseStyles({
  Action: {
    fontFamily: "Noto Sans",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 32,
    lineHeight: '44px',
    color: "#21262d",
  },
  ActivityText: {
    marginLeft: 24,
  },
  ActivityAmt: {
    fontStyle: "italic",
    color: "#876666",
  },
});

type ActivityListItemProps = {
  activity: ActivityItem;
  onActivityButtonClick: () => void;
};

const ActivityListItem: React.FC<ActivityListItemProps> = ({ activity, onActivityButtonClick }) => {
  const classes = useStyles();
  return (
    <div className={classes.Action}>
      <ActivityListButton positive={activity.positive} onClick={onActivityButtonClick} />
      <span className={classes.ActivityText}>
        {activity.description}{" "}
        <span className={classes.ActivityAmt}>
          (${activity.fundAmtDisplay})
              </span>
      </span>
    </div>
  );
};

export default ActivityListItem;