import {useCallback, useMemo} from 'react'
import {useSearchParams} from 'react-router-dom'

import type {ProductFiltersValue, SortOrder} from './model'

const PARAM = {
  query: 'q',
  inStock: 'inStock',
  sort: 'sort',
} as const

function parseSort(value: string | null): SortOrder | null {
  return value === 'asc' || value === 'desc' ? value : null
}

/**
 * Фильтры живут в URL: ссылку со списком можно переслать, а перезагрузка страницы
 * не сбрасывает состояние. Значения по умолчанию в строку запроса не пишутся.
 */
export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo<ProductFiltersValue>(
    () => ({
      query: searchParams.get(PARAM.query) ?? '',
      inStockOnly: searchParams.get(PARAM.inStock) === '1',
      sort: parseSort(searchParams.get(PARAM.sort)),
    }),
    [searchParams],
  )

  const setFilters = useCallback(
    (next: Partial<ProductFiltersValue>) => {
      const merged = {...filters, ...next}

      setSearchParams(
        (params) => {
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
    [filters, setSearchParams],
  )

  return {filters, setFilters}
}
