
import React from "react";
import classes from "./Cart.module.scss";

import {
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import HeaderIcon from "pages/main/shared/HeaderIcon";
import CartTotal from "./CartTotal";
import CurrentFunds from "./CurrentFunds";
import { displayNormalMoney } from "functions/utils.functions";
import { StoreItem } from "../graphql/Store.types";

type CartProps = { cartItems: StoreItem[]; };

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  return (
    <div className={classes.SideBar}>
      <div className={classes.Cart}>
        <HeaderIcon text="Cart" icon={faShoppingCart} />
        {cartItems.map(item => (
          <div key={item.id} className={classes.CartItem}>
            <span className={classes.Description}>{item.description}</span>
            { item.price && <span className={classes.Price}>$ {displayNormalMoney(item.price)}</span>}
          </div>
        ))}
      </div>
      <CartTotal />
      <CurrentFunds />
    </div>
  );
};

export default Cart;