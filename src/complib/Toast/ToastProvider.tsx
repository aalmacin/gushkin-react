import React, {
  createContext,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
} from "react";

interface Toast {
  isShow: boolean;
  showToast: () => void;
  hideToast: () => void;
  message: string;
  updateMessage: (message: string) => void;
  duration: number;
  updateDuration: (duration: number) => void;
}

const noop = () => {};

const defaultValue: Toast = {
  isShow: false,
  showToast: noop,
  hideToast: noop,
  message: "",
  updateMessage: noop,
  duration: 5000,
  updateDuration: noop,
};
export const ToastContext = createContext(defaultValue);

type ShowToast = { type: "SHOW_TOAST" };
type HideToast = { type: "HIDE_TOAST" };
type UpdateMessage = { type: "UPDATE_MESSAGE"; payload: string };
type UpdateDuration = { type: "UPDATE_DURATION"; payload: number };

type ToastActions = ShowToast | HideToast | UpdateMessage | UpdateDuration;

interface ToastState {
  isShow: boolean;
  message: string;
  duration: number;
}

const toastReducer: Reducer<ToastState, ToastActions> = (state, action) => {
  switch (action.type) {
    case "SHOW_TOAST":
      return { ...state, isShow: true };
    case "HIDE_TOAST":
      return { ...state, isShow: false };
    case "UPDATE_MESSAGE":
      return { ...state, message: action.payload };
    case "UPDATE_DURATION":
      return { ...state, duration: action.payload };
    default:
      throw new Error("Invalid action");
  }
};

export const ToastProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, {
    isShow: false,
    message: "",
    duration: 5000,
  });
  console.log(state);

  const showToast = () => {
    dispatch({ type: "SHOW_TOAST" });
  };

  const hideToast = useCallback(() => {
    dispatch({ type: "HIDE_TOAST" });
  }, [dispatch]);

  const updateMessage = (message: string) => {
    dispatch({ type: "UPDATE_MESSAGE", payload: message });
  };

  const updateDuration = (duration: number) => {
    dispatch({ type: "UPDATE_DURATION", payload: duration });
  };

  useEffect(() => {
    if (state.isShow) {
      const removeToastAfter5Seconds = setTimeout(() => {
        hideToast();
      }, state.duration);
      return () => clearTimeout(removeToastAfter5Seconds);
    }
  }, [hideToast, state]);

  return (
    <ToastContext.Provider
      value={{
        ...defaultValue,
        isShow: state.isShow,
        showToast,
        hideToast,
        message: state.message,
        updateMessage,
        updateDuration,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
