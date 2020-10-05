import Loading from "components/Loading";
import React from "react";
import useGetStoreItems from "../graphql/useGetStoreItems";

import StoreItems from "./StoreItems";

const StoreItemsContainer = () => {
  const { loading, storeItems } = useGetStoreItems();

  if (loading) {
    return <Loading isLoading />;
  }

  return (
    <StoreItems storeItems={storeItems} />
  );
};

export default StoreItemsContainer;
