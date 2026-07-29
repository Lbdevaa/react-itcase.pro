/**
 * Деньги хранятся и считаются в целых копейках: цена приходит строкой ("123.00"),
 * а арифметика во float даёт ошибки округления на суммах корзины.
 */

const formatter = new Intl.NumberFormat('ru-RU', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** "123.00" → 12300 */
export function parsePrice(price: string): number {
  const parsed = Number.parseFloat(price)

  return Number.isFinite(parsed) ? Math.round(parsed * 100) : 0
}

/** 12300 → "123,00 ₽" */
export function formatMoney(cents: number): string {
  return `${formatter.format(cents / 100)} ₽`
}
