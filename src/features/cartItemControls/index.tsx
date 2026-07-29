import {useCart, type CartItem} from 'entities/cart'
import {Button} from 'shared/ui/button'

import styles from './styles.module.css'

type CartItemControlsProps = {
  item: CartItem
}

export function CartItemControls({item}: CartItemControlsProps) {
  const {dispatch} = useCart()

  const key = {productId: item.productId, colorId: item.colorId, sizeId: item.sizeId}

  const changeQuantity = (quantity: number) => {
    dispatch({type: 'setQuantity', payload: {...key, quantity}})
  }

  return (
    <div className={styles.root}>
      <div className={styles.counter}>
        <Button
          variant="secondary"
          onClick={() => changeQuantity(item.quantity - 1)}
          disabled={item.quantity <= 1}
          aria-label="Уменьшить количество"
        >
          −
        </Button>

        <span className={styles.quantity} aria-live="polite">
          {item.quantity}
        </span>

        <Button
          variant="secondary"
          onClick={() => changeQuantity(item.quantity + 1)}
          aria-label="Увеличить количество"
        >
          +
        </Button>
      </div>

      <Button variant="ghost" onClick={() => dispatch({type: 'remove', payload: key})}>
        Удалить
      </Button>
    </div>
  )
}
