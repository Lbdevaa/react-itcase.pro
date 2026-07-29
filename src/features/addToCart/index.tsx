import {useEffect, useRef, useState} from 'react'

import {useCart} from 'entities/cart'
import type {Product, ProductColor, Size} from 'shared/api'
import {parsePrice} from 'shared/lib/money'
import {Button} from 'shared/ui/button'

import styles from './styles.module.css'

type AddToCartProps = {
  product: Product
  color: ProductColor | undefined
  size: Size | undefined
}

/** Добавляет ровно одну штуку за раз — как требует задание. */
export function AddToCart({product, color, size}: AddToCartProps) {
  const {dispatch} = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const hintTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Таймер подсказки живёт дольше клика: его нужно снимать при уходе со страницы
  // и при повторном добавлении, иначе подсказка погаснет раньше времени.
  useEffect(() => () => clearTimeout(hintTimer.current), [])

  const disabled = !color || !size

  const handleClick = () => {
    if (!color || !size) {
      return
    }

    dispatch({
      type: 'add',
      payload: {
        productId: product.id,
        colorId: color.id,
        sizeId: size.id,
        productName: product.name,
        colorName: color.name,
        sizeName: size.name,
        image: color.images[0],
        priceCents: parsePrice(color.price),
      },
    })

    setJustAdded(true)
    clearTimeout(hintTimer.current)
    hintTimer.current = setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div className={styles.root}>
      <Button onClick={handleClick} disabled={disabled}>
        Добавить в корзину
      </Button>

      <span className={styles.hint} role="status">
        {disabled ? 'Выберите цвет и размер' : justAdded ? 'Добавлено в корзину' : ''}
      </span>
    </div>
  )
}
