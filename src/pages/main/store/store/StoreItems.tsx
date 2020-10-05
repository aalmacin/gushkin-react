import React from "react";

import StoreItem from "./StoreItemContainer";
import { StoreItem as StoreItemType } from 'pages/main/store/graphql/Store.types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  StoreItemList: {
    display: 'flex',
    flexFlow: ['row', 'wrap'],
    justifyContent: 'flex-start'
  }
});

type StoreItemsProps = {
  storeItems: StoreItemType[];
};

const StoreItems: React.FC<StoreItemsProps> = ({ storeItems }) => {
  const classes = useStyles();
  return (
    <div className={classes.StoreItemList}>
      {storeItems.map((wish) => (
        <StoreItem key={wish.id} wish={wish} />
      ))}
    </div>
  );
};

export default StoreItems;
