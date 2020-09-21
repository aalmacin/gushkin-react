import React from "react";
import classes from "./BoughtItems.module.scss";

import Loading from "complib/Loading";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import HeaderIcon from "pages/main/shared/HeaderIcon";
import { StoreItem } from "../store/graphql/Store.types";

function BoughtItems() {
  // TODO: Add real pull
  const isWishesLoaded = true;
  const storeArchiveItems: StoreItem[] = [];

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
