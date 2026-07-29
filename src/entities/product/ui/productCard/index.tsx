import {Link} from 'react-router-dom'

import type {Product} from 'shared/api'
import {ROUTES} from 'shared/config'
import {formatMoney} from 'shared/lib/money'

import {getProductPreview, getProductPriceCents, isProductAvailable} from '../../model'

import styles from './styles.module.css'

type ProductCardProps = {
  product: Product
}

export function ProductCard({product}: ProductCardProps) {
  const preview = getProductPreview(product)
  const available = isProductAvailable(product)

  return (
    <Link to={ROUTES.product(product.id)} className={styles.card}>
      <div className={styles.imageBox}>
        {preview ? (
          <img src={preview} alt={product.name} className={styles.image} loading="lazy" />
        ) : (
          <span className={styles.imagePlaceholder}>Нет изображения</span>
        )}
        {!available ? <span className={styles.badge}>Нет в наличии</span> : null}
      </div>

      <div className={styles.body}>
        <p className={styles.brand}>{product.brand}</p>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.price}>от {formatMoney(getProductPriceCents(product))}</p>
      </div>
    </Link>
  )
}
