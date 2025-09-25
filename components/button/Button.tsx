import React from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'outlined' | 'dark' | 'danger' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className = '', 
    variant = 'default', 
    size = 'medium', 
    loading = false,
    disabled,
    children, 
    style,
    ...props 
  }, ref) => {
    
    // 基础样式类
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none';
    
    // 变体样式类
    const variantClasses = {
      text: 'bg-transparent text-[#593707] no-border',
      default: 'bg-[#b1753f] text-white border border-1 border-[#d49c5f] hover:bg-[#ce843b] active:bg-[#ce843b]',
      primary: 'bg-[#ab4632] text-white border border-2 border-[#c77868] hover:bg-[#b24e34] active:bg-[#b24e34]',
      outlined: 'bg-transparent text-[#593707] border border-2 border-[#593707] hover:bg-[#faf6eb] active:bg-[#faf6eb]',
      dark: 'bg-[#5e4d33] text-[#fff7eb] border border-2 border-[#a79271] hover:bg-[#776242] active:bg-[#776242]',
      danger: 'bg-red-100 text-red-500 border border-1 border-red-500 hover:bg-red-200 active:bg-red-200'
    };
    
    // 尺寸样式类
    const sizeClasses = {
      small: 'h-6 px-3 text-xs',
      medium: 'h-8.5 px-5 text-base',
      large: 'h-10 px-6 text-lg',
    };

    // 合并所有类名
    const buttonClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={disabled || loading}
        style={style}
        {...props}
      >
        {loading &&  <ArrowPathIcon className="h-4 w-4 animate-spin mr-1"/>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
