/**
 * Позиция корзины хранит снимок данных товара на момент добавления:
 * страница корзины не должна ходить в API за каждой позицией.
 */
export type CartItem = {
  productId: number
  colorId: number
  sizeId: number
  productName: string
  colorName: string
  sizeName: string
  image?: string
  priceCents: number
  quantity: number
}

export type CartState = {
  items: CartItem[]
  /**
   * Хранится только сам код: справочник и правила расчёта скидки живут выше,
   * в слое фич, а корзина остаётся моделью данных.
   */
  promocode: string | null
}

export type CartItemKey = Pick<CartItem, 'productId' | 'colorId' | 'sizeId'>

export type CartAction =
  | {type: 'add'; payload: Omit<CartItem, 'quantity'>}
  | {type: 'setQuantity'; payload: CartItemKey & {quantity: number}}
  | {type: 'remove'; payload: CartItemKey}
  | {type: 'applyPromocode'; payload: {code: string}}
  | {type: 'removePromocode'}
  | {type: 'clear'}
