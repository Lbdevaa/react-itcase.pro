import {useState} from 'react'
import {Link} from 'react-router-dom'

import {findColorById, getDefaultColor, isSizeAvailable} from 'entities/product'
import {AddToCart} from 'features/addToCart'
import {ColorPicker} from 'features/colorPicker'
import {ImageGallery} from 'features/imageGallery'
import {SizePicker} from 'features/sizePicker'
import type {Product, Size} from 'shared/api'
import {ROUTES} from 'shared/config'
import {formatMoney, parsePrice} from 'shared/lib/money'

import styles from './styles.module.css'

type ProductDetailsProps = {
  product: Product
  sizes: Size[]
}

/** Композиция карточки товара: галерея, выбор цвета и размера, добавление в корзину. */
export function ProductDetails({product, sizes}: ProductDetailsProps) {
  const [pickedColorId, setPickedColorId] = useState<number | null>(null)
  const [pickedSizeId, setPickedSizeId] = useState<number | null>(null)

  // Выбор цвета — производное состояние: пока пользователь ничего не трогал,
  // показываем первый доступный цвет, а не пустой экран.
  const color = findColorById(product, pickedColorId) ?? getDefaultColor(product)

  // Размер, недоступный для текущего цвета, считается невыбранным —
  // иначе в корзину ушла бы несуществующая комбинация.
  const selectedSizeId =
    pickedSizeId !== null && isSizeAvailable(color, pickedSizeId) ? pickedSizeId : null

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
            onSelect={setPickedColorId}
          />

          <SizePicker
            sizes={sizes}
            color={color}
            selectedSizeId={selectedSizeId}
            onSelect={setPickedSizeId}
          />

          <AddToCart product={product} color={color} size={selectedSize} />
        </div>
      </div>
    </div>
  )
}
