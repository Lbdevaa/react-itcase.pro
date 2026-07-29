import {Link} from 'react-router-dom'

import {getTotalCents, getTotalCount, useCart} from 'entities/cart'
import {getCartTotals} from 'features/promocode'
import {ROUTES} from 'shared/config'
import {formatMoney} from 'shared/lib/money'

import styles from './styles.module.css'

export function Header() {
  const {state} = useCart()

  const count = getTotalCount(state.items)
  // Сумма в шапке учитывает промокод, чтобы не расходиться с итогом корзины.
  const {totalCents} = getCartTotals(getTotalCents(state.items), state.promocode)

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <Link to={ROUTES.products} className={styles.logo}>
          Каталог
        </Link>

        <Link to={ROUTES.cart} className={styles.cart}>
          <span>Корзина</span>
          <span className={styles.counter}>
            {count} шт · {formatMoney(totalCents)}
          </span>
        </Link>
      </div>
    </header>
  )
}
