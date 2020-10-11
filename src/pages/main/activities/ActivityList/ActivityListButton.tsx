import React, { ButtonHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { createUseStyles } from 'react-jss';
import { colors } from 'components/variables';

const useStyles = createUseStyles({
  PerformActivityButton: {
    border: "none",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 24,
    padding: "0px 16px",
    lineHeight: '61px',
    color: colors.white.base,

    background: (props) => props.positive ? colors.primary.shade5 : colors.red.shade3,

    "&:hover": {
      cursor: "pointer",
    }
  },
});

type ActivityListButtonProps = {
  positive: boolean;
};

const ActivityListButton: React.FC<ActivityListButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({ positive, ...props }) => {
  const classes = useStyles({
    positive
  });
  return (
    <button
      {...props}
      className={classes.PerformActivityButton}
    >
      <span data-testid={positive ? 'positive' : 'negative'}>
        <FontAwesomeIcon icon={positive ? faPlus : faMinus} />
      </span>
    </button>
  );
};

export default ActivityListButton;