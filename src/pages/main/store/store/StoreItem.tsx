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
    flexBasis: '20%',
    minWidth: '20%',
    border: ['1px', 'solid', colors.gray.shade3],

    paddingBottom: 0,
    margin: '2rem',
    cursor: 'pointer',
    position: 'relative',

    '@media (max-width: 43rem)': {
      flexBasis: '100%'
    },
    '&:hover': {
      '& $AddCart': {
        zIndex: 10,
        fontWeight: 900,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontsize: 32,
      }
    }
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
    display: 'none'
  },
  AddedCart: {
    zIndex: 10,
    fontWeight: 900,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontsize: 32,
  }
});

interface StoreItemProps {
  wish: StoreItemType;
  addToCart: (storeItem: StoreItemType) => () => void;
  removeFromCart: (storeItem: StoreItemType) => () => void;
}

const StoreItem: React.FC<StoreItemProps> = ({ wish, addToCart, removeFromCart }) => {
  const classes = useStyles();

  const wishOnClick = wish.isInCart
    ? removeFromCart(wish)
    : addToCart(wish);

  return (
    <div
      role="button"
      className={classes.Wish}
      key={wish.id}
      onClick={wishOnClick}
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
