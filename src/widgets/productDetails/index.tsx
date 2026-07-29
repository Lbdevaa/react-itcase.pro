import {Link} from 'react-router-dom'

import {AddToCart} from 'features/addToCart'
import {ColorPicker} from 'features/colorPicker'
import {ImageGallery} from 'features/imageGallery'
import {SizePicker} from 'features/sizePicker'
import type {Product, Size} from 'shared/api'
import {ROUTES} from 'shared/config'
import {formatMoney, parsePrice} from 'shared/lib/money'

import {useProductOptions} from './model/useProductOptions'

import styles from './styles.module.css'

type ProductDetailsProps = {
  product: Product
  sizes: Size[]
}

/** Композиция карточки товара: галерея, выбор цвета и размера, добавление в корзину. */
export function ProductDetails({product, sizes}: ProductDetailsProps) {
  const {color, selectedSizeId, selectColor, selectSize} = useProductOptions(product)

  const selectedSize = sizes.find((size) => size.id === selectedSizeId)

  return (
    <div className={styles.root}>
      <Link to={ROUTES.products} className={styles.back}>
        ← Все товары
      </Link>

      <div className={styles.layout}>
        {/* key сбрасывает активный кадр при смене цвета */}
        <ImageGallery key={color?.id} images={color?.images ?? []} alt={product.name} />

        <div className={styles.info}>
          <p className={styles.brand}>{product.brand}</p>
          <h1 className={styles.title}>{product.name}</h1>

          {color ? <p className={styles.price}>{formatMoney(parsePrice(color.price))}</p> : null}
          {color ? <p className={styles.description}>{color.description}</p> : null}

          <ColorPicker
            colors={product.colors}
            selectedColorId={color?.id ?? null}
            onSelect={selectColor}
          />

          <SizePicker
            sizes={sizes}
            color={color}
            selectedSizeId={selectedSizeId}
            onSelect={selectSize}
          />

          <AddToCart product={product} color={color} size={selectedSize} />
        </div>
      </div>
    </div>
  )
}
