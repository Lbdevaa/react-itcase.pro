import {Link} from 'react-router-dom'

import {getCartItemKey, getItemTotalCents, getTotalCents, useCart} from 'entities/cart'
import {CartItemControls} from 'features/cartItemControls'
import {ROUTES} from 'shared/config'
import {formatMoney} from 'shared/lib/money'
import {Button} from 'shared/ui/button'
import {StateMessage} from 'shared/ui/stateMessage'

import styles from './styles.module.css'

export function CartPage() {
  const {state} = useCart()

  if (state.items.length === 0) {
    return (
      <StateMessage
        title="Корзина пуста"
        description="Добавьте товары из каталога, чтобы оформить заказ."
        action={
          <Link to={ROUTES.products}>
            <Button variant="secondary">Перейти в каталог</Button>
          </Link>
        }
      />
    )
  }

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Корзина</h1>

      <ul className={styles.list}>
        {state.items.map((item) => (
          <li key={getCartItemKey(item)} className={styles.item}>
            <div className={styles.imageBox}>
              {item.image ? (
                <img src={item.image} alt={item.productName} className={styles.image} />
              ) : null}
            </div>

            <div className={styles.details}>
              <Link to={ROUTES.product(item.productId)} className={styles.name}>
                {item.productName}
              </Link>
              <p className={styles.options}>
                Цвет: {item.colorName} · Размер: {item.sizeName}
              </p>
              <p className={styles.price}>{formatMoney(item.priceCents)} за штуку</p>
            </div>

            <div className={styles.actions}>
              <CartItemControls item={item} />
              <p className={styles.itemTotal}>{formatMoney(getItemTotalCents(item))}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.summary}>
        <span>Итого</span>
        <span className={styles.total}>{formatMoney(getTotalCents(state.items))}</span>
      </div>
    </div>
  )
}
