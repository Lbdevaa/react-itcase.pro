import {useEffect, useState} from 'react'

/** Откладывает применение значения — чтобы поиск не пересчитывал список на каждое нажатие. */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
