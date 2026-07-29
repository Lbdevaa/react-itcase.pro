import type {ReactNode} from 'react'

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
    <div className={[styles.root, tone === 'error' && styles.error].filter(Boolean).join(' ')}>
      <p className={styles.title}>{title}</p>
      {description ? <p className={styles.description}>{description}</p> : null}
      {action}
    </div>
  )
}
