import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createUseStyles } from 'react-jss';
import ActivityForm from "./createActivity/ActivityForm";


const useClasses = createUseStyles({
  CreateActivity: {},
  ShowActivityButton: {
    border: 'none',
    background: 'none',
    fontFamily: "Noto Sans",
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 20,
    lineHeight: '27px',

    color: '#404855',
    cursor: 'pointer',
  }
});

function CreateActivity() {
  const classes = useClasses();
  const [isShowActivityForm, setShowActivityForm] = useState(false);

  const showActivityForm = () => {
    setShowActivityForm(true);
  };

  const closeForm = () => {
    setShowActivityForm(false);
  };
  return (
    <div className={classes.CreateActivity}>
      {isShowActivityForm && (
        <Modal>
          <ActivityForm closeHandler={closeForm} />
        </Modal>
      )}
      <button className={classes.ShowActivityButton} onClick={showActivityForm}>
        <FontAwesomeIcon icon={faPlus} /> <span>Create Activity</span>
      </button>
    </div>
  );
}

export default CreateActivity;
