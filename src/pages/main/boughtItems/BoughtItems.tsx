import React from "react";

import Loading from "components/Loading";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import HeaderIcon from "pages/main/components/headerIcon";
import { StoreItem } from "../store/graphql/Store.types";
import { createUseStyles } from 'react-jss';
import { colors } from "components/variables";

const useStyles = createUseStyles({
  BoughtItems: {
    padding: '2rem',
  },
  ArchiveItemList: {
    margin: ['2rem', 0],
    display: 'flex',
    flexDirection: 'column'
  },
  ArchiveItem: {
    display: 'flex',
    justifyContent: 'space-evenly',
    borderBottom: [1, 'solid', colors.gray.shade3],
    padding: ['2rem', 0],
    '& p': {
      flex: 1
    }
  },
  ArchiveItemHeading: {
    '& p': {
      fontWeight: 'bold'
    }
  }
});

function BoughtItems() {
  // TODO: Add real pull
  const isWishesLoaded = true;
  const storeArchiveItems: StoreItem[] = [];

  const classes = useStyles();

  return (
    isWishesLoaded ?
      <div className={classes.BoughtItems}>
        <HeaderIcon text="Bought Items" icon={faShoppingBag} />
        <div className={classes.ArchiveItemList}>
          <div className={`${classes.ArchiveItem} ${classes.ArchiveItemHeading}`}>
            <p>Description</p>
            <p>Priority</p>
            <p>Price</p>
          </div>

          {storeArchiveItems.map(wish => (
            <div key={wish.id} className={classes.ArchiveItem}>
              <p>{wish.description}</p>
              <p>{wish.priority}</p>
              <p>${wish.priceDisplay}</p>
            </div>
          ))}
        </div>
      </div>
      :
      <Loading />
  );
}

export default BoughtItems;
