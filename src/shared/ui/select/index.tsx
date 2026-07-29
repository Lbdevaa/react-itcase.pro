import type {SelectHTMLAttributes} from 'react'

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
    <select className={[styles.select, className].filter(Boolean).join(' ')} {...rest}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
