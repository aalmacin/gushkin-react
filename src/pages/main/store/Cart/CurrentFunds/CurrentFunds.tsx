import React from "react";
import classes from "./CurrentFunds.module.scss";

import {
  faCoins
} from "@fortawesome/free-solid-svg-icons";
import Funds from "pages/main/shared/Funds";
import HeaderIcon from "pages/main/shared/HeaderIcon";

const CurrentFunds = () => {
  return (
    <div className={classes.CurrentFunds}>
      <HeaderIcon text="Your Funds" icon={faCoins} />
      <Funds />
    </div>
  );
};

export default CurrentFunds;