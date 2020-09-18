import React from "react";
import CartTotal from "./CartTotal";
import useCartTotal from "./useCartTotal";

const CartTotalContainer = () => {

  const { cartTotal } = useCartTotal();

  const checkout = () => {
    // checkoutCart();
  };
  return <CartTotal cartTotal={cartTotal} onCheckout={checkout} />;
};

export default CartTotalContainer;