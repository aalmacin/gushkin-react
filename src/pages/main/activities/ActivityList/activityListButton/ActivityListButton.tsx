import React, { ButtonHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  PerformActivityButton: {
    border: "none",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 24,
    padding: "0px 16px",
    lineHeight: 61,
    color: "#eff0ff",

    "&:hover": {
      cursor: "pointer",
    }
  },
  PerformActivityButtonRed: {
    background: "#876666",
  },
  PerformActivityButtonGreen: {
    background: "#718766",
  },
});

type ActivityListButtonProps = {
  positive: boolean;
};

const ActivityListButton: React.FC<ActivityListButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({ positive, ...props }) => {
  const classes = useStyles();
  return (
    <button
      {...props}
      className={`${classes.PerformActivityButton} ${positive
        ? classes.PerformActivityButtonGreen
        : classes.PerformActivityButtonRed
        }`}
    >
      <FontAwesomeIcon icon={positive ? faPlus : faMinus} />
    </button>
  );
};

export default ActivityListButton;