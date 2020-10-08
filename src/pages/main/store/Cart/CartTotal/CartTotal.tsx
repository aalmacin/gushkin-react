import React from "react";
import classes from "./CartTotal.module.scss";
import Button from "components/Button";

type CartProps = { cartTotal: number, onCheckout: () => void; };

const CartTotal: React.FC<CartProps> = ({ cartTotal, onCheckout }) => {
  return (
    <div className={classes.CartTotal}>
      <p>Cart Total: ${cartTotal}</p>
      <Button type="Primary" onClick={onCheckout}>
        Checkout
      </Button>
    </div>
  );
};

export default CartTotal;