import {useState, type FormEvent} from 'react'

import {useCart} from 'entities/cart'
import {Button} from 'shared/ui/button'
import {Input} from 'shared/ui/input'

import {findPromocode, normalizeCode} from '../model/discount'

import styles from './styles.module.css'

export function PromocodeForm() {
  const {state, dispatch} = useCart()
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')

  const applied = findPromocode(state.promocode)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const code = normalizeCode(draft)

    if (!code) {
      setError('Введите промокод')

      return
    }

    if (!findPromocode(code)) {
      setError('Такого промокода нет')

      return
    }

    dispatch({type: 'applyPromocode', payload: {code}})
    setDraft('')
    setError('')
  }

  const handleReset = () => {
    dispatch({type: 'removePromocode'})
    setError('')
  }

  if (applied) {
    return (
      <div className={styles.applied}>
        <div>
          <p className={styles.code}>Промокод {applied.code}</p>
          <p className={styles.description}>{applied.description}</p>
        </div>

        <Button variant="ghost" onClick={handleReset}>
          Отменить
        </Button>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={styles.field}>
        <span className={styles.label}>Промокод</span>
        <Input
          value={draft}
          placeholder="Например, SALE10"
          autoComplete="off"
          onChange={(event) => {
            setDraft(event.target.value)
            setError('')
          }}
          aria-invalid={Boolean(error)}
        />
      </label>

      <Button type="submit" variant="secondary">
        Применить
      </Button>

      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
    </form>
  )
}
