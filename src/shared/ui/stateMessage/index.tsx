import type {ReactNode} from 'react'

import {cn} from 'shared/lib/cn'

import styles from './styles.module.css'

type StateMessageProps = {
  title: string
  description?: string
  action?: ReactNode
  tone?: 'neutral' | 'error'
}

/** Единый вид для состояний «пусто», «ничего не найдено» и «ошибка загрузки». */
export function StateMessage({title, description, action, tone = 'neutral'}: StateMessageProps) {
  return (
    <div className={cn(styles.root, tone === 'error' && styles.error)}>
      <p className={styles.title}>{title}</p>
      {description ? <p className={styles.description}>{description}</p> : null}
      {action}
    </div>
  )
}
