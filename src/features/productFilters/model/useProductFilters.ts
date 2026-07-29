import {useCallback, useMemo} from 'react'
import {useSearchParams} from 'react-router-dom'

import type {ProductFiltersValue, SortOrder} from './filters'

const PARAM = {
  query: 'q',
  inStock: 'inStock',
  sort: 'sort',
} as const

function parseSort(value: string | null): SortOrder | null {
  return value === 'asc' || value === 'desc' ? value : null
}

function parseFilters(params: URLSearchParams): ProductFiltersValue {
  return {
    query: params.get(PARAM.query) ?? '',
    inStockOnly: params.get(PARAM.inStock) === '1',
    sort: parseSort(params.get(PARAM.sort)),
  }
}

/**
 * Фильтры живут в URL: ссылку со списком можно переслать, а перезагрузка страницы
 * не сбрасывает состояние. Значения по умолчанию в строку запроса не пишутся.
 */
export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(() => parseFilters(searchParams), [searchParams])

  const setFilters = useCallback(
    (next: Partial<ProductFiltersValue>) => {
      setSearchParams(
        (params) => {
          // Предыдущие значения читаем из актуальной строки запроса, а не из замыкания:
          // иначе два обновления в одном тике затёрли бы друг друга.
          const merged = {...parseFilters(params), ...next}
          const updated = new URLSearchParams(params)

          if (merged.query.trim()) {
            updated.set(PARAM.query, merged.query)
          } else {
            updated.delete(PARAM.query)
          }

          if (merged.inStockOnly) {
            updated.set(PARAM.inStock, '1')
          } else {
            updated.delete(PARAM.inStock)
          }

          if (merged.sort) {
            updated.set(PARAM.sort, merged.sort)
          } else {
            updated.delete(PARAM.sort)
          }

          return updated
        },
        {replace: true},
      )
    },
    [setSearchParams],
  )

  return {filters, setFilters}
}
