import type {InputHTMLAttributes} from 'react'

import {cn} from 'shared/lib/cn'

import styles from './styles.module.css'

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: string
}

/** Подпись входит в компонент: клик по тексту должен переключать чекбокс. */
export function Checkbox({label, className, ...rest}: CheckboxProps) {
  return (
    <label className={cn(styles.root, className)}>
      <input type="checkbox" className={styles.box} {...rest} />
      <span>{label}</span>
    </label>
  )
}
