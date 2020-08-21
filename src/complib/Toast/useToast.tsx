import { useState } from '@storybook/addons';
import { useContext, useEffect } from 'react'
import { ToastContext } from './ToastProvider';

export const useToast = (duration: number) => {
  const { isShow, showToast, hideToast } = useContext(ToastContext)


  useEffect(() => {
    if (isShow) {
      const removeToastAfter5Seconds = setTimeout(() => {
        hideToast()
      }, duration)
      return () => clearTimeout(removeToastAfter5Seconds)
    }
  }, [isShow, hideToast, duration])

  return { isShow, showToast }
}