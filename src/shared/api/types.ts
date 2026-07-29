/**
 * Типы данных псевдо-API. Повторяют структуру из `src/services/api.js` один в один:
 * менять её по условию задания нельзя.
 */

export type Size = {
  id: number
  name: string
  number: number
}

export type ProductColor = {
  id: number
  name: string
  images: string[]
  /** Цена приходит строкой вида "123.00" — считать её во float нельзя. */
  price: string
  description: string
  /** Массив ID доступных размеров, а не объектов. Пустой массив — цвет недоступен. */
  sizes: number[]
}

export type Product = {
  id: number
  name: string
  categoryId: number
  brand: string
  colors: ProductColor[]
}
