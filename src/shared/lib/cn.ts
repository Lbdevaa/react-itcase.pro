/**
 * Склейка CSS-классов вместо classnames/clsx: условная логика в разметке сводится
 * к `cond && styles.x`, а лишняя зависимость ради одной строки не нужна.
 */

type ClassValue = string | false | null | undefined

/** cn(styles.item, selected && styles.selected) → "item item_selected" */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}
