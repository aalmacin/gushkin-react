import { colors } from "components/variables";
import React from "react";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  ExpiredMessage: {
    position: "fixed",
    top: "1 %",
    left: "50 %",
    transform: "translateX(-50 %)",
    backgroundColor: colors.gold.tint4,
    padding: "1rem 2rem",
    borderRadius: "1rem",
    color: colors.black.base,
  },
  Message: {
    marginRight: "1rem",
  }
});

interface ExpiredMessageProps {
  isExpired?: boolean;
}

const ExpiredMessage: React.FC<ExpiredMessageProps> = ({ isExpired }) => {
  const classes = useStyles();

  if (!isExpired) {
    return null;
  }
  return (
    isExpired && <div className={classes.ExpiredMessage}>
      <span className={classes.Message}>Your session expired.</span>
      <a href='/'>Click here to refresh</a>
    </div>
  );
};

export default ExpiredMessage;