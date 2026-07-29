import type {ButtonHTMLAttributes} from 'react'

import {cn} from 'shared/lib/cn'

import styles from './styles.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({variant = 'primary', className, type = 'button', ...rest}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(styles.button, styles[variant], className)}
      {...rest}
    />
  )
}
