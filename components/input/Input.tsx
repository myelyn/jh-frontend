import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'outlined' | 'darkoutlined' | 'noborder';
  size?: 'small' | 'medium' | 'large';
  error?: boolean;
  helperText?: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = '',
    variant = 'default',
    size = 'small',
    error = false,
    helperText,
    label,
    leftIcon,
    rightIcon,
    fullWidth = false,
    id,
    ...props 
  }, ref) => {
    
    // 生成唯一的 ID
    const inputId = id || `input-${Math.random().toString(36).substring(2, 11)}`;
    
    // 基础样式类
    const baseClasses = 'block rounded-sm transition-colors focus:outline-none';
    
    // 变体样式类
    const variantClasses = {
      default: 'bg-white border border-1 text-gray-600 placeholder:text-gray-400 border-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-200',
      outlined: 'bg-transparent border-1 text-[#91754c] placeholder:text-[#dccdb6] border-[#c5b699] focus:border-[#cab28e] focus:ring-1 focus:ring-[#e8d9c3]',
      darkoutlined: 'bg-transparent border-1 text-[#4d391c] placeholder:text-[#a48b5f] border-[#735c3a] focus:border-[#735c3a] focus:ring-1 focus:ring-[#dac8ae]',
      noborder: 'bg-transparent text-gray-600 placeholder:text-gray-400 border-transparent focus:border-transparent focus:ring-0',
    };
    
    // 尺寸样式类
    const sizeClasses = {
      small: 'px-2 py-1 text-xs',
      medium: 'px-3 py-2 text-base',
      large: 'px-4 py-3 text-lg',
    };
    
    // 错误状态样式
    const errorClasses = error 
      ? ' border-red-500 focus:border-red-500 focus:ring-red-300 placeholder:text-red-300' 
      : '' 
    
    // 图标容器的样式
    const iconContainerClasses = 'absolute inset-y-0 flex items-center pointer-events-none';
    const iconClasses = 'h-5 w-5 text-gray-400';
    
    // 合并所有类名
    const inputClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      errorClasses,
      fullWidth ? 'w-full' : '',
      leftIcon ? 'pl-10' : '',
      rightIcon ? 'pr-10' : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <div className={fullWidth ? 'w-full' : 'w-auto'}>
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium leading-6 text-gray-900 mb-1"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className={`${iconContainerClasses} left-0 pl-3`}>
              <div className={iconClasses}>
                {leftIcon}
              </div>
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            {...props}
          />
          
          {rightIcon && (
            <div className={`${iconContainerClasses} right-0 pr-3`}>
              <div className={iconClasses}>
                {rightIcon}
              </div>
            </div>
          )}
        </div>
        
        {helperText && (
          <p className={`mt-1 text-sm ${error ? 'text-red-400' : 'text-gray-300'}`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
