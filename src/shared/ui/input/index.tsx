import type {InputHTMLAttributes} from 'react'

import styles from './styles.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({className, ...rest}: InputProps) {
  return <input className={[styles.input, className].filter(Boolean).join(' ')} {...rest} />
}
