import React, { useState } from "react";
import classes from "./Store.module.scss";

import WishForm from "./wish-form/WishForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faMinus,
  faStore,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import Button, { ButtonType } from "complib/Button";
import Loading from "complib/Loading";
import Modal from "complib/Modal";
import FormClose from "pages/main/shared/FormClose";
import HeaderIcon from "pages/main/shared/HeaderIcon";
import { useGetWishes } from "models/Wish/useGetWishes";
import useAddToCart from "graphql/Cart/useAddToCart";
import useRemoveFromCart from "graphql/Cart/useRemoveFromCart";
import Cart from "./Cart";
import { StoreItem } from "models/Wish/GetWishes.provider";

function Store() {
  const [isShowForm, setIsShowForm] = useState(false);
  const { wishes: storeItems, loading } = useGetWishes();
  const { addToCart } = useAddToCart();
  const { removeFromCart } = useRemoveFromCart();

  const showForm = () => {
    setIsShowForm(!isShowForm);
  };

  const addItemToCart = (wish: StoreItem) => () => {
    addToCart(wish);
  };

  const removeItemFromCart = (wish: StoreItem) => () => {
    removeFromCart(wish);
  };

  const closeHandler = () => {
    setIsShowForm(false);
  };

  return (
    <div className={classes.Store}>
      {isShowForm && (
        <Modal>
          <FormClose onClose={closeHandler} />
          <WishForm onCompleted={closeHandler} />
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
        {!loading ? (
          <>
            <div className={classes.StoreItemList}>
              {storeItems.map((wish) => (
                <div
                  className={classes.Wish}
                  key={wish.id}
                  onClick={
                    wish.isInCart
                      ? removeItemFromCart(wish)
                      : addItemToCart(wish)
                  }
                >
                  <div className={classes.Description}>
                    {wish.description}
                  </div>
                  <div className={classes.Price}>
                    $ {wish.priceDisplay}
                    {!wish.isInCart ? (
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
      <Cart />
    </div>
  );
}

export default Store;
