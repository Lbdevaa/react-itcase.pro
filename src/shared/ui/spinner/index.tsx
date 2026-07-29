import styles from './styles.module.css'

type SpinnerProps = {
  label?: string
}

export function Spinner({label = 'Загрузка…'}: SpinnerProps) {
  return (
    <div className={styles.root} role="status" aria-live="polite">
      <span className={styles.circle} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  )
}
