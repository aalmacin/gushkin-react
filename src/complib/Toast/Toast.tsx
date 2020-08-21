import React, { useState } from "react";
import { createPortal } from "react-dom"

interface ToastProps {
  showToast: boolean
}

const Toast: React.FC<ToastProps> = ({ children, showToast = false }) => {
  const modalRoot = document.getElementById('modal-root');
  if (!showToast) {
    return null
  }


  return createPortal(<div>{children}</div>, modalRoot as Element)
}

export default Toast