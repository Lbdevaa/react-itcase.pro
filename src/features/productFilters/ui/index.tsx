import {Checkbox} from 'shared/ui/checkbox'
import {Input} from 'shared/ui/input'
import {Select} from 'shared/ui/select'

import type {ProductFiltersValue, SortOrder} from '../model/filters'

import styles from './styles.module.css'

type ProductFiltersProps = {
  value: ProductFiltersValue
  onChange: (next: Partial<ProductFiltersValue>) => void
}

const SORT_OPTIONS = [
  {value: '', label: 'Без сортировки'},
  {value: 'asc', label: 'Сначала дешёвые'},
  {value: 'desc', label: 'Сначала дорогие'},
]

export function ProductFilters({value, onChange}: ProductFiltersProps) {
  return (
    <div className={styles.root}>
      <label className={styles.search}>
        <span className={styles.label}>Поиск по названию</span>
        <Input
          type="search"
          value={value.query}
          placeholder="Например, футболка"
          onChange={(event) => onChange({query: event.target.value})}
        />
      </label>

      <label className={styles.sort}>
        <span className={styles.label}>Сортировка</span>
        <Select
          options={SORT_OPTIONS}
          value={value.sort ?? ''}
          onChange={(event) => onChange({sort: (event.target.value || null) as SortOrder | null})}
        />
      </label>

      <Checkbox
        className={styles.checkbox}
        label="Только в наличии"
        checked={value.inStockOnly}
        onChange={(event) => onChange({inStockOnly: event.target.checked})}
      />
    </div>
  )
}
