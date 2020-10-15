import React from "react";

import {
  faCoins
} from "@fortawesome/free-solid-svg-icons";
import Funds from "pages/main/components/funds";
import HeaderIcon from "pages/main/components/headerIcon";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  CurrentFunds: {
    '& > *': {
      margin: ['2rem', 0]
    }
  }
});

const CurrentFunds = () => {
  const classes = useStyles();
  return (
    <div className={classes.CurrentFunds}>
      <HeaderIcon text="Your Funds" icon={faCoins} />
      <Funds />
    </div>
  );
};

export default CurrentFunds;