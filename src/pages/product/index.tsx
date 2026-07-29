import {useParams, Link} from 'react-router-dom'

import {getProduct, getSizes} from 'shared/api'
import {ROUTES} from 'shared/config'
import {useAsync} from 'shared/lib/useAsync'
import {Button} from 'shared/ui/button'
import {Spinner} from 'shared/ui/spinner'
import {StateMessage} from 'shared/ui/stateMessage'
import {ProductDetails} from 'widgets/productDetails'

export function ProductPage() {
  const {productId} = useParams()

  const {data: product, loading: productLoading, error} = useAsync(
    () => getProduct(productId ?? ''),
    [productId],
  )
  const {data: sizes, loading: sizesLoading} = useAsync(getSizes, [])

  if (productLoading || sizesLoading) {
    return <Spinner />
  }

  // API реджектится и на отсутствующий товар, и на сбой — различить их нельзя,
  // поэтому оба случая показываем как «товар не найден».
  if (error || !product) {
    return (
      <StateMessage
        title="Товар не найден"
        description="Возможно, он был удалён или ссылка неверна."
        action={
          <Link to={ROUTES.products}>
            <Button variant="secondary">Вернуться к каталогу</Button>
          </Link>
        }
      />
    )
  }

  // key сбрасывает выбор цвета и размера при переходе к другому товару.
  return <ProductDetails key={product.id} product={product} sizes={sizes ?? []} />
}
