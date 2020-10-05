import React from "react";
import useAddToCart from "graphql/cart/useAddToCart";
import useRemoveFromCart from "graphql/cart/useRemoveFromCart";
import { StoreItem } from "pages/main/store/graphql/Store.types";
import StoreListItem from "./StoreItem";

interface StoreItemProps {
  wish: StoreItem;
}

const StoreItemContainer: React.FC<StoreItemProps> = ({ wish }) => {
  const { addToCart } = useAddToCart();
  const { removeFromCart } = useRemoveFromCart();

  const addItemToCart = (wish: StoreItem) => () => {
    addToCart(wish);
  };

  const removeItemFromCart = (wish: StoreItem) => () => {
    removeFromCart(wish);
  };

  return <StoreListItem wish={wish} addToCart={addItemToCart} removeFromCart={removeItemFromCart} />;
};

export default StoreItemContainer;
