import React from "react";
import classes from "./CurrentFunds.module.scss";

import {
  faCoins
} from "@fortawesome/free-solid-svg-icons";
import Funds from "pages/main/components/funds";
import HeaderIcon from "pages/main/components/headerIcon";

const CurrentFunds = () => {
  return (
    <div className={classes.CurrentFunds}>
      <HeaderIcon text="Your Funds" icon={faCoins} />
      <Funds />
    </div>
  );
};

export default CurrentFunds;