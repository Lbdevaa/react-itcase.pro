import {isSizeAvailable} from 'entities/product'
import type {ProductColor, Size} from 'shared/api'
import {cn} from 'shared/lib/cn'

import styles from './styles.module.css'

type SizePickerProps = {
  sizes: Size[]
  color: ProductColor | undefined
  selectedSizeId: number | null
  onSelect: (sizeId: number) => void
}

/**
 * Показываются все размеры справочника; недоступные для выбранного цвета блокируются —
 * так видно, что размер существует, но его нет в этом цвете.
 */
export function SizePicker({sizes, color, selectedSizeId, onSelect}: SizePickerProps) {
  return (
    <div className={styles.root}>
      <p className={styles.title}>Размер</p>

      <div className={styles.list}>
        {sizes.map((size) => {
          const available = isSizeAvailable(color, size.id)
          const selected = size.id === selectedSizeId

          return (
            <button
              key={size.id}
              type="button"
              className={cn(styles.item, selected && styles.selected)}
              disabled={!available}
              onClick={() => onSelect(size.id)}
              aria-pressed={selected}
              title={available ? undefined : 'Недоступен для выбранного цвета'}
            >
              {size.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
