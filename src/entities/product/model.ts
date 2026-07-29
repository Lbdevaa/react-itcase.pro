import type {Product, ProductColor} from 'shared/api'
import {parsePrice} from 'shared/lib/money'

/** Цвет доступен, если у него есть хотя бы один размер. */
export function isColorAvailable(color: ProductColor): boolean {
  return color.sizes.length > 0
}

/** Товар в наличии, если доступен хотя бы один его цвет. */
export function isProductAvailable(product: Product): boolean {
  return product.colors.some(isColorAvailable)
}

/**
 * Цена товара — минимальная среди всех его цветов, включая недоступные:
 * условие задания говорит «минимальная из его цветов» без оговорок.
 */
export function getProductPriceCents(product: Product): number {
  if (product.colors.length === 0) {
    return 0
  }

  return Math.min(...product.colors.map((color) => parsePrice(color.price)))
}

export function getProductPreview(product: Product): string | undefined {
  return product.colors.find((color) => color.images.length > 0)?.images[0]
}

export function findColorById(
  product: Product,
  colorId: number | null,
): ProductColor | undefined {
  return product.colors.find((color) => color.id === colorId)
}

/** Первый доступный цвет, а если доступных нет — просто первый. */
export function getDefaultColor(product: Product): ProductColor | undefined {
  return product.colors.find(isColorAvailable) ?? product.colors[0]
}

export function isSizeAvailable(color: ProductColor | undefined, sizeId: number): boolean {
  return Boolean(color?.sizes.includes(sizeId))
}
