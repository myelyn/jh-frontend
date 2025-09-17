'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Alert, { AlertProps } from './Alert';

interface AlertContextType {
  showAlert: (props: Omit<AlertProps, 'show'>) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alertProps, setAlertProps] = useState<AlertProps>({
    message: '',
    show: false,
  });

  const showAlert = (props: Omit<AlertProps, 'show'>) => {
    setAlertProps({ ...props, show: true });
  };

  const hideAlert = () => {
    setAlertProps(prev => ({ ...prev, show: false }));
  };

  // 监听全局事件
  useEffect(() => {
    const handleShowAlert = (event: CustomEvent) => {
      const { type, message, title, duration, position } = event.detail;
      showAlert({ type, message, title, duration, position });
    };

    window.addEventListener('show-alert', handleShowAlert as EventListener);
    return () => window.removeEventListener('show-alert', handleShowAlert as EventListener);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <Alert {...alertProps} onClose={hideAlert} />
    </AlertContext.Provider>
  );
};

// 全局便捷方法
export const alert = {
  success: (message: string, title?: string, duration?: number, position: 'center' | 'top' = 'center') => {
    window.dispatchEvent(new CustomEvent('show-alert', {
      detail: { type: 'success', message, title, duration, position }
    }));
  },
  warning: (message: string, title?: string, duration?: number, position: 'center' | 'top' = 'center') => {
    window.dispatchEvent(new CustomEvent('show-alert', {
      detail: { type: 'warning', message, title, duration, position }
    }));
  },
  error: (message: string, title?: string, duration?: number, position: 'center' | 'top' = 'center') => {
    window.dispatchEvent(new CustomEvent('show-alert', {
      detail: { type: 'error', message, title, duration, position }
    }));
  },
  info: (message: string, title?: string, duration?: number, position: 'center' | 'top' = 'center') => {
    window.dispatchEvent(new CustomEvent('show-alert', {
      detail: { type: 'info', message, title, duration, position }
    }));
  },
};
