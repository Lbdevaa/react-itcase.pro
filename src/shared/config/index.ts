/** Версия в ключе позволяет безболезненно поменять формат хранения в будущем. */
export const CART_STORAGE_KEY = 'catalog.cart.v1'

export const ROUTES = {
  products: '/',
  product: (id: number | string) => `/product/${id}`,
  productPattern: '/product/:productId',
  cart: '/cart',
} as const
