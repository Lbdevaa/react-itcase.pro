import {useMemo} from 'react'

import {
  applyProductFilters,
  isFiltersEmpty,
  ProductFilters,
  useProductFilters,
} from 'features/productFilters'
import {getProducts} from 'shared/api'
import {useAsync} from 'shared/lib/useAsync'
import {useDebouncedValue} from 'shared/lib/useDebouncedValue'
import {Spinner} from 'shared/ui/spinner'
import {StateMessage} from 'shared/ui/stateMessage'
import {ProductGrid} from 'widgets/productGrid'

import styles from './styles.module.css'

export function ProductsPage() {
  const {data: products, loading, error} = useAsync(getProducts, [])
  const {filters, setFilters} = useProductFilters()

  // Поле ввода реагирует мгновенно, а пересчёт списка ждёт паузы в наборе.
  const debouncedQuery = useDebouncedValue(filters.query)

  const visibleProducts = useMemo(
    () => applyProductFilters(products ?? [], {...filters, query: debouncedQuery}),
    [products, filters, debouncedQuery],
  )

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Товары</h1>

      <ProductFilters value={filters} onChange={setFilters} />

      {loading ? <Spinner /> : null}

      {error ? (
        <StateMessage
          tone="error"
          title="Не удалось загрузить товары"
          description="Обновите страницу — возможно, это временный сбой."
        />
      ) : null}

      {!loading && !error && visibleProducts.length === 0 ? (
        <StateMessage
          title={isFiltersEmpty(filters) ? 'Товаров пока нет' : 'Ничего не найдено'}
          description={
            isFiltersEmpty(filters)
              ? 'Каталог пуст.'
              : 'Попробуйте изменить поисковый запрос или снять фильтры.'
          }
        />
      ) : null}

      {!loading && !error && visibleProducts.length > 0 ? (
        <ProductGrid products={visibleProducts} />
      ) : null}
    </div>
  )
}
