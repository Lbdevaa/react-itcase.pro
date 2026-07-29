import type {InputHTMLAttributes} from 'react'

import {cn} from 'shared/lib/cn'

import styles from './styles.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({className, ...rest}: InputProps) {
  return <input className={cn(styles.input, className)} {...rest} />
}
