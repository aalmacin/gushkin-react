import React from "react";
import classes from "./CartTotal.module.scss";
import Button, { ButtonType } from "complib/Button";

type CartProps = { cartTotal: number, onCheckout: () => void; };

const CartTotal: React.FC<CartProps> = ({ cartTotal, onCheckout }) => {
  return (
    <div className={classes.CartTotal}>
      <p>Cart Total: ${cartTotal}</p>
      <Button type={ButtonType.primary} onClick={onCheckout}>
        Checkout
      </Button>
    </div>
  );
};

export default CartTotal;