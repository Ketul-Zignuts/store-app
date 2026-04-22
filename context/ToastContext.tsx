import React, { createContext, useContext, useCallback, ReactNode } from 'react';
import Toast from 'react-native-toast-message';

// Define the type for the context value
interface ToastContextType {
    showToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

// Create the context with a default undefined value
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Props type for the provider component
interface ToastProviderProps {
    children: ReactNode;
}

// Toast provider component
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const showToast = useCallback((type: 'success' | 'error' | 'info', message: string) => {
        Toast.show({
            type,
            text1: message,
            visibilityTime: 3000,
            position: 'top',
        });
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast />
        </ToastContext.Provider>
    );
};

// Custom hook to use the toast context
export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
