import {useEffect, useState} from 'react'

export type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: Error | null
}

type Result<T> = {
  key: string
  data: T | null
  error: Error | null
}

/**
 * Загрузка данных с отменой: результат помечается ключом запроса, поэтому ответ
 * предыдущего запроса не подменяет данные текущего при быстрых переходах.
 *
 * Состояние загрузки выводится из сравнения ключей, а не выставляется в эффекте —
 * лишний синхронный setState вызывал бы каскадный рендер.
 */
export function useAsync<T>(factory: () => Promise<T>, deps: unknown[]): AsyncState<T> {
  const key = JSON.stringify(deps)
  const [result, setResult] = useState<Result<T> | null>(null)

  useEffect(() => {
    let cancelled = false

    factory().then(
      (data) => {
        if (!cancelled) {
          setResult({key, data, error: null})
        }
      },
      (error: unknown) => {
        if (!cancelled) {
          setResult({
            key,
            data: null,
            error: error instanceof Error ? error : new Error(String(error)),
          })
        }
      },
    )

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const fresh = result?.key === key ? result : null

  return {
    data: fresh?.data ?? null,
    error: fresh?.error ?? null,
    loading: fresh === null,
  }
}
