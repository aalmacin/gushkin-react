import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from 'react-jss';
import { colors } from "components/variables";

const useClasses = createUseStyles({
  NavItems: {
    display: 'flex',
  },
  NavItem: {
    fontFamily: "Noto Sans",
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 20,
    lineHeight: '27px',
    textDecoration: 'none',
    color: colors.black.base,

    '&:not(:first-child)': {
      marginLeft: 20,
    },
  },
});

function ActivityNavItems() {
  const classes = useClasses();
  return (
    <div className={classes.NavItems}>
      <Link className={classes.NavItem} to="/main/activities">Home</Link>
      <Link className={classes.NavItem} to="/main/activities/today">Todays Activities</Link>
      <Link className={classes.NavItem} to="/main/activities/streaks">Streaks</Link>
    </div>
  );
}

export default ActivityNavItems;
