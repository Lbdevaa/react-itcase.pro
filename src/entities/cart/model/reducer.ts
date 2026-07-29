import type {CartAction, CartItem, CartItemKey, CartState} from './types'

/**
 * Позиция уникальна связкой «продукт + цвет + размер».
 * ID цвета уникален только внутри товара, поэтому одного colorId недостаточно.
 */
export function getCartItemKey(item: CartItemKey): string {
  return `${item.productId}-${item.colorId}-${item.sizeId}`
}

function isSameItem(item: CartItemKey, other: CartItemKey): boolean {
  return getCartItemKey(item) === getCartItemKey(other)
}

export const initialCartState: CartState = {items: [], promocode: null}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find((item) => isSameItem(item, action.payload))

      if (!existing) {
        return {...state, items: [...state.items, {...action.payload, quantity: 1}]}
      }

      return {
        ...state,
        items: state.items.map((item) =>
          isSameItem(item, action.payload) ? {...item, quantity: item.quantity + 1} : item,
        ),
      }
    }

    case 'setQuantity': {
      // Минимальное количество — 1: обнуление делается удалением позиции.
      const quantity = Math.max(1, Math.trunc(action.payload.quantity))

      return {
        ...state,
        items: state.items.map((item) =>
          isSameItem(item, action.payload) ? {...item, quantity} : item,
        ),
      }
    }

    case 'remove': {
      const items = state.items.filter((item) => !isSameItem(item, action.payload))

      // Скидка без товаров бессмысленна: пустая корзина сбрасывает и промокод.
      return {items, promocode: items.length > 0 ? state.promocode : null}
    }

    case 'applyPromocode':
      return {...state, promocode: action.payload.code}

    case 'removePromocode':
      return {...state, promocode: null}

    case 'clear':
      return initialCartState

    default:
      return state
  }
}

export function getTotalCount(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.quantity, 0)
}

export function getItemTotalCents(item: CartItem): number {
  return item.priceCents * item.quantity
}

export function getTotalCents(items: CartItem[]): number {
  return items.reduce((total, item) => total + getItemTotalCents(item), 0)
}
