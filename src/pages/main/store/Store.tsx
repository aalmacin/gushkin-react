import React, { useState } from "react";
import classes from "./Store.module.scss";



import WishForm from "./wish-form/WishForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCartPlus,
  faMinus,
  faStore,
  faCoins, faPlus
} from "@fortawesome/free-solid-svg-icons";
import { Wish } from "models/Wish/Wish.types";
import Button, { ButtonType } from "complib/Button";
import Loading from "complib/Loading";
import Modal from "complib/Modal";
import { displayNormalMoney } from "functions/utils.functions";
import FormClose from "pages/main/shared/FormClose";
import Funds from "pages/main/shared/Funds";
import HeaderIcon from "pages/main/shared/HeaderIcon";

function Store() {
  const [isShowForm, setIsShowForm] = useState(false);
  const cartItems: Wish[] = []
  const storeItems: Wish[] = []
  const isWishesLoaded = true
  const cartTotal = 0

  const isItemInCart = (item: Wish) =>
    cartItems.find(cartItem => cartItem.id === item.id);

  const showForm = () => {
    setIsShowForm(!isShowForm);
  };

  const addToCart = (wish: Wish) => () => {
    // addItemToCart(wish);
  };

  const removeFromCart = (wish: Wish) => () => {
    // removeItemFromCart(wish.id);
  };

  const checkout = () => {
    // checkoutCart();
  };

  const closeHandler = () => {
    setIsShowForm(false);
  };

  return (
    <div className={classes.Store}>
      {isShowForm && (
        <Modal>
          <FormClose onClose={closeHandler} />
          <WishForm />
        </Modal>
      )}
      <div className={classes.StoreItemSection}>
        <div className={classes.Head}>
          <HeaderIcon text="Store" icon={faStore} />
          <div className={classes.ButtonContainer}>
            <Button
              onClick={showForm}
              type={ButtonType.secondary}
              icon={faPlus}
            />
          </div>
        </div>
        {isWishesLoaded ? (
          <>
            <div className={classes.StoreItemList}>
              {storeItems.map((wish: Wish) => (
                <div
                  className={classes.Wish}
                  key={wish.id}
                  onClick={
                    isItemInCart(wish)
                      ? removeFromCart(wish)
                      : addToCart(wish)
                  }
                >
                  <div className={classes.Description}>
                    {wish.description}
                  </div>
                  <div className={classes.Price}>
                    $ {displayNormalMoney(wish.price)}
                    {!isItemInCart(wish) ? (
                      <div className={classes.AddCart}>
                        <FontAwesomeIcon icon={faCartPlus} />
                      </div>
                    ) : (
                        <div className={classes.AddedCart}>
                          <FontAwesomeIcon icon={faMinus} />
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
            <Loading isLoading />
          )}
      </div>
      <div className={classes.SideBar}>
        <div className={classes.Cart}>
          <HeaderIcon text="Cart" icon={faShoppingCart} />
          {cartItems.map(item => (
            <div key={item.id} className={classes.CartItem}>
              <span className={classes.Description}>{item.description}</span>
              <span className={classes.Price}>$ {displayNormalMoney(item.price)}</span>
            </div>
          ))}
        </div>
        <div className={classes.CartTotal}>
          <p>Cart Total: ${displayNormalMoney(cartTotal)}</p>
          <Button type={ButtonType.primary} onClick={checkout}>
            Checkout
          </Button>
        </div>
        <div className={classes.CurrentFunds}>
          <HeaderIcon text="Your Funds" icon={faCoins} />
          <Funds />
        </div>
      </div>
    </div>
  );
}

export default Store;