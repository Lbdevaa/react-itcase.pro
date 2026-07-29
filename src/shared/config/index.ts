/** Версия в ключе позволяет безболезненно поменять формат хранения в будущем. */
export const CART_STORAGE_KEY = 'catalog.cart.v1'

export const ROUTES = {
  products: '/',
  product: (id: number | string) => `/product/${id}`,
  productPattern: '/product/:productId',
  cart: '/cart',
} as const

export type Promocode = {
  code: string
  /** `percent` — доля от суммы, `fixed` — фиксированная скидка в копейках. */
  kind: 'percent' | 'fixed'
  value: number
  description: string
}

/**
 * Формат промокода и скидки задание оставляет на усмотрение — берём короткий
 * зашитый справочник: бэкенда для их проверки всё равно нет.
 */
export const PROMOCODES: Promocode[] = [
  {code: 'SALE10', kind: 'percent', value: 10, description: 'Скидка 10% на заказ'},
  {code: 'SALE25', kind: 'percent', value: 25, description: 'Скидка 25% на заказ'},
  {code: 'MINUS100', kind: 'fixed', value: 10_000, description: 'Скидка 100 ₽ на заказ'},
]
