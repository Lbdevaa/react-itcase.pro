import {PROMOCODES, type Promocode} from 'shared/config'

export function normalizeCode(code: string): string {
  return code.trim().toUpperCase()
}

export function findPromocode(code: string | null): Promocode | undefined {
  if (!code) {
    return undefined
  }

  const normalized = normalizeCode(code)

  return PROMOCODES.find((promocode) => promocode.code === normalized)
}

/**
 * Скидка считается в целых копейках и никогда не превышает стоимость товаров —
 * иначе итог ушёл бы в минус.
 */
export function getDiscountCents(promocode: Promocode | undefined, totalCents: number): number {
  if (!promocode || totalCents <= 0) {
    return 0
  }

  const discount =
    promocode.kind === 'percent'
      ? Math.round((totalCents * promocode.value) / 100)
      : promocode.value

  return Math.min(discount, totalCents)
}

export type CartTotals = {
  subtotalCents: number
  discountCents: number
  totalCents: number
}

export function getCartTotals(subtotalCents: number, code: string | null): CartTotals {
  const discountCents = getDiscountCents(findPromocode(code), subtotalCents)

  return {
    subtotalCents,
    discountCents,
    totalCents: subtotalCents - discountCents,
  }
}
