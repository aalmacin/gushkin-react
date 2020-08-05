import React from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.scss";


const Modal: React.FC = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');
  return createPortal(
    <div className={classes.Modal}>
      <div className={classes.ModalContent}>{children}</div>
    </div>,
    modalRoot as Element
  );
};

export default Modal;
