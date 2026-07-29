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

  // Применённые фильтры отстают от введённых на время дебаунса. Пустое состояние
  // описываем именно ими, иначе сразу после очистки поиска список ещё пуст,
  // а текст уже сообщает, что каталог пуст.
  const appliedFilters = useMemo(
    () => ({...filters, query: debouncedQuery}),
    [filters, debouncedQuery],
  )

  const visibleProducts = useMemo(
    () => applyProductFilters(products ?? [], appliedFilters),
    [products, appliedFilters],
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
          title={isFiltersEmpty(appliedFilters) ? 'Товаров пока нет' : 'Ничего не найдено'}
          description={
            isFiltersEmpty(appliedFilters)
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
