import {Link} from 'react-router-dom'

import {getTotalCents, getTotalCount, useCart} from 'entities/cart'
import {ROUTES} from 'shared/config'
import {formatMoney} from 'shared/lib/money'

import styles from './styles.module.css'

export function Header() {
  const {state} = useCart()

  const count = getTotalCount(state.items)
  const total = getTotalCents(state.items)

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <Link to={ROUTES.products} className={styles.logo}>
          Каталог
        </Link>

        <Link to={ROUTES.cart} className={styles.cart}>
          <span>Корзина</span>
          <span className={styles.counter}>
            {count} шт · {formatMoney(total)}
          </span>
        </Link>
      </div>
    </header>
  )
}
