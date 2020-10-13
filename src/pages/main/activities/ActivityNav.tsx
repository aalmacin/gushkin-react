import React from "react";
import { createUseStyles } from "react-jss";
import ActivityNavItems from "./activityNav/ActivityNavItems";
import CreateActivity from "./activityNav/CreateActivity";

const useClasses = createUseStyles({
  ActivityNav: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Noto Sans',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 20,
    lineHeight: '27px',
    color: '#767676',
    borderBottom: [1, 'solid', '#667387'],
    padding: [16, 24]

  }
});

function ActivityNav() {
  const classes = useClasses();
  return (
    <div className={classes.ActivityNav}>
      <ActivityNavItems />
      <CreateActivity />
    </div>
  );
}

export default ActivityNav;
