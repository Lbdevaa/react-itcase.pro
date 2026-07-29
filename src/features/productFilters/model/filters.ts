import {getProductPriceCents, isProductAvailable} from 'entities/product'
import type {Product} from 'shared/api'

export type SortOrder = 'asc' | 'desc'

export type ProductFiltersValue = {
  query: string
  inStockOnly: boolean
  sort: SortOrder | null
}

export function isFiltersEmpty(filters: ProductFiltersValue): boolean {
  return !filters.query.trim() && !filters.inStockOnly && filters.sort === null
}

export function applyProductFilters(
  products: Product[],
  {query, inStockOnly, sort}: ProductFiltersValue,
): Product[] {
  const normalizedQuery = query.trim().toLowerCase()

  const filtered = products.filter((product) => {
    if (normalizedQuery && !product.name.toLowerCase().includes(normalizedQuery)) {
      return false
    }

    return !inStockOnly || isProductAvailable(product)
  })

  if (!sort) {
    return filtered
  }

  const direction = sort === 'asc' ? 1 : -1

  return [...filtered].sort(
    (first, second) =>
      (getProductPriceCents(first) - getProductPriceCents(second)) * direction,
  )
}
