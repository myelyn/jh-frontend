'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  XMarkIcon, 
  ExclamationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/solid'

export interface AlertProps {
  type?: 'success' | 'warning' | 'error' | 'info';
  title?: string;
  message: string;
  show?: boolean;
  duration?: number;
  onClose?: () => void;
  position?: 'center' | 'top';
}

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  show = true,
  duration = 0,
  onClose,
  position = 'center',
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (duration > 0 && isVisible) {
      const timer = setTimeout(handleClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, isVisible, handleClose]);

  // 武侠风格的颜色配置
  const getStyles = () => {
    const baseStyles = {
      success: {
        bg: 'bg-gradient-to-br from-emerald-50/80 via-green-25/60 to-emerald-50/80',
        text: 'text-emerald-900',
        icon: 'text-emerald-600',
        button: 'text-emerald-700 hover:text-emerald-800',
      },
      warning: {
        bg: 'bg-gradient-to-br from-amber-50/80 via-yellow-25/60 to-amber-50/80',
        text: 'text-amber-900',
        icon: 'text-amber-600',
        button: 'text-amber-700 hover:text-amber-800',
      },
      error: {
        bg: 'bg-gradient-to-br from-rose-50/80 via-red-25/60 to-rose-50/80',
        text: 'text-rose-900',
        icon: 'text-rose-600',
        button: 'text-rose-700 hover:text-rose-800',
      },
      info: {
        bg: 'bg-gradient-to-br from-slate-50/80 via-blue-25/60 to-slate-50/80',
        text: 'text-slate-900',
        icon: 'text-slate-600',
        button: 'text-slate-700 hover:text-slate-800',
      }
    };
    return baseStyles[type];
  };

  const getIcon = () => {
    const iconClass = `w-6 h-6 ${getStyles().icon} drop-shadow-sm`;
    switch (type) {
      case 'success': return <CheckCircleIcon className={iconClass} />;
      case 'warning': return <ExclamationTriangleIcon className={iconClass} />;
      case 'error': return <ExclamationCircleIcon className={iconClass} />;
      default: return <InformationCircleIcon className={iconClass} />;
    }
  };

  const positionClass = position === 'center' 
    ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'
    : 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50';

  if (!isVisible) return null;

  return (
    <div className={positionClass}>
      <div className={`
        ${getStyles().bg} ${getStyles().text}
        rounded-sm p-4 shadow-md min-w-80 max-w-lg
        transform transition-all duration-500 ease-out
        ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
    
        <div className="flex items-start relative z-10">
          <div className="flex-shrink-0 mr-4">
            {getIcon()}
          </div>
          <div className="flex-1">
            {title && (
              <h3 className="text-md font-bold mb-2 text-gray-800 tracking-wide">
                {title}
              </h3>
            )}
            <p className="text-sm leading-relaxed text-gray-700">
              {message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={handleClose}
              className={`
                ${getStyles().button}
                hover:scale-110 focus:outline-none focus:ring-2 
                transition-all duration-200
              `}
            >
              <XMarkIcon className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Alert;
