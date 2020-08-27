import { useContext, useEffect, useMemo } from 'react'
import React from 'react'
import Toast from './Toast';
import { ToastContext } from './ToastProvider';

export const useToast = () => {
  const { isShow, showToast, message, updateMessage, updateDuration } = useContext(ToastContext)

  const toast = <Toast showToast={isShow}>{message}</Toast>

  const showToastCallback = (message: string, duration: number = 5000) => {
    showToast()
    updateMessage(message)
    updateDuration(duration)
  }

  return { toast, showToast: showToastCallback }
}