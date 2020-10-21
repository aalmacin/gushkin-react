import React, { useState } from "react";

import WishForm from "./wish-form/WishForm";

import {
  faStore,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import Button from "components/Button";
import Modal from "components/Modal";
import FormClose from "pages/main/components/formClose";
import HeaderIcon from "pages/main/components/headerIcon";
import Cart from "./Cart";
import StoreItems from "./store/StoreItemsContainer";
import { createUseStyles } from 'react-jss';

const useClasses = createUseStyles({
  Store: {
    display: 'flex',
    flexDirection: 'row',
    '@media (max-width: 43rem)': {
      flexDirection: 'column',
    }
  },
  StoreItemSection: {
    flex: 10,
  },
  Head: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  ButtonContainer: {
    paddingRight: '1rem',
  }
});

function Store() {
  const [isShowForm, setIsShowForm] = useState(false);
  const classes = useClasses();

  const showForm = () => {
    setIsShowForm(!isShowForm);
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
              kind="Secondary"
              icon={faPlus}
            />
          </div>
        </div>
        <StoreItems />
      </div>
      <Cart />
    </div>
  );
}

export default Store;
