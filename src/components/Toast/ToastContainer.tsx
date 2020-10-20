import React from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast";

export interface ToastProps {
  showToast: boolean;
}

const ToastContainer: React.FC<ToastProps> = ({ children, showToast = false }) => {
  const toastRoot = document.getElementById('toast-root');
  if (!showToast) {
    return null;
  }

  return createPortal(<Toast showToast={showToast}>{children}</Toast>, toastRoot as Element);
};

export default ToastContainer;