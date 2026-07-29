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

export function readCart(): CartState {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)

    if (!raw) {
      return {items: []}
    }

    const parsed: unknown = JSON.parse(raw)

    if (typeof parsed !== 'object' || parsed === null) {
      return {items: []}
    }

    const items = (parsed as {items?: unknown}).items

    return {items: Array.isArray(items) ? items.filter(isCartItem) : []}
  } catch {
    return {items: []}
  }
}

export function writeCart(state: CartState): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Приватный режим или переполненное хранилище: корзина продолжает работать в памяти.
  }
}
