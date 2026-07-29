import {useCallback} from 'react'
import {useSearchParams} from 'react-router-dom'

import {findColorById, getDefaultColor, isSizeAvailable} from 'entities/product'
import type {Product, ProductColor} from 'shared/api'

const PARAM = {
  color: 'color',
  size: 'size',
} as const

function parseId(value: string | null): number | null {
  if (value === null) {
    return null
  }

  const parsed = Number.parseInt(value, 10)

  return Number.isInteger(parsed) ? parsed : null
}

type ProductOptions = {
  color: ProductColor | undefined
  selectedSizeId: number | null
  selectColor: (colorId: number) => void
  selectSize: (sizeId: number) => void
}

/**
 * Выбранные цвет и размер живут в строке запроса, поэтому ссылку на конкретный
 * вариант товара можно переслать, а перезагрузка не сбрасывает выбор.
 *
 * Параметры из URL — недоверенный ввод: несуществующий цвет откатывается к цвету
 * по умолчанию, недоступный размер считается невыбранным. Битая ссылка не должна
 * ломать страницу.
 */
export function useProductOptions(product: Product): ProductOptions {
  const [searchParams, setSearchParams] = useSearchParams()

  const color =
    findColorById(product, parseId(searchParams.get(PARAM.color))) ?? getDefaultColor(product)

  const sizeIdFromUrl = parseId(searchParams.get(PARAM.size))
  const selectedSizeId =
    sizeIdFromUrl !== null && isSizeAvailable(color, sizeIdFromUrl) ? sizeIdFromUrl : null

  const selectColor = useCallback(
    (colorId: number) => {
      setSearchParams(
        (params) => {
          const updated = new URLSearchParams(params)

          updated.set(PARAM.color, String(colorId))

          // Размер, которого нет у нового цвета, убираем из ссылки, а не оставляем мусором.
          const nextColor = findColorById(product, colorId)
          const currentSizeId = parseId(updated.get(PARAM.size))

          if (currentSizeId !== null && !isSizeAvailable(nextColor, currentSizeId)) {
            updated.delete(PARAM.size)
          }

          return updated
        },
        {replace: true},
      )
    },
    [product, setSearchParams],
  )

  const selectSize = useCallback(
    (sizeId: number) => {
      setSearchParams(
        (params) => {
          const updated = new URLSearchParams(params)

          updated.set(PARAM.size, String(sizeId))

          return updated
        },
        {replace: true},
      )
    },
    [setSearchParams],
  )

  return {color, selectedSizeId, selectColor, selectSize}
}
