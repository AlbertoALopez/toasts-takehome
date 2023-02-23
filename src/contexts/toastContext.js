import { createContext, useState } from 'react';

export const ToastContext = createContext(null);

export default function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const openToast = ({ message, id, callback }) => setToast({ message, id, callback });

  const handleClose = () => setToast(null);

  return (
    <ToastContext.Provider
      value={{
        openToast,
        handleClose,
        toast,
        open: toast !== null,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}
