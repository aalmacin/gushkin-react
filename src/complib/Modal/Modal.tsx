import React from "react";
import classes from "./Modal.module.scss";

// TODO: Use Portal
const Modal: React.FC = ({ children }) => {
  return (
    <div className={classes.Modal}>
      <div className={classes.ModalContent}>{children}</div>
    </div>
  );
};

export default Modal;
