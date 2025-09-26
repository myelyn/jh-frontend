import React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'text' | 'outlined' | 'primary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  loading?: boolean
  children: React.ReactNode
  circle?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'small', loading = false, disabled, children, style, circle = false, ...props }, ref) => {
    // 基础样式类
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none'

    // 变体样式类 - 使用全局主题色
    const variantClasses = {
      default: 'btn-default',
      text: 'bg-transparent color-primary no-border',
      outlined: 'bg-transparent border-primary border-1 color-primary',
      primary: 'btn-primary',
      danger: 'btn-danger',
    }

    // 尺寸样式类
    const sizeClasses = {
      small: 'h-6 px-3 text-xs',
      medium: 'h-8.5 px-5 text-base',
      large: 'h-10 px-6 text-lg',
    }

    // 合并所有类名
    const buttonClasses = [baseClasses, variantClasses[variant], sizeClasses[size], className, circle ? 'rounded-full' : ''].filter(Boolean).join(' ')

    return (
      <button className={buttonClasses} ref={ref} disabled={disabled || loading} style={style} {...props}>
        {loading && <ArrowPathIcon className="h-4 w-4 animate-spin mr-1" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
