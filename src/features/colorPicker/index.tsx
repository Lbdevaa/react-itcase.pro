import {isColorAvailable} from 'entities/product'
import type {ProductColor} from 'shared/api'

import styles from './styles.module.css'

type ColorPickerProps = {
  colors: ProductColor[]
  selectedColorId: number | null
  onSelect: (colorId: number) => void
}

export function ColorPicker({colors, selectedColorId, onSelect}: ColorPickerProps) {
  return (
    <div className={styles.root}>
      <p className={styles.title}>Цвет</p>

      <div className={styles.list}>
        {colors.map((color) => {
          const selected = color.id === selectedColorId

          return (
            <button
              key={color.id}
              type="button"
              className={[styles.item, selected && styles.selected].filter(Boolean).join(' ')}
              onClick={() => onSelect(color.id)}
              aria-pressed={selected}
            >
              {color.name}
              {!isColorAvailable(color) ? (
                <span className={styles.note}>нет в наличии</span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
