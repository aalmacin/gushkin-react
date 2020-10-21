import React from "react";

import { faCoins } from "@fortawesome/free-solid-svg-icons";
import Loading from "components/Loading";
import Button from "components/Button";
import { useGetCurrentFunds } from "pages/main/activities/useGetCurrentFunds";


const Funds: React.FC = () => {
  const { currentFunds, loading } = useGetCurrentFunds();

  return !loading ? (
    <Button onClick={() => { }} icon={faCoins} kind="Gold">
      {" "}
      ${currentFunds}
    </Button>
  ) : (
      <Loading isLoading />
    );
};

export default Funds;
