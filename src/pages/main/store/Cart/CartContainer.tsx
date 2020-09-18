
import React from "react";

import useCartQuery from "graphql/Cart/useCart";
import Cart from "./Cart";

const CartContainer: React.FC = () => {
  const { cartItems } = useCartQuery();
  return (
    <Cart cartItems={cartItems} />
  );
};

export default CartContainer;