import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { StoreItem as StoreItemType } from "pages/main/store/graphql/Store.types";
import { createUseStyles } from "react-jss";
import { colors } from 'components/variables';

const useStyles = createUseStyles({
  Wish: {

  },
  Description: {
    padding: '2rem',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  Price: {
    padding: ['1rem', '2rem'],
    backgroundColor: colors.primary.tint8,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  AddCart: {
  },
  AddedCart: {}
});

interface StoreItemProps {
  wish: StoreItemType;
  addToCart: (storeItem: StoreItemType) => () => void;
  removeFromCart: (storeItem: StoreItemType) => () => void;
}

const StoreItem: React.FC<StoreItemProps> = ({ wish, addToCart, removeFromCart }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.Wish}
      key={wish.id}
      onClick={
        wish.isInCart
          ? addToCart(wish)
          : removeFromCart(wish)
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
  );
};

export default StoreItem;
