import type {SelectHTMLAttributes} from 'react'

import {cn} from 'shared/lib/cn'

import styles from './styles.module.css'

type SelectOption = {
  value: string
  label: string
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[]
}

export function Select({options, className, ...rest}: SelectProps) {
  return (
    <select className={cn(styles.select, className)} {...rest}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
