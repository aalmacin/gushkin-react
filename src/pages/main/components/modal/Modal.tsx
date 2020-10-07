import React from "react";
import { createPortal } from "react-dom";
import ModalComponent from 'components/Modal';

const Modal: React.FC = ({ children }) => {
  const modalRoot = document.getElementById('modal-root');
  console.log(document, modalRoot);
  if (!modalRoot) {
    return null;
  }
  return createPortal(
    <ModalComponent />,
    modalRoot as Element
  );
};

export default Modal;