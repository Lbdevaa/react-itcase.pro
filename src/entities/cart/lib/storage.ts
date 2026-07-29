import {CART_STORAGE_KEY} from 'shared/config'

import type {CartItem, CartState} from '../model/types'

/**
 * Данные из localStorage — недоверенный ввод: их мог испортить пользователь или
 * оставить предыдущая версия формата. Всё, что не проходит проверку, отбрасывается.
 */
function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const item = value as Record<string, unknown>

  return (
    typeof item.productId === 'number' &&
    typeof item.colorId === 'number' &&
    typeof item.sizeId === 'number' &&
    typeof item.productName === 'string' &&
    typeof item.colorName === 'string' &&
    typeof item.sizeName === 'string' &&
    typeof item.priceCents === 'number' &&
    typeof item.quantity === 'number' &&
    item.quantity >= 1
  )
}

const EMPTY_CART: CartState = {items: [], promocode: null}

export function readCart(): CartState {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)

    if (!raw) {
      return EMPTY_CART
    }

    const parsed: unknown = JSON.parse(raw)

    if (typeof parsed !== 'object' || parsed === null) {
      return EMPTY_CART
    }

    const {items, promocode} = parsed as {items?: unknown; promocode?: unknown}

    return {
      items: Array.isArray(items) ? items.filter(isCartItem) : [],
      promocode: typeof promocode === 'string' ? promocode : null,
    }
  } catch {
    return EMPTY_CART
  }
}

export function writeCart(state: CartState): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Приватный режим или переполненное хранилище: корзина продолжает работать в памяти.
  }
}
