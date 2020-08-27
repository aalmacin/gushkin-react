import React, { useState } from "react";
import { createPortal } from "react-dom"
import classes from './Toast.module.scss'

interface ToastProps {
  showToast: boolean
}

const Toast: React.FC<ToastProps> = ({ children, showToast = false }) => {
  const toastRoot = document.getElementById('toast-root');
  if (!showToast) {
    return null
  }

  return createPortal(<div className={classes.Toast}>{children}</div>, toastRoot as Element)
}

export default Toast