import React, { createContext, Reducer, useReducer } from "react"

interface Toast {
  isShow: boolean,
  showToast: (duration: number) => void,
  hideToast: () => void,
}

const noop = () => { }

const defaultValue: Toast = { isShow: false, showToast: noop, hideToast: noop }
export const ToastContext = createContext(defaultValue)

type ShowToast = { type: 'SHOW_TOAST' }
type HideToast = { type: 'HIDE_TOAST' }

type ToastActions = ShowToast | HideToast

const toastReducer: Reducer<boolean, ToastActions> = (_, action) => {
  switch (action.type) {
    case 'SHOW_TOAST':
      return true
    case 'HIDE_TOAST':
      return false
    default:
      throw new Error("Invalid action")
  }
}

export const ToastProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, false)

  const showToast = () => {
    dispatch({ type: 'SHOW_TOAST' })
  }

  const hideToast = () => {
    dispatch({ type: 'HIDE_TOAST' })
  }

  return <ToastContext.Provider value={{ ...defaultValue, isShow: state, showToast, hideToast }}>
    {children}
  </ToastContext.Provider>
}