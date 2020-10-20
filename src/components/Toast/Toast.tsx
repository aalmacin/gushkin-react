import React from "react";
import classes from './Toast.module.scss';

export interface ToastProps {
  showToast: boolean;
}

const Toast: React.FC<ToastProps> = ({ children, showToast = false }) => {
  if (!showToast) {
    return null;
  }

  return <div className={classes.Toast}>{children}</div>;
};

export default Toast;