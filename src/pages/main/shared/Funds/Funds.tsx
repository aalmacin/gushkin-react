import React from "react";

import { faCoins } from "@fortawesome/free-solid-svg-icons";
import Loading from "complib/Loading";
import Button, { ButtonType } from "complib/Button";
import { useGetCurrentFunds } from "models/Funds/useGetCurrentFunds";


const Funds: React.FC = () => {
  const { currentFunds, loading } = useGetCurrentFunds();

  return !loading ? (
    <Button onClick={() => { }} icon={faCoins} type={ButtonType.gold}>
      {" "}
      ${currentFunds}
    </Button>
  ) : (
      <Loading isLoading />
    );
};

export default Funds;
