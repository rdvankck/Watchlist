import React, { createContext, useState } from 'react';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info') => {
        const id = Date.now();
        const newToast = { id, message, type };

        setToasts((prev) => [...prev, newToast]);

        setTimeout(() => {
            removeToast(id);
        }, 3000);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const toast = {
        success: (message) => addToast(message, 'success'),
        error: (message) => addToast(message, 'error'),
        warning: (message) => addToast(message, 'warning'),
        info: (message) => addToast(message, 'info'),
    };

    return (
        <ToastContext.Provider value={{ toast, toasts, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
};