import React from "react";

import { faCoins } from "@fortawesome/free-solid-svg-icons";
import Loading from "complib/Loading";
import Button, { ButtonType } from "complib/Button";
import { displayNormalMoney } from "functions/utils.functions";


const Funds: React.FC = () => {
  const isFundsLoaded = true
  const funds = 0

  return isFundsLoaded ? (
    <Button onClick={() => { }} icon={faCoins} type={ButtonType.gold}>
      {" "}
      ${displayNormalMoney(funds)}
    </Button>
  ) : (
      <Loading isLoading />
    );
}

export default Funds;
