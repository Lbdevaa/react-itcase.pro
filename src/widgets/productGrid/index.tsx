import {ProductCard} from 'entities/product'
import type {Product} from 'shared/api'

import styles from './styles.module.css'

type ProductGridProps = {
  products: Product[]
}

export function ProductGrid({products}: ProductGridProps) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
