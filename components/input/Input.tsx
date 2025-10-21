'use client'
import React, { useId } from 'react'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'outlined' | 'lightoutlined' | 'noborder'
  size?: 'small' | 'medium' | 'large'
  error?: boolean
  helperText?: string
  label?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  circle?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
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
      circle = false,
      ...props
    },
    ref
  ) => {
    // 生成唯一的 ID
    const generatedId = useId()
    const inputId = id || `input-${generatedId}`

    // 基础样式类
    const baseClasses = 'block transition-colors focus:outline-none'

    // 变体样式类
    const variantClasses = {
      default: 'input-default',
      lightoutlined: 'input-lightoutlined',
      outlined: 'input-outlined',
      noborder: 'color-secondary placeholder:color-placeholder border-transparent focus:border-transparent focus:ring-0',
    }

    // 尺寸样式类
    const sizeClasses = {
      small: 'px-2 py-1 text-xs',
      medium: 'px-3 py-1.5 text-sm',
      large: 'px-4 py-3 text-lg',
    }

    // 图标容器的样式
    const iconContainerClasses = 'absolute inset-y-0 flex items-center pointer-events-none'
    const iconClasses = 'h-5 w-5 text-gray-400'

    // 合并所有类名
    const inputClasses = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
      leftIcon ? 'pl-10' : '',
      rightIcon ? 'pr-10' : '',
      circle ? 'rounded-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={fullWidth ? 'w-full' : 'w-auto'}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium leading-6 text-gray-900 mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className={`${iconContainerClasses} left-0 pl-3`}>
              <div className={iconClasses}>{leftIcon}</div>
            </div>
          )}

          <input ref={ref} id={inputId} className={inputClasses} {...props} />

          {rightIcon && (
            <div className={`${iconContainerClasses} right-0 pr-3`}>
              <div className={iconClasses}>{rightIcon}</div>
            </div>
          )}
        </div>

        {helperText && <p className={`mt-1 text-sm ${error ? 'text-red-400' : 'text-gray-300'}`}>{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
